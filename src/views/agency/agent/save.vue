<template>
<div>
  <h1>添加经纪人</h1>
<el-form  label-width="100px"  class="demo-ruleForm">
  <el-form-item label="名字">
    <el-input v-model="agent.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄">
    <el-input v-model="agent.age"></el-input>
  </el-form-item>
   <el-form-item label="简介">
    <el-input v-model="agent.email"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="agent.gender" clearable placeholder="请选择">
      <el-option label="男" :value="1"></el-option>
      <el-option label="女" :value="2"></el-option>
    </el-select>
  </el-form-item>

  <el-upload
      class="avatar-uploader"
      :action="ossupload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>

  <el-form-item>
    <el-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate">立即创建</el-button>
  </el-form-item>
</el-form>

</div>
</template>
<script>
import agentapi from '@/api/agent'

export default {
     data(){
        return {
            agent:{name:'',age:'',email:'',gender:1,avatar:''},
            saveBtnDisabled:false,
            imageUrl: '' ,
            ossupload:"http://39.106.96.28:8002/agencyoss/fileoss"
        }

    },
    created(){
       
    },
    methods:{


        handleAvatarSuccess(res, file) {
          
        this.imageUrl = URL.createObjectURL(file.raw);
        this.agent.avatar=res.data.url
        
        },
         beforeAvatarUpload(file) {
        
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
        saveOrUpdate(){
            agentapi.addagent(this.agent)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'成功'
                })
            })      
        },
    }   
}
</script>

<style>
  .avatar-uploader .el-upload {
    margin-left: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>