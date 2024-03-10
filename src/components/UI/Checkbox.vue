<template>
  <label class="checkbox-wrap" :class="customClass">
    <input
      type="checkbox"
      class="checkbox-input"
      :name="customName"
      :checked="checkedValue"
      @change="toggleCheckbox"
    />
    <span
      class="checkbox-indicator"
      :class="{ 'checkbox-indicator--checked': checkedValue }"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8.5L6 11.5L13 4.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="checkbox-wrap__label-name" v-if="labelName">
      {{ labelName }}
    </span>
    <span class="checkbox-wrap__label-count" v-if="count">{{ count }}</span>
  </label>
</template>

<script>
export default {
  props: {
    customName: {
      type: String,
    },
    customClass: {
      type: String,
    },
    count: {
      type: Number,
    },
    labelName: {
      type: String,
    },
    checkedValue: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  methods: {
    toggleCheckbox() {
      this.$emit('toggle', !this.checkedValue)
    },
  },
}
</script>

<style lang="scss">
.checkbox-indicator {
  border-radius: 4px;
  width: 20px;
  height: 20px;
  fill: #fff;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-right: 10px;
  &--checked {
    background: #279fb9;
    border: transparent;
  }
}
.checkbox-input {
  display: none;
}
.checkbox-wrap {
  &__label {
    &-count {
      margin-left: 4px;
      font-weight: 400;
      font-size: 12px;
      color: #bdbdbd;
    }
  }
}
</style>
