<template>
  <div class="muuri-grid-wrap" :style="wrapStyle">
    <div class="muuri-grid" style="position: relative;">
      <slot v-if="ready"></slot>
    </div>
  </div>
</template>

<script>
  let Muuri;
  if (process.client) {
    require('web-animations-js');
    Muuri = require('muuri');
  }

  export default {
    props: {
      options: {
        type: Object,
        default: () => {
          return {};
        }
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
    mounted() {
      if (process.client) {
        const options = this.resolveOptions(this.options);
        this._grid = new Muuri('.muuri-grid', options);
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
      resolveOptions(opts) {
        let dragStartPredicate = opts.dragStartPredicate;
        if (!dragStartPredicate) {
          return Object.assign({}, opts, {
            dragStartPredicate(item) {
              return item.isDraggable();
            }
          });
        } else if (dragStartPredicate.constructor === Function) {
          return Object.assign({}, opts, {
            dragStartPredicate(item) {
              return item.isDraggable() && dragStartPredicate();
            }
          });
        } else if (dragStartPredicate.constructor === Object && dragStartPredicate.handle) {
          return Object.assign({}, opts, opts.dragStartPredicate, {
            handle(item) {
              return item.isDraggable() && dragStartPredicate.handle();
            }
          });
        } else if (dragStartPredicate.constructor === Object && !dragStartPredicate.handle) {
          return Object.assign({}, opts, opts.dragStartPredicate, {
            handle(item) {
              return item.isDraggable();
            }
          });
        }
      },
      bindEvts() {
        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.on(evtName, this.$listeners[evtName]);
        })
      },
      unbindEvts() {
        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.off(evtName, this.$listeners[evtName]);
        })
      }
    },
    beforeDestroy() {
      this.unbindEvts();
      this._grid.destroy(true);
    }
  }
</script>

