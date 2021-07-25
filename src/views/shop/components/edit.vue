<template>
  <el-dialog
    title="新增"
    :visible.sync="isEdit"
     v-if="isEdit"
    width="60%"
    :before-close="closeEdit">
    <div style="padding:0 50px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品类型">
          <el-select v-model="form.classify" placeholder="请选择">
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
         <el-button style="marginLeft:20px" @click="addType" type="primary">添加类型</el-button>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.item_id"></el-input>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="型号">
          <el-input v-model="form.type"></el-input>
        </el-form-item>

        <el-form-item label="进货价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="入库数量">
          <el-input v-model="form.num"></el-input>
        </el-form-item>

        <el-form-item label="出售价">
          <el-input v-model="form.betray"></el-input>
        </el-form-item>
        
      </el-form>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="closeEdit">取 消</el-button>
    <el-button @click="addStopUser" type="primary">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import { getCommodityTypeList,getRepertoryAdd, getRepertoryUpdate, addType,getTypeList } from '../../../api/index.js'
export default {
  props:['isEdit','info'],
  data() {
    return {
      form: {
        item_id: '',
        name: '',
        type: '',
        price: '',
        betray: '',
        num: '',
        classify: '',
      },
      classifyList:[]
    }
  },
  mounted() {
    if(this.info.id) {
      this.form = this.info;
    }
    this.getTypeList()
  },
  methods: {
    getTypeList() {
      getCommodityTypeList().then(res => {
        this.classifyList = res.list
        console.log(res)
      })
    },
    
    closeEdit() {
      this.$emit('closeEdit')
    },
    addType() {
      this.$prompt('请输入类型名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          addType({ name: value }).then(res => {
            this.$message({
              type: 'success',
              message: '添加成功'
            });     
            this.getTypeList();  
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    addStopUser() {
      if(this.info.id) {
        let  { id, item_id, name, type, price, betray, num, classify  } = this.form
        getRepertoryUpdate({ id, item_id, name, type, price, betray, num, classify }).then(res => {
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit('closeEdit')
        return
        })
      } else {
        let  { item_id, name, type, price, betray, num, classify  } = this.form
        getRepertoryAdd({ item_id, name, type, price, betray, num, classify }).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$emit('closeEdit')
        })
      }
      
    }
  }
 
}
</script>
<style scoped>

</style>