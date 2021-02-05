<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>用户数据</span>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="stop_id" label="编号" width="150"></el-table-column>
        <el-table-column prop="stop_name" label="商户名称"></el-table-column>
        <el-table-column prop="stop_open_date" label="开户日期"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
        <el-table-column prop="binding" label="绑定数量"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList:[
        { stop_id: '2021202313213', stop_name: '世纪华联', stop_open_date: '2020-10-21',principal: '万',binding: '12' }
      ],
      dialogVisible: false,
      info:{},
    }
  },
  mounted() {

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