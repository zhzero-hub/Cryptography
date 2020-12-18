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
    ...mapState(['publicKey'])
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
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
      console.log(this.value4)
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

</style>