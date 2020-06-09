<template>
    <div>
        <h3>在线支付房源押金</h3>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="手机号">
                <el-input v-model="phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码">
                <el-input  placeholder="手机验证码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="sendCode">发送验证码</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true">            
            <el-form-item label="支付金额" >
                <el-input  placeholder="支付金额"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">支付</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Rent from '@/api/rent'
export default {
    data(){
        return{
            phone:'',
            
        }
    },
    methods:{
        sendCode(){
            console.log(this.phone)
            Rent.getCode(this.phone).then(res=>{
                   this.$message({
                    type: 'success',
                    message: '验证码发送成功!'})
            })

        }
    }
}
</script>