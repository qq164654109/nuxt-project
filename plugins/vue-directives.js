import Vue from 'vue';

import * as directives from '~/utils/directives';

Object.values(directives).forEach(val => {
  Vue.use(val);
})