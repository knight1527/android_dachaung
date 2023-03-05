<template>
	<view class="container">
		
		<uni-nav-bar :fixed="true" height="80rpx" title="我的"></uni-nav-bar>
		
		<!-- 个人栏 -->
		<uni-row>
			<view class="margin_15 radious_20" style="height: 200rpx;background-color:aliceblue;">
				<uni-col :span="6">
					<view style="height: 200rpx" class=" aligin_center_item">
						<image src="../../static/faces/3-thump.jpg" class="image_user"></image>
					</view>
				</uni-col>
				<uni-col :span="11">
					<view style="height: 160rpx;" class="padding_20">
						<uni-row>
							<view class="margin_10" style="font-size: 45rpx;">
								<text class="margin_left_15">nickname</text>
							</view>
						</uni-row>
						<uni-row>
							<view class="margin_10 padding_20" style="font-size: 30rpx;">
								<uni-col :span="12">
									<navigator hover-class="click_nav" class="font_grey"><text>关注 </text><text>0</text></navigator>
								</uni-col>
								<uni-col :span="12">
									<navigator hover-class="click_nav" class="font_grey"><text>粉丝 </text><text>0</text></navigator>
								</uni-col>
							</view>
						</uni-row>
					</view>
				</uni-col>
				<uni-col :span="7">
					<view style="height: 200rpx;" class="aligin_center_item" @click="change()">
						<navigator hover-class="click_nav" url="/pages/self/self_detail/self_detail">
							<text class="margin_right_10">主页</text>
							<uni-icons :color="icon_color" type="right"></uni-icons>
						</navigator>
					</view>
				</uni-col>
			</view>
		</uni-row>
		
		<!-- 个人信息栏 -->
		<uni-row>
			<view class="border_tb">
				<uni-section title="使用提示" type="line">
					<uni-card :is-shadow="false" is-full>
						<text class="uni-h6">为了方便大家能找到志同道合的朋友，建议完善院校专业和邮箱的相关信息；如有使用体验的不适请点击下方帮助与反馈发送邮件。</text>
					</uni-card>
				</uni-section>
			</view>
		</uni-row>
		
		<!-- 相关选项 -->
		<uni-row>
			<view class="margin_top_20">
				<uni-list>
					<uni-list-item title="我的收藏" showArrow></uni-list-item>
					<uni-list-item title="编辑资料" showArrow></uni-list-item>
					<uni-list-item title="设置" showArrow></uni-list-item>
					<uni-list-item title="帮助与反馈" showArrow></uni-list-item>
				</uni-list>
			</view>
		</uni-row>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icon_color: '',
				user: {
					avatar: '',
					nickname: '',
					college: '',
					major: '',
					email: '',
					description: '',
					blog: ''
				}
			}
		},
		onShow() {
			this.unchange()
		},
		methods: {
			/* 点击改变icon颜色方法 */
			change(){
				this.icon_color = '#C0C0C0';
			},
			/* 页面返回重置icon颜色 */
			unchange(){
				this.icon_color = '';
			},
		  showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
		}
	}
</script>

<style lang="scss">
	.image_user{
		height: 150rpx;
		width: 150rpx;
		border-radius: 150rpx;
	}
	.border_tb{
		margin-top: 15rpx;
		border-top: 1rpx;
		border-left: 0;
		border-bottom: 0;
		border-right: 0;
		border-color: 	#DCDCDC;
		border-style: solid;
	}
	.uni-h6{
		font-size: 32rpx;
	}
</style>
