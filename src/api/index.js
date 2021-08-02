import axios from 'axios'
import qs from 'qs'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = '/api'
export function fetchPost(url, params, config, fail = false) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(
        (response) => {
          axios.defaults.baseURL = '/api'
          resolve(response.data)
        },
        (err) => {
          if (fail) {
            reject(err.response.data)
          } else {
            Toast(err.message)
            reject(err)
          }
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchGet(url, param, config, fail = false) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: param
			})
			.then(
				response => {
					resolve(response.data);
				},
				err => {
					if (!fail) {
						Message({
							message: err || '请求出错，请重试',
							type: 'error',
							duration: 3 * 1000
						});
					}
					reject(err);
				}
			)
			.catch(error => {
				reject(error);
			});
	});
}
export function getStopUser() {
  return fetchGet('/stop/user/select')
}
export function addStopUser(data) {
  return fetchPost('/stop/user/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
export function getUser(data) {
  return fetchGet('/users/get', data)
}
export function getRepertoryList(data) {
  return fetchGet('/repertory/select', data)
}
export function getRepertoryAdd(data) {
  return fetchPost('/repertory/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 删除记录
export function getRepertorydel(data) {
  return fetchPost('/repertory/delete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
export function getRepertoryUpdate(data) {
  return fetchPost('/repertory/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 
export function getRepertoryLeaveBank(data) {
  return fetchPost('/repertory/leaveBank', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}


// export function getTypeList() {
//   return fetchGet('/type/select')
// }

// export function addType(data) {
//   return fetchPost('/type/add', data, {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// }


// 型号 
export function getCommodityTypeList() {
  return fetchGet('/commodity/type/getlist')
}
// 添加 /type/add
export function addType(data) {
  return fetchPost('/commodity/type/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 删除
export function delType(data) {
  return fetchPost('/commodity/type/delete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 入库
// 查询
export function getStoreList(data) {
	return fetchGet('/store/enter/getlist',data)
}
// 添加
export function addStoreEnter(data) {
  return fetchPost('/store/enter/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 修改
export function updateStoreEnter(data) {
  return fetchPost('/store/enter/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

// 删除
export function delStoreEnter(data) {
  return fetchPost('/store/enter/delete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

// 查询
export function getStoreOutList(data) {
	return fetchGet('/store/out/getlist',data)
}
// 添加
export function addStoreOut(data) {
  return fetchPost('/store/out/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 修改
export function updateStoreOut(data) {
  return fetchPost('/store/out/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

// 删除
export function delStoreOut(data) {
  return fetchPost('/store/out/delete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 订单管理
// 列表 
export function getPayList() {
	return fetchGet('/pay/getlist')
}
// 删除
export function delPay(data) {
  return fetchPost('/pay/delete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
// 修改状态
export function updatePayStart(data) {
  return fetchPost('/pay/update/start', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}