import request from '@/utils/request'

export default {
    getCode(phone){
        return request({
            url: `http://39.106.96.28:8002/agencyoss/msgoss/send/${phone}`,        
            method: 'get',
        })
    },
}