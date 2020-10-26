<template>
  <div>
    <div class="body404">
      <div class="info404">
        <header id="header404" class="clearfix">
          <div class="site-name404"><i>404</i></div>
        </header>
        <section>
          <div class="title404">
            <p>可 能 我 们 真 的 走 错 了 ！</p>
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
          <router-link to="/" class="index404">点击返回</router-link>
          <el-bueeon class="index404" @click="newPic">点击刷新</el-bueeon>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    newPic () {
      window.location.reload()
    }
  },
}
</script>
<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, "PingFang SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", "tohoma,sans-serif";
}
a,
button.submit {
  color: #6e7173;
  text-decoration: none;
  -webkit-transition: all 0.1s ease-in;
  -moz-transition: all 0.1s ease-in;
  -o-transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;
}
a:hover,
a:active {
  color: #6e7173;
}
.body404 {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fff;
  background-size: auto 100%;
  text-shadow: 1px 1px 0 #fff;
}
.body-about .body404 {
  background: #fff;
}
.site-name404 {
  margin: 0 auto;
  text-align: center;
  letter-spacing: 2px;
  font: normal 80px “Helvetica Neue”, Helvetica, Arial;
  color: #444;
}
.site-name404 h1 {
  margin: 0 0 10px;
  font-size: 50px;
  line-height: 1.2;
}
.title404 span {
  font-size: 15px;
  width: 2px;
}
.site-name404 i {
  font-style: normal;
}
.title404 p {
  font-size: 20px;
  line-height: 1.5;
  margin: 0;
  color: #444;
}
.info404 {
  position: absolute;
  top: 30%;
  text-align: center;
  width: 100%;
  margin-top: -230px;
}
.body-about .info404 {
  margin-top: -180px;
}
#footer404 {
  margin-top: 30px;
  font-size: 10px;
}
.index404 {
  margin-top: 24px;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #444;
  letter-spacing: 1px;
  font-size: 14px;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  text-shadow: none;
  border: 1px solid #ccc;
  line-height: 36px;
  text-align: center;
  height: 36px;
  padding: 0 25px;
  border-radius: 16px;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  background-color: #fff;
  color: #999;
  margin-left: 10px;
}
.index404:hover {
  color: #f77b83;
  border-color: #f77b83;
  outline-style: none;
}
.icon-about {
  padding: 10px 0 25px;
}
.icon-about a {
  font-size: 20px;
  margin: 5px;
  color: #fff;
  background-color: #000;
  border-radius: 100%;
  padding: 6px;
}
.widget_ui_textads {
  height: 500px;
  img {
    height: 100%;
  }
}
</style>