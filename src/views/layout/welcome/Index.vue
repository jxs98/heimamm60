<template>
  <div class="top">
    <div class="body404">
      <div class="usertip">
        尊贵的:{{ $store.getters.getUserInfo.username
        }}<br />黑马面面欢迎你!<br />你的角色是:{{
          $store.getters.getUserInfo.role
        }}
      </div>
      <div class="info404">
        <div class="meinvImg">
          <div class="title404">
            <div class="site-name404">欢迎来到黑马面面!</div>

            <p>这 一 次 我 们 没 有 走 错!</p>
            <!-- <span>---江训慎出品</span> -->
            <br />
            <div class="widget widget_ui_textads">
              <img
                src="http://api.jybkw.cn/img/"
                alt="小姐姐"
                style="border-radius: 20px"
              />
            </div>
          </div>
          <el-button class="index404" @click="newPic">点击刷新</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    newPic () {

      window.location.reload()
    }
  },
}
</script>
<style lang="less" scoped>
.top {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.body404 {
  padding-top: 1px;
  .usertip {
    margin-top: 40px;
    margin-left: 20px;
    font-size: 14px;
    font-weight: 700;
    line-height: 35px;
  }
  .meinvImg {
    p {
      text-align: center;
      margin-top: 20px;
    }
    .site-name404 {
      margin-top: 20px;
      text-align: center;
      font-size: 42px;
      font-weight: 700;
    }
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    min-height: 600px;
    width: 600px;
    img {
      height: 400px;
      box-shadow: -1px 3px 14px 2px rgba(0, 0, 0, 0.3);
    }
    .index404 {
      border-radius: 10px;
      margin-top: 10px;
    }
  }
}
// button.submit {
//   color: #6e7173;
//   text-decoration: none;
//   -webkit-transition: all 0.1s ease-in;
//   -moz-transition: all 0.1s ease-in;
//   -o-transition: all 0.1s ease-in;
//   transition: all 0.1s ease-in;
// }
// a:hover,
// a:active {
//   color: #6e7173;
// }
// .body404 {
//   position: absolute;
//   height: 90%;
//   width: 100%;
//   background: #fff;
//   background-size: auto 100%;
//   text-shadow: 1px 1px 0 #fff;
// }
// .body-about .body404 {
//   background: #fff;
// }
// .site-name404 {
//   margin: 50px auto;
//   text-align: center;
//   letter-spacing: 2px;
//   font: normal 50px “Helvetica Neue”, Helvetica, Arial;
//   color: #444;
// }
// .site-name404 h1 {
//   margin: 0 0 10px;
//   font-size: 50px;
//   line-height: 1.2;
// }
// .title404 {
//   margin: 0 auto;
//   width: 600px;
// }
// .title404 span {
//   font-size: 15px;
//   width: 2px;
// }
// .site-name404 i {
//   font-style: normal;
// }
// .title404 p {
//   font-size: 20px;
//   line-height: 1.2;
//   margin: 0;
//   color: #444;
//   margin-top: -10px;
// }
// .info404 {
//   position: absolute;
//   top: 30%;
//   text-align: center;
//   width: 100%;
//   margin-top: -230px;
// }
// .body-about .info404 {
//   margin-top: -180px;
// }
// #footer404 {
//   margin-top: 30px;
//   font-size: 10px;
// }
// .index404 {
//   margin-top: 24px;
//   display: inline-block;
//   white-space: nowrap;
//   cursor: pointer;
//   background: #444;
//   letter-spacing: 1px;
//   font-size: 14px;
//   -moz-user-select: -moz-none;
//   -webkit-user-select: none;
//   -ms-user-select: none;
//   -o-user-select: none;
//   user-select: none;
//   text-shadow: none;
//   border: 1px solid #ccc;
//   line-height: 36px;
//   text-align: center;
//   height: 36px;
//   padding: 0 25px;
//   border-radius: 16px;
//   -webkit-transition-duration: 400ms;
//   transition-duration: 400ms;
//   background-color: #fff;
//   color: #999;
//   margin-left: 10px;
// }
// .index404:hover {
//   color: #f77b83;
//   border-color: #f77b83;
//   outline-style: none;
// }
// .icon-about {
//   padding: 10px 0 25px;
// }
// .icon-about a {
//   font-size: 20px;
//   margin: 5px;
//   color: #fff;
//   background-color: #000;
//   border-radius: 100%;
//   padding: 6px;
// }
// .widget_ui_textads {
//   height: 400px;
//   img {
//     height: 100%;
//   }
// }
// .usertip {
//   margin-top: 90px;
//   margin-left: 30px;
//   font-weight: 700;
//   color: #666;
//   font-size: 16px;
//   line-height: 28px;
// }
// .top {
//   width: 100%;
//   height: 100%;
// }
</style>