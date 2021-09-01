import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index.js";
import store from "./store/index.js";
import TheSection from "./components/TheSection.vue";
import TheContent from "./components/TheContent.vue";

const app = createApp(App);
app.component("the-section", TheSection);
app.component("the-content", TheContent);
app.use(store);
app.use(router);

router
  .isReady()
  .then(() => app.mount("#app"))
  .catch((err) => {
    console.log(err);
  });
