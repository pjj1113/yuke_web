<template>
  <el-dialog
    title="新增商户"
    :visible.sync="isEdit"
    width="60%"
    :before-close="closeEdit">
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label="条形码">
          <el-input v-model="form.barcode"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.imgList"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price"></el-input>
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
import { addType } from '../../../api/index.js'
export default {
  props:['isEdit'],
  data() {
    return {
      form: {
        name: '', 
        model: '', 
        barcode: '', 
        imgList: '',
        remark: '',
        price: ''
      }
    }
  },
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    addStopUser() {
      addType(this.form).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$emit('closeEdit')
      })
    }
  }
 
}
</script>
<style scoped>

</style>