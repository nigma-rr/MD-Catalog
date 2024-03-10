<template>
  <label class="switcher">
    <div class="switcher__wrap">
      <input type="checkbox" @click="toggleCheckbox" :checked="checkedValue" />
      <div class="switcher__slider switcher__slider--round"></div>
    </div>
    <div class="switcher__text">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  data() {
    return {
      checkedValue: true,
    };
  },
  methods: {
    toggleCheckbox() {
      this.checkedValue = !this.checkedValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  align-items: center;
  &__slider {
    width: 40px;
    height: 24px;
    position: relative;
    cursor: pointer;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    &--round {
      border-radius: 34px;
    }
    &--round:before {
      border-radius: 50%;
    }
  }
  & input {
    display: none;
  }
  & input:checked + .switcher__slider {
    background-color: #279fb9;
  }
  & input:focus + .switcher__slider {
    box-shadow: 0 0 1px #279fb9;
  }
  & input:checked + .switcher__slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
  &__text {
    margin-left: 10px;
    font-weight: 400;
    font-size: 16px;
    color: #333;
  }
}
</style>
