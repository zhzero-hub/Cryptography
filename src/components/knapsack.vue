<template>
  <div class="hello">
    <h1>Knapsack</h1>
    <h1>{{ message }}</h1>
    <el-button @click="encode">加密</el-button>
    <el-button @click="decode">解密</el-button>
    <template v-if="encodedMessage !== ''">
      <h2>{{ encodedMessage }}</h2>
    </template>
    <template v-else-if="decodedMessage !== ''">
      <h2>{{ decodedMessage }}}</h2>
    </template>
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
      decoder: '',
      encoder: '',
      encodedMessage: '',
      decodedMessage: '',
    }
  },
  created() {
    this.decoder = new Decoder()
    this.encoder = new Encoder(this.decoder.publicKey)
  },
  methods: {
    encode() {
      this.encodedMessage = this.encoder.encode(this.message);
    },
    decode() {
      this.decodedMessage = this.decoder.decode(this.encodedMessage);
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
