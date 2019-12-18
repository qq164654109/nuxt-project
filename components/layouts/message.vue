<template>
  <div class="message txt-center no-select of-hidden cursor-pointer clearfix" :class="{ halfscreen, fullscreen }">
    <div class="iconfont iconmessage1"></div>
    <div class="label">
      <div>New</div>
      <div>Chart</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        isPackUp: false
      };
    },
    methods: {
      togglePackUp() {
        this.isPackUp = !this.isPackUp && this.halfscreen;
      }
    },
    computed: {
      ...mapState({
        halfscreen: state => state.layout.halfscreen,
        fullscreen: state => state.layout.fullscreen
      })
    }
  };
</script>

<style lang="scss" scoped>
$size: 60px;
.message {
  position: absolute;
  top: $layout-top-height;
  right: 4.44%;
  width: $size;
  height: $size;
  color: #fff;
  background-color: $color-yellow;
  transform: translateY(-50%);
  border-radius: 8px;
  transition: all $layoutTransTime ease-out;
  z-index: $view-wrap-zIndex + 5;
  &.halfscreen {
    // animation: scaleToRight .8s cubic-bezier(0,0,0.58,1);
    // animation-fill-mode: forwards;
    top: $layout-top-height - 10;
    right: 0;
    width: $halfscreen-layout-paddingRight;
    border-radius: 2px;
    color: $color-yellow;
    &:hover {
      display: flex;
      width: $size * 2;
      color: #fff;
      border-radius: 8px 2px 2px 8px;
      transition-duration: .26s;
    }
  }
  &:not(.halfscreen) {
    // animation: scaleToLeft .8s cubic-bezier(0,0,0.58,1);
    &:hover {
      height: $size * 2;
      transition-duration: .26s;
    }
  }
  .iconfont {
    width: $size;
    line-height: $size;
    font-size: 24px;
  }
  .label {
    width: $size;
    padding: 14px 0;
    font-size: 12px;
    font-weight: bold;
    line-height: ($size - 14 * 2) / 2;
  }
}

@keyframes scaleToRight {
  30% {
    right: 4.44%;
  }
  80% {
    width: $size;
    border-radius: 8px;
    color: #fff;
  }
  100% {
    top: $layout-top-height - 10;
    right: 0;
    width: $halfscreen-layout-paddingRight;
    border-radius: 2px;
    color: $color-yellow;
  }
}
@keyframes scaleToLeft {
  0% {
    top: $layout-top-height - 10;
    right: 0;
    width: $halfscreen-layout-paddingRight;
    border-radius: 2px;
    color: $color-yellow;
  }
  20% {
    width: $size;
    height: $size;
    color: #fff;
    border-radius: 8px;
  }
  30% {
    width: $size;
    height: $size;
    right: 4.44%;
  }
}
</style>