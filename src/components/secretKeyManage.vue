<template>
  <div style="text-align: center">
    <div>
      <el-transfer class="secretKey"
                   style="text-align: left; display: inline-block"
                   v-model="value"
                   filterable
                   :titles="['备选私钥', '私钥列表']"
                   :button-texts="['移除', '添加']"
                   :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'}"
                    @change="handleChange"
                   :data="data">
        <span slot-scope="{ option }">密钥{{ option.key }}: {{ option.label }}</span>
      </el-transfer>
    </div>
    <div style="line-height: 50px">
      <el-button class="transfer-footer" size="primary" type="primary" @click="showInputSecretKey">添加</el-button>
      <el-button class="transfer-footer" size="primary" type="danger" @click="deleteSecretKey">删除</el-button>
      <div class="inputSecretKey" v-show="addSecretKeyState" style="line-height: 70px">
        <el-input id="inputKey1" size="large"
                  placeholder="请输入内容"
                  v-model="inputSecretKey"
                  clearable>
          <el-button class="transfer-footer-cancel" type="text" @click="cancelSecretKey"
                     slot="prepend" size="large">
            <i class="el-icon-circle-close"></i>
          </el-button>
          <el-button class="transfer-footer-affirm" type="text" @click="addSecretKey"
                     slot="suffix">确认</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
const BigInteger = require('biginteger').BigInteger;

export default {
  name: "secretKeyManage",
  data() {
    return {
      data: [],
      value: [],
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
    secretKey: {
      get() {
        return this.$store.state.secretKey
      },
      set(val) {
        this.$store.state.secretKey = val
      }
    },
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
    generateData() {
      this.data = []
      this.value = []
      for (let i = 0; i < this.secretKey.length;i ++) {
        this.data.push({
          key: i + 1,
          label: this.secretKey[i].key.toString(),
          disabled: false,
        })
        if(this.secretKey[i].used) {
          this.value.push(i + 1)
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleChange(value , direction , moved) {
      console.log(value , direction , moved)
      if(direction === "left") {
        for(let index in moved) {
          this.secretKey[moved[index] - 1].used = false
        }
      }
      else {
        for(let index in moved) {
          this.secretKey[moved[index] - 1].used = true
        }
      }
      console.log(this.secretKey)
      this.secretKey.sort(function(a , b) {
        return a.key - b.key
      })
      this.generateData()
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
      this.secretKey.push({
        key: BigInteger(this.inputSecretKey.toString()),
        used: false
      })
      //console.log(this.usedSecretKey)
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
      this.generateData()
    },
    deleteSecretKey() {
      console.log(this.usedSecretKey)
    },
  }
}
</script>

<style>
.el-input-group__prepend {
  border-right: 0;
  text-align: center;
}
.el-transfer-panel__body {
  height: 300px;
}
.el-transfer-panel__list.is-filterable {
  height: 250px;
  padding-top: 0;
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