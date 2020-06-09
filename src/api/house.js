import request from '@/utils/request'

export default {
    getHouseListPage(current,limit,houseQuery){
        return request({
            // url: '/service/controller/info',
            url:`/house/controller/housecondition/${current}/${limit}`,
            method: 'post',
            data:houseQuery
        })
    },
    addhouse(house){
        return request({
            url: `/house/controller/add1`,        
            method: 'post',
            data:house
        })
    },
    getAllAgent(){
        return request({
            url: `/user/controller/test`,        
            method: 'get',
        })
    },
    deleteHouseId(id){
        return request({
            url:`/house/controller/deleted/${id}`, 
            method: 'post',
        })

    }

}