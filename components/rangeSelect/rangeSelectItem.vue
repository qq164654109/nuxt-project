<template>
  <div class="range-select-item" :class="{'selected': selected}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.range-select-item {
  float: left;
  width: 120px;
  height: 120px;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 120px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  transition-property: transform, border;
  transition-duration: .5s;
  transition-timing-function: $transEffect;
  &.selected {
    border: 1px solid rgb(255, 82, 51);
  }
}
</style>