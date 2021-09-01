<template>
  <div>
    <teleport to="body"
      ><div v-if="pending" class="pending">
        <img src="../public/logo-1.png" class="pending__cmp" /></div
    ></teleport>
    <the-header></the-header>
    <main>
      <router-view v-slot="selectedProp">
        <transition name="fade">
          <component :is="selectedProp.Component"></component>
        </transition>
      </router-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import TheHeader from "./components/main/TheHeader.vue";
import TheFooter from "./components/main/TheFooter.vue";
// import cities from "./store/cities.js";
import { onMounted, computed } from "vue";
export default {
  components: { TheHeader, TheFooter },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(function () {
      if (
        !window.localStorage.getItem("curr") ||
        route.path.includes("/hotels/")
      )
        return;
      store.dispatch("selectCurrency", window.localStorage.getItem("curr"));
    });
    const pending = computed(function () {
      return store.getters.getPending;
    });
    return { pending };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700&display=swap");

:root {
  --color-primary-light: #b455ff;
  --color-primary: #8f00ff;
  --color-primary-dark: #5f00aa;

  --color-secondary-light: #af5;
  --color-secondary: #7fff00;
  --color-secondary-dark: #5a0;

  --color-black: #2c3539;
  --color-white: #fefefa;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
  color: va(--color-black);
  font-size: 1.6rem;
  position: relative;
}
h1 {
  font-size: 5rem;
}
h2 {
  font-size: 2rem;
}

.active {
  border-top: 2px solid var(--color-secondary);
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-3rem);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.pending {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  &__cmp {
    animation-name: "logo";
    animation-duration: 2s;
    animation-iteration-count: infinite;
    @keyframes logo {
      0% {
        transform: rotateY(360deg);
      }
    }
  }
}
</style>
