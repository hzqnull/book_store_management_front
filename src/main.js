import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from "axios"

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://47.103.63.54:8080";
axios.interceptors.response.use((response,)=> {
	if (response.data=='10003') {
		//未登录，拦截
		router.push("/");
		alert("请先登录");
	} else {
		return response;
	}
});
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
