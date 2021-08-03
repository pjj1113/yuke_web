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
        <el-table-column prop="imgList" label="图片">
          <template slot-scope="{row}">
            <el-image v-if="row.imgList" :preview-src-list="[row.imgList]" :src="row.imgList"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="creatr_date" label="创建时间"></el-table-column>
        <el-table-column prop="remark" label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" @click="editInfo(row)" type="primary">修改</el-button>
            <el-button size="mini" @click="delType(row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <edit :info="info" :isEdit="isEdit" v-if="isEdit" @closeEdit="closeEdit"/>
  </div>
</template>
<script>
// import vueQr from './components/vueQr';
import edit from './components/edit'
import { getCommodityTypeList, delType } from '../../api/index.js'
export default {
  components: {
    // vueQr,
    edit
  },
  data() {
    return {
      tableList:[],
      isEdit: false,
      info: null,
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
    closeEdit() {
      this.isEdit = false;
      this.info = null;
      this.getStopUser();
    },
    delType(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delType({ id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getStopUser()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    editInfo(row) {
      this.info = row;
      this.isEdit = true;
      console.log(row)
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