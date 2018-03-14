<template>
  <div class="avatar-upload">
    <div class="header">
      <span>头像上传</span>
      <i class="el-icon-circle-close-outline close-btn" @click="$emit('close')"></i>
    </div>
    <div class="body">
      <div class="default">
        <div class="title">系统头像</div>
        <div class="body">
          <div class="avatar-wrapper" v-for="item in defaultAvatar" @click="setDefaultAvatar(item)">
            <img class="avatar" :src="'http://hyh.bojiatouzi.com/'+item">
          </div>
          <!--           <img src="../../../assets/logo.png" class="avatar" />
          <img src="../../../assets/book.png" class="avatar"> -->
        </div>
      </div>
      <div class="customer">
        <div class="title">上传自定义头像</div>
        <div class="body">
          <el-upload class="avatar-uploader" action="http://hyh.bojiatouzi.com/User/upLoadAvatar" :show-file-list="false" :on-success="handleAvatarSuccess" :data="{user_id:userInfo.userid}" name="photo" :with-credentials="true">
              <img v-if="userInfo.imgeUrl" :src='"http://hyh.bojiatouzi.com/"+userInfo.imgeUrl' :style="{height:'50px',width:'50px'}">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      defaultAvatar: []
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log('suceess')
      // console.log('res',res)
      this.$store.commit('SET_USERINFO', { ...this.userInfo, imgeUrl: res.data.imgeUrl })
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    setDefaultAvatar(imageUrl) {
      this.$axios.post('user/setAvatarUrl', {
        user_id: this.userInfo.userid,
        imageUrl
      }).then(({ data }) => {
        this.$store.commit('SET_USERINFO', { ...this.userInfo, imgeUrl: imageUrl })
      })
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.$axios.post('public/getDefaultAvatar').then(({ data }) => {
      this.defaultAvatar = data.data
    })
  }
}

</script>
<style type="text/css" scoped>
.avatar-uploader-icon:hover {
  border-color: #409EFF;
}


.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 25px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar-upload {
  width: 400px;
  background-color: #fff;
  color: #2d2f33;
  border: 1px solid black;
  border-radius: 5px;
}

.header {
  border-bottom: 1px solid #e6ebf5;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-size: 20px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 25px;
}

.avatar-upload>.body {
  padding: 10px;
}

.avatar-wrapper {
  width: 60px;
  height: 60px;
  border: 1px solid #e6ebf5;
  border-style: dashed;
  display: inline-block;
  position: relative;
  cursor: pointer;

  /*  display: flex;
  align-items:center;
  justify-content:center;*/
}

.avatar-wrapper img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.avatar-wrapper:nth-child(n+2) {
  margin-left: 10px;
}

.default .body,
.customer .body {
  padding: 10px;
  /*  border: 1px solid #e6ebf5;
  border-style: dashed;*/
}

.default {
  margin-bottom: 10px;
}

</style>
