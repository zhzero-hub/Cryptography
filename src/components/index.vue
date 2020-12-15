<!-- 首页 -->
<template>
  <div>
    <h1>首页</h1>
    <el-button @click="jump">背包密码体制</el-button>
  </div>
</template>

<script>

export default {
  name: "index",
  methods: {
    jump() {
      this.$router.push({path: '/knapsack'})
    }
  }
}
</script>

<style scoped>

</style>