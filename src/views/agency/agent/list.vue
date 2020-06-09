<template>
    <div>
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      style="margin:20px">
      <el-table-column
        prop="id"
        label="工号"
        width="180">
      </el-table-column>
      <el-table-column
        label="性别"
        width="180">
        <template slot-scope="scope">{{scope.row.gender===1?'男':'女'}}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="图片"
        width="180">
        <template slot-scope="scope"> 
        <img :src="scope.row.avatar" width="100" height="100"/>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center">
        <template slot-scope="scope"> 
            <el-button type="danger" icon="el-icon-delete" @click="removeDataByid(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>    
    </el-table>

    <el-pagination

      :current-page="page"
      :page-size="limit"
      :total="total"
      background
      style="padding:30px 0;text-align:center;"
      layout="total,prev, pager, next"
      @current-change="getList">
    </el-pagination>
    </div>
</template>
<script>
import agent from '@/api/agent'
export default {
    data(){
        return {
            list:null,
            page:1,
            limit:5,
            total:0
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
            this.page=page
            agent.getAgentListPage(this.page,this.limit)
            .then(res=>{
                this.list=res.data.rows,
                this.total=res.data.total


            }).catch(error=>{console.log(error)})
        },
        removeDataByid(id){
              this.$confirm('此操作将永久删除该经纪人, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                agent.deleteAgentId(id).then(res=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getList()
                })

              })


            
        }

    }
    
}
</script>