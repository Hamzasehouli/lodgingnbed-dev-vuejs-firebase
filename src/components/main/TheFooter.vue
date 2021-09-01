<template>
  <footer class="footer">
    <div class="author">
      <span>Made by</span>
      <a target="_blank" href="http://hamzasehouli.ma">Hamza Sehouli</a>
      <img src="../../../public/ceo.jpg" alt="hamza sehouli photo" />
    </div>
    <ul class="footer__list">
      <li class="footer__item"><router-link to="/about">About</router-link></li>
      <li class="footer__item">
        <router-link to="/policy">Privacy Policy</router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer,
.footer__list {
  display: flex;
  align-items: center;
}
.footer {
  background-color: var(--color-primary-dark);

  padding: 3rem;
  color: var(--color-primary-light);
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 33rem) {
    flex-direction: column;
  }
  @media only screen and (max-width: 23rem) {
    font-size: 1.2rem !important;
    padding: 1rem;
  }
  &__list {
    list-style: none;
    justify-content: center;
  }
  &__item {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
  a {
    text-decoration: none;
    color: var(--color-secondary-light);
    position: relative;

    &::after {
      content: "";

      position: absolute;
      bottom: -0.4rem;
      left: 0;
      transform: scaleX(0);
      height: 2px;
      width: 100%;
      background-color: var(--color-secondary-light);
      transform-origin: center;
      transition: all 0.3s;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 26rem) {
    width: 100%;
    justify-content: space-between;
  }

  & > * {
    &:not(:last-child) {
      margin-right: 2rem;
    }
    display: block;
  }
  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    border: 2px solid var(--color-secondary-light);
    padding: 0.2rem;
  }
}
</style>
