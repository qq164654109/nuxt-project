<template>
  <ul class="topbar d-flex" :class="{ halfscreen, fullscreen }">
    <li class="logo">BWIN</li>
    <li class="bar-item" :class="{active: active === bar.label}" v-for="bar in barData" :key="bar.label"
      @click="checkBar(bar)">{{bar.label}}</li>
    <li class="search">
      <EffectButton></EffectButton>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';
  import EffectButton from '~/components/effectSearch/effectSearch';

  const barData = [
    {
      label: 'SPORT'
    },
    {
      label: 'lIVE BETTING'
    },
    {
      label: 'VIRTUALS'
    },
    {
      label: 'CASINO'
    },
    {
      label: 'LIVE CASINO'
    },
    {
      label: 'GAMES'
    },
    {
      label: 'POKER'
    },
    {
      label: 'NEWS'
    }
  ]

  export default {
    data() {
      return {
        barData,
        active: barData[0].label
      };
    },
    methods: {
      checkBar(bar) {
        this.active = bar.label;
      }
    },
    computed: {
      ...mapState({
        halfscreen: state => state.layout.halfscreen,
        fullscreen: state => state.layout.fullscreen
      })
    },
    components: {
      EffectButton
    }
  };
</script>

<style lang="scss" scoped>
$bar-item-height: 20px;
.topbar {
  justify-content: space-between;
  align-items: center;
  height: $layout-top-topbar-height;
  padding-right: 4.4%;
  color: #8CB5F5;
  transition: height $layoutTransTime $layoutTransEffect;
  &.halfscreen {
    height: $halfscreen-layout-top-topbar-height; 
  }
  .logo {
    flex: 0 0 $layout-paddingLeft;
    width: $layout-paddingLeft;
    padding-left: 4.44%;
    color: #fff;
    font-size: $fontSize2;
  }
  .bar-item {
    height: $bar-item-height;
    padding: 0 4px;
    line-height: $bar-item-height;
    cursor: pointer;
    &.active {
      color: #fff;
    }
  }
}
</style>