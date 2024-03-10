<template>
  <div class="product-card">
    <div class="product-card__image">
      <img :src="product.image" alt="" />
      <button-component :customClass="'product-card__add-favorite clear-btn'">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9999 21.0001C-5 10.0001 5.99997 1.00006 11.9999 7.00006C17.9999 1.00011 29 10.0001 11.9999 21.0001Z"
            fill="white"
            stroke="#333333"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </button-component>
      <button-component :customClass="'product-card__image-preview clear-btn'"
        >Быстрый просмотр</button-component
      >
    </div>
    <div class="product-card__info">
      <div class="product-card__price">{{ product.price }} ₽</div>
      <div class="product-card__name">
        {{ product.title }}
      </div>
      <div class="product-card__char">
        <div class="product-card__size">{{ product.sizes }}</div>
        <div class="product-card__model">{{ product.manufacturers }}</div>
      </div>
      <div class="product-card__rating">
        <div class="product-card__stars">
          <div
            class="product-card__star"
            :class="{
              'product-card__star--active': index <= activeStarCount,
            }"
            v-for="index in 5"
            :key="index"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41359 1.94604C7.61637 1.39559 8.38347 1.39559 8.58625 1.94604L9.86379 5.41378C9.95176 5.65258 10.1718 5.81488 10.4228 5.82601L14.0669 5.98763C14.6453 6.01328 14.8824 6.75377 14.4293 7.11961L11.5747 9.42442C11.3782 9.58313 11.2941 9.84574 11.3612 10.0914L12.3359 13.659C12.4906 14.2253 11.87 14.683 11.3872 14.3587L8.3454 12.3153C8.13594 12.1746 7.8639 12.1746 7.65443 12.3154L4.61269 14.3586C4.12986 14.683 3.50927 14.2253 3.66398 13.659L4.63863 10.0914C4.70575 9.84574 4.62168 9.58313 4.42511 9.42442L1.57055 7.11961C1.11744 6.75376 1.35449 6.01328 1.93293 5.98763L5.57704 5.82601C5.82799 5.81488 6.04808 5.65258 6.13605 5.41378L7.41359 1.94604Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div class="product-card__count">
          {{ product.rating.count }} отзывов
        </div>
      </div>
      <button-component
        :customClass="'product-card__button product-card__button--has-cart clear-btn'"
        v-if="hasCart"
        >В корзине</button-component
      >
      <button-component v-else :customClass="'product-card__button clear-btn'"
        >В корзину</button-component
      >
    </div>
  </div>
</template>

<script>
import ButtonComponent from "../../UI/ButtonComponent.vue";

export default {
  components: { ButtonComponent },
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      starCount: 5,
      activeStarCount: 4,
      hasCart: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 400ms ease;
  min-height: 405px;
  &__image {
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      object-fit: scale-down;
    }
    &-preview {
      display: none;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      padding: 4px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      font-size: 12px;
      text-align: center;
      color: #333;
    }
  }
  &__star {
    color: #e8e8e8;
    display: flex;
    &--active {
      color: #fed833;
    }
  }
  &__info {
    padding: 8px;
  }
  &__price {
    font-weight: 500;
    font-size: 20px;
    color: #333;
    margin-bottom: 8px;
  }
  &__name {
    font-weight: 400;
    font-size: 12px;
    color: #333;
    margin-bottom: 20px;
  }
  &__char {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  &__size {
    background: #ed7853;
    border-radius: 4px;
    padding: 4px 8px;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: #fff;
  }
  &__stars {
    display: flex;
    margin-bottom: 4px;
  }
  &__count {
    font-weight: 400;
    font-size: 12px;
    color: #bdbdbd;
  }
  &__button {
    display: none;
    margin-top: 8px;
    border-radius: 8px;
    padding: 8px 12px;
    background: #279fb9;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #fff;
    width: 100%;
    &--has-cart {
      background: #ffc020;
      color: #333;
    }
  }
  &__add-favorite {
    display: none;
    position: absolute;
    top: 4px;
    right: 4px;
  }
  &:hover {
    box-shadow: 1px 1px 15px 0 rgba(0, 0, 0, 0.1);
    .product-card__add-favorite,
    .product-card__button,
    .product-card__image-preview {
      display: block;
    }
  }
}
</style>
