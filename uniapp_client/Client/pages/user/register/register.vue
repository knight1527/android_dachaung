<template>
	<view class="container">
		<view class="status_bar">
		      <!-- 这里是状态栏 -->
		</view>
		<uni-row>
			<view  style="height: 100rpx;"></view>
		</uni-row>
		<uni-row>
			<view class="avatar margin_auto text_center">
				<text>注 册</text>
			</view>
		</uni-row>
		
		
		<uni-row>
			<view class="margin_top_50 margin_left_50 margin_right_50" style="height: 100rpx;">
				<uni-forms :modelValue="formData_register" ref="form" :rules="rules">
					
						<uni-forms-item label="账号" required name="username">
							<uni-easyinput type="text" prefixIcon="contact-filled" v-model="formData_register.username" placeholder="账号(数字和字母组成)"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="密码" required name="password">
							<uni-easyinput type="password" prefixIcon="locked-filled" v-model="formData_register.password" placeholder="密码(至少6位)"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="确认密码" required name="verify_password">
							<uni-easyinput type="password" prefixIcon="locked-filled" v-model="formData_register.verify_password" placeholder="确认密码"></uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="验证码" required name="code">
							<uni-col :span="12">
								<uni-easyinput type="text" v-model="formData_register.code" placeholder="验证码(点击刷新)">
								</uni-easyinput>
							</uni-col>
							<uni-col :span="12">
								<image class="margin_left_30" style="width: 180rpx;height: 90rpx;" :src="codeUrl" @click="getCode()"></image>
							</uni-col>
						</uni-forms-item>
					
				</uni-forms>
				<button type="primary" @click="submit()">注册</button>
			</view>
		</uni-row>
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js'
	export default {
		data() {
			return {
				formData_register: {
					username: '',
					password: '',
					verify_password: '',
					code: '',
					codeID: ''
				},
				codeUrl: '',
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 6) {
									console.log("至少六位")
									callback('密码至少六位')
								}
								return true
							}
						}]
					},
					verify_password: {
						rules: [{
							required: true,
							errorMessage: '确认密码不能为空'
						},{
							validateFunction:function(rule,value,data,callback){
								if (value != data.password) {
									console.log("两次密码不一致")
									callback('两次密码不一致')
								}
								return true
							}
						}]
					},
					code: {
						rules:[{required: true,errorMessage: '验证码不能为空'}]
					}
				},
			}
		},
		onReady(){
			
		},
		created() {
			//获取验证码
			this.getCode()
		},
		methods: {
			//每次点击刷新验证码
			getCode(){
			  $request({url: '/user/code', method: 'GET', data: ''}).then(res=>{
			  	this.codeUrl = res.data.img
			  	this.formData_register.codeID = res.data.uuid
			  }).catch(err=>{
			  	console.log('验证码请求失败' + err.msg)
			  }) 
			},
			//表单提交
			submit(){
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					//用户名是否已注册验证
					$request({
						url: '/user/queryUser',
						method: 'GET',
						data: {username: this.formData_register.username}
					}).then(res=>{
						//console.log(res.code + this.formData_register.username)
						if(res.code == '200'){
							console.log("username 合法")
						}else{
							uni.showToast({
								icon: 'error',
								title: '账号已存在！'
							})
							return
						}
					}).catch(err=>{
						console.log('服务器 500！')
						return
					})
					//提交表单
					$request({
						url: '/user/register',
						method: 'POST',
						data: {
							username: this.formData_register.username,
							password: this.formData_register.password,
							code: this.formData_register.code,
							codeID: this.formData_register.codeID
						}
					}).then(res=>{
						if(res.code == '200'){
							uni.setStorageSync('token', res.data.token)
						
							uni.switchTab({
								url: '/pages/index/index'
							})
							uni.showToast({
								title: '注册成功'
							})
						}else if(res.code == '202'){
							uni.showToast({
								icon: 'error',
								title: '验证码错误'
							})
						}else{
							//注册失败
							uni.showToast({
								icon: 'error',
								title: res.msg
							})
							console.log(res.code + " Msg:" + res.msg)
						}
					}).catch(err=>{
						console.log(err.code + "Msg:" + err.msg)
					})
				}).catch(err=>{
					console.log('表单错误：', err);
				})
			}
		}
	}
</script>

<style lang="scss">
		.avatar{
			height: 250rpx;
			background-color: #F5F5F5;
			width: 250rpx;
			border-radius: 250rpx;
		}
		.text_center{
			display: flex;
			text{
				color: #03DAC5;
				font-size: 60rpx;
				margin: auto;
			}
		}
</style>
