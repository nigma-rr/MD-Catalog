<template>
  <div class="products-pagination">
    <button-component
      :customClass="'products-pagination__prev clear-btn'"
      :disabled="offset.nowPos === 0"
      @buttonClick="changePage(offset.nowPos - 1)"
      ><div class="products-pagination__prev-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.80474 13.1381C10.0651 12.8777 10.0651 12.4556 9.80474 12.1952L5.60947 7.99998L9.80474 3.80472C10.0651 3.54437 10.0651 3.12226 9.80474 2.86191C9.54439 2.60156 9.12228 2.60156 8.86193 2.86191L4.66667 7.05717C4.14597 7.57787 4.14597 8.42209 4.66667 8.94279L8.86193 13.1381C9.12228 13.3984 9.54439 13.3984 9.80474 13.1381Z"
            fill="#333333"
          />
        </svg>
      </div>
      <span>Предыдущая</span></button-component
    >
    <div class="products-pagination__wrap">
      <div v-for="(number, index) in pageCount" :key="index">
        <button-component
          type="button"
          :customClass="btnClass(index)"
          @click="changePage(index)"
        >
          {{ number }}</button-component
        >
      </div>
    </div>
    <button-component
      :customClass="'products-pagination__next clear-btn'"
      :disabled="offset.nowPos + 1 === pageCount"
      @buttonClick="changePage(offset.nowPos + 1)"
    >
      <span>Следующая</span>
      <div class="products-pagination__next-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.19526 13.1381C5.93491 12.8777 5.93491 12.4556 6.19526 12.1952L10.3905 7.99998L6.19526 3.80472C5.93491 3.54437 5.93491 3.12226 6.19526 2.86191C6.45561 2.60156 6.87772 2.60156 7.13807 2.86191L11.3333 7.05717C11.854 7.57787 11.854 8.42209 11.3333 8.94279L7.13807 13.1381C6.87772 13.3984 6.45561 13.3984 6.19526 13.1381Z"
            fill="#333333"
          />
        </svg></div
    ></button-component>
  </div>
</template>

<script>
import ButtonComponent from "../../UI/ButtonComponent.vue";
export default {
  components: { ButtonComponent },
  props: {
    pageCount: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
    offset: {
      type: Object,
      default() {
        return { nowPos: 0, value: 10 };
      },
    },
  },
  data() {
    return {
      data: null,
    };
  },
  computed: {},
  methods: {
    btnClass(index) {
      return index === this.offset.nowPos
        ? "products-pagination__btn clear-btn products-pagination__btn--active"
        : "products-pagination__btn clear-btn";
    },
    changePage(nowPos) {
      this.$emit("changePage", {
        nowPos,
        offset: (nowPos + 1) * this.perPage,
      });
    },
  },
};
</script>

<style lang="scss">
.products-pagination {
  margin-top: 32px;
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 8px;
  &__next,
  &__prev {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    color: #333;
    &:disabled {
      opacity: 0.3;
    }
    &-icon {
      display: flex;
    }
  }
  &__wrap {
    display: flex;
    align-items: center;
    gap: 4;
  }
  &__btn {
    border-radius: 7px;
    padding: 4px 10px;
    padding: 4px 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #333;
    &:hover {
      background: #f5f5f5;
    }
    &--active {
      &,
      &:hover {
        color: #fff;
        background: #279fb9;
      }
    }
  }
}
</style>
