<template>
  <div class="login-box">
    <div class="content">
      <h3>欢迎来到ABEL后台管理系统</h3>
      <form>
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
        <el-input class="pwd" placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-button class="login-btn" type="primary" @click="submit">主要按钮</el-button>
        <div class="long-text">
          <p>温馨提示：</p>
          <p>未登录过的新用户，自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      pwd: ''
    }
  },
  methods: {
    submit() {
      if(this.input === 'admin' && this.pwd === 'admin') {
        this.$router.push('/type')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-box
    position fixed
    left 0
    top 0
    z-index 100000
    width 100%
    height 100%
    background-color #324057
    .content
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        margin auto
        width 320px
        height 210px
        border-radius 10px
        text-align center
        box-sizing border-box
        background-color #ffffff
        padding 20px
        h3
            position absolute
            top -70px
            width 320px
            font-size 20px
            text-align center
            color #ffffff

        .pwd
            margin-top 5px
        .login-btn
            margin-top 5px
            width 100%

        .long-text
            font-size 12px
            color red
            text-align center
            p
                margin-top 5px
</style>
