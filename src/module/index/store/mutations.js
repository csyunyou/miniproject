export default{
	SET_USERINFO:function(state,info){
		state.userInfo=info
	},
/*	SET_:function(state,islogin){
		state.isLogin=islogin
	},*/
	SET_SHOWLOGIN:function(state,showLogin){
		state.showLogin=showLogin
	},
/*	SET_VOD_SEARCH_KEYWORD:function(state,keyword){
		state.vodSearchKeyword=keyword
	},
	SET_LIVE_SEARCH_KEYWORD:function(state,keyword){
		state.liveSearchKeyword=keyword
	},*/
	SET_IS_FIRST_SEARCH:function(state,isFirst){
		state.isFirstSearch=isFirst
	},
	SET_STATUS(state,status){
		state.status=status
	}
}