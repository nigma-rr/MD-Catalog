<template>
  <div class="checkbox-group" :class="customWrapClass">
    <checkbox
      v-for="item in checkboxData"
      :key="item.id"
      :checkedValue="isActiveElement(item.id)"
      :count="item.count"
      :labelName="item.value"
      :customClass="customClass"
      @toggle="toggleCheckedValue($event, item.value, item.id)"
    ></checkbox>
  </div>
</template>

<script>
import Checkbox from './Checkbox.vue'
export default {
  components: { Checkbox },
  props: {
    checkboxData: {
      type: Array,
    },
    customClass: {
      type: String,
    },
    customWrapClass: {
      type: String,
    },
    checkedValues: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    isActiveElement(id) {
      return this.checkedValues.some((item) => item.id === id)
    },
    toggleCheckedValue(checkboxStatus, value, id) {
      const pushValue = (valuesArr) => valuesArr.push({ id, value })
      const deleteValue = (valuesArr) =>
        valuesArr.filter((item) => item.id != id)

      this.$emit('changeCheckedValues', {
        checkboxStatus,
        pushValue,
        deleteValue,
      })
    },
  },
}
</script>

<style lang="scss"></style>
