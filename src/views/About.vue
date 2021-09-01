<template>
  <the-content :title="title"
    ><p>
      LodgingNbed is a hotel searching platfrom, helps users find the most
      fairly priced accomodations and stays worldwide. Working with the most
      prominent providers such as Booking.com , Hotels.com, and Expedia,
      LodgingNbed represents a franky resource for travel and trips seekers and
      lovers. Our duty and responsibility is helping you getting what you are
      looking for based upon you pereference. Why LodgingNbed? Easy to browse ,
      no page reload, fast, performant and we care a lot about user experience
      by updating consistently our UI/UX that fit the market needs.
    </p></the-content
  >
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const title = ref("About LodgingNbed SARL");
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  line-height: 160%;
}
</style>
