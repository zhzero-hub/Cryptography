<template>
  <div style="text-align: center">
    <el-transfer class="secretKey"
                 style="text-align: left; display: inline-block"
                 v-model="value4"
                 filterable
                 :titles="['备选私钥', '私钥列表']"
                 :button-texts="['移除', '添加']"
                 :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'}"
                 @change="handleChange"
                 :data="data">
      <span slot-scope="{ option }">"{{ option.key }}": {{ option.label }}</span>
      <div class="inputSecretKey" slot="left-footer" v-show="addSecretKeyState">
        <el-input id="inputKey1"
                  placeholder="请输入内容"
                  v-model="inputSecretKey"
                  clearable>
          <el-button class="transfer-footer-cancel" type="text" @click="cancelSecretKey"
                     slot="prepend" >
            <i class="el-icon-circle-close"></i>
          </el-button>
          <el-button class="transfer-footer-affirm" type="text" @click="addSecretKey"
                     slot="suffix">确认</el-button>
        </el-input>
      </div>
      <el-button class="transfer-footer" slot="left-footer" size="small" type="primary" @click="showInputSecretKey">添加</el-button>
      <el-button class="transfer-footer" slot="left-footer" size="small" type="danger" @click="deleteSecretKey">删除</el-button>
    </el-transfer>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "secretKeyManage",
  data() {
    return {
      data: [],
      value4: [],
      addSecretKeyState: false,
      inputSecretKey: '',
      labelPosition: 'left',
      checked: false,
    }
  },
  created() {
    this.generateData()
  },
  computed: {
    ...mapState(['secretKey']),
    usedSecretKey: {
      get() {
        return this.$store.state.usedSecretKey
      },
      set(val) {
        this.$store.state.usedSecretKey = val
      }
    }
  },
  methods: {
    handleChange(value) {
      //console.log(value)
      this.usedSecretKey = []
      for(let i in value) {
        this.usedSecretKey.push(this.secretKey[value[i] - 1])
      }
      //console.log(this.usedSecretKey)
    },
    showInputSecretKey() {
      this.addSecretKeyState = !this.addSecretKeyState
    },
    cancelSecretKey() {
      this.addSecretKeyState = false
      this.inputSecretKey = ''
    },
    addSecretKey() {
      if(this.inputSecretKey === '') {
        this.$message.error('添加失败')
        return
      }
      this.secretKey.push(this.inputSecretKey)
      this.data.push({
        key: this.data.length + 1,
        label: this.inputSecretKey.toString(),
        disabled: false,
      })
      this.inputSecretKey = ''
      this.addSecretKeyState = false
      this.$message({
        message: '添加成功',
        type: "success"
      })
    },
    deleteSecretKey() {
      console.log(this.usedSecretKey)
    },
    generateData() {
      for (let i = 0; i < this.secretKey.length;i ++) {
        this.data.push({
          key: i + 1,
          label: this.secretKey[i].toString(),
          disabled: false
        });
      }
    },
  }
}
</script>

<style>
.el-input-group__prepend {
  border-right: 0;
  text-align: center;
  padding: 10px;
  color: red;
}
.el-transfer-panel .el-transfer-panel__footer {
  height: 40px;
  background: #FFF;
  margin: 0;
  padding: 0;
  border-top: 1px solid #EBEEF5;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  text-align: center;
}
</style>