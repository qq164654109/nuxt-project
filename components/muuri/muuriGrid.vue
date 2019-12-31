<template>
  <div class="muuri-grid-wrap" :style="wrapStyle">
    <div ref="muuriGrid" class="muuri-grid" style="position: relative; min-height: 100%;">
      <slot v-if="ready"></slot>
    </div>
  </div>
</template>

<script>
  import { debounce } from '~/utils';
  import { addListener, removeListener } from 'resize-detector';
  
  if (process.client) {
    require('web-animations-js');
    var Muuri = require('muuri');
    require('./plugin');
  }

  export default {
    props: {
      options: {
        type: Object,
        default: () => {
          return {};
        }
      },
      value: {
        type: Array,
        required: true
      },
      rowHeight: {
        type: Number,
        default: 20
      },
      gutter: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        ready: false
      }
    },
    created() {
      this.refreshLayout = debounce(this.refreshLayout, 150);
    },
    mounted() {
      if (process.client) {
        this._grid = new Muuri(this.$refs.muuriGrid, this.options);
        console.log(this._grid)
        addListener(this.$el, this.refreshLayout);
        
        this.bindEvts();
        this.ready = true;
        this.$emit('loaded', this._grid);
      }  
    },
    computed: {
      wrapStyle() {
        return {
          marginLeft: - this.gutter / 2 + 'px', 
          marginRight: - this.gutter / 2 + 'px'
        }
      }
    },
    methods: {
      updateModel() {
        console.log('update')
        const tags = this._grid.getItems().map(item => item.getTag());
        let newValue = this.value.slice(0);
        newValue.sort((a, b) => {
          let aIndex = tags.indexOf(a.tag);
          let bIndex = tags.indexOf(b.tag);
          return aIndex - bIndex
        });
        this.$emit('input', newValue)
      },
      bindEvts() {
        this._grid.on('layoutEnd', this.updateModel);
        this._grid.on('sort', this.updateModel);
        // 通过组件绑定的事件
        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.on(evtName, this.$listeners[evtName]);
        })
      },
      unbindEvts() {
        this._grid.off('layoutEnd', this.updateModel);
        this._grid.off('sort', this.updateModel);
        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.off(evtName, this.$listeners[evtName]);
        })
      },
      refreshLayout() {
        this._grid.refreshItems().layout();
      },
      updateItem(newItem) {
        let newValue = this.value.map(item => newItem.tag === item.tag ? {...item, ...newItem} : item);
        this.$emit('input', newValue)
      }
    },
    beforeDestroy() {
      removeListener(this.$el, this.refreshLayout);
      this.unbindEvts();
      this._grid.destroy();
    }
  }
</script>

<style>
.muuri-is-dragging {
  cursor: se-resize;
}
</style>

