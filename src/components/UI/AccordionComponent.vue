<template>
  <div class="column is-half" :class="customClass">
    <div class="card" :class="{ 'not-expanded': !this.expanded }">
      <header class="card-header" @click="toggleCardState">
        <p class="card-header-title">
          {{ title }}
        </p>
        <div class="card-header-icon">
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
              d="M19.7071 14.7071C19.3166 15.0976 18.6834 15.0976 18.2929 14.7071L12 8.41421L5.70711 14.7071C5.31658 15.0976 4.68342 15.0976 4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929L10.5858 7C11.3668 6.21895 12.6332 6.21895 13.4142 7L19.7071 13.2929C20.0976 13.6834 20.0976 14.3166 19.7071 14.7071Z"
              fill="#333333"
            />
          </svg>
        </div>
      </header>
      <div class="card-content" v-if="this.expanded">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    customClass: {
      type: String,
    },
  },
  data() {
    return {
      expanded: true,
    };
  },
  methods: {
    toggleCardState() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;

  &-header {
    cursor: pointer;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-icon {
      display: flex;
      transform: rotate(0);
    }
    &-title {
      font-weight: 500;
      margin: 0;
      font-size: 16px;
      color: #333;
    }
  }
  &.not-expanded {
    .card-header {
      &-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
