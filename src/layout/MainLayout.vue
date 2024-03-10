<template>
  <header-component />
  <slot></slot>
  <footer-component />
</template>

<script>
import FooterComponent from "../components/system/FooterComponent.vue";
import HeaderComponent from "../components/system/HeaderComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
};
</script>

<style scoped lang="scss"></style>
