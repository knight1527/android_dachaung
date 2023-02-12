const BASE_URL = `http://localhost:8096`

/* 封装的request */
export const $request = (options) => {  // {url: '', method: '', data: {}}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: {token: uni.getStorageSync('user') ? uni.getStorageSync('user').token : ''},
			data: options.data || {},
			success: (res) => {
				const data = res.data
				if (data.code == '401') {  // 401表示无权限
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
					uni.showToast({
						icon: 'error',
						title: '请登录！'
					})
					return
				} 
				console.log("请求成功")
				resolve(data) 
			},
			fail: (error) => {
				uni.showToast({
					icon: 'error',
					title: '系统错误'
				})
				console.log("请求失败")
				reject(error)
			}
		})
	})
}