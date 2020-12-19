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
        </div>
      </div>
    <el-tabs @tab-click="handleClick" style="padding-bottom: 20px">
      <template v-for="(item , index) in knapsackItems">
        <el-tab-pane :label="item.title" :name="item.title" :key="index">{{ item.title }}</el-tab-pane>
      </template>
    </el-tabs>
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {
  Decoder, Encoder, Cracker
} from 'merkle-hellman'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      message: 'Hello World',
      decoder: '',
      encoder: '',
      crackBaseDecoder: null,
    }
  },
  computed: {
    ...mapState(['publicKey' , 'secretKey' , 'usedPublicKey' , 'usedSecretKey' , 'q' , 'r' , 'knapsackItems']),
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
    }
  },
  methods: {
    handleClick(tab) {
      //console.log(this.knapsackItems[tab.index])
      this.$router.push(this.knapsackItems[tab.index].path)
    },
    encode() {
      if(this.message !== '') {
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
      }
    },
    decode() {
      if(this.encodedMessage !== '') {
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

</style>
