<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" height="100%" style="background-color:#545c64">
      <h3 class="lay-out">悦刻</h3>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title"> <i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link to="/type">
                型号管理
              </router-link>
            </el-menu-item>
             <el-menu-item index="1-1">
              <router-link to="/user">
                用户数据
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"> <i class="el-icon-menu"></i>库存管理 </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/shop">入库管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/leaveBank">出库管理</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- <el-submenu index="3">
          <template slot="title"> <i class="el-icon-document"></i>添加数据 </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <router-link to="/shopAdd">店铺添加</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/foodAdd">食品添加</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
<!-- 
        <el-submenu index="4">
          <template slot="title"> <i class="el-icon-star-on"></i>图表 </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">
              <router-link to="/chart">图表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->

        <!-- <el-submenu index="5">
          <template slot="title"> <i class="el-icon-edit"></i>编辑 </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">
              <router-link to="/edit">富文本编辑</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->

        <!-- <el-submenu index="6">
          <template slot="title"> <i class="el-icon-setting"></i>设置 </template>
          <el-menu-item-group>
            <el-menu-item index="6-1">
              <router-link to="/set">用户设置</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->

        <!-- <el-submenu index="7">
          <template slot="title"> <i class="el-icon-warning"></i>说明 </template>
          <el-menu-item-group>
            <el-menu-item index="7-1">
              <router-link to="/explain">说明</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>管理后台</span>
      </el-header>

      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.lay-out {
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: aliceblue;
  background: #1f2d3d;
}
.el-menu-item-group__title {
  display: none !important;
}
.el-menu-item {
  padding: 0 !important;
  width: 100% !important;
}
.el-menu-item a {
  color: white !important;
  width: 100%;
  height: 100%;
  display: inline-block;
}
.el-menu-item {
  text-align: center;
}
.el-submenu .el-menu-item {
  min-width: 150px !important;
}
.el-menu-item-group ul li {
  background-color: #1f2d3d !important;
}
.el-menu-item-group ul li:hover {
  background-color: rgb(70, 80, 90) !important;
}

.el-submenu__title {
  text-align: left !important;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

/* logo */

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon::before {
  line-height: 178px !important;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }
    return {
      tableData: Array(20).fill(item),
    }
  },
}
</script>
