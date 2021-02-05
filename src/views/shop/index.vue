<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="企业注册ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="详细地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="店铺简介">
            <span>{{ props.row.info }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺标语">
            <span>{{ props.row.slogan }}</span>
          </el-form-item>
           <el-form-item label="店铺分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span>{{ props.row.feature| feature }}</span>
          </el-form-item>
          <el-form-item label="起送价">
            <span>{{ props.row.delivery }}</span>
          </el-form-item>
          <el-form-item label="配送价">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="营业时间">
            <span>{{ props.row.startTime }}至{{ props.row.endTime }}</span>
          </el-form-item>
          <el-form-item label="店铺Logo">
            <img :src=" props.row.image_logo"/>
          </el-form-item>
          <el-form-item label="营业执照">
            <img :src="props.row.image_license"/>
          </el-form-item>
          <el-form-item label="餐饮许可证">
            <img :src="props.row.image_open"/>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品 ID" prop="id"></el-table-column>
    <el-table-column label="商品名称" prop="name"></el-table-column>
    <el-table-column label="描述" prop="desc"></el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="del( scope.row._id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import  {mapActions,mapState} from 'vuex'
  export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    ...mapActions(['query','del']),
    // handleDelete(data){
    //   this.del(data._id)
    // }
    handleEdit(item){
     this.$router.push({
        name: 'shop_modify',
        query:item
      })
    }
  },
  computed: {
    ...mapState({
      data: state => state.shop.shopData 
    }),
  },
  filters:{
    feature(data){
      // console.log(JSON.parse(data))
      data = JSON.parse(data)
      
      return data.map(value => value.flag? value.text:'').join(',').replace(/,/g,' ')
      
    }
  },
  mounted () {
    // console.log(this.$store.state.shop.shopData)
    this.query()


  }
};
</script>
