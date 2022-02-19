import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
//axios模块引入实例
import http from './http'

//引入全局样式
import './style.css'

Vue.config.productionTip = false

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

//控制台能显示vue
Vue.config.devtools = true

//挂载到Vue实例上,任意地方都可以用this访问它 this.$http
Vue.prototype.$http = http

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
