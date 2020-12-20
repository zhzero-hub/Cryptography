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
          width="300"
          align="center">
      </el-table-column>
      <el-table-column
          prop="value"
          label="Value"
          width="500"
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
          width="150"
          align="center">
        <template slot-scope="scope">
          <el-button @click="handle(scope)" type="primary" size="small">编辑</el-button>
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
  </div>
</template>

<script>
const BigInteger = require('biginteger').BigInteger;

export default {
  name: "primeManage",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      tVisible: false,
      kVisible: false,
      nVisible: false,
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
        value: this.k.toString(),
        description: '背包密码体制中，素数 k 的值'
      }, {
        number: 't',
        value: this.t.toString(),
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
    close() {
      this.dialogVisible = this.tVisible = this.nVisible = this.kVisible = false
    },
    submit() {
      this.k = BigInteger(this.form.k.toString())
      this.t = BigInteger(this.form.t.toString())
      this.n = this.form.n
      this.getData()
      this.close()
    }
  }
}
</script>

<style scoped>

</style>