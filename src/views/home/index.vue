<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>商户数据</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="isEdit=true">新增</el-button>
					</span>
				</transition>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="stop_id" label="编号" width="170"></el-table-column>
        <el-table-column prop="stop_name" label="商户名称"></el-table-column>
        <el-table-column prop="stop_open_date" label="开户日期"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
        <el-table-column prop="binding" label="绑定数量"></el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" @click="generate(row)" type="primary">生成二维码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <vueQr :info="info" :dialogVisible="dialogVisible" @closeDialog="closeDialog"/>
    <edit :isEdit="isEdit" @closeEdit="closeEdit"/>
  </div>
</template>
<script>
import vueQr from './components/vueQr';
import edit from './components/edit'
import { getStopUser } from '../../api/index.js'
export default {
  components: {
    vueQr,
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
      getStopUser().then(res => {
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