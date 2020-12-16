<template>
  <div class="hello">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="加密内容" prop="message" class="inputMessage">
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="formLabelAlign.message">
        </el-input>
      </el-form-item>
      <div class="publicKey">
        <el-checkbox v-model="checked">
          <el-form-item label="公开密钥"></el-form-item>
        </el-checkbox>
        <el-input
            placeholder="指定公开钥，可选"
            v-model="formLabelAlign.publicKey"
            :disabled="!checked">
        </el-input>
      </div>
    </el-form>

    <div class="button">
    <el-button @click="encode" type="primary">加密</el-button>
    <el-button @click="decode" type="primary">解密</el-button>
    </div>
    <div v-if="encodedMessage !== ''">
      加密密文：{{ encodedMessage }}
    </div>
    <div v-if="decodedMessage !== ''">
      解密明文：{{ decodedMessage }}
    </div>
    <div v-if="formLabelAlign.publicKey !== ''">
      密钥：{{ publicKey }}
    </div>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  Decoder, Encoder, Cracker
} from 'merkle-hellman'
const q = 881;
const r = 588;
const secretKey = [2, 7, 11, 21, 42, 89, 180, 354];
const publicKey = [295, 592, 301, 14, 28, 353, 120, 236];

const originalDecoder = Decoder.from({ secretKey, q, r });
const encoder = new Encoder(originalDecoder.publicKey);
const cracker = new Cracker();

const secretInfo = cracker.crack(originalDecoder.publicKey);

const crackBaseDecoder = Decoder.from(secretInfo);

const message = 'Hello World';

const encodedMessage = encoder.encode(message);
const decodedMessage = crackBaseDecoder.decode(encodedMessage);

console.log(`Source message: ${message}`);
console.log(`Encoded message: ${encodedMessage}`);
console.log(`Decoded message: ${decodedMessage}`);

console.log();

console.log(`Public key: ${publicKey}`);
console.log(`Secret key: ${secretKey}`);
console.log(`Cracked secret key: ${secretInfo.secretKey}`);
export default {
  data() {
    return {
      labelPosition: 'top',
      checked: false,
      formLabelAlign: {
        message: 'Hello World',
        publicKey: ''
      },
      decoder: '',
      encoder: '',
      encodedMessage: '',
      decodedMessage: '',
      q: 881,
      r: 588,
      secretKey: [2, 7, 11, 21, 42, 89, 180, 354],
      publicKey: [295, 592, 301, 14, 28, 353, 120, 236],
    }
  },
  created() {
    this.decoder = new Decoder()
    this.encoder = new Encoder(this.decoder.publicKey)
    this.publicKey = this.decoder.publicKey
  },
  methods: {
    encode() {
      if(this.formLabelAlign.message !== '') {
        this.encodedMessage = this.encoder.encode(this.formLabelAlign.message);
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
        this.decodedMessage = this.decoder.decode(this.encodedMessage);
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
</style>
