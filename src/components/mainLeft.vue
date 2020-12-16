<template>
  <div class="left">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    </el-radio-group>
    <el-menu
      :default-active="$route.path"
      active-text-color="#E6A23C"
      text-color="#FFFFFF"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#409EFF"
      router>
      <el-submenu v-for="(item,index) in menu" :index='item.index' :key="index">
        <template slot="title">
          <div class="left-width">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title" class="title">{{item.title}}</span>
          </div>
        </template>
        <el-menu-item-group v-for="(list,index1) in item.content" :key="index1">
          <el-menu-item :index="list.path" v-if="list.item != null">{{list.item}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'mainLeft',
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['isCollapse' , 'menu'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>