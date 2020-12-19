<template>
  <div style="padding-bottom: 100px">
    <el-tabs id="message" type="border-card">
      <div style="text-align: right; height: 0">
        <el-select v-model="value">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-tab-pane label="加密 / 解密结果">
        <div style="line-height: 50px">
          <template v-if="value === 1">
            <div v-if="encodedMessage !== ''">
              加密信息: {{ encodedMessage }}
            </div>
          </template>
          <template v-else>
            <div v-if="encodedMessage !== ''">
              加密信息:
              <template v-for="item in encodedMessage">
                {{ item }},
              </template>
            </div>
          </template>
          <div v-if="decodedMessage !== ''">
            解密信息: {{ decodedMessage }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="素数配置">配置管理</el-tab-pane>
      <el-tab-pane label="公钥配置">角色管理</el-tab-pane>
      <el-tab-pane label="私钥配置">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "footer",
  data() {
    return {
      options: [{
        value: 1,
        label: 'Raw json'
      }, {
        value: 2,
        label: 'Message only'
      }],
      value: ''
    }
  },
  computed: {
    ...mapState(['encodedMessage' , 'decodedMessage'])
  }
}
</script>

<style>
.el-tabs--border-card>.el-tabs__content {
  padding: 15px 15px 55px 15px;
}
</style>