<template>
  <div class="effect-search" :class="{'active': active}">
    <div class="btn no-select" @click.stop="open"><i class="iconfont iconsousuo"></i></div>
    <div class="cancel" @click.stop="close"><i class="iconfont icontubiaoqietu_fuzhi_quxiao"></i></div>
    <input ref="input" type="text" class="input full" :value="value" @input="onInput">
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value);
      },
      open() {
        this.active = true;
        this.$refs.input.focus();
      },
      close() {
        this.active = false;
        this.$emit('input', '');
      }
    }
  };
</script>

<style lang="scss" scoped>
$transitionTime: .5s;
$transition: all $transitionTime cubic-bezier(0, 0.11, 0.03, 1.31);
.effect-search {
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 40px;
  padding-top: 10px;
  padding-right: 40px;
  padding-bottom: 10px;
  line-height: 20px;
  background-color: #fff;
  color: $btn-color;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  transition: $transition;
  &.active {
    width: 200px;
    padding-left: 15px;
    border-radius: 20px;
    background-color: #fff;
    .btn {
      transform: scale(0.8);
      border-radius: 50%;
      color: #fff;
      background-color: $btn-color;
    }
    .cancel {
      transition-delay: $transitionTime;
      transform: translateX(-40px) rotate(180deg);
      cursor: pointer;
    }
  }
  .input {
    position: relative;
    background-color: transparent;
    border: none;
    color: $btn-color;
    outline: none;
    z-index: 2;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    color: $btn-color;
    background-color: #fff;
    transform-origin: center center;
    transition: $transition;
    cursor: pointer;
    z-index: 1;
    .iconfont {
      font-weight: bold;
    }
  }
  .cancel {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    transition: $transition;
  }
}
</style>