# JZJT Api说明文档
# 格式:
	route()
		type param
		return
### 注册登录找回密码
	/user/register  //注册:手机号，密码，手机验证码，昵称
		post  {phoneNumber,password,checkCode,nickname}
		{status:201,data:{userid,nickname}}
		{status:422,error:{'该手机号已注册'}}
		{status:422,error:{'昵称已存在'}}
		{status:422,error:{'验证码无效'}}

	/user/login  //登录：手机号，密码
		post {phoneNumber,password}
		{status:201,data:{userid,nickname}}
		{status:422,error:{'手机号尚未注册'}}
		{status:422,error:{'密码错误'}}

	/user/sendCheckcode //发送验证码：手机号
		post {telephone}
		{status:200}

	/user/setPassword  //设置新密码：用户id，新密码
		post
		{userid,password}
		{status:200}

### 我的脚步
	/*
	脚步用于记录用户观看点播或直播的记录，建议建一个点播信息表，一个直播信息表。
	 */
	/record/addRecord //添加记录：用户id，视屏id，视屏类型（vod表示点播视屏，live表示在线直播），该记录产生的时刻
		post {type,videoId,userId,timestamp}
		{status:201} //成功
	/record/getAllRecords //查询记录：用户id
		post {userId}
		{status:200,data:{[title,type,category]}} //视屏名称，视屏类型，视屏类别（所有视屏被分成数学，历史，语文等类别）
[timestamp计算方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

### 钱包余额
	/*
	钱包=余额+赠送金额（分享赠送金额+完善信息赠送金额+其他活动赠送金额）
	 */
	/user/getWallet //查询钱包
		post {userId}
		{status:200,data:{balance,award}}

