<template>
  <li class="hotel__item">
    <img :src="result.mainPhotoUrl" />
    <div class="details">
      <div class="title-stars">
        <h2>{{ result.hotelName }}</h2>
        <span class="stars"
          ><svg :key="i" v-for="i in result.stars">
            <use :href="path + '#icon-star-full'"></use></svg
        ></span>
      </div>
      <ul class="offers">
        <li v-if="result.isFreeCancellable">
          <svg><use :href="path + '#icon-checkmark'"></use></svg
          >{{ "FREE cancelation" }}
        </li>
        <li v-if="result.isBeachFront">
          <svg><use :href="path + '#icon-checkmark'"></use></svg
          >{{ "BEACH Front" }}
        </li>
        <li v-if="result.isCityCenter">
          <svg><use :href="path + '#icon-checkmark'"></use></svg
          >{{ "CITY Center" }}
        </li>
        <li v-if="result.hotelIncludeBreakfast">
          <svg><use :href="path + '#icon-checkmark'"></use></svg
          >{{ "Breakfast included" }}
        </li>
      </ul>
      <!-- <div class="provider">Booking.com</div> -->
    </div>
    <div class="reviews">
      <div v-if="result.reviewScore" class="reviews-info">
        <div class="reviews-details">
          <h4 class="title-score">ReviewScore</h4>
          <p class="reviews-numb">{{ result.numberOfReviews }} reviews</p>
        </div>
        <span class="score">{{ result.reviewScore }}</span>
      </div>
      <div class="info">
        <span class="nights"
          >{{ Math.ceil(nights) }}
          {{ Math.ceil(nights) > 1 ? "nights" : "night" }}</span
        >
        <span class="adults"
          >{{ adults }} {{ adults > 1 ? "adults" : "adult" }}</span
        >
      </div>
      <div class="price-details">
        <span class="currency">{{ $store.getters.getSelectedCurrency }}</span>
        <span class="price">{{ (result.price * rate).toFixed(2) }}</span>
      </div>
      <a class="link" target="_blank" :href="result.url"
        >See the availability</a
      >
    </div>
  </li>
</template>

<script>
import { computed } from "vue";
// import { useStore } from "vuex";
import sprite from "../../public/sprite.svg";
export default {
  props: ["result", "adults", "checkIn", "checkOut", "nights", "rate"],
  setup() {
    const path = computed(function () {
      return sprite;
    });

    return { path };
  },
};
</script>
<style lang="scss" scoped>
.hotel {
  &__item {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    border: 2px solid rgba(112, 112, 112, 0.24);
    box-shadow: 2px 2px 20px rgba(112, 112, 112, 0.24);
    margin-bottom: 2rem;
    border-radius: 5px;
    & > * {
      &:not(:last-child) {
        margin-right: 2em;
      }
    }
    img {
      display: block;
      width: 20rem;
      height: 20rem;
      object-fit: cover;
      border-radius: 5px;
      @media only screen and (max-width: 41rem) {
        width: 100%;
        height: 100%;
        border-radius: 0;
        margin-bottom: 2rem;
      }
    }
    @media only screen and (max-width: 41rem) {
      flex-direction: column;
      // align-items: flex-start;
    }
  }
}
.details {
  flex: 1;
}
h2 {
  font-size: 2rem;

  margin-right: 1rem;
}
h2,
h4 {
  color: var(--color-primary) !important;
}

.title-stars {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  @media only screen and (max-width: 47rem) {
    flex-direction: column;
    align-items: flex-start;
  }
  svg {
    width: 1.4rem;
    height: 1.4rem;
    fill: rgb(255, 230, 0);
  }
}
.offers {
  list-style: none;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  svg {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.5rem;
  }
}
.stars {
  display: flex;
}
.reviews-info {
  display: flex;
  align-items: flex-start;
}

.reviews-details {
  margin-right: 1rem;
  margin-bottom: 2rem;
}

.score {
  background-color: var(--color-primary-dark);
  color: var(--color-white);
  padding: 0.5rem;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
}

.price {
  color: orangered;
  font-size: 2rem;
  font-weight: 700;
}

.currency {
  margin-right: 0.5rem;
}
.reviews-numb,
.info {
  font-size: 1.2rem;
  opacity: 0.9;
}
.info {
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

.link {
  display: block;
  text-decoration: none;
  margin-top: 1.5rem;
  border-radius: 5px;
  background-color: var(--color-primary-dark);
  color: var(--color-white);
  padding: 1rem;
  transition: all 0.3s;
  @media only screen and (max-width: 43rem) {
    font-size: 1.2rem;
    padding: 0.4rem;
    text-align: center;
  }

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
