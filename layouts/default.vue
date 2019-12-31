<template>
  <div id="layout" class="d-flex full of-auto" :class="{fullscreen, halfscreen}">
    <div id="layout-top" class="full-width">
      <Topbar></Topbar>
      <UserInfo></UserInfo>
    </div>
    <div id="layout-bottom" class="full-width">
      <Sidebar></Sidebar>
    </div>
    <div id="view-wrap">
      <Viewbar></Viewbar>
      <div class="nuxt-wrap full-height of-auto">
        <nuxt />
      </div>
    </div>
    <!-- <Message></Message> -->
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Topbar from '~/components/layouts/topbar';
  import UserInfo from '~/components/layouts/userInfo';
  import Sidebar from '~/components/layouts/sidebar';
  import Message from '~/components/layouts/message';
  import Viewbar from '~/components/layouts/viewbar';

  export default {
    middleware: ['auth', 'autoCancelFetch'],
    data() {
      return {
        searchVal: ''
      }
    },
    computed: {
      ...mapState({
        fullscreen: state => state.layout.fullscreen, 
        halfscreen: state => state.layout.halfscreen
      })
    },
    components: {
      Topbar,
      UserInfo,
      Sidebar,
      Message,
      Viewbar
    }
  }
</script>

<style lang="scss" scoped>
#layout {
  position: relative;
  flex-direction: column;
  padding-top: $layout-paddingTop;
  padding-right: $layout-paddingRight;
  padding-bottom: $layout-paddingBottom;
  padding-left: $layout-paddingLeft;
  transition: padding $layoutTransTime $layoutTransEffect;
  &.halfscreen {
    padding-top: $halfscreen-layout-top-topbar-height;
    padding-right: $halfscreen-layout-paddingRight;
    padding-bottom: 15px;
    padding-left: $halfscreen-layout-paddingLeft;
    #layout-top {
      height: 100%;
      z-index: $view-wrap-zIndex - 2;
    }
    #layout-bottom {
      top: $halfscreen-layout-top-topbar-height;
      width: $halfscreen-layout-paddingLeft;
      height: auto;
      background-color: transparent;
      z-index: $view-wrap-zIndex + 1;
    }
  }
  &.fullscreen {
    padding: 0;
    #view-wrap {
      border-radius: 0;
    }
  }
  #layout-top {
    position: absolute;
    top: 0;
    left: 0;
    height: $layout-top-height;
    background-image: linear-gradient(to bottom, #3D3AF4 0%,#415DE1 100%);
    transition: padding-top $layoutTransTime $layoutTransEffect, height $layoutTransTime $layoutTransEffect;
    z-index: $view-wrap-zIndex - 1;
  }
  #layout-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    height: $layout-bottom-height;
    background-color: #F2F2F4;
    transition: height $layoutTransTime $layoutTransEffect;
    z-index: $view-wrap-zIndex - 2;
  }
  #view-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: $view-wrap-paddingTop;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
    z-index: $view-wrap-zIndex;
    .nuxt-wrap {

    }
  }
}
</style>
