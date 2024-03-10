<template>
  <div class="range-input">
    <div class="range-input__distance">
      <div class="range-input__from">
        <label class="range-input__from-label">
          <span>От</span>
          <input
            type="number"
            class="range-input__from-input"
            v-model.number="value[0]"
            @change="onInputChange()"
          />
        </label>
      </div>
      <div class="range-input__to">
        <label class="range-input__to-label">
          <span>До</span>
          <input
            type="number"
            class="range-input__to-input"
            v-model.number="value[1]"
            @change="onInputChange()"
          />
        </label>
      </div>
    </div>
    <vue-slider
      ref="slider"
      v-model="value"
      :enable-cross="false"
      :min="min"
      :max="max"
      @drag-end="onInputValue()"
    ></vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
export default {
  props: {
    minValue: {
      type: Number,
    },
    maxValue: {
      type: Number,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  components: { VueSlider },
  data() {
    return {
      value: [this.minValue, this.maxValue],
    };
  },
  methods: {
    onInputValue() {
      const value = this.$refs.slider.getValue();
      this.$emit("changeRange", { min: value[0], max: value[1] });
    },
    onInputChange() {
      this.$refs.slider.setValue(this.value);
      this.$emit("changeRange", { min: this.value[0], max: this.value[1] });
    },
  },
};
</script>

<style lang="scss">
.range-input {
  .vue-slider-rail {
    margin-top: 14px;
    border-radius: 2px;
    height: 4px;
    background: #f5f5f5;
  }
  .vue-slider-process {
    background: #279fb9;
  }
  .vue-slider-dot {
    background: #279fb9;
    width: 16px !important;
    height: 16px !important;
    border-radius: 50%;
    cursor: pointer;
  }
  &__distance {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__from,
  &__to {
    &-label {
      & span {
        font-weight: 400;
        font-size: 12px;
        color: #757575;
        display: block;
        margin-bottom: 4px;
      }
    }

    &-input,
    &-input::placeholder {
      font-weight: 400;
      font-size: 14px;
      color: #333;
      padding: 8px 0px;
      padding-left: 12px;
    }
    &-input {
      border: 1px solid #e0e0e0;
      border-radius: 9px;
      background: #fff;
      width: 98px;
      max-width: 98px;
      box-sizing: border-box;
    }
  }
}
</style>
