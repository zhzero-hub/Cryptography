<template>
  <div class="top-header">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleTitle"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item style="color: rgb(255,208,75)" @click="setBarCollapse">背包密码体制/Rabin密码体制</el-menu-item>
      <el-menu-item v-for="(item,index) in menu" :index='item.index' :key="index">
        <template slot="title">
          <div class="left-width">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title" class="title">{{item.title}}</span>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "header1",
  data() {
    return {

    }
  },
  methods: {
    //左侧栏放大缩小
    ...mapMutations(['setBarCollapse']),
    handleTitle(index) {
      this.bus.$emit('sendIndex',index)
      this.$router.push(this.menu[index - 1].path)
    }
  },
  computed: {
    ...mapState(["isCollapse","menu"]),
  },
}
</script>

<style>
.el-header {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
}
</style>