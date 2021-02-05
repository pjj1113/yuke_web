<template>
  <el-dialog
    title="新增商户"
    :visible.sync="isEdit"
    width="60%"
    :before-close="closeEdit">
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商户名称">
          <el-input v-model="form.stop_name"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.principal"></el-input>
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
import { addStopUser } from '../../../api/index.js'
export default {
  props:['isEdit'],
  data() {
    return {
      form: {
        stop_name: '',
        principal: ''
      }
    }
  },
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    addStopUser() {
      addStopUser(this.form).then(res => {
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