import request from '@/utils/request'

export default {
    getAgentListPage(current,limit){
        return request({
            // url: '/service/controller/info',
            url:`/user/controller/pageUser/${current}/${limit}`,
            method: 'get',
        })
    },
    addagent(agent){
        return request({
            url: `/user/controller/add`,        
            method: 'post',
            data:agent
        })
    },
    deleteAgentId(id){
        return request({
            url:`/user/controller/deleted/${id}`,
            method: 'post',
        })
    }
}



