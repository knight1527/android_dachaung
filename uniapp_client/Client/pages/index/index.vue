<template>
	<view class="content">
		<view class="status_bar">
		      <!-- 这里是状态栏 -->
		</view>
		<text>首页</text>
		<button type="primary" @click="login()">登录</button>
		
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="primary" @click="query()">api</button>
		
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				uni.navigateTo({
					url: '/pages/user/login/login'
				})
			},
			query(){
				$request({url: '/test/api', method: 'GET', data: ''}).then(res=>{
					uni.showToast({
						title: 'data：' + res.msg
					})
				}).catch(err=>{
					console.log('请求失败')
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
