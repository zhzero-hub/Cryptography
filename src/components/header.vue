<template>
  <div class="top-header" @click="setBarCollapse">
    背包密码体制/Rabin密码体制
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "header",
  methods: {
    //左侧栏放大缩小
    ...mapMutations(['setBarCollapse']),
  },
  computed: {
    ...mapState(["isCollapse","menu"]),
  },
}
</script>

<style scoped>

</style>