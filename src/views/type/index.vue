<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>型号管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="isEdit=true">新增</el-button>
					</span>
				</transition>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="id" label="编号" width="170"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="barcode" label="条码"></el-table-column>
        <el-table-column prop="imgList" label="图片"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="creatr_date" label="创建时间"></el-table-column>
        <el-table-column prop="remark" label="操作">
          <template slot-scope="{row}">
            <!-- <el-button size="mini" @click="generate(row)" type="primary">生成二维码</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- <vueQr v-if="dialogVisible" :info="info" :dialogVisible="dialogVisible" @closeDialog="closeDialog"/> -->
    <edit :isEdit="isEdit" @closeEdit="closeEdit"/>
  </div>
</template>
<script>
// import vueQr from './components/vueQr';
import edit from './components/edit'
import { getCommodityTypeList } from '../../api/index.js'
export default {
  components: {
    // vueQr,
    edit
  },
  data() {
    return {
      tableList:[],
      dialogVisible: false,
      isEdit: false,
      info:{},
    }
  },
  mounted() {
    this.getStopUser();
  },
  methods: {
    getStopUser() {
      getCommodityTypeList().then(res => {
        this.tableList = res.list
      })
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    closeEdit() {
      this.isEdit = false;
      this.getStopUser();
    },
    generate(val) {
      this.dialogVisible = true;
      this.info = val;
      console.log(val)
    }
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