<template>
  <div class="hello">
      <div class="input1">
        <div class="inputMessage">输入内容</div>
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="message">
        </el-input>
      </div>
    <div class="publicKeyTable">
      <template v-for="key in publicKey">
        {{ key }}
      </template>
    </div>
    <div style="text-align: center">
      <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value4"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['备选公钥', '公钥列表']"
          :button-texts="['移除', '添加']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'}"
          @change="handleChange"
          :data="data">
        <span slot-scope="{ option }">"{{ option.key }}": {{ option.label }}</span>
        <el-button class="transfer-footer" slot="left-footer" size="small" type="primary" @click="addPublicKey">添加</el-button>
        <el-button class="transfer-footer" slot="left-footer" size="small" type="danger">删除</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small" type="primary">添加</el-button>
      </el-transfer>
      <div class="inputPublicKey">
        <el-input id="inputKey1"
            placeholder="请输入内容"
            v-model="inputPublicKey"
            clearable>
        </el-input>
      </div>


    </div>

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
    <div v-if="publicKey !== ''">
      密钥：{{ publicKey }}
    </div>
  </div>
</template>

<script>
import {
  Decoder, Encoder, Cracker
} from 'merkle-hellman'

export default {
  data() {
    // eslint-disable-next-line no-unused-vars
    const generateData = _ => {
      const publicKey = [295, 592, 301, 14, 28, 353, 120, 236]
      const data = [];
      for (let i = 0; i < publicKey.length;i ++) {
        data.push({
          key: i + 1,
          label: publicKey[i].toString(),
          disabled: false
        });
      }
      return data;
    };
    return {
      labelPosition: 'left',
      checked: false,
      message: 'Hello World',
      inputPublicKey: '',
      decoder: '',
      encoder: '',
      encodedMessage: '',
      decodedMessage: '',
      q: 881n,
      r: 588n,
      secretKey: [2n, 7n, 11n, 21n, 42n, 89n, 180n, 354n],
      publicKey: [295, 592, 301, 14, 28, 353, 120, 236],
      crackBaseDecoder: null,
      data: generateData(),
      value: [1],
      value4: [1],
      addPublicKeyState: false
    }
  },
  created() {
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    addPublicKey() {
      this.addPublicKeyState = true
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
</style>
