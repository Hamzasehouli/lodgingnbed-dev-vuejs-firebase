<template>
  <teleport to="body"
    ><transition
      ><div v-if="getDropState" @click="openDrop" class="drop">
        <div class="currency">
          <div class="title">
            <h3>select currency</h3>
            <span class="close">X</span>
          </div>
          <ul class="currency__list">
            <li
              :class="{ selected: getSelectedCurrency === 'USD' }"
              class="currency__item"
            >
              <span class="symbol">USD</span>
              <span class="curr">US Dollar</span>
            </li>
            <li
              :class="{ selected: getSelectedCurrency === 'EUR' }"
              class="currency__item"
            >
              <span class="symbol">EUR</span>
              <span class="curr">Euro</span>
            </li>
            <li
              :class="{ selected: getSelectedCurrency === 'GBP' }"
              class="currency__item"
            >
              <span class="symbol">GBP</span>
              <span class="curr">British pounds</span>
            </li>
            <li
              :class="{ selected: getSelectedCurrency === 'MAD' }"
              class="currency__item"
            >
              <span class="symbol">MAD</span>
              <span class="curr">Moroccan dirham</span>
            </li>
          </ul>
        </div>
      </div></transition
    ></teleport
  >
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import useOpenDrop from "../../mixins/openDrop.js";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const openDrop = function (event) {
      useOpenDrop(event, store, route);
    };

    const getDropState = computed(function () {
      return store.getters.getDropState;
    });
    const getSelectedCurrency = computed(function () {
      return store.getters.getSelectedCurrency;
    });

    return { openDrop, getDropState, getSelectedCurrency };
  },
};
</script>

<style lang="scss" scoped>
.drop {
  z-index: 9999;
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.349);
}
.currency {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 60%;
  padding: 2rem;
  border-radius: 5px;
  @media only screen and (max-width: 24rem) {
    width: 80%;
  }

  &__list {
    list-style: none;
  }
  &__item {
    cursor: pointer;

    display: flex;
    // background-color: var(--color-primary-light);
    padding: 1rem 0.5rem;
    border-radius: 5px;
  }
}

.title {
  color: var(--color-primary-dark);
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.close {
  cursor: pointer;
  font-weight: 700;
  &:hover {
    color: var(--color-secondary-dark);
  }
}

.symbol {
  font-weight: 700;
  margin-right: 0.7rem;
}
.selected {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
