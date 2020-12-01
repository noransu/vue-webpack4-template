import Vue from 'vue'
import App from './App'

import vueIntersectionPlugin from '../utils/vueIntersection';
import stat from '../utils/stat';

// import(/* webpackChunkName: "vconsole" */ 'vconsole')
//   .then(({ default: VConsole }) => new VConsole());

// 曝光打点
Vue.use(vueIntersectionPlugin, {
  handler: logData => {
    if (logData) {
      delete logData.event;
      stat.track('page_view', logData);
    }
  },
  duration: 1000, // 在页面可视区域停留时长
});


new Vue({
  render: h => h(App)
}).$mount('#app')
