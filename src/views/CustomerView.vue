<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>公司列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-button @click="dialogFormVisible = true" style="margin-top: 20px;">添加客户</el-button>
      <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="公司名称"
        width="180">
        <template slot-scope="scope">
          <el-link :href="'/info?customer_id=' + scope.row.id"  type="primary">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="跟进人员"
        width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ tableData.customer_admin[scope.$index].name }}</span>
          </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="公司电话">
      </el-table-column>
      <el-table-column
        prop="postal_code"
        label="公司邮编">
      </el-table-column>
      <el-table-column
        prop="address"
        label="公司地址">
      </el-table-column>
      <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
    <span class="demonstration">直接前往</span>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="page_size"
      layout="prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </div>
    </div>

    <el-dialog title="添加客户" label-width="80px" :visible.sync="dialogFormVisible" :before-close="closeDialog">
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="跟进人员" :label-width="formLabelWidth" prop="admin_id">
            <el-select v-model="form.admin_id" placeholder="跟进人员">
              <el-option v-for="(item,i) in users.list" :key="i" :label="item.name" :value="String(item.id)"></el-option>
              <div style="float: right;margin-right:10px;padding-bottom: 10px">
                  <el-pagination
                    @current-change="selectChange"
                    :current-page="selectPage"
                    :page-size="selectPageSize"
                    layout=" prev, pager, next,total"
                    :total="users.total">
                  </el-pagination>
                </div>
            </el-select>
          </el-form-item>
          <el-form-item label="公司电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" placeholder="公司电话"></el-input>
          </el-form-item>
          <el-form-item label="公司邮编" :label-width="formLabelWidth" prop="postal_code">
            <el-input v-model="form.postal_code" placeholder="公司邮编"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" placeholder="公司地址"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submiteSave">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {customerList, adminList, customerSave, customerDel} from '../api'
// @ is an alias to /src

export default {
  name: 'CustomerView',
  data() {
    var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          const regex = new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/);
          if (!regex.test(value)) {
            callback(new Error('您输入的手机号有问题'));
          }
          callback();
        }
      };
    return {
      selectPage: 1,
      selectPageSize: 10,
      dialogFormVisible: false,
      form: {
        id: 0,
        name: '',
        phone: '',
        postal_code: '',
        address: '',
        admin_id: '',
      },
      rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
          postal_code: [
            { required: true, message: '请输入邮政编码', trigger: 'blur' },
          ],
          admin_id: [
            { required: true, message: '请选择负责人', trigger: 'blur' },
          ],
      },
      currentPage3: 0,
      users: [],
      formLabelWidth: '120px',
      tableData: [],
      page: 1,
      page_size: 10,
      
    }
  },
  components: {
  },
  mounted() {
    this.getUser();
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      const { page, page_size } = this;
      customerList({page, page_size}).then(res => {
        if(res.data.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    // 获取跟进人员
    getUser(){
      adminList({page: this.selectPage, page_size: this.selectPageSize}).then(res => {
        if(res.data.code == 0) {
          this.users = res.data.data
        }
      })
    },
    closeDialog() {
      this.form = {
        id: 0,
        name: '',
        phone: '',
        postal_code: '',
        address: '',
        admin_id: '',
      }
      this.dialogFormVisible = false;
    },
    // 提交保存信息
    submiteSave() {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            customerSave(this.form)
                .then(res => {
                if(res.data.code == 0) {
                  // vm.users = res.data.data
                  this.dialogFormVisible = false;
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.page = 1;
                  this.getList()
                }
              })
              .catch((error) => {
                this.$message({
                    message: '保存失败',
                    type: 'error'
                  });
                  console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    // 修改记录
    edit(row) {
        this.form = row
        this.dialogFormVisible = true;
    },
    // 删除记录
    del(id) {
      customerDel({id: id}).then(res => {
                if(res.data.code == 0) {
                    this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.page = 1;
                  this.getList()
                }else {
                    this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                }
            })
        },
        
    handleCurrentChange(page) {
      this.page = page;
      this.getList()
    },
    selectChange(page) {
      this.selectPage = page;
      this.getUser()
    },
  },
}
</script>
