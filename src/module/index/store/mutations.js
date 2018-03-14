export default{
	SET_USERINFO:function(state,info){
		console.log('info',info)
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
/*	SET_IS_FIRST_SEARCH:function(state,isFirst){
		console.log('commit first:',isFirst)
		state.isFirstSearch=isFirst
	},*/
	SET_STATUS(state,status){
		state.status=status
	},
	SET_LIVE_KEYWORD:function(state,keyword){
		state.liveKeyword=keyword
	},
	SET_VOD_KEYWORD:function(state,keyword){
		state.vodKeyword=keyword
	},
	SET_SELECTED_CATEGORY:function(state,category){
		state.selectedCategory=category
	},
	SET_SELECTED_VIDEO:function(state,video){
		state.selectedVideo=video
	},
	SET_PWD_CODE:function(state,pwdCode){
		state.pwdCode=pwdCode
	}
}