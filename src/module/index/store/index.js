'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
Vue.use(Vuex);
const state = {
	isLogin:false,
	usrInfo:{
		nickname:""
	}	
};
export default new Vuex.Store({
  state,
  mutations
}); 