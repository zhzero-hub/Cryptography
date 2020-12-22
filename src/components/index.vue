<!-- 首页 -->
<template>
  <el-container>
    <el-header>
      <topHeader></topHeader>
    </el-header>
    <el-container>
      <el-aside style="width: 15%">
        <main-left></main-left>
      </el-aside>
      <el-container>
        <el-main class="main">
          <navigator></navigator>
          <router-view></router-view>
        </el-main>
        <el-footer>

        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import mainLeft from "@/components/mainLeft";
import header from "@/components/header";
import navigator from "@/components/navigator";

export default {
  name: "index",
  components: {
    topHeader: header,
    mainLeft: mainLeft,
    navigator: navigator,
  },
  methods: {
    jumpKnapsack() {
      this.$router.push({path: '/primeManage'})
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