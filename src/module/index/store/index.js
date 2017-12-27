'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
Vue.use(Vuex);
const state = {
	// uid:null,
	userInfo:null,
	showLogin:false
};
export default new Vuex.Store({
  state,
  mutations
}); 