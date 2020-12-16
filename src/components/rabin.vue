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
  </div>
</template>

<script>
/*
    Example usage of rabin.js
*/
const{
  generatePrivKey,
  privKeyToPubKey,
  sign,
  verify } = require('rabinsig');
let crypto;
try {
  // eslint-disable-next-line no-unused-vars
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

let key = generatePrivKey();
console.log("key p = "+key.p);
console.log("key q = "+key.q);
let nRabin = privKeyToPubKey(key.p, key.q);
console.log("key nRabin = "+nRabin);

let dataHex = Buffer.from("msg").toString('hex');
console.log("dataHex = " + dataHex);

let signatureResult = sign(dataHex, key.p, key.q, nRabin);
console.log("Signature = " + signatureResult.signature);
console.log("Padding Bytes = " + signatureResult.paddingByteCount);

let result = verify(dataHex, signatureResult.paddingByteCount, signatureResult.signature, nRabin);
console.log("Signature Verified = " + result);

export default {
  name: "rabin",
  data() {
    return {
      message: 'Hello World',
      encodedMessage: '',
      decodedMessage: ''
    }
  },
  created() {
  },
  methods: {
    encode() {
    },
    decode() {
    }
  }
}
</script>

<style scoped>

</style>