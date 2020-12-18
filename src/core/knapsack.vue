<template>
  <div class="hello">
      <div class="input1" style="line-height: 50px">
        <div class="inputMessage">输入内容</div>
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="message">
          <el-button @click="encode" type="primary" slot="append">加密</el-button>
        </el-input>
      </div>
    <el-tabs @tab-click="handleClick">
      <template v-for="(item , index) in knapsackItems">
        <el-tab-pane :label="item.title" :name="item.title" :key="index">{{ item.title }}</el-tab-pane>
      </template>
    </el-tabs>

    <router-view></router-view>

    <div class="button">
      <el-button @click="encode" type="primary">加密</el-button>
      <el-button @click="decode" type="primary">解密</el-button>
    </div>
    <div class="">

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
      encodedMessage: '',
      decodedMessage: '',
      q: 881n,
      r: 588n,
      secretKey: [2n, 7n, 11n, 21n, 42n, 89n, 180n, 354n],
      crackBaseDecoder: null,
    }
  },
  computed: {
    ...mapState(['publicKey' , 'knapsackItems']),
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
