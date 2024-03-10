<template>
  <button
    type="button"
    :class="customClass"
    @click="$emit('buttonClick')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    customClass: String,
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
</style>
