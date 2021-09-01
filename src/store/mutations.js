export default {
  openCloseDrop(state) {
    state.currencyDropOpen = !state.currencyDropOpen;
  },
  selectCurrency(state, payload) {
    state.selectedCurrency = payload;
  },
  increaseAdultsNum(state) {
    if (state.AdultsNum >= 20) return;
    ++state.AdultsNum;
  },
  decreaseAdultsNum(state) {
    if (state.AdultsNum <= 1) return;
    --state.AdultsNum;
  },
  increaseChildrenNum(state) {
    if (state.ChildrenNum >= 10) return;
    ++state.ChildrenNum;
  },
  decreaseChildrenNum(state) {
    if (state.ChildrenNum <= 0) return;
    --state.ChildrenNum;
  },
  increaseRoomsNum(state) {
    if (state.RoomsNum >= 20) return;
    ++state.RoomsNum;
  },
  decreaseRoomsNum(state) {
    if (state.RoomsNum <= 1) return;
    --state.RoomsNum;
  },
  fetchData(state, payload) {
    state.results = payload;
  },
  setPending(state, bool) {
    state.pending = bool;
  },
  addResults(state, payload) {
    state.hotelsResults = payload;
  },
  setNextHotelsPage(state) {
    ++state.hotelsPage;
  },
  setPrevHotelsPage(state) {
    if (state.hotelsPage === 0) {
      state.hotelsPage = 1;
      return;
    }
    --state.hotelsPage;
  },
  setHotelsPage(state, payload) {
    state.hotelsPage = payload;
  },
  setSorting(state, payload) {
    state.sorting = payload;
  },
  setResultsTotalOfHotels(state, num) {
    state.resultsTotalOfHotels = num;
  },
};
