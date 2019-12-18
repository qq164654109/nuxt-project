<template>
  <div id="home" class="pos-relative txt-center full">
    <div class="searchbar d-flex">
      <b-form-input class="search-btn" v-model="text" placeholder="筛选" @input="filter"></b-form-input>
      <b-button class="add-btn" variant="success" @click="addItem">新增</b-button>
    </div>
    <Muuri-grid :options="options" :gutter="20" @loaded="gridLoaded">
      <Muuri-item :ref="name" v-for="{name, width, height, html} in b" :key="name" :tag="name" :width="width" :height="height">
        <div class="close" @click="remove(name)"><i class="iconfont icontubiaoqietu_fuzhi_quxiao"></i></div>
        <component :is="html"></component>
      </Muuri-item>
    </Muuri-grid>
  </div>
</template>

<script>
import { MuuriGrid, MuuriItem } from '~/components/muuri';

const widths = ['20%', '25%', '30%', '40%']
const heights = ['50px', '60px', '80px', '100px'];
const colors = ['#F94A7A', '#2AC06D', '#50A2F9', '#FDCF52'];
let num = 0;

function createItem() {
  let index = Math.floor(Math.random() * 4);
  let width = widths[index];
  let height = heights[index];
  let color = colors[index];
  let randomTxt = width + String.fromCharCode(65 + num);
  num ++;
  return {
    name: randomTxt,
    width,
    height,
    html: {
      render(h) {
        return h('div', {
          class: 'item full',
          style: {
            borderColor: color,
            color: color 
          }
        }, randomTxt)
      }
    }
  }
}

export default {
  async asyncData({$axios}) {
    return {
      a: [
        1, 2, 3, 4, 5, 6, 7, 8, 9
      ]
    }
  },
  data() {
    return {
      b: [],
      text: '',
      options: {
        showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        layoutDuration: 400,
        layoutEasing: 'ease',
        dragEnabled: true,
        dragSortHeuristics: {
          sortInterval: 50,
          minDragDistance: 10,
          minBounceBackAngle: 1
        },
        dragPlaceholder: {
          enabled: true,
          duration: 400,
          createElement: function (item) {
            return item.getElement().cloneNode(true);
          }
        }
      }
    }
  },
  mounted() {
    this.b = [0, 1, 2, 3].map(n => createItem());
  },
  methods: {
    gridLoaded(instance) {
      this._grid = instance;
    },
    filter() {
      this._grid.filter(item => {
        let element = item.getElement();
        let tag = element.getAttribute('data-tag');
        return tag.indexOf(this.text) > -1;
      });
    },
    remove(name) {
      this.b = this.b.filter(item => item.name !== name);
    },
    addItem() {
      let newItems = [0, 1, 2, 3].map(n => createItem());
      this.b = this.b.concat(newItems);
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
  height: 1000px;
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
  /deep/.item {
    border: 2px solid;
    border-radius: 4px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 300;
    text-align: center;
  }
}
</style>
