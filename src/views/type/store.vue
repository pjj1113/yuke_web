<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>库存管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<!-- <el-button type="primary" @click="isEdit=true">新增</el-button> -->
					</span>
				</transition>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="id" label="编号" width="170"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="barcode" label="条码"></el-table-column>
        <el-table-column prop="enter_num" label="入库总数量"></el-table-column>
        <el-table-column prop="enter_price" label="入库总金额"></el-table-column>
        <el-table-column prop="out_num" label="出库总数量"></el-table-column>
        <el-table-column prop="out_price" label="出库总金额"></el-table-column>
        <el-table-column prop="creatr_date" label="剩余库存">
          <template slot-scope="{row}">
            {{ row.enter_num - row.out_num }}
          </template>
        </el-table-column>
        <el-table-column label="利润">
          <template slot-scope="{row}">
            {{ row.out_price - row.enter_price }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="creatr_date" label="创建时间"></el-table-column>
        <!-- <el-table-column prop="remark" label="操作">
          <template slot-scope="{row}">

          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <!-- <vueQr v-if="dialogVisible" :info="info" :dialogVisible="dialogVisible" @closeDialog="closeDialog"/> -->
    <!-- <edit :isEdit="isEdit" @closeEdit="closeEdit"/> -->
  </div>
</template>
<script>
// import vueQr from './components/vueQr';

import store from '../../utils/store'
export default {
  data() {
    return {
      tableList:[],
      dialogVisible: false,
      isEdit: false,
      info:{},
    }
  },
  async mounted() {
    this.tableList = await store.getStore()
  },
  methods: {
    
  }
}
</script>
<style>
.el-table td, .el-table th.is-leaf {
text-align: center;
}
.clearfix {
  height: 40px;
}
.float-right {
  float: right;
}
</style>