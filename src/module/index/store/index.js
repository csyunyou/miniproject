'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
Vue.use(Vuex);
const state = {
	// uid:null,
	userInfo:{
		userid:"",
		nickname:"NULL"
	},
	showLogin:false,
/*	vodSearchKeyword:null,
	liveSearchKeyword:null*/
	isFirstSearch:true,
	status:"offLine"
};
export default new Vuex.Store({
  state,
  mutations
}); 
