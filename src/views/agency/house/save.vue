<template>
    <div>添加房产
        <el-form  label-width="150px"  class="demo-ruleForm">
  <el-form-item label="房源名称">
    <el-input v-model="house.name"></el-input>
  </el-form-item>
    <el-form-item label="城市">
    <el-input v-model="house.city"></el-input>
  </el-form-item>
  <el-form-item label="房源面积">
    <el-input v-model="house.size"></el-input>
  </el-form-item>
  <el-form-item label="房源价格">
    <el-input v-model="house.price"></el-input>
  </el-form-item>
  <el-form-item label="房源类型">
    <el-input v-model="house.style"></el-input>
  </el-form-item>
  <el-form-item label="房源详情">
    <el-input v-model="house.houseinfo"></el-input>
  </el-form-item>
  <el-form-item label="房源所属经纪人">
    <el-select v-model="house.userid" clearable placeholder="请选择">
      <el-option v-for="agent in agentlist"
                :key="agent.id"
                :label="agent.name"
                :value="agent.id"></el-option>     
    </el-select>
  </el-form-item>
  <el-form-item label="添加房源状态">
    <el-select v-model="house.status" clearable placeholder="请选择">
      <el-option label="出售" :value="1"></el-option>
      <el-option label="出租" :value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" :disabled="saveBtnDisabled" @click="createHouse">立即创建</el-button>
  </el-form-item>
</el-form>
    </div>
</template>
<script>
import houseapi from '@/api/house'
export default {
    data(){
        return{
            house:{name:"",size:"",price:"",houseinfo:"",city:"",userid:"",style:"",status:""},        
            saveBtnDisabled:false,
            agentlist:[]
        }
    },
    created(){
        this.getAllAgent()
    },
    methods:{
        getAllAgent(){
            houseapi.getAllAgent()
            .then(res=>{
               this.agentlist= res.data.items
            })
        },
        createHouse(){
            console.log(this.house)
            houseapi.addhouse(this.house)
            .then(res=>{
                 this.$message({
                    type:'success',
                    message:'成功'
                 })
          })
        }
    }   
}
</script>