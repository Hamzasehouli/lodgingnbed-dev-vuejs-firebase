<template>
  <div class="sorting">
    <button
      @click="setSorting('popularity')"
      :class="{ 'active-btn': sortingValue === 'popularity' }"
      class="sorting-btn"
    >
      Popularity</button
    ><button
      @click="setSorting('class_descending')"
      :class="{ 'active-btn': sortingValue === 'class_descending' }"
      class="sorting-btn"
    >
      Stars</button
    ><button
      @click="setSorting('price')"
      :class="{ 'active-btn': sortingValue === 'price' }"
      class="sorting-btn"
    >
      Price</button
    ><button
      @click="setSorting('distance')"
      :class="{ 'active-btn': sortingValue === 'distance' }"
      class="sorting-btn"
    >
      Distance</button
    ><button
      @click="setSorting('review_score')"
      :class="{ 'active-btn': sortingValue === 'review_score' }"
      class="sorting-btn"
    >
      Reviews Score
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

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
    const sortingValue = computed(function () {
      return store.getters.getSorting;
    });

    const setSorting = function (type) {
      store.dispatch("setSorting", type);
      store.dispatch("setHotelsPage", 1);
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: props.city,
        country: props.country,
        checkInValue: props.checkIn,
        checkOutValue: props.checkOut,
        rooms: props.rooms,
        children: props.children,
        adults: props.adults,
        sorting: type,
        page: store.getters.getHotelsPage,
      };
      store.dispatch("startSearch", body);
    };

    return { sortingValue, setSorting };
  },
};
</script>

<style lang="scss" scoped>
.sorting {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;

  @media only screen and (max-width: 30rem) {
    height: 100%;
  }

  @media only screen and (max-width: 26rem) {
    flex-direction: column;
    align-items: stretch;
  }
  &-btn {
    outline: center;
    border: none;
    height: 100%;
    border: 2px solid var(--color-primary);
    background-color: transparent;
    transition: all 0.3s;
    cursor: pointer;
    color: var(--color-primary);
    padding: 1rem;
    margin-right: 2rem;
    @media only screen and (max-width: 30rem) {
      padding: 0.5rem;
      margin-right: 0.7rem;
    }
    @media only screen and (max-width: 26rem) {
      margin-bottom: 1rem;
    }
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
}

.active-btn {
  background-color: var(--color-primary);
  color: var(--color-white);
}
</style>
