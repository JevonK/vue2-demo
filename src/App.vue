<template>
  <div id="app">
    <el-container style="border: 1px solid #eee">
          <el-header style="text-align: right; font-size: 12px">
            <img src="./assets/RCC.png" alt="" style="left: 6px; height: 60px;position: absolute;width: 203px;">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
              </el-dropdown>
              <span>王小虎</span>
            </el-header>
          
      
          <el-container style=" border: 1px solid #eee;">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); ">
              <el-menu default-active="1">
                <el-submenu index="1">
                  <template slot="title">首页</template>
                  <el-menu-item-group>
                    <template slot="title">客户管理</template>
                    <el-menu-item :to="{ path: '/' }">公司列表</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main style="height: 90vh;">
              <router-view></router-view>
            </el-main>
          </el-container>
    </el-container>
    
    
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
