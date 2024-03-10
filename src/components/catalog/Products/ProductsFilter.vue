<template>
  <div class="catalog-filter">
    <div class="catalog-filter__categories">
      <div class="catalog-filter__title">Категории</div>
      <ul class="catalog-filter__categories-list">
        <li
          class="catalog-filter__categories-item"
          :class="{
            'catalog-filter__categories-item--active':
              getFilters().category === category,
          }"
          v-for="category in getCategories()"
          :key="category"
          @click="setCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>
    <div class="catalog-filter__list">
      <accordion-component
        :title="'Производитель'"
        :customClass="'catalog-filter__item'"
      >
        <search-input
          :customClass="'catalog-filter__search'"
          @onInputSearch="onInputSearch($event, 'manufacturers')" />
        <checkbox-group
          :checkboxData="getFilteredFakeData('manufacturers')"
          :customWrapClass="'catalog-filter__checkbox-list'"
          :customClass="'catalog-filter__checkbox-item'"
          :checkedValues="getFilters().fakedFilter.manufacturers"
          @changeCheckedValues="changeCheckedValues($event, 'manufacturers')"
        ></checkbox-group
      ></accordion-component>
      <accordion-component
        :title="'Масштаб'"
        :customClass="'catalog-filter__item'"
      >
        <search-input
          :customClass="'catalog-filter__search'"
          @onInputSearch="onInputSearch($event, 'sizes')" />
        <checkbox-group
          :checkboxData="getFilteredFakeData('sizes')"
          :customWrapClass="'catalog-filter__checkbox-list'"
          :customClass="'catalog-filter__checkbox-item'"
          :checkedValues="getFilters().fakedFilter.sizes"
          @changeCheckedValues="changeCheckedValues($event, 'sizes')"
        ></checkbox-group
      ></accordion-component>
      <accordion-component :title="'Цена'" :customClass="'catalog-filter__item'"
        ><range-input
          :minValue="getFilters().price.min"
          :maxValue="getFilters().price.max"
          :min="0"
          :max="1000"
          @changeRange="changeRange($event)"
      /></accordion-component>
      <switch-component :class="'catalog-filter__switcher'"
        >Только товары в наличии</switch-component
      >
      <div class="catalog-filter__select">
        <div class="catalog-filter__select-text">Показывать на странице</div>
        <select-component
          :selectItems="selectItems"
          @changeSelect="changeItems($event)"
          :value="getProductsLimit()"
        ></select-component>
      </div>
      <button-component
        :class="'catalog-filter__reset-btn clear-btn'"
        @click="cleanFilters()"
        >Сбросить товары</button-component
      >
      <button-component :class="'catalog-filter__save-btn clear-btn'"
        ><span>Сохранить подборку</span>
        <div class="catalog-filter__save-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00012 14C-3.33317 6.66668 4.00014 0.666669 8.00012 4.66667C12.0001 0.666698 19.3335 6.66671 8.00012 14Z"
              fill="white"
            />
            <path
              d="M8.04846 13.947C-3.28483 6.61366 4.04848 0.613648 8.04846 4.61365C12.0484 0.613677 19.3818 6.61369 8.04846 13.947Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.0484 13.3493C5.42317 11.6089 3.90669 9.97781 3.14259 8.5911C2.35593 7.16346 2.37746 6.02392 2.74949 5.24605C3.48653 3.70494 5.88604 3.15839 7.69484 4.9672C7.78861 5.06097 7.91579 5.11365 8.0484 5.11365C8.18101 5.11365 8.30818 5.06097 8.40195 4.9672C10.2107 3.15841 12.6103 3.70496 13.3473 5.24607C13.7194 6.02395 13.7409 7.16348 12.9542 8.59111C12.1901 9.97782 10.6736 11.6089 8.0484 13.3493ZM8.0484 3.93672C5.87369 2.12159 2.88608 2.64271 1.84735 4.81459C1.30271 5.95338 1.36591 7.43885 2.26675 9.0737C3.16416 10.7023 4.903 12.5073 7.77677 14.3668C7.94206 14.4737 8.15473 14.4737 8.32002 14.3668C11.1938 12.5073 12.9327 10.7024 13.8301 9.07372C14.7309 7.43887 14.7941 5.9534 14.2495 4.81461C13.2107 2.64273 10.2231 2.1216 8.0484 3.93672Z"
              fill="#333333"
            />
          </svg>
        </div>
      </button-component>
    </div>
  </div>
</template>

<script>
import SearchInput from "../../UI/SearchInput.vue";
import AccordionComponent from "../../UI/AccordionComponent.vue";
import CheckboxGroup from "../../UI/CheckboxGroup.vue";
import RangeInput from "../../UI/RangeInput.vue";
import SwitchComponent from "../../UI/SwitchComponent.vue";
import SelectComponent from "../../UI/SelectComponent.vue";
import ButtonComponent from "../../UI/ButtonComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SearchInput,
    AccordionComponent,
    CheckboxGroup,
    RangeInput,
    SwitchComponent,
    SelectComponent,
    ButtonComponent,
  },
  inject: ["api"],
  data() {
    return {
      selectItems: [
        { value: "5", title: "5 товаров" },
        { value: "10", title: "10 товаров" },
        { value: "15", title: "15 товаров" },
        { value: "20", title: "20 товаров" },
      ],
    };
  },
  computed: {
    getCheckboxData() {
      return getFakeData();
    },
  },
  beforeMount() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      let response = await this.api.products.getCategories(
        "/products/categories"
      );
      this.setCategories(response.data);
    },
    getFilteredFakeData(key) {
      const searchFilter = this.getFilters().searchInputs;
      let fakeData = this.getFakeData();
      if (searchFilter[key]) {
        return fakeData[key].filter((manufacturers) =>
          manufacturers.value
            .toLocaleLowerCase()
            .includes(searchFilter[key].toLocaleLowerCase())
        );
      }
      return fakeData[key];
    },
    setCategory(name) {
      this.setCategoryFilter(name);
      this.$emit("clearOffset");
    },
    onInputSearch(value, key) {
      this.setSearchInputs({ key, value });
      this.$emit("clearOffset");
    },
    changeRange(val) {
      this.setPrice(val);
      this.$emit("clearOffset");
    },
    changeItems(val) {
      this.setProductsLimit(val);
      this.$emit("clearOffset");
    },
    changeCheckedValues(payload, key) {
      let getFilter = this.getFilters().fakedFilter;
      if (payload.checkboxStatus) {
        payload.pushValue(getFilter[key]);
      } else {
        getFilter[key] = payload.deleteValue(getFilter[key]);
      }
      this.setFakedFilter({ key, value: getFilter[key] });
      this.$emit("clearOffset");
    },
    ...mapGetters({
      getCategories: "getCategories",
      getFilters: "getFilters",
      getManufacturers: "getManufacturers",
      getProductsLimit: "getProductsLimit",
      getFakeData: "getFakeData",
    }),
    ...mapActions({
      setProducts: "setProducts",
      setCategories: "setCategories",
      setCategoryFilter: "setCategoryFilter",
      setFakedFilter: "setFakedFilter",
      setFakeData: "setFakeData",
      setPrice: "setPrice",
      setProductsLimit: "setProductsLimit",
      setSearchInputs: "setSearchInputs",
      cleanFilters: "cleanFilters",
    }),
  },
};
</script>

<style lang="scss">
.catalog-filter {
  width: 100%;
  max-width: 208px;
  &__reset-btn {
    border: 2px solid #bdbdbd;
    border-radius: 9px;
    padding: 8px 16px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #333;
  }
  &__save-btn {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
  &__save-icon {
    display: flex;
  }
  &__select {
    &-text {
      font-weight: 400;
      font-size: 12px;
      color: #757575;
      margin-bottom: 4px;
    }
  }
  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #333;
    margin-bottom: 16px;
  }
  &__categories {
    margin-bottom: 16px;
    &-list {
      display: flex;
      flex-direction: column;
    }
  }
  &__categories-item {
    padding: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: #333;
    cursor: pointer;
    &--active {
      color: #39b6d1;
    }
    &:first-letter {
      text-transform: uppercase;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__search,
  &__search::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: #bdbdbd;
  }
  &__search {
    padding: 8px 12px;
    color: #333;
    border: 1px solid #e0e0e0;
    border-radius: 9px;
    margin-bottom: 8px;
  }
  &__checkbox {
    &-list {
      display: flex;
      gap: 4px;
      flex-direction: column;
    }
    &-item {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  &__switcher {
    margin-top: 16px;
  }
}
</style>
