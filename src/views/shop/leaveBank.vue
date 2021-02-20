<template>
  <div>
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <span>出库管理</span>
        <transition name="slide-fade" mode="out-in">
					<span class="float-right">
						<el-button type="primary" @click="exportExcelMethod">导出</el-button>
					</span>
				</transition>
      </div>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for=" (item, index) in infoList" :key="index" :label="item.name" :name="item.id">
          <el-table :data="item.info" stripe border class="default-table" style="width: 100%">
            <el-table-column prop="classify" label="类型">
              <template slot-scope="{row}">
                {{ getTypeName(row.classify) }}
              </template>
            </el-table-column>
            <el-table-column prop="item_id" label="编号" width="170"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="type" label="型号"></el-table-column>
            <el-table-column prop="price" label="进货价"></el-table-column>
            <el-table-column prop="betray" label="出售价"></el-table-column>
            <el-table-column prop="pop_num" label="出库数量"></el-table-column>
            <el-table-column prop="pop_date" label="出售时间">
              <template slot-scope="{row}">
                {{ row.pop_date.slice(0,10) }}
              </template>
            </el-table-column>
            <el-table-column prop="binding" label="售出总价">
              <template slot-scope="{row}">
                <div>{{ row.betray*row.pop_num }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="binding" label="获取利润">
              <template slot-scope="{row}">
                <div>{{ row.betray*row.pop_num - row.price*row.pop_num }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="{row}">
                <!-- <el-button size="mini" @click="edit(row)" type="primary">修改</el-button> -->
                <el-button size="mini" @click="delDate(row)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      
    </el-card>
    <table id="exporttable" v-show="false">
      <tr>
        <td>类型</td>
        <td>编号</td>
        <td>名称</td>
        <td>出库数量</td>
      </tr>
      <tr v-for="(item, index) in tableListComp" :key="index">
        <td>{{ getTypeName(item.classify) }}</td>
        <td>{{ item.item_id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.pop_num }}</td>
      </tr>
    </table>
    <edit :isEdit="isEdit" v-if="isEdit" @closeEdit="closeEdit" :info="info"/>
  </div>
</template>
<script>
import { exportExcelMethod } from '@/utils/exportExcel';
import { getRepertoryList,getRepertorydel, getTypeList } from '../../api/index.js';
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
      JSON.parse(JSON.stringify(this.tableList)).forEach((item, j) => {
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
    this.getRepertoryList();
    this.getTypeList();
  },
  methods: {
    getTypeName(val) {
      return this.classifyList.filter(item => item.id == val)[0].name
    },
    getTypeList() {
      getTypeList().then(res => {
        console.log(res)
        this.classifyList = res.list
      })
    },
    getRepertoryList() {
     getRepertoryList().then(res => {
       this.tableList = res.list.filter(item => item.start == 2)
       this.activeName = this.classifyList[0].id
       this.infoList = [];
        this.classifyList.forEach(item => {
          this.infoList.push({
            id: item.id,
            name: item.name,
            info: this.tableList.filter(val => val.classify == item.id)
          })
        })
       console.log(res)
     })
    },
    exportExcelMethod() {
      exportExcelMethod('exporttable',  '出货统计', 'sheet1');
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