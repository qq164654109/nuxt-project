<template>
  <div class="viewbar pos-absolute full-width clearfix">
    <ul class="tool-list txt-center no-select">
      <li class="tool-item iconfont" :class="halfscreen ? 'iconsuoxiao' : 'iconfangda'" @click="changeScreen('half')"></li>
      <li class="tool-item iconfont" :class="fullscreen ? 'iconsuoxiao1' : 'iconfangda1'" @click="changeScreen('full')"></li>
      <li class="tool-item iconfont icongengduo"></li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { capitalizeFirstLetter } from '~/utils';

  export default {
    computed: {
      ...mapState({
        halfscreen: state => state.layout.halfscreen,
        fullscreen: state => state.layout.fullscreen
      })
    },
    methods: {
      ...mapMutations({
        setHalfscreen: 'layout/setHalfscreen',
        setFullscreen: 'layout/setFullscreen'
      }),
      changeScreen(state) {
        const stateName = state + 'screen';
        const mutationName = 'set' + capitalizeFirstLetter(state) + 'screen';
        const nowState = this[stateName];
        this.setHalfscreen(false);
        this.setFullscreen(false);
        this[mutationName](!nowState);
      }
    }
  };
</script>

<style lang="scss" scoped>
.viewbar {
  top: 0;
  left: 0;
  height: $view-wrap-paddingTop;
  border-bottom: 1px solid #F1F1F1;
  border-radius: 12px 12px 0 0;
  .tool-list {
    float: right;
    padding: 15px 5px;
    color: $txt-color4;
    line-height: 30px;
    .tool-item {
      display: inline-block;
      width: 36px;
      height: 30px;
      font-size: $fontSize3;
      cursor: pointer;
    }
  }
}
</style>