<template>
  <div class="left">
    <div class="search" style="line-height: 50px">
      <h2>Search</h2>
    </div>
    <el-collapse v-for="(item , index) in historys" @change="handleChange" :key="index" id="left-bar">
      <el-collapse-item :title="item.date" name="1">
        <template v-for="(message , index1) in item.messages">
          <div :key="index1" class="left-bar-element">
            {{ message.message }}
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: 'mainLeft',
  data() {
    return {
      historys: [{
        date: '2020年12月18日',
        messages: [
          {
            message: 'Hello World',
            publicKey: [295, 592, 301, 14, 28, 353, 120, 236],
            date: '2020年12月18日'
          },
          {
            message: 'Hello World',
            publicKey: [295, 592, 301, 14, 28, 353, 120, 236],
            date: '2020年12月18日'
          }
        ]
      }],
    };
  },
  computed: {

  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style>
.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #FFF;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #EBEEF5;
  font-size: 16px;
  font-weight: 500;
  transition: border-bottom-color .3s;
  outline: 0;
}
.left-bar-element {
  font-size: 14px;
  line-height: 50px;
}
</style>