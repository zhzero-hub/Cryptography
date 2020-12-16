<template>
  <div class="hello">
    <h1>Knapsack</h1>
    <h2>{{ message }}</h2>
    <el-button @click="encode">加密</el-button>
    <el-button @click="decode">解密</el-button>
    <div v-if="encodedMessage !== ''">
      加密密文：{{ encodedMessage }}
    </div>
    <div v-if="decodedMessage !== ''">
      解密明文：{{ decodedMessage }}
    </div>
    <div v-if="publicKey !== ''">
      密钥：{{ publicKey }}
    </div>
  </div>
</template>

<script>
import {
  Decoder, Encoder,
} from 'merkle-hellman'

export default {
  data() {
    return {
      message: 'Hello World',
      publicKey: '',
      decoder: '',
      encoder: '',
      encodedMessage: '',
      decodedMessage: '',
    }
  },
  created() {
    this.decoder = new Decoder()
    this.encoder = new Encoder(this.decoder.publicKey)
    this.publicKey = this.decoder.publicKey
  },
  methods: {
    encode() {
      if(this.message !== '') {
        this.encodedMessage = this.encoder.encode(this.message);
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
</style>
