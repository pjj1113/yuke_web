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
          <el-select v-model="form.type_id" placeholder="请选择">
            <el-option
              v-for="item in classifyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入库数量">
          <el-input v-model="form.num"></el-input>
        </el-form-item>

        <el-form-item label="入库价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="条形码">
          <el-input v-model="form.barcode"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
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
import { getCommodityTypeList, addStoreOut, updateStoreOut } from '../../../api/index.js'
export default {
  props:['isEdit','info'],
  data() {
    return {
      form: {
        type_id:'',
        num: '',
        price: '',
        remark: '',
        barcode: '',
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
    addStopUser() {
      if(this.info.id) {
        let  { id, type_id, num, price, remark, barcode  } = this.form
        updateStoreOut({ id, type_id, num, price, remark, barcode }).then(res => {
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit('closeEdit')
        return
        })
      } else {
        let  { type_id, num, price, remark, barcode } = this.form
        addStoreOut({ type_id, num, price, remark, barcode }).then(res => {
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