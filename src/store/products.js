export default {
  state() {
    return {
      products: [],
      productsFilteredLength: 10,
      manufacturers: [
        "AVD",
        "Advanced Modeling",
        "Start Scale Models (SSM)",
        "Edmon Studia",
        "Edmon Studia",
        "ModelGun",
        "Восточный Экспресс",
        "Advanced Modeling",
        "AVD",
      ],
      sizes: ["1:24", "1:6", "1:12", "1:9", "1:32", "1:35", "1:43", "1:16"],
      fakeData: { manufacturers: [], sizes: [] },
      categories: [],
      filters: {
        category: null,
        price: {
          min: 50,
          max: 500,
        },
        fakedFilter: {
          manufacturers: [],
          sizes: [],
        },
        searchInputs: { manufacturer: "", size: "" },
      },
      sorting: "id",
      limit: "10",
    };
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_CATEGORY_FILTER(state, payload) {
      state.filters.category = payload;
    },
    SET_FAKED_FILTER(state, payload) {
      state.filters.fakedFilter[payload.key] = payload.value;
    },
    SET_SORTING(state, payload) {
      state.sorting = payload;
    },
    SET_PRICE(state, payload) {
      state.filters.price = payload;
    },
    SET_PRODUCTS_LIMIT(state, payload) {
      state.limit = payload;
    },
    SET_PRODUCTS_LIMIT(state, payload) {
      state.limit = payload;
    },
    SET_FAKE_DATA(state, payload) {
      state.fakeData[payload.key] = payload.value;
    },
    SET_SEARCH_INPUTS(state, payload) {
      state.filters.searchInputs[payload.key] = payload.value;
    },
    SET_PRODUCTS_FILTERED_LENGTH(state, payload) {
      state.productsFilteredLength = payload;
    },
    CLEAN_FILTERS(state) {
      state.filters = {
        category: null,
        price: {
          min: 50,
          max: 500,
        },
        fakedFilter: {
          manufacturers: [],
          sizes: [],
        },
        searchInputs: { manufacturer: "", size: "" },
      };
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCategories(state) {
      return state.categories;
    },
    getFilters(state) {
      return state.filters;
    },
    getProductsLimit(state) {
      return state.limit;
    },
    getSorting(state) {
      return state.sorting;
    },
    getManufacturers(state) {
      return state.manufacturers;
    },
    getSizes(state) {
      return state.sizes;
    },
    getFakeData(state) {
      return state.fakeData;
    },
    getProductsFilteredLength(state) {
      return state.productsFilteredLength;
    },
  },
  actions: {
    setCategories({ commit }, payload) {
      commit("SET_CATEGORIES", payload);
    },
    setProducts({ commit }, payload) {
      commit("SET_PRODUCTS", payload);
    },
    setCategoryFilter({ commit }, payload) {
      commit("SET_CATEGORY_FILTER", payload);
    },
    setFakedFilter({ commit }, payload) {
      commit("SET_FAKED_FILTER", payload);
    },
    setSorting({ commit }, payload) {
      commit("SET_SORTING", payload);
    },
    setPrice({ commit }, payload) {
      commit("SET_PRICE", payload);
    },
    setProductsLimit({ commit }, payload) {
      commit("SET_PRODUCTS_LIMIT", payload);
    },
    setFakeData({ commit }, payload) {
      commit("SET_FAKE_DATA", payload);
    },
    setSearchInputs({ commit }, payload) {
      commit("SET_SEARCH_INPUTS", payload);
    },
    setProductsFilteredLength({ commit }, payload) {
      commit("SET_PRODUCTS_FILTERED_LENGTH", payload);
    },
    cleanFilters({ commit }, payload) {
      commit("CLEAN_FILTERS", payload);
    },
  },
};
