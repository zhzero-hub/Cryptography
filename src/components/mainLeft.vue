<template>
  <div class="left">
    <div class="search" style="line-height: 50px; text-align: center; color: #909399">
      <h3>加 密 历 史</h3>
    </div>
    <el-collapse v-for="(history , index) in historyWithDate" @change="handleChange" :key="index" id="left-bar">
      <el-collapse-item :title="handleTitle(history.date)" :name="index">
        <template v-for="(item , index1) in history.historys">
          <div :key="index1" style="line-height: 40px; text-align: center">
            <div style="display: inline; font-size: 16px; font-weight: 500">
              {{ item.type }} —— {{ item.id }}
            </div>
            <div style="float: right">
              <el-button slot="reference" @click="handleEdit(item.id)" size="small" type="text">查看详情</el-button>
            </div>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
        title="加密详情"
        :visible.sync="visible"
        width="30%">
      <section>
        <div class="show">
          <div>
            {{ form.type }}序号: {{ form.id }}
          </div>
          <div>
            明文消息：{{ form.decodedMessage }}
          </div>
          <div>
            密文消息：{{ form.encodedMessage }}
          </div>
          <div>
            公钥：{{ form.publicKey }}
          </div>
          <div>
            私钥：{{ form.secretKey }}
          </div>
          <div>
            k：{{ form.kString }}
          </div>
          <div>
            t：{{ form.tString }}
          </div>
          <div>
            n：{{ form.n }}
          </div>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'mainLeft',
  data() {
    return {
      historys: [],
      historyWithDate: [],
      dialogVisible: false,
      visible: false,
      form: [],
    };
  },
  created() {
    this.getHistory()
  },
  methods: {
    handleTitle(title) {
      let titles = title.split("/")
      let ret = titles[0]
      ret += "年"
      ret += titles[1]
      ret += "月"
      ret += titles[2]
      ret += "日"
      return ret
    },
    getHistory() {
      this.$axios({
        url: '/knapsack/findAllHistorys',
        method: "get",
      }).then(res => {
        console.log(res.data)
        if(res.data.code === 200) {
          this.historys = res.data.data
          for(let i = 0;i < res.data.data.length;i ++) {
            let flag = false
            for(let j = 0;j < this.historyWithDate.length;j ++) {
              if(this.historyWithDate[j].date === res.data.data[i].date) {
                flag = true
                this.historyWithDate[j].historys.push(res.data.data[i])
                break
              }
            }
            if(!flag) {
              this.historyWithDate.push({
                date: res.data.data[i].date,
                historys: [
                  res.data.data[i]
                ]
              })
            }
          }
        }
      })
    },
    handleChange(val) {
      console.log(val);
    },
    handleEdit(val) {
      console.log(val)
      this.$axios({
        url: `/knapsack/findHistory/`,
        method: "get",
        params: {
          id: val
        }
      }).then(res => {
        console.log(res.data)
        if(res.data.code === 200) {
          this.visible = true
          this.form = res.data.data
        }
        else {
          this.$message.error("获取失败")
        }
      })
    }
  },
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
  font-size: 16px;
  font-weight: 500;
  transition: border-bottom-color .3s;
  outline: 0;
}
.left-bar-element {
  font-size: 14px;
  line-height: 50px;
}
.show {
  line-height: 50px;
  font-size: 16px;
  font-weight: 500;
}
</style>