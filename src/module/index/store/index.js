'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
Vue.use(Vuex);
const state = {
	// uid:null,
	userInfo:{
		userid:"",
		nickname:"NULL",
		invite:null
	},
	showLogin:false,
/*	vodSearchKeyword:null,
	liveSearchKeyword:null*/
	isFirstSearch:true,
	status:"offLine",
	liveKeyword:null,
	vodKeyword:null,
	selectedCategory:null,
	selectedVideo:null,
	pwdCode:null
};
export default new Vuex.Store({
  state,
  mutations
}); 
