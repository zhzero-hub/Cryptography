<template>
  <div class="hello">
      <div class="input1" style="line-height: 50px">
        <div class="inputMessage">加密内容</div>
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="message"
                  style="border-radius: 4px;
                         box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <el-button @click="encode" type="primary" slot="append">加密</el-button>
        </el-input>
        <div class="button">
          <el-button @click="encode" type="primary">加密</el-button>
          <el-button @click="decode" type="primary">解密</el-button>
          <el-button @click="crack" type="primary">破译</el-button>
        </div>
      </div>
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 20px">
      <el-tabs @tab-click="handleClick" v-model="activeTab" style="padding-bottom: 20px">
        <template v-for="(item , index) in knapsackItems">
          <el-tab-pane :label="item.title" :name="item.title" :key="index">{{ item.title }}</el-tab-pane>
        </template>
      </el-tabs>
      <router-view></router-view>
    </div>
    <div style="padding-bottom: 100px">
      <el-divider>加密 / 解密结果</el-divider>
      <el-tabs id="message" type="border-card">
        <!--<div style="text-align: right; height: 0">
          <el-select v-model="value">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>-->
        <el-tab-pane label="加密 / 解密结果">
          <div style="line-height: 50px">
              <div v-if="this.returnData.length !== 0">
                加密信息: {{ this.returnData.encodedMessage }}
              </div>
            <div v-if="this.returnData.length !== 0">
              解密信息: {{ this.returnData.decodedMessage }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="素数配置">
          <div style="line-height: 50px">
            <div v-if="this.returnData.length !== 0">
              k的值为: {{ this.returnData.k }}
            </div>
            <div v-if="this.returnData.length !== 0">
              t的值为: {{ this.returnData.t }}
            </div>
            <div v-if="this.returnData.length !== 0">
              n的值为: {{ this.returnData.n }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公钥配置">
          <div style="line-height: 50px">
            <div v-if="this.returnData.length !== 0">
              公钥配置: {{ this.returnData.publicKey }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="私钥配置">
          <div style="line-height: 50px">
            <div v-if="this.returnData.length !== 0">
              私钥配置: {{ this.returnData.secretKey }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="攻击结果">
          <div style="line-height: 50px">
            <div v-if="this.crackedKey.length !== 0">
              <div>
                已知公钥：{{ this.public1 }}
              </div>
              <div>
                破译私钥：{{ this.crackedKey }}
              </div>
              <div>
                实际使用私钥：{{ this.secret1 }}
              </div>
              <div>
                加密密文：{{ this.encodedMessage1 }}
              </div>
              <div>
                破译密文：{{ this.crackedMessage }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  Decoder, Encoder, Cracker
} from 'merkle-hellman'
import {mapState , mapMutations} from 'vuex'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
const BigInteger = require('biginteger').BigInteger;

export default {
  components: {
    //mainFooter: mainFooter
  },
  data() {
    return {
      date: new Date(),
      activeTab: '素数管理',
      options: [{
        value: 1,
        label: 'Raw json'
      }, {
        value: 2,
        label: 'Message only'
      }],
      value: '',

      message: 'Hello World',
      decoder: '',
      encoder: '',
      crackBaseDecoder: null,
      returnData: [],

      public1: [],
      secret1: [],
      encodedMessage1: '',
      crackedKey: [],
      crackedMessage: '',
    }
  },
  computed: {
    ...mapState(['secretKey' , 'k' , 't' , 'n' , 'knapsackItems']),
    encodedMessage: {
      get() {
        return this.$store.state.encodedMessage
      },
      set(val) {
        this.$store.state.encodedMessage = val
      }
    },
    decodedMessage: {
      get() {
        return this.$store.state.decodedMessage
      },
      set(val) {
        this.$store.state.decodedMessage = val
      }
    },
  },
  methods: {
    ...mapMutations(['hello']),
    handle() {
      // eslint-disable-next-line no-unused-vars
      console.log(this.date.toLocaleDateString() + " " + this.date.toLocaleTimeString())
    },
    handleClick(tab) {
      //console.log(this.knapsackItems[tab.index])
      this.$router.push(this.knapsackItems[tab.index].path)
    },
    encode() {
      /*if(this.message !== '') {
        const originalDecoder = Decoder.from({secretKey: this.secretKey , secretPair: {q: this.q , r: this.r}});
        const encoder = new Encoder(originalDecoder.publicKey);
        const cracker = new Cracker();

        const secretInfo = cracker.crack(originalDecoder.publicKey);

        this.crackBaseDecoder = Decoder.from(secretInfo);

        this.encodedMessage = encoder.encode(this.message);
        this.$message({
          message: '加密成功',
          type: "success"
        })
      }
      else {
        this.$message.error('请输入加密信息')
      }*/
      //const usedSecretKey = []
      let secretString = "["
      let i = 0
      for(;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += this.secretKey[i].key.toString()
          break
        }
      }
      for(i += 1;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += ", " + this.secretKey[i].key.toString()
        }
      }
      secretString += "]"
      this.$axios({
        url: 'knapsack/encrypt',
        method: "post",
        data: {
          message: this.message,
          publicKey: null,
          secretKey: secretString,
          tString: this.t,
          kString: this.k,
          n: this.n,
          date: this.date.toLocaleDateString(),
          type: "加密"
        }
      }).then(res => {
        if(res.data.code === 200) {
          this.returnData = res.data.data
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
        else {
          this.$message.error('加密失败')
        }
      })
    },
    decode() {
      /*if(this.encodedMessage !== '') {
        this.decodedMessage = this.crackBaseDecoder.decode(this.encodedMessage);
        if(this.decodedMessage !== '') {
          this.$message({
            message: '解密成功',
            type: "success"
          })
        }
        else {
          this.$message.error('解密失败')
        }
      }*/
      let secretString = "["
      let i = 0
      for(;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += this.secretKey[i].key.toString()
          break
        }
      }
      for(i += 1;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += ", " + this.secretKey[i].key.toString()
        }
      }
      secretString += "]"
      this.$axios({
        url: 'knapsack/decrypt',
        method: "post",
        data: {
          message: this.message,
          publicKey: null,
          secretKey: secretString,
          tString: this.t.toString(),
          kString: this.k.toString(),
          n: this.n,
          date: this.date.toLocaleDateString(),
          type: "解密"
        }
      }).then(res => {
        if(res.data.code === 200) {
          this.returnData = res.data.data
          console.log(this.returnData)
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
        else {
          this.$message.error('加密失败')
        }
      })
    },
    publicKeyGen() {
      let secretString = "["
      let i = 0
      for(;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += this.secretKey[i].key.toString()
          break
        }
      }
      for(i += 1;i < this.secretKey.length;i ++) {
        if(this.secretKey[i].used) {
          secretString += ", " + this.secretKey[i].key.toString()
        }
      }
      secretString += "]"
      this.$axios({
        url: `knapsack/getPublicKey`,
        method: "post",
        data: {
          message: this.message,
          publicKey: null,
          secretKey: secretString,
          tString: this.t.toString(),
          kString: this.k.toString(),
          n: this.n,
          date: this.date.toLocaleDateString(),
          type: "破译"
        }
      }).then( res => {
        if(res.data.code === 200) {
          this.public1 = res.data.data
        }
        else {
          this.$message.error("公钥生成失败")
        }
      })
    },
    crack() {
      this.publicKeyGen()
      for(let i = 0;i < this.secretKey.length / 2;i ++) {
        // eslint-disable-next-line no-undef
        this.secret1.push(BigInt(this.secretKey[i].key.toString()))
      }

      // eslint-disable-next-line no-undef
      const originalDecoder = Decoder.from({ secretKey: this.secret1 , secretPair: { q: BigInt(this.k), r: BigInt(this.t) }});
      const encoder = new Encoder(originalDecoder.publicKey);
      const cracker = new Cracker();
      const secretInfo = cracker.crack(originalDecoder.publicKey);
      const crackBaseDecoder = Decoder.from(secretInfo);
      const encodedMessage = encoder.encode(this.message);

      this.crackedMessage = crackBaseDecoder.decode(encodedMessage);
      this.crackedKey = secretInfo.secretKey
      this.encodedMessage1 = encodedMessage

      if(this.crackedKey.length !== 0) {
        this.$message.success("破译成功")
      }
      else {
        this.$message.error("破译失败")
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.inputMessage {
  font-weight: bold;
}
.button {
  line-height: 80px;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.publicKey >>> .el-transfer-panel__body {
  height: 300px;
}
.publicKey >>> .el-transfer-panel__list.is-filterable {
  height: 250px;
}
.publicKey >>> .el-input-group__prepend {
  text-align: center;
}
.el-tabs--border-card>.el-tabs__content {
  padding: 15px 15px 55px 15px;
}
</style>
