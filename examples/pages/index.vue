<template>
  <div  class="pg-index">
    <div class="index-container">
      <img width="600px" src="../assets/img/logo.jpg">
      <p>一套为田田云公司开发的基于 Vue 2.0 的桌面端组件库</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="{name: 'giud'}">开始使用</router-link>
        <a target="_blank" class="btn-github" href="https://github.com/ttyunDevGroup/tty-ui">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        height: document.documentElement.clientHeight
      }
    }
  }
</script>
<style type="text/less" lang="less">
  .pg-index {
    .index-container {
      width: 960px;
      margin: 0 auto;
      text-align: center;
      padding: 100px 0;
      p{
        margin-top: 56px;
        color: #00a53c;
        font-size: 32px;
      }
    }
    .separate-panel{
      position: relative;
      .about{
        position: absolute;
        width: 100%;
        height: 200px;
        top: 20px;
        z-index: 9;
        background: #fff;
        text-align: center;
        a {
          color: #fff;
          background-image: linear-gradient(90deg, #60ff9a 0%, #00a53c 100%);
          box-shadow: 0 2px 6px 0 rgba(51,105,231,0.4);
          display: inline-block;
          width: 190px;
          height: 56px;
          margin: 0 35px;
          font-size: 18px;
          line-height: 56px;
          border-radius: 28px;
          transition: all .3s;
          cursor: pointer;
        }
        .btn-github{
          color: #00a53c;
          border: 1px solid #00a53c;
          background: #fff;
          box-shadow: none;
        }
      }
    }
    // .separate-panel:after{
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   top: -80px;
    //   width: 100%;
    //   height: 250px;
    //   background: #fff;
    //   box-shadow: 0 -4px 30px 0 #DFE1E6;
    //   transform: skewY(-4deg);
    // }
  }
</style>
