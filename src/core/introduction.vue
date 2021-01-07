<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" id="intro">
      <el-collapse-item title="背景 Background" name="1">
        <div>
          1976年，Diffie和Hellman提出了公钥密码学的思想。
        </div>
        <div>
          1978年，Merkel和Hellman在论文"Hiding information and signatures in trapdoor knapsacks"中基于背包问题构造了陷门单向函数，给出了著名的背包公钥密码体制。
        </div>
        <div>
          背包公钥密码体制体现了公钥密码的设计思想，揭示了公钥密码的本质，被誉为打开公钥密码大门的一块敲门砖。
        </div>
      </el-collapse-item>
      <el-collapse-item title="内容 Content" name="2">
        <div>
          设 <img src="http://latex.codecogs.com/gif.latex?A=(a_1, a_2, ..., a_n)" /> 是由n个不同的正整数构成的n元组，s是另一已知的正整数。背包问题就是从A中求出所有的 <img src="http://latex.codecogs.com/gif.latex?a_i" /> ，使其和等于s。其中A称为背包向量，s是背包的容积。
        </div>
        <div>
          例如，<img src="http://latex.codecogs.com/gif.latex?A=(43,129,215,473,903,302,561,1165,697,1523), s=3231" />
        </div>
        <div>
          由于 3231=129+473+903+561+1165
          所以从A中找出满足要求的数有129、473、903、561、1165。
        </div>
        <div>
          如果解存在的话，通过检查A的所有子集，总可以找出问题的解。如果A中元素个数 <img src="http://latex.codecogs.com/gif.latex?n" /> 很大，子集个数 <img src="http://latex.codecogs.com/gif.latex?2^n" /> 也会十分庞大，然而寻找满足A的子集没有比穷举法更好的算法，因此背包问题是NPC问题。
        </div>
      </el-collapse-item>
      <el-collapse-item title="单向函数 One-way function" name="3">
        <div>
          由背包问题构造公钥密码体制同样是要构造一个单向函数 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> ，将元素选取选取与否所构成的二进制数据作为自变量x，将背包容量s作为因变量 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> ，
          已知由x求 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> 很简单，而已知 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> 求解x十分艰难。
        </div>
        <div>
          用 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> 对明文消息m进行加密时，首先将m写成二元表示，再将其分为长为n的分组（最后一个分组不够长的话，可在后面填充一些0），然后求每一分组的函数值，以函数值作为密文分组。
        </div>
      </el-collapse-item>
      <el-collapse-item title="易解的超递增背包 Super-increasing knapsack" name="4">
        <div>
          解密运算分别以每一密文分组作为背包容积，求背包问题的解。为了接收方能够破解还需要找到单向函数 <img src="http://latex.codecogs.com/gif.latex?f(x)" /> 的陷门。为此引入一种特殊类型的背包向量——超递增背包向量。
        </div>
        <div>
          已知s为背包容积，对A 从右向左检查每一个元素，以确定是否在解中。若s≥an，则an在解中，令xn=1，同时令s=s-an，循环进行检查；若s＜an，则an不在解中，令xn=0，s不变并继续进行检查。
          循环检查直到检查出 <img src="http://latex.codecogs.com/gif.latex?a_1" /> 是否在解中，检查结束后得 <img src="http://latex.codecogs.com/gif.latex?x=(x_1x_2...x_n),B_x=(x_1x_2...x_n)^T" /> ，，其中，Bx是将x的二元表示写成的列向量。
        </div>
      </el-collapse-item>
      <el-collapse-item title="伪装 Disguise" name="5">
        <div>
          如果敌手也知道超递增背包向量，就很容易解密，为此可用模乘对A进行伪装，模乘的模数k和乘数t都取为常量，满足</div>
        <div>
          <img src="http://latex.codecogs.com/gif.latex?k>\sum_{i=1}^{n}a_i, gcd(t,k)=1" />
        </div>
        <div>
          即t在模k下有乘法逆元。设
        </div>
        <div>
          <img src="http://latex.codecogs.com/gif.latex?b_i\equiv t*a_i \mod k, i=1,2...n" />
        </div>
        <div>
          得一新的背包向量 <img src="http://latex.codecogs.com/gif.latex?B=(b_1,b_2...b_n)" />，记为
          <img src="http://latex.codecogs.com/gif.latex?B\equiv t*A \mod k" />，用户以B作为自己的公开钥。
        </div>
        <div>
          然而又过了两年该体制即被破译，破译的基本思想是不必找出正确的模数k和乘数t（即陷门信息），只需找出任意模数和乘数 <img src="http://latex.codecogs.com/gif.latex?k',t'" /> ，
          使得用 <img src="http://latex.codecogs.com/gif.latex?k',t'" /> 去乘公开的背包向量B时，能够产生超递增的背包向量即可。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "introduction",
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style>
.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #FFF;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #EBEEF5;
  font-size: 20px;
  font-weight: 600;
  transition: border-bottom-color .3s;
  outline: 0;
}
.el-collapse-item__content {
  padding-bottom: 25px;
  font-size: 16px;
  color: #303133;
  line-height: 2.0;
}
</style>