<template>
  <div>
    <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
      <el-table-column prop="id" label="编号" width="170"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <el-table-column prop="commodityList" label="详情">
        <template slot-scope="{row}">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="gridData">
              <el-table-column width="150" property="name" label="商品名称"></el-table-column>
              <el-table-column width="150" property="model" label="商品类型"></el-table-column>
              <el-table-column width="100" property="num" label="数量"></el-table-column>
            </el-table>
            <el-button slot="reference" @click="viewDetail(row)">查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="操作">
        <template slot-scope="{row}">
          <el-button size="mini" @click="updatePayStart(row)" type="primary">结账</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:[ 'tableList' ],
  data() {
    return {
      gridData: []
    }
  },
  methods: {
    delPay(row) {
      this.$emit('delPay', row);
    },
    updatePayStart(row) {
      row['start'] = 2
      this.$emit('updatePayStart', row)
    },
    viewDetail(row) {
      this.gridData = JSON.parse(row.commodityList)
    }
  }
}
</script>

<style>

</style>