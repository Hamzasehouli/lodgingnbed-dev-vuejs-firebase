export default function (event, store, route) {
  if (
    event.target.classList.contains("nav__btn") ||
    event.target.classList.contains("drop") ||
    event.target.classList.contains("close")
  )
    store.dispatch("openCloseDrop");
  if (
    event.target.classList.contains("symbol") ||
    event.target.classList.contains("curr") ||
    event.target.classList.contains("currency__item")
  ) {
    const body = {
      city: route.params.city,
      country: route.params.country,
      checkInValue: route.params.checkIn,
      checkOutValue: route.params.checkOut,
      rooms: route.params.rooms * 1,
      children: route.params.children * 1,
      adults: route.params.adults * 1,
      sorting: store.getters.getSorting,
      page: store.getters.getHotelsPage * 1,
    };
    const symbol = event.target
      .closest(".currency__item")
      .querySelector(".symbol").textContent;
    store.dispatch("selectCurrency", symbol);
    store.dispatch("openCloseDrop");
    if (!route.path.includes("/hotels/")) return;
    body.currency = symbol;
    store.dispatch("setHotelsPage", 1);
    store.dispatch("setSorting", "popularity");

    store.dispatch("startSearch", body);
  }
}
