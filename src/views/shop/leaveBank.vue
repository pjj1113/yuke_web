<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>出库管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="add">新增出库</el-button>
            <el-button type="primary" @click="exportExcelMethod">导出</el-button>
					</span>
				</transition>
      </div>
      <el-table :data="tableList" stripe border class="default-table" style="width: 100%">
        <el-table-column prop="id" label="编号" width="170"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="price" label="进货价"></el-table-column>
        <el-table-column prop="num" label="总数量"></el-table-column>
        <el-table-column prop="barcode" label="条码"></el-table-column>
        <el-table-column prop="create_date" label="入库日期"></el-table-column>
        <!-- <el-table-column prop="pop_num" label="库存">
          <template slot-scope="{row}">
            <div>{{ row.num-row.pop_num }}</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="binding" label="合计">
          <template slot-scope="{row}">
            <div>{{ row.price*row.num }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="250">
          <template slot-scope="{row}">
            <el-button size="mini" @click="edit(row)" type="primary">修改</el-button>
            <!-- <el-button size="mini" @click="leave(row)" type="primary">出库</el-button> -->
            <el-button size="mini" @click="delDate(row)" type="danger">删除</el-button>
            <!-- <div>{{ row.price*row.num }}</div> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <edit :isEdit="isEdit" v-if="isEdit" @closeEdit="closeEdit" :info="info"/>
    <table id="exporttable" v-show="false">
      <tr>
        <td>编号</td>
        <td>商品名称</td>
        <td>型号</td>
        <td>条码</td>
        <td>总数量</td>
        <td>单价</td>
        <td>出库日期</td>
      </tr>
      <tr v-for="(item, index) in tableList" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.model }}</td>
        <td>{{ item.barcode }}</td>
        <td>{{ item.num }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.create_date }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { exportExcelMethod } from '@/utils/exportExcel';
import { getStoreOutList, getCommodityTypeList, delStoreOut } from '../../api/index.js';
import edit from './components/outEdit.vue'
export default {
  components: {
    edit
  },
  data() {
    return {
      tableList:[],
      typeList: [],
      dialogVisible: false,
      isEdit: false,
      info:{},
      classifyList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted() {
    this.getCommodityTypeList()
  },
  methods: {
    getCommodityTypeList() {
      getCommodityTypeList().then(res => {
        this.typeList = res.list;
        this.getStoreList()
      })
    },
    getStoreList() {
      getStoreOutList({ pageSize: this.pageSize, currentPage: this.currentPage }).then(res => {
        this.total = res.total
        this.tableList = res.list
        // res.list.map(item => {
        //   let type = this.typeList.filter(val => val.id == item.type_id)
        //   console.log(type)
        //   if(type) {
        //     const { barcode, model, name } = type[0]
        //     return { ...item,barcode, model, name }
        //   }
        //   return item
        // })
        console.log(this.tableList)
      })
    },
    getTypeName(val) {
      return  this.classifyList.filter(item => item.id == val)[0] ? this.classifyList.filter(item => item.id == val)[0].name : ''
    },
    exportExcelMethod() {
      exportExcelMethod('exporttable',  '出货统计', 'sheet1');
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStoreList()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStoreList()
    },
    leave(val) {
     this.$prompt('请输入离库数量', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if( val.num - val.pop_num < value) {
            this.$message({
              type: 'error',
              message: '库存不够!'
            });       
            return
          }
          this.info = val;
          this.$set(this.info, 'pop_num', value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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
     delStoreOut({ id: val.id }).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      this.getStoreList();
     })
   },
    closeEdit() {
      this.isEdit = false;
      this.getStoreList();
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