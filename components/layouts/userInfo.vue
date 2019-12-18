<template>
  <div class="userInfo" :class="{ halfscreen }">
    <div class="avatar-wrap">
      <svg viewBox="0 0 120 120" class="level-svg">
        <path class="level-path-bg" d="M27.5, 104.37 A55, 55, 0, 1, 1, 92.5, 104.37" fill="none" stroke-width="4" stroke-linecap="round"></path>
        <path class="level-path" d="M27.5, 104.37 A55, 55, 0, 1, 1, 92.5, 104.37" fill="none" stroke-width="4" stroke-linecap="round" :stroke-dashoffset="dashoffset"></path>
      </svg>
      <img class="avatar" src="~assets/images/avatar.jpg" width="80" height="80" alt="">
    </div>
    <div class="username">{{user.name}}</div>
    <div class="desc">
      <span style="margin-right: 6px;">Administrator</span>
      <span>Level {{user.level}}</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        user: 'user',
        halfscreen: state => state.layout.halfscreen,
        fullscreen: state => state.layout.fullscreen
      }),
      dashoffset() {
        if (!this.user.level) {
          return 275;
        } else {
          return (6 - this.user.level)  * 48.3
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
$avatarWrapSize: 120px;
.userInfo {
  margin-top: calc(#{$layout-paddingTop} - #{$layout-top-topbar-height});
  width: $layout-paddingLeft;
  text-align: center;
  &.halfscreen {
    display: none;
  } 
  .avatar-wrap {
    position: relative;
    width: $avatarWrapSize;
    height: $avatarWrapSize;
    padding-top: ($avatarWrapSize - 80) / 2;
    margin: 0 auto;
    .level-svg {
      top: 0;
      left: 0;
      width: $avatarWrapSize;
      height: $avatarWrapSize;
      position: absolute;
      z-index: -1;
      .level-path-bg {
        stroke: #2E35CC;
        stroke-dasharray: 33.3, 15;
      }
      .level-path {
        stroke: $color-yellow;
        stroke-dasharray: 33.3, 15, 33.3, 15, 33.3, 15, 33.3, 15, 33.3, 15, 33.3, 275;
        animation: rotateAnima .4s ease-in .4s;
        animation-fill-mode: backwards;
      }
    }
    .avatar {
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 12px rgba(27, 23, 23, 0.3);
      cursor: pointer;
    }
  }
  .username {
    font-size: $fontSize5;
    color: #fff;
    margin-bottom: 5px;
    line-height: 20px;
    letter-spacing: 2px;
  }
  .desc {
    font-size: $fontSize8;
    color: $txt-color6;
    line-height: 20px;
  }
}
@keyframes rotateAnima {
  from {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}
</style>