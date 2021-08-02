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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="代发货" name="0">
          <dropShipping :tableList="tableList" @delPay="delPay" @updatePayStart="updatePayStart"/>
        </el-tab-pane>
        <el-tab-pane label="配送中" name="1">
          <distribution :tableList="tableList" @delPay="delPay" @updatePayStart="updatePayStart"/>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="2">
          <accomplish :tableList="tableList" @delPay="delPay" @updatePayStart="updatePayStart"/>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>
<script>
// import edit from './components/edit'
import { getPayList, delPay, updatePayStart } from '../../api/index.js'
import dropShipping from './dropShipping.vue'
import distribution from './distribution.vue'
import accomplish from './accomplish.vue'
export default {
  components: {
    dropShipping,
    distribution,
    accomplish
  },
  data() {
    
    return {
      tableList:[],
      dialogVisible: false,
      isEdit: false,
      info:{},
      activeName: '0'
    }
  },
  mounted() {
    this.getPayList();
  },
  methods: {
    getPayList() {
      console.log(123)
      getPayList().then(res => {
        this.tableList = res.list.filter(item => item.start == this.activeName)
      })
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    closeEdit() {
      this.isEdit = false;
      this.getPayList();
    },
    handleClick() {
      this.getPayList();
    },
    updatePayStart(row) {
      updatePayStart({ id: row.id, start: row.start }).then(res => {
        this.getPayList();
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      })
    },
    delPay(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPay({ id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getPayList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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