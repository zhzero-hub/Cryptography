<template>
  <div class="left">
    <el-radio-group v-model="isCollapse">
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
          <el-menu-item @click="handleTitle(item.index , index1)" :index="list.path" v-if="list.item != null" :key="index">{{list.item}}</el-menu-item>
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
    },
    //点击标题传递参数给navigator组件
    handleTitle(index , index1) {
      this.bus.$emit('sendIndex',index)
      this.bus.$emit('itemIndex',index1)
    }
  }
}
</script>

<style>
.el-menu-vertical-demo .el-submenu__title {
  overflow: hidden;
}
.left-width .iconfont {
  font-size: 18px;
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.left {
  height: 100vh;
  background-color: #409EFF;
  z-index: 1;
}
#left .el-menu-vertical-demo .title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 14px;
}
.el-submenu {
  border-bottom: 1px solid #eeeeee0f !important;
}
.el-submenu__title:hover {
  background-color: #fff;
}
.el-submenu__title i {
  color: #fbfbfc !important;
}
</style>