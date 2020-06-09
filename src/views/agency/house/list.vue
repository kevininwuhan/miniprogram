<template>
    <div>房产列表
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="房源名称">
          <el-input v-model="houseQuery.name" placeholder="房源名称"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="houseQuery.city" placeholder="城市"></el-input>
        </el-form-item>
        <el-form-item label="房源类型">
          <el-input v-model="houseQuery.style" placeholder="房源类型"></el-input>
        </el-form-item>
        <el-form-item label="房源状态">
          <el-select v-model="houseQuery.status" placeholder="房源状态">
            <el-option :value="1" label="出售"/>
            <el-option :value="0" label="出租"/>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      style="margin-left:30px">
      <el-table-column
        prop="id"
        label="房源编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市"
        width="100">       
      </el-table-column>
      <el-table-column
        prop="name"
        label="房源名称"
        width="180">
      </el-table-column>
            <el-table-column
        prop="size"
        label="房源面积"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="房源单价"
        width="100">
      </el-table-column>
      <el-table-column
        prop="style"
        label="房源类型"
        width="100">
      </el-table-column>

       <el-table-column
        prop="houseinfo"
        label="房源详情"
        width="100">
      </el-table-column>
       <el-table-column
        prop="userid"
        label="房源所属经纪人工号"
        width="100">
      </el-table-column>
      <el-table-column
        label="房源状态"
        width="100">
        <template slot-scope="scope">{{scope.row.status===1?'出售':'出租'}}</template>
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
import house from '@/api/house'
export default {
    data(){
        return{
            list:null,
            page:1,
            limit:10,
            total:0,
            houseQuery:{},
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page = 1){
            this.page = page
            house.getHouseListPage(this.page,this.limit,this.houseQuery)
            .then(res=>{
                this.list=res.data.rows,
                this.total=res.data.total
                console.log(this.list),
                console.log(this.total)

            }).catch(error=>{console.log(error)})
        },
        removeDataByid(id){
          this.$confirm('此操作将永久删除该房源, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                house.deleteHouseId(id).then(res=>{
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