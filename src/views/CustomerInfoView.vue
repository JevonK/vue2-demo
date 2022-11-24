<template>
    <div class="home">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-descriptions title="基本信息">
        <el-descriptions-item label="跟进人">kooriookami</el-descriptions-item>
        <el-descriptions-item label="公司电话">18100000000</el-descriptions-item>
        <el-descriptions-item label="公司邮编">苏州市</el-descriptions-item>
        <el-descriptions-item label="公司地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
    <el-tabs v-model="activeName" style="height: 200px;">
        <el-tab-pane label="联系人" name="first">
            <el-button type="primary" size="small" @click="dialogContactsVisible = true">添加联系人</el-button>
            <el-button type="primary" size="small">刷新</el-button>
            <el-descriptions title="用户信息">
                <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="跟进记录" name="second">
            <el-descriptions title="未完成（2条）">
                <template slot="extra">
                    <el-button type="primary" size="small" @click="dialogFollowsVisible = true">添加跟进</el-button>
                    <el-button type="primary" size="small">完成</el-button>
                    <el-button type="primary" size="small">刷新</el-button>
                </template>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-descriptions>
            <el-descriptions title="已完成（2条）">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-descriptions>
        </el-tab-pane>
    </el-tabs>
    
    <el-dialog title="添加联系人" :visible.sync="dialogContactsVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogContactsVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogContactsVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="添加跟进" :visible.sync="dialogFollowsVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFollowsVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFollowsVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  export default {
    name: 'CustomerView',
    data() {
      return {
        dialogFollowsVisible: false,
        dialogContactsVisible: false,
        form: {},
        activeName: "first",
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    components: {
    }
  }
  </script>
  