<template>
	<view class="container">
		<view class="status_bar">
		      <!-- 这里是状态栏 -->
		</view>
		<uni-row>
			<view  style="height: 150rpx;"></view>
		</uni-row>
		<uni-row>
			<view class="avatar margin_auto text_center">
				<text>登 录</text>
			</view>
		</uni-row>
		
		
		<uni-row>
			<view class="margin_top_50 margin_left_30 margin_right_30" style="height: 100rpx;">
				<uni-forms :modelValue="formData_login" ref="form" :rules="rules">
					<uni-group>
						<uni-forms-item label="账号" required name="username">
							<uni-easyinput prefixIcon="contact-filled" type="text" v-model="formData_login.username" placeholder="请输入账号">
							</uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="密码" required name="password">
							<uni-easyinput prefixIcon="locked-filled" type="password" v-model="formData_login.password" placeholder="请输入密码">
							</uni-easyinput>
						</uni-forms-item>
						<uni-forms-item label="验证码" required name="code">
							<uni-col :span="12">
								<uni-easyinput type="text" v-model="formData_login.code" placeholder="验证码(点击刷新)">
								</uni-easyinput>
							</uni-col>
							<uni-col :span="12">
								<image class="margin_left_30" style="width: 180rpx;height: 90rpx;" :src="codeUrl" @click="getCode()"></image>
							</uni-col>
						</uni-forms-item>
					</uni-group>
				</uni-forms>
				<button type="primary" @click="submit()">登录</button>
				<navigator url="/pages/user/register/register" class="a_href" style="margin-top: 20rpx;">没有账号？前往注册</navigator>
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
				//基础表单数据
				formData_login: {
					username: '',
					password: '',
					code: '',
					codeID: ''
				},
				codeUrl: '',
				//表单校验
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: "账号不能为空"
						}],
					},
					password: {
						rules: [{
								required: true,
								errorMessage: "密码不能为空"
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 6) {
									console.log("至少六位")
									callback('密码至少六位')
								}
								return true
							}
						}],
						validateTrigger: 'submit'
					},
					code: {
						rules:[{required: true,errorMessage: '验证码不能为空'}]
					}
				},
				
			}
		},
		onReady() {
			
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
					this.formData_login.codeID = res.data.uuid
				}).catch(err=>{
					console.log('验证码请求失败' + err.msg)
				})
			},
			//表单提交
			submit(){
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					//提交表单
					$request({
						url: '/user/login',
						method: 'POST',
						data: {
							username: this.formData_login.username,
							password: this.formData_login.password,
							code: this.formData_login.code,
							codeID: this.formData_login.codeID
						}
					}).then(res=>{
						if(res.code == '200'){
							uni.setStorageSync('token', res.data.token)
							uni.showToast({
								title: '登录成功'
							})
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else if(res.code == '202'){
							uni.showToast({
								icon: 'error',
								title: '验证码错误'
							})
						}else{
							//登录失败
							uni.showToast({
								icon: 'error',
								title: res.msg
							})
							console.log(res.code + " Msg:" + res.msg)
						}
					}).catch(err=>{
						console.log(err.code + "Msg:" +err.msg)
					})
				}).catch(err=>{
					console.log('提交失败')
					console.log('表单错误：', err);
				})
			},
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
