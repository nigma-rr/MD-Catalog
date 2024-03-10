<template>
  <div class="select">
    <select @change="changeSelect($event.target.value)">
      <option
        v-for="item in selectItems"
        :key="item.value"
        :selected="getChecked(item.value)"
        :value="item.value"
      >
        {{ item.title }}
      </option>
    </select>
    <div class="select_arrow">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.29289 9.29289C4.68342 8.90237 5.31658 8.90237 5.70711 9.29289L12 15.5858L18.2929 9.29289C18.6834 8.90237 19.3166 8.90237 19.7071 9.29289C20.0976 9.68342 20.0976 10.3166 19.7071 10.7071L13.4142 17C12.6332 17.781 11.3668 17.781 10.5858 17L4.29289 10.7071C3.90237 10.3166 3.90237 9.68342 4.29289 9.29289Z"
          fill="#333333"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectItems: {
      type: Array,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    getChecked(value) {
      return value === this.value;
    },
    changeSelect(value) {
      this.$emit("changeSelect", value);
    },
  },
};
</script>

<style lang="scss">
.select {
  position: relative;
  display: inline-block;
  width: 100%;
  &_arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    pointer-events: none;
  }
  select {
    display: inline-block;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #333;
    width: 100%;
    cursor: pointer;
    padding: 10px 15px;
    outline: 0;
    border: 1px solid #e0e0e0;
    border-radius: 9px;
    background: #fff;
    color: #333;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    &::-ms-expand {
      display: none;
    }
    &:hover,
    &:focus {
      color: #333;
      background: #fff;
    }
    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
