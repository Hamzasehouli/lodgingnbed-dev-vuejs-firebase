export default {
  getDropState(state) {
    return state.currencyDropOpen;
  },
  getSelectedCurrency(state) {
    return state.selectedCurrency;
  },
  getAdultsNum(state) {
    return state.AdultsNum;
  },

  getChildrenNum(state) {
    return state.ChildrenNum;
  },

  getRoomsNum(state) {
    return state.RoomsNum;
  },
  getResults(state) {
    return state.results;
  },
  getPending(state) {
    return state.pending;
  },
  getHotelsResults(state) {
    return state.hotelsResults;
  },
  getHotelsPage(state) {
    return state.hotelsPage;
  },
  getSorting(state) {
    return state.sorting;
  },
  getResultsTotalOfHotels(state) {
    return state.resultsTotalOfHotels;
  },
};
