<!-- 首页 -->
<template>
  <el-container>
    <el-header>
      <header1></header1>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <main-left></main-left>
      </el-aside>
      <el-container>
        <el-main>
          <h1>首页</h1>
          <el-button @click="jumpKnapSack">背包密码体制</el-button>
          <el-button @click="jumpRabin">Rabin密码体制</el-button>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import mainLeft from "@/components/mainLeft";
import header from "@/components/header";

export default {
  name: "index",
  components: {
    header1: header,
    mainLeft: mainLeft,
  },
  methods: {
    jumpKnapSack() {
      this.$router.push({path: '/knapsack'})
    },
    jumpRabin() {
      this.$router.push({path: '/rabin'})
    }
  }
}
</script>

<style scoped>

</style>