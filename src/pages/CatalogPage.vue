<template>
  <main-layout>
    <section class="catalog">
      <div class="container">
        <div class="catalog__row">
          <div class="catalog__col">
            <products-filter
              @clearOffset="changePage({ nowPos: 0, offset: null })"
            />
          </div>
          <div class="catalog__col">
            <div class="catalog__col-wrap">
              <product-sorting />
              <products-view @changeSize="changeSize($event)" />
            </div>
            <products-list
              :gridSize="productGridSize"
              :offset="{ nowPos: nowPos, value: getOffset }"
            />
            <products-pagination
              :pageCount="getPageCount"
              :perPage="+getProductsLimit()"
              @changePage="changePage"
              :offset="{ nowPos: nowPos, value: getOffset }"
            />
          </div>
        </div>
      </div>
    </section>
  </main-layout>
</template>
<script>
import MainLayout from "../layout/MainLayout.vue";
import ProductsFilter from "../components/catalog/Products/ProductsFilter.vue";
import ProductsList from "../components/catalog/Products/ProductsList.vue";
import ProductSorting from "../components/catalog/Products/ProductSorting.vue";
import ProductsView from "../components/catalog/Products/ProductsView.vue";
import ProductsPagination from "../components/catalog/Products/ProductsPagination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    MainLayout,
    ProductsFilter,
    ProductsList,
    ProductSorting,
    ProductsView,
    ProductsPagination,
  },
  data() {
    return {
      productGridSize: true,
      nowPos: 0,
      offset: null,
    };
  },
  computed: {
    getOffset() {
      return this.offset ? this.offset : +this.getProductsLimit();
    },
    getPageCount() {
      return +this.getProductsLimit() < this.getProductsFilteredLength()
        ? Math.ceil(this.getProductsFilteredLength() / +this.getProductsLimit())
        : 1;
    },
  },
  methods: {
    changeSize(param) {
      this.productGridSize = param;
    },
    changePage(value) {
      this.nowPos = value.nowPos;
      this.offset = value.offset;
    },
    ...mapGetters({
      getProductsFilteredLength: "getProductsFilteredLength",
      getProductsLimit: "getProductsLimit",
    }),
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  &__row {
    display: flex;
    column-gap: 32px;
  }
  &__col {
    &:nth-child(1) {
      padding: 16px;
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    &-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      margin-bottom: 32px;
    }
  }
}
</style>
