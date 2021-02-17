<template>
  <el-dialog
    title="新增"
    :visible.sync="isEdit"
     v-if="isEdit"
    width="60%"
    :before-close="closeEdit">
    <div style="padding:0 50px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.item_id"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="型号">
          <el-input v-model="form.type"></el-input>
        </el-form-item>

        <el-form-item label="单价">
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
import { getRepertoryAdd, getRepertoryUpdate } from '../../../api/index.js'
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
      }
    }
  },
  mounted() {
    if(this.info.id) {
      this.form = this.info;
    }
  },
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    addStopUser() {
      if(this.info.id) {
        let  { id, item_id, name, type, price, betray, num  } = this.form
        getRepertoryUpdate({ id, item_id, name, type, price, betray, num }).then(res => {
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit('closeEdit')
        })
      }
      let  { item_id, name, type, price, betray, num  } = this.form
      getRepertoryAdd({ item_id, name, type, price, betray, num }).then(res => {
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