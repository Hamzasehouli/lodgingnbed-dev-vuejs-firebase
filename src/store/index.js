import { createStore } from "vuex";
import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations.js";

export default createStore({
  state: {
    selectedCurrency: "MAD",
    currencyDropOpen: false,
    AdultsNum: 2,
    ChildrenNum: 0,
    RoomsNum: 1,
    results: [],
    pending: false,
    hotelsResults: [],
    hotelsPage: 1,
    sorting: "popularity",
    resultsTotalOfHotels: 100,
  },
  mutations,
  actions,
  modules: {},
  getters,
});
