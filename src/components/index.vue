<!-- 首页 -->
<template>
  <el-container>
    <el-header>
      <topHeader></topHeader>
    </el-header>
    <el-container>
      <el-aside>
        <main-left></main-left>
      </el-aside>
      <el-container>
        <el-main class="main">
          <navigator></navigator>
          <router-view></router-view>
        </el-main>
        <el-divider>加密 / 解密结果</el-divider>
        <el-footer>
          <footer1></footer1>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import mainLeft from "@/components/mainLeft";
import header from "@/components/header";
import navigator from "@/components/navigator";
import footer from "@/components/footer";

export default {
  name: "index",
  components: {
    topHeader: header,
    mainLeft: mainLeft,
    navigator: navigator,
    footer1: footer,
  },
  methods: {
    jumpKnapsack() {
      this.$router.push({path: '/knapsack'})
    },
    jumpRabin() {
      this.$router.push({path: '/rabin'})
    }
  }
}
</script>

<style>
.main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 30px;
}
.el-aside {
  width: auto;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 10px;
}
</style>