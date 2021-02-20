<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>入库管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary" @click="exportExcelMethod">导出</el-button>
					</span>
				</transition>
      </div>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for=" (item, index) in infoList" :key="index" :label="item.name" :name="item.id">
          <el-table :data="item.info" stripe border class="default-table" style="width: 100%">
            <el-table-column prop="classify" label="类型" width="170">
                <template slot-scope="{row}">
                <div>{{ getTypeName(row.classify) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="item_id" label="编号" width="170"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="type" label="型号"></el-table-column>
            <el-table-column prop="price" label="进货价"></el-table-column>
            <el-table-column prop="betray" label="出售价"></el-table-column>
            <el-table-column prop="num" label="总数量"></el-table-column>
            <el-table-column prop="pop_num" label="出库数量"></el-table-column>
            <el-table-column prop="pop_num" label="库存">
              <template slot-scope="{row}">
                <div>{{ row.num-row.pop_num }}</div>
              </template>
            </el-table-column>
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
        </el-tab-pane>
      </el-tabs>
      
    </el-card>
    <edit :isEdit="isEdit" v-if="isEdit" @closeEdit="closeEdit" :info="info"/>
    <table id="exporttable" v-show="false">
      <tr>
        <td>类型</td>
        <td>编号</td>
        <td>名称</td>
        <td>总数量</td>
        <td>库存</td>
      </tr>
      <tr v-for="(item, index) in tableList" :key="index">
        <td>{{ getTypeName(item.classify) }}</td>
        <td style="width:200px">{{ item.item_id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.num }}</td>
        <td>{{ item.num-item.pop_num }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { exportExcelMethod } from '@/utils/exportExcel';
import { getRepertoryList, getRepertorydel, getRepertoryLeaveBank, getTypeList } from '../../api/index.js';
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
      classifyList: [],
      activeName: '',
      infoList:[]
    }
  },
  computed: {
    tableListComp() {
      let list = [];
      let index = 0;
      console.log(this.tableList.filter(item => item.start == 2))
      JSON.parse(JSON.stringify(this.tableList.filter(item => item.start == 2))).forEach((item, j) => {
        if(list.some((val,i) => { val.item_id == item.item_id ? index = i : '' ;return val.item_id == item.item_id })){
          console.log( parseInt(list[index].pop_num) , parseInt(item.pop_num))
          this.$set(list[index], 'pop_num' , parseInt(list[index].pop_num) + parseInt(item.pop_num))
        } else {
          list.push(item)
        }
      })
      return list
    }
  },
  mounted() {
    
    getTypeList().then(res => {
      this.classifyList = res.list;
      this.getRepertoryList();
      console.log(res)
    })
  },
  methods: {
    getTypeName(val) {
      return  this.classifyList.filter(item => item.id == val)[0] ? this.classifyList.filter(item => item.id == val)[0].name : ''
    },
    exportExcelMethod() {
      exportExcelMethod('exporttable',  '出货统计', 'sheet1');
    },
   getRepertoryList() {
     getRepertoryList().then(res => {
      this.tableList = res.list
      this.$nextTick(()=> {
        console.log(this.tableListComp)
        let index = 0;
        JSON.parse(JSON.stringify(this.tableList)).forEach((item, j) => {
          if(this.tableListComp.some((val,i) => { val.item_id == item.item_id ? index = i : '' ;return val.item_id == item.item_id })){
            this.$set(this.tableList[j], 'pop_num' , parseInt(this.tableListComp[index].pop_num))
          } else {
            this.$set(this.tableList[j], 'pop_num' , 0)
          }
        })
        this.tableList = this.tableList.filter(item => item.start == 1)
        this.activeName = this.classifyList[0].id
        this.infoList = [];
        this.classifyList.forEach(item => {
          this.infoList.push({
            id: item.id,
            name: item.name,
            info: this.tableList.filter(val => val.classify == item.id)
          })
        })
      })
     })
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
          this.getRepertoryLeaveBank();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
   },
   getRepertoryLeaveBank(val) {
     let  { item_id, name, type, price, betray, num, pop_num, classify } = this.info
     getRepertoryLeaveBank({ item_id, name, type, price, betray, pop_num, classify }).then(res => {
       
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