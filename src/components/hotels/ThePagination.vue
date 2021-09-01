<template>
  <div class="pagination">
    <svg
      v-if="hotelsPage !== 1"
      @click="prevPageBtn"
      class="chevron chevron-left"
    >
      <use :href="sprite + '#icon-chevron-left'"></use>
    </svg>
    <span
      @click="setHotelsPage(hotelsPage - 1)"
      v-if="hotelsPage !== 1"
      class="page"
    >
      {{ hotelsPage - 1 }}</span
    >
    <span @click="setHotelsPage(hotelsPage)" class="page page-main">
      {{ hotelsPage }}</span
    >
    <span
      v-if="hotelsPage !== resultsTotal"
      @click="setHotelsPage(hotelsPage + 1)"
      class="page"
    >
      {{ hotelsPage + 1 }}</span
    >
    <svg
      v-if="hotelsPage !== resultsTotal"
      @click="nextPageBtn"
      class="chevron chevron-right"
    >
      <use :href="sprite + '#icon-chevron-right'"></use>
    </svg>
  </div>
</template>

<script>
import sprite from "../../../public/sprite.svg";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  props: [
    "resultsTotal",
    "city",
    "checkIn",
    "checkOut",
    "adults",
    "children",
    "rooms",
    "country",
    "sorting",
    "page",
    "results",
  ],
  setup(props) {
    const store = useStore();

    onMounted(function () {
      if (Number(props.page) <= 0) return;
      store.dispatch("setHotelsPage", Number(props.page));
    });

    const nextPageBtn = function () {
      store.dispatch("setNextHotelsPage");
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: props.city,
        country: props.country,
        checkInValue: props.checkIn,
        checkOutValue: props.checkOut,
        rooms: props.rooms,
        children: props.children,
        adults: props.adults,
        sorting: store.getters.getSorting,
        page: store.getters.getHotelsPage,
      };
      store.dispatch("startSearch", body);
    };
    const prevPageBtn = function () {
      store.dispatch("setPrevHotelsPage");
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: props.city,
        country: props.country,
        checkInValue: props.checkIn,
        checkOutValue: props.checkOut,
        rooms: props.rooms,
        children: props.children,
        adults: props.adults,
        sorting: store.getters.getSorting,
        page: store.getters.getHotelsPage,
      };
      store.dispatch("startSearch", body);
    };

    const hotelsPage = computed(function () {
      return store.getters.getHotelsPage;
    });

    const setHotelsPage = function (payload) {
      store.dispatch("setHotelsPage", payload);
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: props.city,
        country: props.country,
        checkInValue: props.checkIn,
        checkOutValue: props.checkOut,
        rooms: props.rooms,
        children: props.children,
        adults: props.adults,
        sorting: store.getters.getSorting,
        page: store.getters.getHotelsPage,
      };
      store.dispatch("startSearch", body);
    };
    return {
      nextPageBtn,
      prevPageBtn,
      hotelsPage,
      setHotelsPage,
      sprite,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.chevron {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  opacity: 0.7;
}
.page {
  cursor: pointer;
  margin: 0 2rem 0 2rem;
  color: var(--color-primary-light);
  color: weight;
  font-size: 1.4rem;

  &-main {
    font-size: 2rem;
    color: var(--color-primary-dark);
  }
}
</style>
