<template>
  <div class="muuri-item" :data-tag="tag" :style="itemStyle">
    <div class="muuri-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '120px'
      },
      height: {
        type: String,
        default: '120px'
      },
      margin: {
        type: String,
        default: '10px'
      }
    },
    mounted() {
      this.$parent._grid.add(this.$el);
    },
    computed: {
      gutter() {
        let parent = this.$parent;
        return parent ? parent.gutter : 0;
      },
      itemStyle() {
        return { 
          width: this.width, 
          height: this.height, 
          paddingLeft: this.gutter / 2 + 'px', 
          paddingRight: this.gutter / 2 + 'px'
        };
      }
    },
    beforeDestroy() {
      this.$parent._grid.remove(this.$el, {removeElements: true})
    }
  }
</script>

<style lang="scss" scoped>
  .muuri-item {
    position: absolute;
    display: block;
    margin-bottom: 20px;
    z-index: 1;
    &.muuri-item-dragging {
      z-index: 3;
    }
    &.muuri-item-releasing {
      z-index: 2;
    }
    &.muuri-item-placeholder {
      opacity: 0.4;
      margin: 0 !important;
      z-index: 1;
    }
    &.muuri-item-hidden {
      z-index: 0;
    }
    .muuri-item-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>