<template>
    <div class="home">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-descriptions title="基本信息">
        <el-descriptions-item label="跟进人">{{ info.admin.name }}</el-descriptions-item>
        <el-descriptions-item label="公司电话">{{ info.customer.phone }}</el-descriptions-item>
        <el-descriptions-item label="公司邮编">{{ info.customer.postal_code }}</el-descriptions-item>
        <el-descriptions-item label="公司地址">{{ info.customer.address }}</el-descriptions-item>
    </el-descriptions>
    <el-tabs v-model="activeName" style="height: 200px;">
        <el-tab-pane label="联系人" name="first" >
            <el-button type="primary" size="small" @click="dialogContactsVisible = true">添加联系人</el-button>
            <el-button type="primary" size="small" @click="infoRefresh">刷新</el-button>
            <el-card class="box-card" v-for="(item, i) in contacts.list" :key="i">
                <div slot="header" class="clearfix">
                    <span>{{ item.name }} {{ item.sex == 1 ? '先生' : '女士' }} {{ item.department }} 
                        <el-tag type="warning" v-if="item.importanc == 3">重要</el-tag>
                        <el-tag type="info" v-if="item.importanc == 2">普通</el-tag>
                    </span>

                </div>
                <el-col :span="8">
                    手机：<p v-for="(val, inx) in contact_phones[item.id]" :key="inx">{{ val.value }}</p>
                </el-col>
                <el-col :span="8">
                    电话：{{ item.telephone }}
                </el-col>
                <el-col :span="8">
                    邮箱：{{ item.email }}
                </el-col>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="跟进记录" name="second">
            <el-button type="primary" size="small" @click="dialogFollowsVisible = true">添加跟进</el-button>
            <el-button type="primary" size="small" @click="editFollowStatus">完成</el-button>
            <el-button type="primary" size="small" @click="infoRefresh">刷新</el-button>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>未完成（{{ follows.follow_not.length || 0 }}条）</span>
                </div>
                <div class="text item">
                    <el-table
                    ref="multipleTable"
                    :data="follows.follow_not"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="安排时间"
                    width="120">
                        <template slot-scope="scope">{{ scope.row.arrange_time + '/' + follows.follow_admin[scope.row.admin_id].name }}</template>
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    width="120">
                        <template slot-scope="scope">{{ scope.row.created_at + '/' + follows.follow_admin[scope.row.admin_id].name }}</template>
                    </el-table-column>
                    <el-table-column
                    label="联系人"
                    width="120">
                        <template slot-scope="scope">{{ follows.follow_contact[scope.row.customer_contact_id].name }}</template>
                    </el-table-column>
                    <el-table-column
                    label="联系方式"
                    width="120">
                        <template slot-scope="scope">{{ contactTypes[scope.row.contact_type] }}</template>
                    </el-table-column>
                    <el-table-column
                    label="阶段"
                    width="120">
                        <template slot-scope="scope">{{ levels[scope.row.level] }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="editFollow(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delFollow(scope.row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>已完成（{{ follows.follow_success.length || 0 }}条）</span>
                </div>
                <div class="text item">
                    <el-table
                        ref="multipleTable"
                        :data="follows.follow_success"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="安排时间"
                        width="120">
                            <template slot-scope="scope">{{ scope.row.arrange_time + '/' + follows.follow_admin[scope.row.admin_id].name }}</template>
                        </el-table-column>
                        <el-table-column
                        label="创建时间"
                        width="120">
                            <template slot-scope="scope">{{ scope.row.created_at + '/' + follows.follow_admin[scope.row.admin_id].name }}</template>
                        </el-table-column>
                        <el-table-column
                        label="联系人"
                        width="120">
                            <template slot-scope="scope">{{ follows.follow_contact[scope.row.customer_contact_id].name }}</template>
                        </el-table-column>
                        <el-table-column
                        label="联系方式"
                        width="120">
                            <template slot-scope="scope">{{ contactTypes[scope.row.contact_type] }}</template>
                        </el-table-column>
                        <el-table-column
                        label="阶段"
                        width="120">
                            <template slot-scope="scope">{{ levels[scope.row.level] }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-tab-pane>
    </el-tabs>
    
    <el-dialog :rules="rules" title="添加联系人" :visible.sync="dialogContactsVisible" :before-close="contactesClose">
        <el-form ref="formContacts" :rules="rules" :model="formContacts">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formContacts.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" >
            <el-select v-model="formContacts.sex" placeholder="性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth" >
            <el-input v-model="formContacts.department" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="重要性" :label-width="formLabelWidth" >
            <el-select v-model="formContacts.importanc" placeholder="重要性">
              <el-option label="未确定" :value="1"></el-option>
              <el-option label="普通" :value="2"></el-option>
              <el-option label="重要" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="(val, i) in phones" :key="i" :label="'手机' + (i ? i : '')" :label-width="formLabelWidth">
                <input class="inline-input" type="text" style="width: 40vh" v-model="val.value" placeholder="手机" />
                <i v-if="i" class="el-icon-delete" style="margin-left: 20px;" @click="delPhone(i)"></i>
                <el-button v-else size="mini" @click="addPhone">增加</el-button>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" >
            <el-input v-model="formContacts.telephone" placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" >
            <el-input v-model="formContacts.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" >
            <el-input v-model="formContacts.remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogContactsVisible = false">取 消</el-button>
            <el-button type="primary" @click="submiteSaveContacts">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="添加跟进" :visible.sync="dialogFollowsVisible" :before-close="followsClose">
        <el-form ref="formFollows" :model="formFollows.arrange_time">
            <el-form-item label="安排时间" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="formFollows.arrange_time"
                    type="datetime"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="跟进人" :label-width="formLabelWidth">
                <el-select v-model="formFollows.admin_id" placeholder="跟进人员">
                    <el-option v-for="(item,i) in users" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-select v-model="formFollows.customer_contact_id" placeholder="联系人">
                    <el-option v-for="(item, i) in contacts.list" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-select v-model="formFollows.contact_type" placeholder="联系方式">
                    <el-option v-for="(val, i) in contactTypes" :key="i" :label="val" :value="Number(i)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="跟进阶段" :label-width="formLabelWidth">
                <el-select v-model="formFollows.level" placeholder="跟进阶段">
                    <el-option v-for="(val, i) in levels" :key="i" :label="val" :value="Number(i)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="formFollows.remark">
                </el-input>
            </el-form-item>
            <el-form-item label="跟进状态" :label-width="formLabelWidth">
                <el-checkbox v-model="formFollows.status" :true-label="1" :false-label="0">已完成</el-checkbox>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFollowsVisible = false">取 消</el-button>
            <el-button type="primary" @click="submiteSaveFollows">确 定</el-button>
        </div>
    </el-dialog>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
    import axios from 'axios'
    import Qs from 'qs'

  
  export default {
    name: 'CustomerView',
    data() {
      return {
        dialogFollowsVisible: false,
        dialogContactsVisible: false,
        formContacts: {
            name: '',
            sex: '',
            customer_id: '',
            telephone: '',
            importanc: '',
            email: '',
            remark: '',
            phones: '',
        },
        rules: {
            name: [
                { required: true, message: '请输入公司名称', trigger: 'blur' },
            ],
            telephone: [
                { required: true, message: '请输入电话', trigger: 'blur' },
            ],
            importanc: [
                { required: true, message: '请选择重要性', trigger: 'blur' },
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
            ],
            remark: [
                { required: true, message: '请输入备注', trigger: 'blur' },
            ],
        },
        levels: {
            1: '了解客户需求及开通试用',
            2: '发送资料',
            3: '见面沟通',
            4: '确定方案、合同',
            5: '续约电话',
            6: '培训',
            7: '其他',
        },
        contactTypes: {
            1: '电话',
            2: '邮件',
            3: '会面',
            4: '其他',
        },
        users: [],
        phones: [{value: ''}],
        formFollows: {
            id: 0,
            arrange_time: '',
            admin_id: '',
            customer_id: '',
            customer_contact_id: '',
            contact_type: 1,
            level: 1,
            remark: '',
            status: 0,
        },
        info: {
            admin: [],
            customer: [],
            customer_contacts: [],
            customer_follow: [],
            customer_follow_not: [],
        },
        activeName: "first",
        tableData: [],
        formLabelWidth: '120px',
        delFollowIds: [],
        contacts: {},
        follows: [],
        contact_phones: []
      }
    },
    components: {
    },
    mounted() {
        this.formContacts.customer_id = this.$route.query.customer_id
        this.formFollows.customer_id = this.$route.query.customer_id
        this.getInfo()
        this.getUser()
        this.getCustomer()
        this.getFollow()
    },
    methods: {
        // 刷新信息
        infoRefresh() {
            this.getInfo()
        },
        // 获取客户信息
        getInfo() {
            axios.get('http://localhost:3000/customers/show', {params: {id: this.$route.query.customer_id}}).then(res => {
                if(res.data.code == 0) {
                    this.info = res.data.data
                }
            })
        },
        getCustomer() {
            axios.get('http://localhost:3000/customer-contacts/get-list', {params: {customer_id: this.$route.query.customer_id, page: 1, page_size: 999999}}).then(res => {
                if(res.data.code == 0) {
                    this.contacts = res.data.data
                    for(let i in this.contacts.list) {
                        if (this.contacts.list[i].phones == '[]'){
                            this.contact_phones[this.contacts.list[i].id] = JSON.parse(this.contacts.list[i].phones) || {}
                        } else {
                            this.contact_phones[this.contacts.list[i].id] = JSON.parse(JSON.parse(this.contacts.list[i].phones))
                        }
                    }
                    console.log(this.contact_phones)
                }
            })
        },
        getFollow() {
            axios.get('http://localhost:3000/customer-follows/get-list', {params: {customer_id: this.$route.query.customer_id, page: 1, page_size: 999999}}).then(res => {
                if(res.data.code == 0) {
                    this.follows = res.data.data
                    
                }
            })
        },
        // 获取跟进人员
        getUser(){
            axios.get('http://localhost:3000/admins/get-list', {params: {page:1, page_size: 99999}}).then(res => {
                if(res.data.code == 0) {
                    this.users = res.data.data
                }
            })
        },
        // 关闭联系人编辑框时重置数据
        contactesClose() {
            this.formContacts = {
                name: '',
                sex: '',
                customer_id: this.$route.query.customer_id,
                telephone: '',
                importanc: '',
                email: '',
                remark: '',
                phones: ''
            }
            this.phones = [{value: ''}]
            this.dialogContactsVisible = false;
        },
        // 关闭跟进记录编辑框时重置数据
        followsClose() {
            this.formFollows = {
                id: 0,
                arrange_time: '',
                admin_id: '',
                customer_id: this.$route.query.customer_id,
                customer_contact_id: '',
                contact_type: 1,
                level: 1,
                remark: '',
                status: 0,
            }
            this.dialogFollowsVisible = false;
        },
        // 表格选中时触发的事件
        handleSelectionChange(res){
            this.delFollowIds = [];
            this.delFollowIds = res.map(function(val) {
                return val.id
            })
            console.log(this.delFollowIds)
        },
        addPhone() {
            this.phones.push({value: ''});
        },
        delPhone(i) {
            this.phones.splice(i, 1)
        },
        // 修改跟进记录
        editFollow(row) {
            this.formFollows = row
            this.dialogFollowsVisible = true;
        },
        // 批量完成跟进记录
        editFollowStatus() {
            axios({
                        url: 'http://localhost:3000/customer-follows/edit-status', 
                        method: 'post',
                        data: Qs.stringify({ids: this.delFollowIds}), 
                    })
                    .then(res => {
                        if(res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getInfo()
                        }else {
                            this.$message({
                                message: '修改失败',
                                type: 'error'
                            });
                        }
                    })
        },
        // 删除跟进记录
        delFollow(follow_id) {
            axios.get('http://localhost:3000/customer-follows/del', {params: {id: follow_id}}).then(res => {
                if(res.data.code == 0) {
                    this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    this.getInfo()
                }else {
                    this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                }
            })
        },
        
        // 添加联系人
        submiteSaveContacts() {
            this.$refs['formContacts'].validate((valid) => {
                if (valid) {
                    console.log(this.formContacts);
                    this.formContacts['phones'] = JSON.stringify(this.phones)
                    axios({
                        url: 'http://localhost:3000/customer-contacts/save', 
                        method: 'post',
                        data: Qs.stringify(this.formContacts), 
                    })
                    .then(res => {
                        if(res.data.code == 0) {
                            // vm.users = res.data.data
                            this.dialogContactsVisible = false;
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.getInfo()
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
        // 创建或修改跟进记录
        submiteSaveFollows() {
            this.$refs['formFollows'].validate((valid) => {
                if (valid) {
                    axios({
                        url: 'http://localhost:3000/customer-follows/save', 
                        method: 'post',
                        data: Qs.stringify(this.formFollows), 
                    })
                        .then(res => {
                        if(res.data.code == 0) {
                        // vm.users = res.data.data
                        this.dialogFollowsVisible = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.getInfo()
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
    }
  }
  </script>
  