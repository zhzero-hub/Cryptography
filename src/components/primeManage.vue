<template>
  <div class="primeTable">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        border>
      <el-table-column
          prop="number"
          label="Key"
          width="200%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="value"
          label="Value"
          width="400%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="description"
          label="Description"
          align="center">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200%"
          align="center">
        <template slot-scope="scope">
          <el-button @click="handle(scope)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleRandom(scope)" type="primary" size="small">随机数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框-->
    <el-dialog
        title="数值管理"
        :visible.sync="dialogVisible"
        width="30%">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <template v-if="this.tVisible">
            <el-form-item label="t">
              <el-input v-model="form.t"></el-input>
            </el-form-item>
          </template>
          <template v-else-if="kVisible">
            <el-form-item label="k">
              <el-input v-model="form.k"></el-input>
            </el-form-item>
          </template>
          <template v-else-if="nVisible">
            <el-form-item label="n">
              <el-input v-model="form.n"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="数值管理"
        :visible.sync="this.randomVisible"
        width="30%">
      <section class="prime">
        <el-form label-width="80px">
          <el-form-item label="比特位">
            <el-input v-model="inputLength"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="primeGen">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "primeManage",
  data() {
    return {
      rowIndex: 0,
      tableData: [],
      dialogVisible: false,
      tVisible: false,
      kVisible: false,
      nVisible: false,
      randomVisible: false,
      inputLength: 100,
      form: {
        k: '',
        t: '',
        n: ''
      },
    }
  },
  created() {
    this.getData()
  },
  computed: {
    k: {
      get() {
        return this.$store.state.k
      },
      set(val) {
        this.$store.state.k = val
      }
    },
    t: {
      get() {
        return this.$store.state.t
      },
      set(val) {
        this.$store.state.t = val
      }
    },
    n: {
      get() {
        return this.$store.state.n
      },
      set(val) {
        this.$store.state.n = val
      }
    }
  },
  methods: {
    getData() {
      this.tableData = []
      this.tableData.push({
        number: 'k',
        value: this.k,
        description: '背包密码体制中，素数 k 的值'
      }, {
        number: 't',
        value: this.t,
        description: '背包密码体制中，素数 t 的值'
      }, {
        number: 'n',
        value: this.n,
        description: '背包密码体制中，分组组数 n 的值'
      })
    },
    // eslint-disable-next-line no-unused-vars
    handle(row , column , event) {
      this.dialogVisible = true
      this.rowIndex = row
      if(row.$index === 0) {
        this.kVisible = true
      }
      else if(row.$index === 1) {
        this.tVisible = true
      }
      else if(row.$index === 2) {
        this.nVisible = true
      }
    },
    handleRandom(row) {
      this.randomVisible = true
      this.rowIndex = row
    },
    primeGen() {
      this.$axios({
        url: `/knapsack/getPrimeNumber`,
        method: "get",
        params: {
          length: this.inputLength
        }
      }).then( res => {
        if(res.data.code === 200) {
          if(this.rowIndex.$index === 0) {
            this.k = res.data.data
          }
          else if(this.rowIndex.$index === 1) {
            this.t = res.data.data
          }
          else if(this.rowIndex.$index === 2) {
            if(res.data.data.length > 8) {
              this.n = 100
            }
            else {
              this.n = res.data.data
            }
          }
        }
        else {
          this.$message.error("生成失败")
        }
        this.getData()
        this.close()
      })
    },
    close() {
      this.dialogVisible = this.tVisible = this.nVisible = this.kVisible = false
      this.randomVisible = false
      this.rowIndex = 0
    },
    submit() {
      if(this.rowIndex.$index === 0) {
        this.k = this.form.k.toString()
      }
      else if(this.rowIndex.$index === 1) {
        this.t = this.form.t.toString()
      }
      else if(this.rowIndex.$index === 2) {
        this.n = this.form.n
      }
      this.getData()
      this.close()
    }
  }
}
</script>

<style scoped>

</style>