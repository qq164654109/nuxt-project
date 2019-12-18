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
        this._grid = new Muuri('.muuri-grid', this.options);
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

