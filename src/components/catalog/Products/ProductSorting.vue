<template>
  <div class="catalog-sorting">
    <div class="catalog-sorting__title">Сортировать по:</div>
    <div class="catalog-sorting__values">
      <button-component
        :customClass="getCustomClass(sorting.key)"
        v-for="sorting in sortings"
        :key="sorting.key"
        @click="setSorting(sorting.key)"
        >{{ sorting.name }}</button-component
      >
    </div>
  </div>
</template>

<script>
import ButtonComponent from "../../UI/ButtonComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { ButtonComponent },
  data() {
    return {
      sortings: [
        { name: "Популярности", key: "id" },
        { name: "Рейтингу", key: "rating" },
        { name: "Цене", key: "price" },
      ],
    };
  },
  computed: {},
  methods: {
    getCustomClass(name) {
      return name === this.getSorting()
        ? "catalog-sorting__button catalog-sorting__button--active catalog-sorting__button--asc clear-btn"
        : "catalog-sorting__button clear-btn";
    },
    ...mapGetters({
      getSorting: "getSorting",
    }),
    ...mapActions({
      setSorting: "setSorting",
    }),
  },
};
</script>

<style lang="scss" scoped>
.catalog-sorting {
  display: flex;
  align-items: center;
  gap: 16px;
  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #bdbdbd;
  }
  &__values {
    display: flex;
    gap: 12px;
  }
  &__button {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #333;
    display: flex;
    align-items: center;
    gap: 4px;
    &--active {
      color: #279fb9;
      &::after {
        content: url("../../../assets/img/arrow-sort.svg");
        display: flex;
        width: 16px;
        height: 16px;
      }
    }
    &--desc {
      &::after {
        transform: scale(1, -1);
      }
    }
  }
}
</style>
