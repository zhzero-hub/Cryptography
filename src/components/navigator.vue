<template>
  <div id="nav">
    <el-page-header @back="goBack" :content=content.item></el-page-header>
  </div>
</template>

<script>
import store from '@/store/store'
import {mapState} from 'vuex'

export default {
  name: 'navigator',
  data() {
    return {
      active: [],
      content: [],
      index1: null,
    }
  },
  computed: {
    ...mapState(['menu'])
  },
  methods: {
    getIndex() {
      this.bus.$on('sendIndex',(data)=>{
        this.active = store.state.menu[data - 1]
        console.log(this.active)
        this.index1 = data
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getIndex()
  }
}
</script>

<style scoped>
#nav .el-page-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 30px;
}
#nav .el-page-header__content {
  font-size: 22px;
  color: #303133;
}

</style>
