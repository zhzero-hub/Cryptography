<template>
  <div style="text-align: center">
    <el-transfer class="publicKey"
                 style="text-align: left; display: inline-block"
                 v-model="value4"
                 filterable
                 :titles="['备选公钥', '公钥列表']"
                 :button-texts="['移除', '添加']"
                 :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'}"
                 @change="handleChange"
                 :data="data">
      <span slot-scope="{ option }">"{{ option.key }}": {{ option.label }}</span>
      <div class="inputPublicKey" slot="left-footer" v-show="addPublicKeyState">
        <el-input id="inputKey1"
                  placeholder="请输入内容"
                  v-model="inputPublicKey"
                  clearable>
          <el-button class="transfer-footer-cancel" type="text" @click="cancelPublicKey"
                     slot="prepend" >
            <i class="el-icon-circle-close"></i>
          </el-button>
          <el-button class="transfer-footer-affirm" type="text" @click="addPublicKey"
                     slot="suffix">确认</el-button>
        </el-input>
      </div>
      <el-button class="transfer-footer" slot="left-footer" size="small" type="primary" @click="showInputPublicKey">添加</el-button>
      <el-button class="transfer-footer" slot="left-footer" size="small" type="danger" @click="deletePublicKey">删除</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small" type="primary">添加</el-button>
    </el-transfer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "publicKeyManage",
  data() {
    return {
      data: [],
      value4: [],
      addPublicKeyState: false,
      inputPublicKey: '',
      labelPosition: 'left',
      checked: false,
    }
  },
  created() {
    this.generateData()
  },
  computed: {
    ...mapState(['publicKey']),
    usedPublicKey: {
      get() {
        return this.$store.state.usedPublicKey
      },
      set(val) {
        this.$store.state.usedPublicKey = val
      }
    }
  },
  methods: {
    handleChange(value) {
      //console.log(value)
      this.usedPublicKey = []
      for(let i in value) {
        this.usedPublicKey.push(this.publicKey[value[i] - 1])
      }
      //console.log(this.usedPublicKey)
    },
    showInputPublicKey() {
      this.addPublicKeyState = !this.addPublicKeyState
    },
    cancelPublicKey() {
      this.addPublicKeyState = false
      this.inputPublicKey = ''
    },
    addPublicKey() {
      if(this.inputPublicKey === '') {
        this.$message.error('添加失败')
        return
      }
      this.publicKey.push(this.inputPublicKey)
      this.data.push({
        key: this.data.length + 1,
        label: this.inputPublicKey.toString(),
        disabled: false,
      })
      this.inputPublicKey = ''
      this.addPublicKeyState = false
      this.$message({
        message: '添加成功',
        type: "success"
      })
    },
    deletePublicKey() {
      console.log(this.usedPublicKey)
    },
    generateData() {
      for (let i = 0; i < this.publicKey.length;i ++) {
        this.data.push({
          key: i + 1,
          label: this.publicKey[i].toString(),
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
.el-transfer-panel__body {
  height: 250px;
}
.el-transfer-panel__list.is-filterable {
  height: 200px;
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