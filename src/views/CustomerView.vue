<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-button @click="dialogFormVisible = true" style="margin-top: 20px;">添加客户</el-button>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="跟进人员"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="公司电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="公司邮编">
      </el-table-column>
      <el-table-column
        prop="address"
        label="公司地址">
      </el-table-column>
    </el-table>
    <div class="block">
    <span class="demonstration">直接前往</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
    </div>

    <el-dialog title="添加客户" :visible.sync="dialogFormVisible">
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
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      dialogFormVisible: false,
      form: {},
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  components: {
  }
}
</script>
