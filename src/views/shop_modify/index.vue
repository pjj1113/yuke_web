<template>
  <div class= "shop-box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm shopFrom"
      enctype="multipart/form-data"
    >
      <el-form-item label="企业注册ID">
        <el-input v-model="ruleForm.id" name = "id"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name" name = "name"></el-input>
      </el-form-item>

      <el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address" name = "address"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone" name = "phone"></el-input>
      </el-form-item>

      <el-form-item label="店铺简介" prop="info">
        <el-input v-model="ruleForm.info" name = "info"></el-input>
      </el-form-item>

      <el-form-item label="店铺标语" prop="slogan">
        <el-input v-model="ruleForm.slogan" name = "slogan"></el-input>
      </el-form-item>

      <el-form-item label="店铺分类">
        <el-cascader v-model="value" :options="options" name = "category"></el-cascader>
      </el-form-item>

      <el-form-item class="feature-btn" label="店铺特点">
        <ul>
          <li v-for = "item in feature" :key="item.id">
              <span>{{ item.text }}</span>
            <el-switch v-model="item.flag" active-color="#13ce66" inactive-color="#bfcbd9"></el-switch>
          </li>
        </ul>
      </el-form-item>

      <el-form-item label="起送价">
          <el-input-number v-model="delivery" name = "delivery" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>

      <el-form-item label="配送价">
          <el-input-number v-model="price" name = "price" @change="handleChange" :min="20" :max="100" label="描述文字"></el-input-number>
      </el-form-item>

      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          name = "startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '22:30'
          }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
           name = "endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '22:30',
            minTime: startTime
          }"
        ></el-time-select>
      </el-form-item>

      <el-form-item label="上传店铺logo" prop="type">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
          :before-upload="beforeLogoUpload">
          <img v-if="image_logo" :src="image_logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

       <el-form-item label="上传营业执照" prop="type">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleLicenseSuccess"
          :before-upload="beforeLicenseUpload">
          <img v-if="image_license" :src="image_license" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

       <el-form-item label="上传餐饮许可证" prop="type">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleOpenSuccess"
          :before-upload="beforeOpenUpload">
          <img v-if="image_open" :src="image_open" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="subShop">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        id:"",
        name: "", //店铺名称
        address: "", //店铺地址
        phone: "", //联系方式
        info: "", //店铺简介
        slogan: "", //店铺标语
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      value: "", //分类
     
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        info: [
          { required: true, message: "请输入店铺简介", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入店铺联系方式", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        slogan: [
          { required: true, message: "请输入店铺标语", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],

        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      feature:[//店铺特点
        {
            di: 1,
            text:'品牌保证',
            flag:false
        },
        {
            di: 2,
            text:'蜂鸟专送',
            flag:false
        },
        {
            di: 3,
            text:'新开店铺 ',
            flag:false
        },
        {
            di: 4,
            text:'外卖保',
            flag:false
        },
        {
            di: 5,
            text:'准时达',
            flag:false
        },
        {
            di: 6,
            text:'品牌保证',
            flag:false
        }
      ],
      delivery:"",//起送价
      price:"",//配送价
      startTime: "",//起始时间
      endTime: "",//结束时间
      image_logo:"",//上传logo
      image_license:"",//上传餐饮许可证
      image_open:"",//上传营业执照
      _id:''
    };
  },
  mounted() {
      console.log(this.$route.query)
        const {_id,id,name,address,phone,info,category,slogan,feature,delivery,price,startTime,endTime,image_logo,image_license,image_open } = this.$route.query
        this.delivery = delivery 
        this.price = price 
        this.startTime = startTime
        this.endTime = endTime
        this.image_logo = image_logo
        this.image_license = image_license
        this.image_open = image_open
        this.ruleForm.name = name
        this.ruleForm.id = id
        this.ruleForm.address = address
        this.ruleForm.phone = phone
        this.ruleForm.info = info
        this.ruleForm.slogan = slogan
        this.value = category.split(',')
        this._id = _id
        this.feature = JSON.parse(feature)

/*
address: "sacmsancs"
category: "zujian,form,select"
delivery: "6"
endTime: "16:15"
feature: "[{"di":1,"text":"品牌保证","flag":true},{"di":2,"text":"蜂鸟专送","flag":false},{"di":3,"text":"新开店铺 ","flag":false},{"di":4,"text":"外卖保","flag":false},{"di":5,"text":"准时达","flag":true},{"di":6,"text":"品牌保证","flag":true}]"
id: "MKOn1156156"
image_license: "blob:http://localhost:8080/bacb3e2a-59ef-4ab0-85ff-da0dbf687486"
image_logo: "blob:http://localhost:8080/c41b3f0e-cda2-479b-9b7e-6b00cf292d2f"
image_open: "blob:http://localhost:8080/39880262-2383-4472-919a-8a731651fd64"
info: "15156"
name: "ionons5"
phone: "561561"
price: "21"
slogan: "1616"
startTime: "09:15"
__v: "0"
_id: "5dc0e5d8011416403c
        */ 
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     handleChange(value) {
        
    },

    // 上传logo
    handleLogoSuccess(res, file) {
      this.image_logo = URL.createObjectURL(file.raw);
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

      //上传餐饮许可证
    handleLicenseSuccess(res, file) {
      this.image_license = URL.createObjectURL(file.raw);
    },
    beforeLicenseUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

      //上传营业执照
    handleOpenSuccess(res, file) {
      this.image_open = URL.createObjectURL(file.raw);
    },
    beforeOpenUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //提交数据
    ...mapActions(['query','del']),
    subShop(){
      console.log(123)
      let form = new FormData($('.shopFrom')[0])
      form.append('category',this.value)
      form.append('feature',JSON.stringify(this.feature))
      form.append('image_logo',this.image_logo)
      form.append('image_license',this.image_license)
      form.append('image_open',this.image_open)
      form.append('_id',this._id)
      let that = this
      $.ajax({
      url: 'http://localhost:3001/shop',
      type: 'PUT',
      cache: false, //不必须
      data: form,
      processData: false,//必须
      contentType: false,//必须
      success: function(data) {
        console.log(data)
        data = JSON.parse(data)
        if(data.status == 2){
          that.$message({
          showClose: true,
          message: '添加成功，即将自动条状列表页面',
          type: 'success',
          });
          that.query()
           setTimeout(()=>{that.$router.push('/shop')},2000)
        } 
        if(data.status == 1){
          that.$message({
            message: '网络有异常，请重试',
            type: 'warning'
          });
        }
        if(data.status == 0){
          that.$message({
            message: '该店铺已存在，请重新命名',
            type: 'warning'
          });
        }
        
       

		  }
	})
    }

  }
};
</script>

<style lang="stylus" scoped>

.shop-box
    width 600px
    margin-left 200px

.feature-btn
    ul
        display flex
        flex-wrap wrap
        width 350px
        li
            margin 8px
            span
                display inline-block
                padding-ringt 5px
                

  
</style>
