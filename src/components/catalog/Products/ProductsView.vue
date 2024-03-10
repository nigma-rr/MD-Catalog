<template>
  <div class="products-view">
    <button-component
      :customClass="'products-view__btn clear-btn'"
      :class="{ 'products-view__btn--active': fullSize }"
      @click="changeSize(true)"
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="9.35291"
          y="3"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="15.7059"
          y="3"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="3"
          y="9.34998"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="9.35291"
          y="9.34998"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="15.7059"
          y="9.34998"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="3"
          y="15.7"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="9.35291"
          y="15.7"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
        <rect
          x="15.7059"
          y="15.7"
          width="5.29412"
          height="5.29"
          rx="1"
          fill="currentColor"
        />
      </svg>
    </button-component>
    <button-component
      :customClass="'products-view__btn clear-btn'"
      :class="{ 'products-view__btn--active': !fullSize }"
      @click="changeSize(false)"
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
      </svg>
    </button-component>
  </div>
</template>

<script>
import ButtonComponent from "../../UI/ButtonComponent.vue";

export default {
  components: { ButtonComponent },
  data() {
    return {
      fullSize: true,
    };
  },
  methods: {
    changeSize(param) {
      this.fullSize = param;
      this.$emit("changeSize", param);
    },
  },
};
</script>

<style lang="scss" scoped>
.products-view {
  display: flex;
  gap: 8px;
  &__btn {
    display: flex;
    color: #e0e0e0;
    &--active {
      color: #279fb9;
    }
  }
}
</style>
