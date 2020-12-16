<!-- 首页 -->
<template>
  <div>
    <h1>首页</h1>
    <el-button @click="jumpKnapSack">背包密码体制</el-button>
    <el-button @click="jumpRabin">Rabin密码体制</el-button>
  </div>
</template>

<script>

export default {
  name: "index",
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