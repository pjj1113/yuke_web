<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>用户数据</span>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="user_id" label="编号" width="180"></el-table-column>
        <el-table-column prop="user_name" label="姓名"></el-table-column>
        <el-table-column prop="date" label="注册日期"></el-table-column>
        <el-table-column prop="user_WeChat" label="微信号"></el-table-column>
        <el-table-column prop="user_mobile" label="手机号"></el-table-column>
        <el-table-column prop="user_address" label="地址"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getUser } from '../../api/index.js'
export default {
  data() {
    return {
      tableList:[],
      dialogVisible: false,
      info:{},
    }
  },
  mounted() {
    getUser().then(res => {
      console.log(res)
      this.tableList = res.list;
    })
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    addShop() {

    },
    generate(val) {
      this.dialogVisible = true;
      this.info = val;
      console.log(val)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>