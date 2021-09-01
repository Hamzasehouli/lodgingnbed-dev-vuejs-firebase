import router from "../router/index.js";

// import store from "./index.js";
// import cities from "./cities.js";
export default {
  async fetchData(context) {
    // fetch(
    //   "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/cities.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(cities),
    //   }
    // );
    try {
      const res = await fetch(
        "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/cities.json"
      );
      const [data] = Object.entries(await res.json());

      const results = data[1];
      // const results = await cities.filter((r) => {
      //   return r.city.trim().toLowerCase().includes(inputValue.value);
      // });

      // if (results.length === 0) {
      //   closeCities.value = true;
      //   finalResults.value = [];
      //   return;
      // }

      context.commit("fetchData", results);

      // this.finalResults = results.slice(0, 5);
      // console.log(this.finalResults);
      // closeCities.value = false;
    } catch (err) {
      console.log(err);
    }
  },
  openCloseDrop(context) {
    context.commit("openCloseDrop");
  },
  selectCurrency(context, payload) {
    window.localStorage.setItem("curr", payload ? payload : "USD");
    context.commit("selectCurrency", payload);
  },
  increaseAdultsNum(context) {
    context.commit("increaseAdultsNum");
  },
  decreaseAdultsNum(context) {
    context.commit("decreaseAdultsNum");
  },
  increaseChildrenNum(context) {
    context.commit("increaseChildrenNum");
  },
  decreaseChildrenNum(context) {
    context.commit("decreaseChildrenNum");
  },
  increaseRoomsNum(context) {
    context.commit("increaseRoomsNum");
  },
  decreaseRoomsNum(context) {
    context.commit("decreaseRoomsNum");
  },
  async startSearch(_, payload) {
    try {
      // context.commit("setPending", true);
      // const res = await fetch(
      //   `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${payload.city}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-rapidapi-host": "booking-com.p.rapidapi.com",
      //       "x-rapidapi-key":
      //         "d3b846acc2msh7a6afa7fdece52ep17db13jsn7fa8dd59f772",
      //     },
      //   }
      // );

      // const data = await res.json();
      // const destId = data.find(
      //   (d) => d.city_name === payload.city && d.country === "Morocco"
      // ).dest_id;
      // console.log(destId);
      // const res1 = await fetch(
      //   `https://booking-com.p.rapidapi.com/v1/hotels/search?units=metric&order_by=popularity&checkin_date=${
      //     payload.checkInValue
      //   }&filter_by_currency=${payload.currency}&adults_number=${
      //     payload.adults
      //   }&checkout_date=${
      //     payload.checkOutValue
      //   }&dest_id=${destId}&locale=en-gb&dest_type=city&room_number=${
      //     payload.rooms
      //   }${
      //     payload.children === 0 ? "" : `&children_number=${payload.children}`
      //   }`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-rapidapi-host": "booking-com.p.rapidapi.com",
      //       "x-rapidapi-key":
      //         "d3b846acc2msh7a6afa7fdece52ep17db13jsn7fa8dd59f772",
      //     },
      //   }
      // );

      // const data2 = await res1.json();
      // console.log(data2);

      // const hotelsResults = data2.result.map((r) => {
      //   return {
      //     hotelName: r.hotel_name,
      //     stars: r.class,
      //     numberOfResults: data2.count,
      //     reviewScore: r.review_score,
      //     numberOfReviews: r.review_nr,
      //     price: r.min_total_price,
      //     currency: r.currency_code,
      //     url: r.url,
      //     mainPhotoUrl: r.main_photo_url,
      //     isFreeCancellable: r.is_free_cancellable,
      //     isCityCenter: r.is_city_center,
      //     isBeachFront: r.is_beach_front,
      //     hotelIncludeBreakFast: r.hotel_include_breakfast,
      //   };
      // });
      // console.log(hotelsResults);
      // store.dispatch("addResults", hotelsResults);
      // const res3 = await fetch(
      //   "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/results.json",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     body: JSON.stringify(hotelsResults),
      //   }
      // );
      // console.log(res3);
      // const data3 = await res3.json();
      // console.log(data3);
      this.dispatch("setPending", true);

      router.replace({
        name: "Hotels",
        params: {
          city: payload.city,
          country: payload.country,
          checkIn: payload.checkInValue,
          checkOut: payload.checkOutValue,
          rooms: payload.rooms,
          adults: payload.adults,
          children: payload.children,
          sorting: payload.sorting,
          page: payload.page,
          currency: payload.currency,
        },
      });
      // context.commit("setPending", false);

      // context.commit("startSearch");
      // const res = await fetch(
      //   "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/results.json"
      // );
      // const [data] = Object.entries(await res.json());

      // console.log(data[1]);
      // context.commit("addResults", data[1]);
      // console.log(store);
    } catch (err) {
      console.log(err);
    }
  },
  setPending(context, payload) {
    context.commit("setPending", payload);
  },
  setNextHotelsPage(context) {
    context.commit("setNextHotelsPage");
  },
  setPrevHotelsPage(context) {
    context.commit("setPrevHotelsPage");
  },
  setHotelsPage(context, payload) {
    if (Number(payload) <= 0) return;
    context.commit("setHotelsPage", payload);
  },

  setSorting(context, payload) {
    context.commit("setSorting", payload);
  },
  setResultsTotalOfHotels(context, num) {
    context.commit("setResultsTotalOfHotels", num);
  },
  async fetchResults(_, payload) {
    this.dispatch("setPending", true);

    const res = await fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${payload.city}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key":
            "c723a89b2dmsh75a183e8e9aa3e2p1dfc0fjsn840bf6b9f23b",
        },
      }
    );

    const data = await res.json();
    const destId = data.find(
      (d) => d.city_name === payload.city && d.country === "Morocco"
    ).dest_id;

    //////////////////////////////

    const res1 = await fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/search?units=metric&order_by=${
        payload.sorting
      }&checkin_date=${payload.checkIn}&filter_by_currency=${
        payload.currency
      }&adults_number=${payload.adults}&checkout_date=${
        payload.checkOut
      }&dest_id=${destId}&locale=en-gb&dest_type=city&room_number=${
        payload.rooms
      }&page_number=${payload.page}${
        payload.children === 0 ? "" : `&children_number=${payload.children}`
      }`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key":
            "c723a89b2dmsh75a183e8e9aa3e2p1dfc0fjsn840bf6b9f23b",
        },
      }
    );

    const data2 = await res1.json();

    const hotelsResults = data2.result.map((r) => {
      return {
        hotelName: r.hotel_name,
        stars: r.class,
        numberOfResults: data2.count,
        reviewScore: r.review_score,
        numberOfReviews: r.review_nr,
        price: r.min_total_price,
        currency: r.currency_code,
        url: r.url,
        mainPhotoUrl: r.max_photo_url,
        isFreeCancellable: r.is_free_cancellable,
        isCityCenter: r.is_city_center,
        isBeachFront: r.is_beach_front,
        hotelIncludeBreakFast: r.hotel_include_breakfast,
      };
    });

    // const res = await fetch(
    //   "https://lodgingnbed-default-rtdb.europe-west1.firebasedatabase.app/results.json"
    // );
    // const [data] = Object.entries(await res.json());

    // const results = data[1];
    const results = hotelsResults;
    const count = results[0]?.numberOfResults;
    // console.log(payload);

    // await this.dispatch("setResultsTotalOfHotels", Math.ceil(kaka));
    // this.dispatch("setPending", false);
    return { count, results };
  },
};
