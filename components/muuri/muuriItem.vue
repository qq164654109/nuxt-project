<template>
  <div class="muuri-item" :data-tag="tag" :style="itemStyle">
    <div ref="itemCont" class="muuri-item-content">
      <slot></slot>
      <div v-if="isAllowResize" class="muuri-resize-btn" @mousedown="isAllowResize && startResize($event)"></div>
    </div>
  </div>
</template>

<script>
  import { debounce } from '~/utils';

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
        default: '60px'
      },
      minWidth: {
        type: String,
        default: '100px'
      },
      minHeight: {
        type: String,
        default: '40px'
      },
      dragEnabled: {
        type: Boolean,
        default: true
      },
      resizeEnabled: {
        type: Boolean,
        default: true
      },
      resizeInterval: {
        type: Number,
        default: 200
      }
    },
    created() {
      this.refreshLayout = debounce(this.refreshLayout, this.resizeDelay);
    },
    mounted() {
      let items = this.$parent._grid.add(this.$el);
      this._item = items[0];
      this._item.isDraggable = () => {
        return this.isAllowDrag;
      }
    },
    methods: {
      startResize(e) {
        e.preventDefault();
        e.stopPropagation();

        this._item.isDraggable = () => false;

        document.body.style.cursor = 'se-resize';

        let gridWrap = this.$parent._grid.getElement();
        this._resizePlacehoder = this.$el.cloneNode();
        this._resizePlacehoder.className = 'muuri-resize-placehoder';
        let resizePlacehoderCont = document.createElement('div');
        resizePlacehoderCont.style.height = '100%';
        resizePlacehoderCont.style.background = '#ebebeb';
        this._resizePlacehoder.appendChild(resizePlacehoderCont);
        gridWrap.appendChild(this._resizePlacehoder);
        this.$el.style.opacity = 0.5;

        this._startPos = {
          x: e.clientX,
          y: e.clientY,
        };
        this._startWidth = this.$el.offsetWidth; 
        this._startHeight = this.$el.offsetHeight; 
        document.addEventListener('mousemove', this.moveResize);
        document.addEventListener('mouseup', this.endResize);
      },
      moveResize(e) {
        e.preventDefault();
        e.stopPropagation();
        this._movePos = {
          x: e.clientX,
          y: e.clientY,
        };
        this._disX = this._movePos.x - this._startPos.x;
        this._disY = this._movePos.y - this._startPos.y;

        let resizeWidth = this._startWidth + this._disX;
        let resizeHeight = this._startHeight + this._disY;

        let validResizeWidth = resizeWidth < parseInt(this.minWidth) ? parseInt(this.minWidth) : resizeWidth;
        let validResizeHeight = resizeHeight < parseInt(this.minHeight) ? parseInt(this.minHeight) : resizeHeight;
        
        this._resizePlacehoder.style.width = validResizeWidth + 'px';
        this._resizePlacehoder.style.height = validResizeHeight + 'px';
        this.$el.style.width = validResizeWidth + 'px';
        this.$el.style.height = validResizeHeight + 'px';

        this.refreshLayout();
      },
      endResize(e) {
        e && e.preventDefault();
        e && e.stopPropagation();
        if (this._resizePlacehoder) {
          this.$parent._grid.getElement().removeChild(this._resizePlacehoder);
          this._resizePlacehoder = null;
        }
        this.$el.style.opacity = 1;
        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', this.moveResize);
        document.removeEventListener('mouseup', this.endResize);
        this._item.isDraggable = () => {
          return this.isAllowDrag;
        }
      },
      refreshLayout() {
        this.$parent._grid.refreshItems(this._item);
        this._startTransform = this.$el.style.transform;
        this.$parent._grid.layout(() => {
          cancelAnimationFrame(this._listenLayoutFrame);
        }); 
        this._listenLayoutFrame = requestAnimationFrame(this.observeTransChange);
      },
      observeTransChange() {
        if (this._startTransform !== this.$el.style.transform) {
          cancelAnimationFrame(this._listenLayoutFrame);
          this.endResize();
        } else {
          this._listenLayoutFrame = requestAnimationFrame(this.observeTransChange);
        }
      }
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
      },
      isAllowDrag() {
        return this.$parent.options.dragEnabled && this.dragEnabled;
      },
      isAllowResize() {
        return this.$parent.options.resizeEnabled && this.resizeEnabled;
      },
      resizeDelay() {
        return this.$parent.options.resizeDelay || 180;
      }
    },
    beforeDestroy() {
      this.endResize();
      this.$parent._grid.remove(this._item, {removeElements: true})
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
    .muuri-resize-btn {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
      font-size: 18px;
      border-right: 2px solid #ccc; 
      border-bottom: 2px solid #ccc;
      z-index: 222;
      user-select: none;
      cursor: se-resize;
    }
  }
</style>