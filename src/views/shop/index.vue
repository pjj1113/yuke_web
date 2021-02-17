<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>入库管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="add">新增</el-button>
					</span>
				</transition>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="item_id" label="编号" width="170"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="型号"></el-table-column>
        <el-table-column prop="price" label="进货价"></el-table-column>
        <el-table-column prop="betray" label="出售价"></el-table-column>
        <el-table-column prop="num" label="总数量"></el-table-column>
        <el-table-column prop="binding" label="合计">
          <template slot-scope="{row}">
            <div>{{ row.price*row.num }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="250">
          <template slot-scope="{row}">
            <el-button size="mini" @click="edit(row)" type="primary">修改</el-button>
            <el-button size="mini" @click="leave(row)" type="primary">出库</el-button>
            <el-button size="mini" @click="delDate(row)" type="danger">删除</el-button>
            <!-- <div>{{ row.price*row.num }}</div> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <edit :isEdit="isEdit" v-if="isEdit" @closeEdit="closeEdit" :info="info"/>
  </div>
</template>
<script>

import { getRepertoryList, getRepertorydel, getRepertoryLeaveBank } from '../../api/index.js';
import edit from './components/edit'
export default {
  components: {
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
    this.getRepertoryList();
  },
  methods: {
   getRepertoryList() {
     getRepertoryList().then(res => {
       this.tableList = res.list.filter(item => item.start == 1)
     })
   },
   leave(val) {
     this.$prompt('请输入离库数量', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.info = val;
          this.$set(this.info, 'pop_num', value)
          this.getRepertoryLeaveBank();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
   },
   getRepertoryLeaveBank(val) {
     let  { item_id, name, type, price, betray, num, pop_num } = this.info
     getRepertoryLeaveBank({ item_id, name, type, price, betray, pop_num }).then(res => {
       
     })
   },
   add() {
     this.isEdit = true;
     this.info = {}
   },
   edit(val) {
     this.info = val;
     this.isEdit = true;
   },
   delDate(val) {
     getRepertorydel({ id: val.id }).then(res => {
       this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getRepertoryList();
     })
   },
   closeEdit() {
      this.isEdit = false;
      this.getRepertoryList();
    },
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