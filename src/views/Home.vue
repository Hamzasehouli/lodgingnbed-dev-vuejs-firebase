<template>
  <section class="home-page-section">
    <teleport to="body"
      ><div
        @click="closeInvalidityDrop"
        class="form-validity"
        v-if="formInvalid"
      >
        <div>{{ formInavlidInfo }}</div>
        <button type="button">X</button>
      </div></teleport
    >
    <h1>Find your next stay in more efficient way</h1>

    <form @submit.prevent="startSearch" class="form">
      <div class="form__entry form__entry-search">
        <svg class="form__icon">
          <use href="sprite.svg#icon-search"></use>
        </svg>
        <input
          :value="inputValue"
          @input="cityInput"
          placeholder="e.g Casablanca, Morocco"
          type="text"
          class="form__input form__input-search"
        />
        <div v-if="!closeCities" class="exten search-popup">
          <ul>
            <li
              @click="selectCity(finalResult.city, finalResult.country)"
              :key="finalResult.city"
              v-for="finalResult in finalResults"
            >
              <img :src="'cities-images/' + finalResult.image + '.jpg'" />
              <div>
                <h5>{{ finalResult.city }}, {{ finalResult.country }}</h5>
                <h6>City</h6>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="form__entry form__entry-date">
        <svg class="form__icon">
          <use href="sprite.svg#icon-calendar"></use></svg
        ><input
          :min="today"
          v-model="checkIn"
          class="form__input form__input-date"
          type="date"
        />
        <input
          :min="tomorrow"
          v-model="checkOut"
          class="form__input form__input-date"
          type="date"
        />
      </div>

      <div @click="openRooms" class="form__entry form__entry-room">
        <svg class="form__icon">
          <use href="sprite.svg#icon-user"></use>
        </svg>
        <div class="form__input form__input-span">
          <span
            >{{ adultsNum }} Adults . {{ childrenNum }} children .
            {{ roomsNum }} room</span
          >
        </div>
        <svg class="form__icon form__icon-chevron">
          <use href="sprite.svg#icon-chevron-right"></use>
        </svg>
        <div v-if="roomsOpen" class="exten room-popup">
          <ul>
            <li>
              <span>Adults</span>
              <div>
                <button
                  type="button"
                  :class="{ cancel: adultsNum <= 1 }"
                  @click="decreaseAdultsNum"
                >
                  -</button
                ><span class="numb">{{ adultsNum }}</span
                ><button
                  type="button"
                  :class="{ cancel: adultsNum >= 20 }"
                  @click="increaseAdultsNum"
                >
                  +
                </button>
              </div>
            </li>
            <li>
              <span>Cildren</span>
              <div>
                <button
                  type="button"
                  :class="{ cancel: childrenNum === 0 }"
                  @click="decreaseChildrenNum"
                >
                  -</button
                ><span class="numb">{{ childrenNum }}</span
                ><button
                  type="button"
                  :class="{ cancel: childrenNum >= 10 }"
                  @click="increaseChildrenNum"
                >
                  +
                </button>
              </div>
            </li>
            <li>
              <span>Rooms</span>
              <div>
                <button
                  type="button"
                  :class="{ cancel: roomsNum <= 1 }"
                  @click="decreaseRoomsNum"
                >
                  -</button
                ><span class="numb">{{ roomsNum }}</span
                ><button
                  type="button"
                  :class="{ cancel: roomsNum >= 20 }"
                  @click="increaseRoomsNum"
                >
                  +
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button class="button" type="submit">Search</button>
    </form>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref, computed, watch } from "vue";
export default {
  setup() {
    const store = useStore();
    const roomsOpen = ref(false);
    const finalResults = ref([]);
    const closeCities = ref(true);
    const inputValue = ref("");
    const city = ref("");
    const country = ref("");
    const checkIn = ref("");
    const checkOut = ref("");
    const formInvalid = ref(false);
    const formInavlidInfo = ref("");
    const tomorrow = ref(null);
    // openRooms = function () {
    //   roomsOpen.value = !roomsOpen.value;
    // };
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const dd2 = String(currentDate.getDate()).padStart(2, "0");
    const mm2 = String(currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy2 = currentDate.getFullYear();

    let tomorrowDate = yyyy2 + "-" + mm2 + "-" + dd2;

    onMounted(function () {
      tomorrow.value = tomorrowDate;
      document.querySelector("body").addEventListener("click", (e) => {
        if (e.target.closest(".room-popup")?.classList.contains("room-popup"))
          return;
        if (
          e.target
            .closest(".form__entry-room")
            ?.classList.contains("form__entry-room")
        ) {
          roomsOpen.value = !roomsOpen.value;
        } else {
          roomsOpen.value = false;
        }
      });
      store.dispatch("fetchData");
    });
    const increaseAdultsNum = function () {
      store.dispatch("increaseAdultsNum");
    };
    const decreaseAdultsNum = function () {
      store.dispatch("decreaseAdultsNum");
    };
    const increaseChildrenNum = function () {
      store.dispatch("increaseChildrenNum");
    };
    const decreaseChildrenNum = function () {
      store.dispatch("decreaseChildrenNum");
    };
    const increaseRoomsNum = function () {
      store.dispatch("increaseRoomsNum");
    };
    const decreaseRoomsNum = function () {
      store.dispatch("decreaseRoomsNum");
    };

    const adultsNum = computed(function () {
      return store.getters.getAdultsNum;
    });
    const childrenNum = computed(function () {
      return store.getters.getChildrenNum;
    });
    const roomsNum = computed(function () {
      return store.getters.getRoomsNum;
    });
    const cityInput = async function (event) {
      inputValue.value = event.target.value.trim().toLowerCase();
      if (inputValue.value === "") {
        closeCities.value = true;
        finalResults.value = [];
        city.value = "";
        country.value = "";
        inputValue.value = "";
        return;
      }

      const cities = store.getters.getResults;
      const results = await cities.filter((r) => {
        return r?.city?.trim().toLowerCase().includes(inputValue.value);
      });

      if (results.length === 0) {
        closeCities.value = true;
        finalResults.value = [];
        return;
      }

      this.finalResults = results.slice(0, 5);
      closeCities.value = false;
    };

    const selectCity = function (cityValue, countryValue) {
      city.value = cityValue;
      country.value = countryValue;
      inputValue.value = cityValue + ", " + countryValue;
      closeCities.value = true;
    };
    const startSearch = function () {
      const body = {
        currency: store.getters.getSelectedCurrency,
        city: city.value,
        country: country.value,
        checkInValue: checkIn.value,
        checkOutValue: checkOut.value,
        rooms: store.getters.getRoomsNum * 1,
        children: store.getters.getChildrenNum * 1,
        adults: store.getters.getAdultsNum * 1,
        sorting: store.getters.getSorting,
        page: store.getters.getHotelsPage * 1,
      };

      if (
        !body.currency ||
        !body.city ||
        !body.country ||
        !body.checkInValue ||
        !body.checkOutValue ||
        inputValue.value === ""
      ) {
        formInvalid.value = true;
        formInavlidInfo.value = `${!body.currency ? "Currency" : ""} ${
          !body.city || inputValue.value === "" ? "City, " : ""
        } ${!body.country ? "Country," : ""} ${
          !body.checkOutValue ? "Check out, " : ""
        }${
          !body.checkInValue ? "Check in" : ""
        } missing, please fill the required fields to continue`;
        return;
      }
      store.dispatch("startSearch", body);
    };

    const closeInvalidityDrop = function () {
      formInvalid.value = false;
    };

    watch(checkIn, (a) => {
      let kaka = new Date(a);
      kaka.setDate(kaka.getDate() + 1);
      const dd3 = String(kaka.getDate()).padStart(2, "0");
      const mm3 = String(kaka.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy3 = kaka.getFullYear();

      tomorrow.value = yyyy3 + "-" + mm3 + "-" + dd3;
    });

    return {
      today,
      tomorrow,
      closeInvalidityDrop,
      checkIn,
      checkOut,
      roomsOpen,
      startSearch,
      selectCity,
      closeCities,
      increaseAdultsNum,
      decreaseAdultsNum,
      increaseChildrenNum,
      decreaseChildrenNum,
      increaseRoomsNum,
      decreaseRoomsNum,
      adultsNum,
      childrenNum,
      roomsNum,
      cityInput,
      finalResults,
      inputValue,
      formInvalid,
      formInavlidInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-page-section {
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // background-color: var(--color-primary-dark);
  flex-direction: column;
  color: var(--color-primary-dark);
  height: 80vh;
}
.form {
  display: flex;
  color: var(--color-white);
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary-dark);
  border-radius: 6px;
  padding: 1.5rem;
  height: 10rem;
  min-width: 90%;
  @media only screen and (max-width: 61rem) {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 0;
  }
  @media only screen and (max-width: 25rem) {
    width: 100%;
  }
  .button {
    outline: none;
    border: none;
    background-color: var(--color-secondary);
    cursor: pointer;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    color: black;
    transition: all 0.3s;
    &:hover {
      background-color: var(--color-primary);
      color: white;
    }
  }
  &__entry {
    display: flex;
    align-items: center;
    margin-right: 3rem;
    background-color: white;
    padding: 0.4rem 1rem;
    color: black;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 61rem) {
      width: 100%;
    }
    &-search {
      width: 30%;
      position: relative;
      @media only screen and (max-width: 61rem) {
        width: 100%;
      }
    }

    &-room {
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
      @media only screen and (max-width: 61rem) {
        width: 100% !important;
      }
    }
    &-date {
      @media only screen and (max-width: 61rem) {
        justify-content: center !important;
      }
    }
  }
  &__entry,
  .button {
    height: 4rem;
  }
  &__input {
    height: 100%;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    font-family: inherit;
    &-span {
      @media only screen and (max-width: 61rem) {
        margin-right: auto !important;
      }
    }
    &-search {
      display: block;
      width: 100%;
    }
    &-date {
      cursor: pointer;
    }
  }
  &__icon {
    fill: var(--color-secondary);
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    fill: var(--color-black);
    &-chevron {
      width: 1rem;
      height: 1rem;
      margin-left: 2rem;
      margin-right: 0;
    }
  }
}
h1 {
  margin-bottom: 3rem;
  @media only screen and (max-width: 67.75rem) {
    font-size: 2.5rem;
  }
  @media only screen and (max-width: 33rem) {
    font-size: 2rem;
  }
  @media only screen and (max-width: 26rem) {
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 25rem) {
    font-size: 1.2rem;
  }
}
h2 {
  margin-bottom: 4rem;
}
.form,
.form__entry,
.button {
  border-radius: 5px;
  @media only screen and (max-width: 61rem) {
    border-radius: 0;
    border: 2px solid var(--color-primary-light);
  }
}

.exten {
  font-size: 1.6rem;
  position: absolute;
  width: 150%;
  top: 120%;
  left: -5rem;
  background: var(--color-white);
  padding: 1rem;
  border-radius: 5px;
  cursor: initial;
  box-shadow: 2px 2px 20px rgba(77, 76, 76, 0.205);
  ul {
    list-style: none;
  }
  @media only screen and (max-width: 61rem) {
    width: 70%;
    left: 0;
  }
  @media only screen and (max-width: 21rem) {
    width: 100%;
    left: 0;
  }
}

.room-popup {
  li {
    display: flex;
    justify-content: space-between;
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    background: transparent;
    font-size: 2rem;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    transition: all 0.3s;
    &:hover {
      box-shadow: 2px 2px 20px var(--color-primary);
    }
  }
}
.numb {
  display: inline-block;
  width: 3rem;
  margin: 0 1rem 0 1rem;
  padding: 0.5rem;
}

.cancel {
  cursor: not-allowed !important;
}
.search-popup {
  z-index: 999;
  width: 100%;
  left: 0;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 2px;
    margin-right: 1rem;
  }
}
.form-validity {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.363);
  display: flex;
  justify-content: center;
  align-items: Center;
  div {
    color: white;
    padding: 2rem;
    background-color: orangered;
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 1rem;
    color: white;
    background: var(--color-secondary);
  }
}
</style>
