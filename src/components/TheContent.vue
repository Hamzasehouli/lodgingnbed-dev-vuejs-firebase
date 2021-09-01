<template>
  <the-section>
    <div>
      <h1>{{ title }}</h1>
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </the-section>
</template>
<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
h1 {
  color: var(--color-primary-dark);
  margin-bottom: 3rem;
  @media only screen and (max-width: 45rem) {
    font-size: 3rem !important;
  }
  @media only screen and (max-width: 25rem) {
    font-size: 2rem !important;
  }
}

.slot {
  width: 70%;
  @media only screen and (max-width: 39rem) {
    width: 90%;
  }
  @media only screen and (max-width: 25rem) {
    width: 100%;
    font-size: 1.6rem;
  }
}
</style>
