<template>
  <form @submit.prevent="startFilter" class="filter">
    <teleport to="body"
      ><div
        @click="closeInvalidityDrop"
        class="form-validity"
        v-if="formInvalid"
      >
        <div>{{ formInavlidInfo }}</div>
        <button type="button">X</button>
      </div></teleport
    >
    <h3>Search</h3>
    <input :value="inputValue" @input="cityInput" type="text" />
    <div v-if="!closeCities" class="exten search-popup">
      <ul>
        <li
          @click="selectCity(finalResult.city, finalResult.country)"
          :key="finalResult.city"
          v-for="finalResult in finalResults"
        >
          <!-- <img href="../../public/cities-images/tangier.jpg" /> -->
          <!-- <img
            :src="'../../public/cities-images/' + finalResult.image + '.jpg'"
          /> -->
          <div>
            <h5>{{ finalResult.city }}, {{ finalResult.country }}</h5>
            <h6>City</h6>
          </div>
        </li>
      </ul>
    </div>
    <input :min="today" v-model="checkInInput" type="date" />
    <input :min="tomorrow" v-model="checkOutInput" type="date" />
    <select class="selectAdults" v-model="adultsInput">
      <option selected value="1">1 adult</option>
      <option value="2">2 adults</option>
      <option value="3">3 adults</option>
      <option value="4">4 adults</option>
      <option value="5">5 adults</option>
      <option value="6">6 adults</option>
      <option value="7">7 adults</option>
      <option value="8">8 adults</option>
      <option value="9">9 adults</option>
      <option value="10">10 adults</option>
      <option value="11">11 adults</option>
      <option value="12">12 adults</option>
      <option value="13">13 adults</option>
      <option value="14">14 adults</option>
      <option value="15">15 adults</option>
      <option value="16">16 adults</option>
      <option value="17">17 adults</option>
      <option value="18">18 adults</option>
      <option value="19">19 adults</option>
      <option value="20">20 adults</option>
      <option value="21">21 adults</option>
      <option value="22">22 adults</option>
      <option value="23">23 adults</option>
      <option value="24">24 adults</option>
      <option value="25">25 adults</option>
      <option value="26">26 adults</option>
      <option value="27">27 adults</option>
      <option value="28">28 adults</option>
      <option value="29">29 adults</option>
      <option value="30">30 adults</option>
    </select>
    <select v-model="roomsInput">
      <option selected value="1">1 room</option>
      <option value="2">2 rooms</option>
      <option value="3">3 rooms</option>
      <option value="4">4 rooms</option>
      <option value="5">5 rooms</option>
      <option value="6">6 rooms</option>
      <option value="7">7 rooms</option>
      <option value="8">8 rooms</option>
      <option value="9">9 rooms</option>
      <option value="10">10 rooms</option>
      <option value="11">11 rooms</option>
      <option value="12">12 rooms</option>
      <option value="13">13 rooms</option>
      <option value="14">14 rooms</option>
      <option value="15">15 rooms</option>
      <option value="16">16 rooms</option>
      <option value="17">17 rooms</option>
      <option value="18">18 rooms</option>
      <option value="19">19 rooms</option>
      <option value="20">20 rooms</option>
      <option value="21">21 rooms</option>
      <option value="22">22 rooms</option>
      <option value="23">23 rooms</option>
      <option value="24">24 rooms</option>
      <option value="25">25 rooms</option>
      <option value="26">26 rooms</option>
      <option value="27">27 rooms</option>
      <option value="28">28 rooms</option>
      <option value="29">29 rooms</option>
      <option value="30">30 rooms</option>
    </select>
    <select v-model="childrenInput">
      <option selected value="0">No children</option>
      <option value="1">1 child</option>
      <option value="2">2 children</option>
      <option value="3">3 children</option>
      <option value="4">4 children</option>
      <option value="5">5 children</option>
      <option value="6">6 children</option>
      <option value="7">7 children</option>
      <option value="8">8 children</option>
      <option value="9">9 children</option>
      <option value="10">10 children</option>
    </select>

    <button type="submit">Search</button>
  </form>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  props: [
    "city",
    "checkIn",
    "checkOut",
    "adults",
    "children",
    "rooms",
    "country",
    "sorting",
    "page",
  ],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const rawProps = ref(props);
    const inputValue = ref("");
    const checkInInput = ref("");
    const country = ref("");
    const checkOutInput = ref("");
    const adultsInput = ref("");
    const roomsInput = ref("");
    const childrenInput = ref("");
    const closeCities = ref(true);
    const formInvalid = ref(false);
    const formInavlidInfo = ref("");
    const finalResults = ref([]);
    const city = ref("");
    const tomorrow = ref(null);

    //

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const dd2 = String(currentDate.getDate()).padStart(2, "0");
    const mm2 = String(currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy2 = currentDate.getFullYear();

    let tomorrowDate = yyyy2 + "-" + mm2 + "-" + dd2;

    inputValue.value =
      rawProps.value.city[0].toUpperCase() +
      rawProps.value.city.toLowerCase().slice(1);

    checkInInput.value = rawProps.value.checkIn;
    checkOutInput.value = rawProps.value.checkOut;
    adultsInput.value = rawProps.value.adults;
    roomsInput.value = rawProps.value.rooms;
    childrenInput.value = route.params.children;
    store.dispatch("fetchData");

    onMounted(function () {
      tomorrow.value = tomorrowDate;
      country.value = rawProps.value.country;
      city.value = rawProps.value.city;
      inputValue.value = rawProps.value.city + ", " + country.value;
    });

    const cityInput = async function (event) {
      inputValue.value = event.target.value.trim().toLowerCase();
      if (inputValue.value === "") {
        closeCities.value = true;
        finalResults.value = [];
        cityInput.value = "";
        country.value = "";
        inputValue.value = "";
        return;
      }

      const cities = store.getters.getResults;
      const results = await cities.filter((r) => {
        return r.city.trim().toLowerCase().includes(inputValue.value);
      });

      if (results.length === 0) {
        closeCities.value = true;
        finalResults.value = [];
        return;
      }

      finalResults.value = results.slice(0, 5);
      closeCities.value = false;
    };
    const selectCity = function (cityValue, countryValue) {
      city.value = cityValue;
      country.value = countryValue;
      inputValue.value = cityValue + ", " + countryValue;
      closeCities.value = true;
    };
    const startFilter = function () {
      formInvalid.value = false;
      const nights = function () {
        return (
          (new Date(checkOutInput.value).getTime() -
            new Date(checkInInput.value).getTime()) /
          (24 * 60 * 60 * 1000)
        );
      };
      const haha = nights();
      if (haha < 0) {
        formInvalid.value = true;
        formInavlidInfo.value = `checkout date must be later than checkin`;
        return;
      }
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: city.value,
        country: country.value,
        checkInValue: checkInInput.value,
        checkOutValue: checkOutInput.value,
        rooms: roomsInput.value,
        children: childrenInput.value,
        adults: adultsInput.value,
        sorting: store.getters.getSorting,
        page: 1,
      };

      if (
        !body.currency ||
        !body.city ||
        !body.country ||
        !body.checkInValue ||
        !body.checkOutValue ||
        inputValue.value === ""
      ) {
        formInvalid.value = true;
        formInavlidInfo.value = `${!body.currency ? "Currency" : ""} ${
          !body.city || inputValue.value === "" ? "City, " : ""
        } ${!body.country ? "Country," : ""} ${
          !body.checkOutValue ? "Check out, " : ""
        }${
          !body.checkInValue ? "Check in" : ""
        } missing, please fill the required fields to continue`;
        return;
      }
      store.dispatch("setHotelsPage", 1);
      store.dispatch("setSorting", "popularity");
      store.dispatch("startSearch", body);
    };
    const closeInvalidityDrop = function () {
      formInvalid.value = false;
    };

    watch(checkInInput, (a) => {
      let kaka = new Date(a);
      kaka.setDate(kaka.getDate() + 1);
      const dd3 = String(kaka.getDate()).padStart(2, "0");
      const mm3 = String(kaka.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy3 = kaka.getFullYear();

      tomorrow.value = yyyy3 + "-" + mm3 + "-" + dd3;
    });

    return {
      today,
      tomorrow,
      startFilter,
      selectCity,
      closeInvalidityDrop,
      cityInput,
      checkInInput,
      checkOutInput,
      adultsInput,
      roomsInput,
      childrenInput,
      inputValue,
      formInvalid,
      formInavlidInfo,
      finalResults,
      closeCities,
    };
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 1rem;
  @media only screen and (max-width: 60rem) {
    display: none;
  }
}
.filter {
  position: relative;
  background-color: var(--color-primary-dark);
  color: white;
  border-radius: 5px;
  padding: 3rem;
  width: 25%;
  height: max-content;
  margin-right: 5rem;
  @media only screen and (max-width: 60rem) {
    display: flex;
    width: 100%;
    margin-bottom: 3rem;
    padding: 2rem;
  }
  @media only screen and (max-width: 42rem) {
    padding: 1rem;
  }
  @media only screen and (max-width: 37rem) {
    flex-direction: column;
  }
  button {
    background-color: var(--color-secondary);
    cursor: pointer;
    color: var(--color-primary-dark);
    font-size: 1.6rem;
    font-weight: 700;
    transition: all 0.3s;
    &:hover {
      background-color: var(--color-secondary-light);
    }
  }
  input {
    background: var(--color-white);
    padding: 0.7rem;
  }
  input,
  select,
  button {
    outline: none;
    border: none;
    width: 100%;
    display: block;
    height: 4rem;
    border-radius: 1px;
    margin-bottom: 2rem;
  }
}
.exten {
  font-size: 1.6rem;
  position: absolute;
  width: 100%;
  top: 10rem;
  left: 100%;
  background: var(--color-white);
  padding: 1rem;
  border-radius: 5px;
  cursor: initial;
  box-shadow: 2px 2px 20px rgba(77, 76, 76, 0.205);
  color: var(--color-black);
  @media only screen and (max-width: 37rem) {
    left: 0% !important;
    width: 200%;
  }
  ul {
    list-style: none;
  }
}
.search-popup {
  z-index: 999;
  width: 100%;
  left: 0;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 2px;
    margin-right: 1rem;
  }
}
.form-validity {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.363);
  display: flex;
  justify-content: center;
  align-items: Center;
  div {
    color: white;
    padding: 2rem;
    background-color: orangered;
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 1rem;
    color: white;
    background: var(--color-secondary);
  }
}
</style>
