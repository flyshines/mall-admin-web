<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="member"
             :rules="rules"
             ref="memberFrom"
             label-width="150px"
             size="small">
      <el-form-item label="成员头像：">
        <single-upload v-model="member.image"></single-upload>
      </el-form-item>
      <el-form-item label="成员名称：" prop="name">
        <el-input v-model="member.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="职称：" prop="name">
        <el-input v-model="member.level" class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="开始时间：" prop="workStart">
        <el-time-select
          v-model="member.workStart"
          :picker-options="{
            start: '06:00',
            step: '00:15',
            end: '22:00'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>

      <el-form-item label="结束时间：" prop="workEnd">
        <el-time-select
          v-model="member.workEnd"
          :picker-options="{
            start: '06:00',
            step: '00:15',
            end: '22:00'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>

      <el-form-item label="个人简介：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="member.summary">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('memberFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('memberFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {createMember, getmember, updatemember} from '@/api/member'
  const defaultTypeOptions = [
    {
      label: 'PC首页轮播',
      value: 0
    },
    {
      label: 'APP首页轮播',
      value: 1
    }
  ];
  const defaultMember = {
    name: null,
    level: null,
    image: null,
    workStart: null,
    workEnd: null,
    status: 0,
    summary: null,
    address: 0
  };
  export default {
    name: 'MemberDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        member: null,
        rules: {
          name: [
            {required: true, message: '请输入成员名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          workStart: [
            {required: true, message: '请选择开始时间', trigger: 'blur'}
          ],
          workEnd: [
            {required: true, message: '请选择到期时间', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '请选择广告图片', trigger: 'blur'}
          ]
        },
        typeOptions: Object.assign({}, defaultTypeOptions)
      }
    },
    created(){
      if (this.isEdit) {
        getmember(this.$route.query.id).then(response => {
          this.member = response.data;
        });
      }else{
        this.member = Object.assign({},defaultMember);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updatemember(this.$route.query.id, this.member).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createMember(this.member).then(response => {
                  this.$refs[formName].resetFields();
                  this.member = Object.assign({},defaultMember);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.member = Object.assign({},defaultMember);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


