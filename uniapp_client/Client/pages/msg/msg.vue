<template>
	<view class="container">
		<uni-nav-bar :fixed="true" height="80rpx" title="同志"></uni-nav-bar>
		<uni-row>
			<view style="height: 110rpx;" class="baiyan">
				<uni-col :span="20">
					<view class="margin_10">
						<uni-easyinput placeholder="搜索用户" clearable></uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="4" >
					<view style="width: 100%;" class="margin_auto">
						<view class="margin_top_20 margin_left_15">
							<uni-icons type="search" size="28" color="grey"></uni-icons>
						</view>
					</view>
				</uni-col>
			</view>
		</uni-row>
		<uni-row>
			<view style="height: 110rpx;" class="border_line_grey_bt_tiny aligin_center_text_left">
				<uni-col :span="12">
					<view class="aligin_center_text_left"> 
						<view class="margin_left_15"></view>
						<uni-icons type="auth-filled" size="27" color="#03dac5"></uni-icons>
						<view class="margin_left_30">关注</view>
					</view>
				</uni-col>
				<uni-col :span="12">
					<view class="aligin_center_text_right padding_right_30">
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-col>
			</view>
			<view style="height: 110rpx;" class="border_line_grey_bt_tiny aligin_center_text_left">
				<uni-col :span="12">
					<view class="aligin_center_text_left"> 
						<view class="margin_left_15"></view>
						<uni-icons type="auth-filled" size="27" color="#F0E68C"></uni-icons>
						<view class="margin_left_30">粉丝</view>
					</view>
				</uni-col>
				<uni-col :span="12">
					<view class="aligin_center_text_right padding_right_30">
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-col>
			</view>
		</uni-row>
		<uni-row>
			<view class="border_line_grey_bt_tiny fill_width" style="height:800rpx">
				<view style="height: 110rpx;" class=" aligin_center_text_left">
					<uni-col :span="12">
						<view class="aligin_center_text_left"> 
							<view class="margin_left_15"></view>
							<uni-icons type="chatboxes-filled" size="27" color="#87CEFA"></uni-icons>
							<view class="margin_left_30">系统消息</view>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_text_right padding_right_30">
							
						</view>
					</uni-col>
				</view>
				<view class="baiyan margin_20">
					  
				</view>
			</view>
		</uni-row>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
