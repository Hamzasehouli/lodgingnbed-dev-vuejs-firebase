<template>
  <nav class="nav">
    <router-link class="logo__link" to="/"
      ><img class="logo" src="../../../public/logo.png"
    /></router-link>
    <ul class="nav__btns">
      <li class="nav__item">
        <button class="nav__btn" type="button">EN</button>
        <button class="nav__btn" @click="openDrop" type="button">
          {{ getSelectedCurrency }}
        </button>
        <the-currency></the-currency>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed, watch } from "vue";
import useOpenDrop from "../../mixins/openDrop.js";
import TheCurrency from "./TheCurrency.vue";
export default {
  components: { TheCurrency },
  setup() {
    const store = useStore();

    const openDrop = function (event) {
      useOpenDrop(event, store);
    };
    const getSelectedCurrency = computed(function () {
      return store.getters.getSelectedCurrency;
    });
    watch(getSelectedCurrency, async () => {
      store.dispatch("setPending", true);

      store.dispatch("setPending", false);
    });
    return { openDrop, getSelectedCurrency };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.11);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  @media only screen and (max-width: 21rem) {
    flex-direction: column;
  }
}

.logo {
  width: 15rem;
  height: 5rem;
  object-fit: cover;
  cursor: pointer;
  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 21rem) {
      margin-bottom: 2rem;
    }
  }
}

.nav {
  &__btns {
    list-style: none;
  }
}

button {
  outline: none;
  padding: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  transition: all 0.3s;
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
  &:hover {
    background-color: var(--color-primary-dark);
    border: 2px solid var(--color-primary-dark);
    color: var(--color-secondary-light);
  }
}
.active {
  border: none;
}
</style>
