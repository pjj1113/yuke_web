import request from 'utils/request'

const SHOP_ADD = 'SHOP_ADD'
const SHOP_DEL = 'SHOP_DEL'
 const SHOP_MODIFY = 'SHOP_MODIFY'
const SHOP_QUERY = 'SHOP_QUERY'


export default {
    state: {
        shopData:null
    },

    actions:{
       async query({commit}){
           const result = await request({url:'/shop',method:"GET"})
           commit({
            type: SHOP_QUERY,
            payload: result.data.result
           })
        },
        async del({commit},_id){
            const result = await request({
                url:'/shop',
                method:"DELETE",
                params:{
                    _id:_id
                }
            })
            commit({
                type:SHOP_DEL,
                payload:result.data.result
            })
        }
    },
    mutations:{
        SHOP_QUERY(state,actions){
            state.shopData = actions.payload
        },
        SHOP_DEL(state,actions){
            state.shopData = actions.payload
        }
    }
}