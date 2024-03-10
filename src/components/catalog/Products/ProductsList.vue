<template>
  <div
    class="products-list"
    :class="{ 'products-list--full': gridSize }"
    v-if="getFilteredProducts().length > 0"
  >
    <product-card
      v-for="product in getFilteredProducts()"
      :key="product"
      :product="product"
    />
  </div>
  <div v-else>Не найдено</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  components: { ProductCard },
  inject: ["api"],
  props: {
    gridSize: {
      type: Boolean,
    },
    offset: {
      tyoe: Object,
    },
  },
  data() {
    return { fakeKeys: ["manufacturers", "sizes"] };
  },
  beforeMount() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      let response = await this.api.products.getProducts("/products");
      this.setProducts(this.getRandomOptions(response.data, this.fakeKeys));
      const fakeDatas = { manufacturers: {}, sizes: {} };

      this.fakeKeys.forEach((fakeKey) => {
        this.getProducts().forEach((item, index) => {
          if (fakeDatas[fakeKey][item[fakeKey]]) {
            fakeDatas[fakeKey][item[fakeKey]].count++;
          } else {
            fakeDatas[fakeKey][item[fakeKey]] = {
              id: index,
              count: 1,
            };
          }
        });
        const fakeArray = Object.entries(fakeDatas[fakeKey]).map(
          ([value, data]) => ({
            value,
            id: data.id,
            count: data.count,
          })
        );
        this.setFakeData({ key: fakeKey, value: fakeArray });
      });
    },
    getRandomOptions(productData, keys) {
      const manufacturersWords = this.getManufacturers();
      const sizesWords = this.getSizes();

      return productData.map((product) => {
        keys.forEach(function (key) {
          product[key] =
            key === "manufacturers"
              ? manufacturersWords[
                  Math.floor(Math.random() * manufacturersWords.length)
                ]
              : sizesWords[Math.floor(Math.random() * sizesWords.length)];
        });

        return product;
      });
    },
    getFilteredProducts() {
      const self = this;
      let products = this.getFilters().category
        ? this.getProducts().filter(
            (product) => this.getFilters().category === product.category
          )
        : this.getProducts();

      this.fakeKeys.forEach((key) => {
        if (this.getFilters().fakedFilter[key].length > 0) {
          products = products.filter((product) => {
            return this.getFilters().fakedFilter[key].some(
              (item) => item.value === product[key]
            );
          });
        }
      });

      products = products.filter(
        (product) =>
          product.price > this.getFilters().price.min &&
          product.price < this.getFilters().price.max
      );

      products.sort(function (a, b) {
        const keyA =
          self.getSorting() === "rating"
            ? a[self.getSorting()].count
            : a[self.getSorting()];
        const keyB =
          self.getSorting() === "rating"
            ? b[self.getSorting()].count
            : b[self.getSorting()];
        if (keyA > keyB) {
          return 1;
        }
        if (keyA < keyB) {
          return -1;
        }
        return 0;
      });

      if (products.length > 0) this.setProductsFilteredLength(products.length);

      products = products.slice(
        this.offset.nowPos * +this.getProductsLimit(),
        this.offset.value
      );

      products = products.slice(0, +this.getProductsLimit());

      return products;
    },
    ...mapGetters({
      getProducts: "getProducts",
      getFilters: "getFilters",
      getSorting: "getSorting",
      getManufacturers: "getManufacturers",
      getSizes: "getSizes",
      getProductsLimit: "getProductsLimit",
    }),
    ...mapActions({
      setProducts: "setProducts",
      setPrice: "setPrice",
      setFakeData: "setFakeData",
      setProductsFilteredLength: "setProductsFilteredLength",
    }),
  },
};
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  &--full {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
