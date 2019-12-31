<template>
  <div id="home" class="pos-relative full">
    <div class="data-display">
      {{layout}}
    </div>
    <Muuri-grid v-model="layout" :options="options" :gutter="20" @loaded="gridLoaded">
      <Muuri-item v-for="{tag, span, row} in layout" 
        :key="tag" :tag="tag" :span="span" :row="row">
        <div class="close" @click="remove(tag)"><i class="iconfont icontubiaoqietu_fuzhi_quxiao"></i></div>
        <div class="box full">{{tag}}</div>
      </Muuri-item>
    </Muuri-grid>
  </div>
</template>

<script>
import { MuuriGrid, MuuriItem } from '~/components/muuri';

export default {
  async asyncData({$axios}) {
    return {};
  },
  data() {
    return {
      layout: [
        {
          tag: 'A',
          span: 12,
          row: 10
        },
        {
          tag: 'B',
          span: 12,
          row: 10,
          height: 200
        }
      ],
      options: {
        showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        layoutDuration: 400,
        layoutEasing: 'ease',
        // layout: {
        //   round: false
        // },
        dragEnabled: true,
        dragSortHeuristics: {
          sortInterval: 50,
          minDragDistance: 10,
          minBounceBackAngle: 1
        },
        dragReleaseDuration: 400,
        dragReleaseEasing: 'ease',
        dragPlaceholder: {
          enabled: true,
          duration: 400,
          createElement: function (item) {
            let placeholder = item.getElement().cloneNode();
            let placeholderCont = document.createElement('div');
            placeholderCont.style.height = '100%';
            placeholderCont.style.border = '2px dashed #ccc';
            placeholder.appendChild(placeholderCont);
            return placeholder;
          }
        },
        resizeEnabled: true
      },
    }
  },
  mounted() {
  },
  methods: {
    gridLoaded(instance) {
      
    },
    remove(tag) {
      this.layout = this.layout.filter(item => item.tag !== tag);
    }
  },
  components: {
    MuuriGrid, 
    MuuriItem
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding: 40px 40px;
  height: 100%;
  overflow-x: hidden;
  .data-display {
    margin-bottom: 20px;
  }
  .searchbar {
    margin-bottom: 20px;
    justify-content: space-between;
    .search-btn {
      flex: 0 0 40%;
    }
    .add-btn {
      flex: 0 0 80px;
    }
  }
  .close {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  /deep/.box {
    color: #409eff;
    line-height: 200px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #409eff;
    border-radius: 4px;
  }
}
</style>
