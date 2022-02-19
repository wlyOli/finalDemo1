import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入vant
import Vant from 'vant';
//加载vant组件库样式
import 'vant/lib/index.css';
//全局样式，放在加载vant后面，层级就比vant高
//!important,会覆盖所有,也要遵循以下原则;
//内联>id样式>class样式>标签样式(div,span...)
import './styles/index.css'
//全局注册vant组件
Vue.use(Vant);

//懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

//自动设置rem基准值（html标签字体的大小）
import 'amfe-flexible'

import { Dialog } from 'vant';
Vue.use(Dialog);


//每个vue都拥有，在任何位置都可以用
Vue.mixin({
	methods:{
		getAuthHeader(){
			return {
				Authorization:`Bearer ${localStorage.token || ''}`
			}
		}
	}
})

Vue.config.productionTip = false
//Vue.config.devtools = true

//public中的index.html会替换#app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
