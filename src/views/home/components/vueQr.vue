<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <div>
      <vueQr text="1232132"  :logoScale="0.23" :size="300" />
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import vueQr from 'vue-qr';
export default {
  components: {
    vueQr
  },
  props:['dialogVisible'],
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog')
    }
  }
 
}
</script>
<style scoped>

</style>