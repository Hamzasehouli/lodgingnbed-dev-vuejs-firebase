<template>
  <section class="section-hotels">
    <div class="wrong" v-if="!searchValid">something went wrong</div>
    <div v-else class="container">
      <the-filter
        :city="city"
        :country="country"
        :checkIn="checkIn"
        :checkOut="checkOut"
        :adults="adults"
        :children="children"
        :rooms="rooms"
      ></the-filter>
      <ul class="hotels">
        <the-sorting
          :city="city"
          :country="country"
          :checkIn="checkIn"
          :checkOut="checkOut"
          :adults="adults"
          :children="children"
          :rooms="rooms"
          :page="page"
          :sorting="sorting"
        ></the-sorting>
        <h2>
          <span class="city">{{
            city[0].toUpperCase() + city.toLowerCase().slice(1)
          }}</span
          >: <span class="properties">{{ count }}</span> properties found
        </h2>
        <the-hotel
          :rate="rate"
          :nights="nights"
          :adults="adults"
          :result="result"
          v-for="result in results"
          :key="result"
        ></the-hotel>
        <the-pagination
          :city="city"
          :country="country"
          :checkIn="checkIn"
          :checkOut="checkOut"
          :adults="adults"
          :children="children"
          :rooms="rooms"
          :resultsTotal="resultsTotal"
          :page="page"
          :sorting="sorting"
          :results="results"
        ></the-pagination>
      </ul>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import TheFilter from "../components/TheFilter.vue";
import TheHotel from "../components/TheHotel.vue";
import TheSorting from "../components/hotels/TheSorting.vue";
import ThePagination from "../components/hotels/ThePagination.vue";
export default {
  components: { TheHotel, TheFilter, TheSorting, ThePagination },
  props: [
    "city",
    "country",
    "checkIn",
    "checkOut",
    "adults",
    "children",
    "rooms",
    "sorting",
    "page",
    "currency",
  ],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    // const router = useRouter();
    const rawProps = ref(props);
    // const router = useRouter();

    const results = ref([]);
    const searchValid = ref(true);
    const count = ref(null);
    const resultsTotal = ref(null);
    const rate = ref(null);

    const nights = computed(function () {
      return (
        (new Date(rawProps.value.checkOut).getTime() -
          new Date(rawProps.value.checkIn).getTime()) /
        (24 * 60 * 60 * 1000)
      );
    });

    document.title =
      props.city +
      ", " +
      props.country +
      ", " +
      props.checkIn +
      ", " +
      props.checkOut;

    if (nights.value <= 0) {
      searchValid.value = false;
      return;
    }

    onMounted(async function () {
      store.dispatch("setPending", true);

      searchValid.value = "true";
      if (!["EUR", "GBP", "USD", "MAD"].includes(route.params.currency)) {
        searchValid.value = false;
        return;
      }

      store.dispatch("selectCurrency", route.params.currency);
      const res = await fetch(
        "https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "exchangerate-api.p.rapidapi.com",
            "x-rapidapi-key":
              "d3b846acc2msh7a6afa7fdece52ep17db13jsn7fa8dd59f772",
          },
        }
      );
      const data = await res.json();
      const { GBP, MAD, USD } = data.rates;

      rate.value =
        store.getters.getSelectedCurrency === "GBP"
          ? GBP
          : store.getters.getSelectedCurrency === "USD"
          ? USD
          : store.getters.getSelectedCurrency === "MAD"
          ? MAD
          : 1;

      const term = props.sorting.toLowerCase();

      if (
        ![
          "popularity",
          "price",
          "class_ascending",
          "review_score",
          "distance",
        ].includes(term)
      ) {
        searchValid.value = false;
        return;
      }
      if (Number(route.params.page) <= 0) {
        searchValid.value = false;
        return;
      }

      const body = {
        city: props.city,
        country: props.country,
        rooms: props.rooms * 1,
        checkIn: props.checkIn,
        checkOut: props.checkOut,
        adults: props.adults * 1,
        children: props.children * 1,
        sorting: props.sorting,
        page: props.page * 1,
        currency: route.params.currency,
      };
      if (props.adults < 1 || props.rooms < 1 || props.children < 0) {
        searchValid.value = false;
        return;
      }
      await store.dispatch("fetchData");
      const myCity = store.getters.getResults.find(
        (c) =>
          c.city ===
          props.city?.toLowerCase()[0].toUpperCase() +
            props.city?.toLowerCase().slice(1)
      );
      if (props.country.toLowerCase() !== "morocco" || !myCity) {
        searchValid.value = false;
        return;
      }

      // console.log(rawProps.value);
      // console.log(
      //   (new Date(rawProps.value.checkOut).getTime() -
      //     new Date(rawProps.value.checkIn).getTime()) /
      //     (24 * 60 * 60 * 1000)
      // );
      // return (
      //   (new Date(rawProps.checkOut.value).getTime() -
      //     new Date(rawProps.checkIn.value).getTime()) /
      //   (24 * 60 * 60 * 1000)
      // );
      // store.dispatch("setPending", true);
      // const res = await fetch(
      //   "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/results.json"
      // );
      // const [data] = Object.entries(await res.json());
      // results.value = data[1];
      // count.value = results.value[0]?.numberOfResults;
      // const kaka = count.value / 20;
      // resultsTotal.value = Math.ceil(kaka);
      // store.dispatch("setResultsTotalOfHotels", Math.ceil(kaka));
      // store.dispatch("setPending", false);
      const dat = await store.dispatch("fetchResults", body);
      // count.value = dat.count;
      results.value = dat.results;
      // const kaka = count.value / 20;

      // resultsTotal.value = Math.ceil(kaka);
      const dat2 = await store.dispatch("fetchResults", {
        city: props.city,
        country: props.country,
        rooms: props.rooms * 1,
        checkIn: props.checkIn,
        checkOut: props.checkOut,
        adults: props.adults * 1,
        children: props.children * 1,
        sorting: props.sorting,
        page: 1,
        currency: route.params.currency,
      });
      count.value = dat2.count;
      const kaka = count.value / 20;
      await store.dispatch("setResultsTotalOfHotels", Math.ceil(kaka));
      resultsTotal.value = store.getters.getResultsTotalOfHotels;

      if (Number(props.page) > resultsTotal.value || route.params.page <= 0) {
        searchValid.value = false;
        store.dispatch("setPending", false);

        return;
      }
      store.dispatch("setPending", false);
    });

    watch(route, async () => {
      if (!route.path.includes("/hotels/")) return;
      store.dispatch("setPending", true);

      searchValid.value = "true";
      if (!["EUR", "GBP", "USD", "MAD"].includes(route.params.currency)) {
        searchValid.value = false;
        return;
      }

      store.dispatch("selectCurrency", route.params.currency);

      const res = await fetch(
        "https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "exchangerate-api.p.rapidapi.com",
            "x-rapidapi-key":
              "d3b846acc2msh7a6afa7fdece52ep17db13jsn7fa8dd59f772",
          },
        }
      );
      const data = await res.json();
      const { GBP, MAD, USD } = data.rates;

      rate.value =
        store.getters.getSelectedCurrency === "GBP"
          ? GBP
          : store.getters.getSelectedCurrency === "USD"
          ? USD
          : store.getters.getSelectedCurrency === "MAD"
          ? MAD
          : 1;

      const term = props.sorting.toLowerCase();

      if (
        ![
          "popularity",
          "price",
          "class_descending",
          "review_score",
          "distance",
        ].includes(term)
      ) {
        searchValid.value = false;
        return;
      }

      if (Number(route.params.page) <= 0) {
        searchValid.value = false;
        return;
      }

      const body2 = {
        city: route.params.city,
        country: route.params.country,
        rooms: route.params.rooms * 1,
        checkIn: route.params.checkIn,
        checkOut: route.params.checkOut,
        adults: route.params.adults * 1,
        children: route.params.children * 1,
        sorting: route.params.sorting,
        page: route.params.page * 1,
        currency: route.params.currency,
      };

      if (props.adults < 1 || props.rooms < 1 || props.children < 0) {
        searchValid.value = false;
        return;
      }
      if (!route.path.includes("/hotels/")) return;
      // nights.value =
      //   (new Date(rawProps.value.checkOut).getTime() -
      //     new Date(rawProps.value.checkIn).getTime()) /
      //   (24 * 60 * 60 * 1000);
      console.log(nights.value);
      if (nights.value <= 0) {
        searchValid.value = false;
        return;
      }

      const dat = await store.dispatch("fetchResults", body2);

      results.value = dat.results;

      const dat2 = await store.dispatch("fetchResults", {
        city: route.params.city,
        country: route.params.country,
        rooms: route.params.rooms * 1,
        checkIn: route.params.checkIn,
        checkOut: route.params.checkOut,
        adults: route.params.adults * 1,
        children: route.params.children * 1,
        sorting: route.params.sorting,
        page: 1,
        currency: route.params.currency,
      });
      count.value = dat2.count;
      const kaka = count.value / 20;
      await store.dispatch("setResultsTotalOfHotels", Math.ceil(kaka));

      resultsTotal.value = store.getters.getResultsTotalOfHotels;

      if (Number(props.page) > resultsTotal.value || route.params.page <= 0) {
        searchValid.value = false;
        store.dispatch("setPending", false);

        return;
      }
      store.dispatch("setPending", false);
    });

    return {
      results,
      count,
      resultsTotal,
      nights,
      searchValid,
      rate,
    };
  },
};
</script>

<style lang="scss" scoped>
.section-hotels {
  padding: 7rem 2rem;
}
.container {
  display: flex;
  @media only screen and (max-width: 60rem) {
    flex-direction: column;
  }
}
.hotels {
  flex: 1;
}

h2 {
  margin-bottom: 3rem;
}

.wrong {
  height: 100vh;
  width: 100%;
}
</style>
