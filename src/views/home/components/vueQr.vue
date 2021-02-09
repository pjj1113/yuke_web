<template>
  <el-dialog
    title="商户二维码"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <div class="qr">
      <vueQr :text="`http://yueke-h5.chuanzhiyun.cn?stop_id=${ info.stop_id }`" :logoScale="0.23" :size="300" />
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
  props:['dialogVisible','info'],
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
.qr {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>