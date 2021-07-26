import { getStoreList, getCommodityTypeList, getStoreOutList } from '../api/index';
 export default {
   async getStore() {
     let list = []
    let enterList = await getStoreList()
    let typeList = await getCommodityTypeList()
    let outList = await getStoreOutList()
    typeList.list.forEach(item => {
      let enter_num = 0, enter_price = 0, out_num = 0, out_price = 0
      enterList.list.forEach(item2 => {
        if(item2.type_id == item.id) {
          enter_num = enter_num + Number(item2.num) 
          enter_price = enter_price + item2.price * item2.num
        }
      })
      outList.list.forEach(item2 => {
        if(item2.type_id == item.id) {
          out_num = out_num + Number(item2.num) 
          out_price = out_price + item2.price * item2.num
        }
      })
      item['enter_num'] = enter_num
      item['out_num'] = out_num
      item['enter_price'] = enter_price
      item['out_price'] = out_price
      list.push(item)
    });
    console.log(list)
   }
 }