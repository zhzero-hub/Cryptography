<template>
  <div class="primeTable">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        border>
      <el-table-column
          prop="primeNumber"
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
    </el-table>
  </div>
</template>

<script>

export default {
  name: "primeManage",
  data() {
    return {
      qq: 20,
      tableData: [{
        primeNumber: 'q',
        value: this.qq,
        description: '背包密码体制中，素数 q 的值'
      }, {
        primeNumber: 'r',
        value: this.rString,
        description: '背包密码体制中，素数 r 的值'
      }],
    }
  },
  computed: {
    q: {
      get() {
        return this.$store.state.q
      },
      set(val) {
        this.$store.state.q = val
      }
    },
    qString: {
      get() {
        return this.$store.state.qString
      },
      set(val) {
        this.$store.state.qString = val
      }
    },
    r: {
      get() {
        return this.$store.state.r
      },
      set(val) {
        this.$store.state.r = val
      }
    },
    rString: {
      get() {
        return this.$store.state.rString
      },
      set(val) {
        this.$store.state.rString = val
      }
    },
  },
  methods: {
    handle() {
      console.log(this.q)
    }
  }
}
</script>

<style scoped>

</style>