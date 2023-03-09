<template>
	<view class="container">
			<uni-row>
				<view style="height: 100rpx;" class="border_line_grey_b_tiny align">
					<uni-col :span="12">
						<view class="aligin_center_item_left fill" style="height: 100rpx;">
							<image class="margin_left_50" style="height: 80rpx;width: 80rpx;border-radius: 80rpx;" :src="user.avatar"></image>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_item_right margin_right_50" style="height: 100rpx;">
							<button class="margin_none" size="mini" @click="chooseImage">上传</button>
						</view>
					</uni-col>
				</view>
			</uni-row>
			<uni-row>
				<view @click="dialogOpen(1)" style="height: 100rpx;" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50">
					<view style="width: 50%;" class="margin_right_10">昵称：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.nickname}}</view>
				</view>
				<view @click="dialogOpen(2)" style="height: 100rpx;" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50">
					<view style="width: 50%;" class="margin_right_10">学校：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.college}}</view>
				</view>
				<view @click="dialogOpen(3)" style="height: 100rpx;" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50">
					<view style="width: 50%;" class="margin_right_10">专业：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.major}}</view>
				</view>
				<view @click="dialogOpen(4)" style="height: 100rpx;" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50">
					<view style="width: 50%;" class="margin_right_10">邮箱：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.email}}</view>
				</view>
				<view @click="dialogOpen(5)" style="height: 100rpx;" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50">
					<view style="width: 50%;" class="margin_right_10">个人博客：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.blog}}</view>
				</view>
				<view @click="dialogOpen(6)" class="border_line_grey_b_tiny aligin_center_item_left padding_rl_50 padding_tb_20">
					<view style="width: 50%;" class="margin_right_10">座右铭：</view>
					<view style="width: 50%;color: grey;font-size: 30rpx;" class="aligin_center_item_right">{{user.description}}</view>
				</view>
				
				<view class="fill">
					<button @click="submit" class="margin_20" type="primary">保存提交</button>
				</view>
			</uni-row>


		<!-- 输入框示例 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" :value="inputDialogValue"
				placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 对于不用异步请求后端（nickname）的其他弹出层 -->
		<uni-popup ref="inputDialog2" type="dialog">
			<uni-popup-dialog ref="inputClose2"  mode="input" title="输入内容" :value="inputDialogValue2"
				placeholder="请输入内容" @confirm="dialogInputConfirm2"></uni-popup-dialog>
		</uni-popup>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js'
	var self_
	export default {
		data() {
			return {
				/* 提示消息 */
				msgType: 'success',
				messageText: '这是一条成功提示',
				/* popup对话框预设值 */
				inputDialogValue: '',
				inputDialogValue2: '',
				/* 调用了对话框的index */
				dialogIndex: 2,
				formData:{
					avatar: [],
				},
				/* 用户 */
				tepId: 0,
				user: {
					avatar: '../../../static/faces/3-thump.jpg',
					nickname: '',
					college: '',
					major: '',
					email: '',
					description: '',
					blog: ''
				}
			}
		},
		onLoad() {
			$request({
				url: '/user/self',
				method: 'POST',
			}).then(res => {
				this.user = res.data
			}).catch(err => {
				
			});
		},
		mounted() {
			
		},
		onShow() {
			
		},
		created() {
			self_ = this
		},
		methods: {
			chooseImage(){
				uni.chooseImage({
					count:1,
					sizeType: 'origin',
					sourceType:'album',
					success:function(res){
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(JSON.stringify(res.tempFiles));
						const tempFilePath = res.tempFilePaths;
						self_.formData.avatar = [tempFilePath];
						self_.avatarSrc = res.tempFilePaths
						console.log(JSON.stringify(self_.formData.avatar))
					}
				})
			},
			/* nickname */
			dialogInputConfirm(value) {
				console.log('点击确认')
				console.log(value)
				if(value == null){
					uni.showToast({
						icon:'error',
						title: '昵称不能为空' 
					})
					return;
				}
				/* 异步请求服务器看nickname是否被占用 */
				console.log('表单数据信息：', res);
				//用户名是否已注册验证
				$request({
					url: '/user/queryUser',
					method: 'GET',
					data: {username: this.user.username}
				}).then(res=>{
					if(res.code == '200'){
						console.log("username 合法")
						/* 请求成功 */
						this.msgType = 'success'
						this.messageText = "合法内容"
						this.$refs.message.open()
					}else{
						/* 请求成功 */
						this.msgType = 'err'
						this.messageText = "昵称已被占用"
						this.$refs.message.open()
					}
				}).catch(err=>{
					console.log(err)
					console.log('服务器 500！')
				})
				
			},
			dialogInputConfirm2(value) {
				console.log('点击确认2')
				console.log(value)
				self_.dosomething(value);	
			},
			dosomething(value){
				let dialogIndex = this.dialogIndex
				if(dialogIndex == 2){
					this.user.college = value
					console.log(this.user.college)
				}else if(dialogIndex == 3){
					this.user.major = value
					console.log(this.user.major)
				}else if(dialogIndex == 4){
					this.user.email = value
					console.log(this.user.email)
				}else if(dialogIndex == 5){
					this.user.blog = value
					console.log(this.user.blog)
				}
				else if(dialogIndex == 6){
					this.user.description = value
					console.log(this.user.description)
				}
			},
			dialogOpen(index){
				this.dialogIndex = index;
				if(index == 1){
					this.inputDialogValue = this.user.nickname
					this.$refs.inputDialog.open()
				}else if(index == 2){
					this.inputDialogValue2 = this.user.college
					this.$refs.inputDialog2.open()
				}else if(index == 3){
					this.inputDialogValue2 = this.user.major
					this.$refs.inputDialog2.open()	
				}else if(index == 4){
					this.inputDialogValue2 = this.user.email
					this.$refs.inputDialog2.open()
				}else if(index == 5){
					this.inputDialogValue2 = this.user.blog
					this.$refs.inputDialog2.open()
				}else if(index == 6){
					this.inputDialogValue2 = this.user.description
					this.$refs.inputDialog2.open()
				}
			},
			submit(){
				if(this.user.nickname == null){
					uni.showToast({
						icon:'error',
						title: '昵称不能为空' 
					})
					return;
				}
				/* 提交 */
				$request({
					url: '/user/update',
					method: 'POST',
					data: this.user
				}).then(res => {
					console.log(res.data)
				}).catch(err => {
					
				});
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">

</style>
