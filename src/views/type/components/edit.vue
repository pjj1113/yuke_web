<template>
  <el-dialog
    title="新增产品"
    :visible.sync="isEdit"
    width="60%"
    :before-close="closeEdit">
    <div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="model">
          <el-input v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label="条形码" prop="barcode">
          <el-input v-model="form.barcode"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imgList">
          <el-upload
            action
            :http-request="Upload"
            class="avatar-uploader"
            :show-file-list="false">
            <img v-if="form.imgList" :src="form.imgList" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="closeEdit">取 消</el-button>
    <el-button @click="addStopUser('form')" type="primary">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import { addType, updateType } from '../../../api/index.js'
import OSS from 'ali-oss';
export default {
  props:['isEdit', 'info'],
  data() {
    return {
      form: {
        name: '', 
        model: '', 
        barcode: '', 
        imgList: '',
        remark: '',
        price: ''
      },
      rules: {
        name: [
          { required: true, message: '该项必填', trigger: 'blur' },
        ], 
        model: [
          { required: true, message: '该项必填', trigger: 'blur' },
        ], 
        barcode: [
          { required: true, message: '该项必填', trigger: 'blur' },
        ], 
        imgList: [
          { required: true, message: '该项必填', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '该项必填', trigger: 'blur' },
        ]
      },
      client: null
    }
  },
  mounted() {
     this.client = new OSS({
        region: "oss-cn-beijing", //阿里云获取
        accessKeyId: "LTAI5tJG2oFF5kMcV8BqBdMw",
        accessKeySecret: "0KRqXGdJRqeT07hlTd7DPomXru5qsu",
        bucket: "project-ts"  //要存储的目录
    });
    if(this.info) {
      console.log(this.info, 777)
      this.form = this.info
    }
    console.log(this.client)
  },
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    addStopUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.info) {
            this.updateType()
          } else {
            addType(this.form).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$emit('closeEdit')
            })
          }
          
        }
      })
    },
    // 修改
    updateType() {
      updateType({ ...this.form, modelId: this.form.id }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit('closeEdit')
      })
    },
    Upload(file) {
      const that = this;
      async function multipartUpload() {
        let temporary = file.file.name.lastIndexOf(".");
        let fileNameLength = file.file.name.length;
        let fileFormat = file.file.name.substring(
          temporary + 1,
          fileNameLength
        );
        let fileName = that.getFileNameUUID() + "." + fileFormat; 
        that.client.multipartUpload(`upload-file/${fileName}`, file.file)
          .then(result => {
            //上传成功返回值，可针对项目需求写其他逻辑
            that.form.imgList = result.res.requestUrls[0].split('?')[0]
            console.log(result);
          })
          .catch(err => {
            console.log("err:", err);
          });
      }
      multipartUpload();
    },
    getFileNameUUID(){
      function rx() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return `${+new Date()}_${rx()}${rx()}`
    },
    timestamp() {
      var time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return "" + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
    }
  }
 
}
</script>
<style scoped>

</style>