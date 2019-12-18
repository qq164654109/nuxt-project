<template>
  <div class="sidebar" :class="{ halfscreen, fullscreen }">
    <ul class="bar-list no-select clearfix">
      <li class="bar-item" :class="{active: active === bar.label}" v-for="(bar, i) in barData" :key="bar.label"
        :style="halfscreen ? {animationDelay: 0.1 * i + 0.46 + 's'}: {}"  @click="checkBar(bar)">
        <div class="full-width">
          <div class="iconfont" :class="bar.icon"></div>
          <div class="label">{{bar.label}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      const barData = [
        {
          icon: 'icondash-board',
          label: 'Dashboard'
        },
        {
          icon: 'iconpost',
          label: 'Posts'
        },
        {
          icon: 'iconsave',
          label: 'Saved'
        },
        {
          icon: 'iconrewards',
          label: 'Rewards'
        },
        {
          icon: 'iconnotice',
          label: 'Notifications'
        },
        {
          icon: 'iconmessage',
          label: 'Messages'
        },
        {
          icon: 'iconteam',
          label: 'Teams'
        },
        {
          icon: 'iconset',
          label: 'Settings'
        }
      ];
      return {
        barData,
        active: barData[0].label
      };
    },
    computed: {
      ...mapState({
        halfscreen: state => state.layout.halfscreen,
        fullscreen: state => state.layout.fullscreen
      })
    },
    methods: {
      checkBar(bar) {
        this.active = bar.label;
      }
    }
  };
</script>

<style lang="scss" scoped>
$activeTransTime: .26s;
$activeEffect: ease-in;
.sidebar {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21.8%;
  height: 100%;
  &.halfscreen {
    width: $halfscreen-layout-paddingLeft;
    .bar-list {
      width: $halfscreen-layout-paddingLeft - 20px;
      height: 100%;
      text-align: center;
      .bar-item {
        position: relative;
        width: $halfscreen-layout-paddingLeft - 20px;
        height: $halfscreen-layout-paddingLeft - 20px;
        margin-top: 15px;
        border-radius: 12px;
        animation: fade-to-top $layoutTransTime $layoutTransEffect;
        animation-fill-mode: backwards;
        &:hover {
          .label {
            display: block;
            animation: fade-to-left $layoutTransTime $layoutTransEffect;
            animation-fill-mode: forwards;
          }
        }
        &.active {
          transition: all $activeTransTime $activeEffect;
          background-color: #fff;
          box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.2);
          .iconfont {
            color: $btn-color;
          }
        }
        .iconfont {
          color: #fff;
          font-size: 20px;
          line-height: 16px;
        }
        .label {
          display: none;
          position: absolute;
          top: 50%;
          left: $halfscreen-layout-paddingLeft - 20px;
          width: auto;
          height: 24px;
          margin-top: -12px;
          padding: 0 8px;
          font-size: 14px;
          border-radius: 4px;
          line-height: 24px;
          text-align: center;
          white-space: nowrap;
          color: #fff;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.8);
          transform: translateX(8px);
          transition: all $activeTransTime $activeEffect;
          z-index: 2222;
          &:after {
            position: absolute;
            content: '';
            top: 50%;
            left: -12px;
            margin-top: -6px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid rgba(0, 0, 0, 0.8);
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
          }
        }
      }
    }
  }
  &:not(.halfscreen) {
    .bar-item {
      &.active {
        animation: bounceScale $activeTransTime $activeEffect;
        animation-fill-mode: forwards;
        .iconfont, .label {
          color: #fff;
          transition: color $activeTransTime * 0.6 $activeEffect;
        }
      }
    }
  }
  .bar-list {
    width: 252px;
    .bar-item {
      float: left;
      display: flex;
      align-items: center;
      width: 126px;
      height: 126px;
      text-align: center;
      line-height: 35px;
      border-radius: 12px;
      cursor: pointer;
      .iconfont {
        width: 100%;
        color: $txt-color2;
        font-size: 28px;
      }
      .label {
        width: 100%;
        color: $txt-color4;
        font-size: 16px;
      }
    }
  }
}
@keyframes fade-to-top {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1; 
    transform: translateY(0);
  }
}
@keyframes fade-to-left {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1; 
    transform: translateY(0);
  }
}
@keyframes bounceScale {
  0% {
    background-color: transparent;
    box-shadow: 2px 2px 14px rgba(0, 0, 0, 0);
    transform: scale(1);
  }
  60% {
    transform: scale(1.14);
  }
  100% {
    background-color: $btn-color;
    box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.2);
    transform: scale(1);
  }
}
</style>