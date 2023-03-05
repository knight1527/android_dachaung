<template>
	<view class="container">
		
		
		<view class="fill_width margin_b0ttom_10" style="height: 350rpx;">
			<image class="fill" src="../../../static/ad/ad1.jpg"></image>
		</view>
		<view class="fill_width border_line_grey_b_tiny" style="height: 160rpx;">
			<view class="fill_width aligin_center_item_left" style="height: 70%;">
				<view class="fill_height aligin_center_item" style="width: 20%;">
					<image style="height: 90rpx;width: 90rpx;border-radius: 50%;" src="../../../static/faces/1-thump.jpg"></image>
				</view>
				<view class="fill_height aligin_center_item_left" style="width: 40%;">
					<text>author</text>
				</view>
				<view class="fill_height aligin_center_item" style="width: 40%;">
					<button class="margin_none" size="mini" type="primary" plain="true" v-show="!is_focus">关注</button>
					<button class="margin_none" size="mini" disabled="true" v-show="is_focus">已关注</button>
				</view>
			</view>
			<view class="fill_width margin_left_40 aligin_center_item_left" style="height: 30%;">
				<text class="time">2023-03-03</text>
			</view>
		</view>
		
		<!-- 文章 -->
		<view class="margin_20 aligin_center_item sec_title">
			<text>Title</text>
		</view>
		<view style="height: 200rpx;background-color: beige;" class="fill_width"></view>
		
		
		<view class="margin_20 aligin_center_item_left">
			<view class="tag">java</view>
		</view>
		<!-- comments -->
		<view class="margin_bt_30 padding_left_20 fill_width aligin_center_item_left border_line_grey_t_tiny" style="60rpx">
			<uni-icons type="chatboxes" color="#808080"></uni-icons>
			<view class="margin_lr_10"></view>
			<text style="color: #808080;">comments</text>
		</view>
		<view class="margin_bt_20">
			<!-- 评论条 -->
			<view class="margin_bt_30 border_line_grey_bt_tiny">
				<view class="fill_width margin_lr_20" style="">
					
				</view>
			</view>
		</view>
		
		
		
		<!-- footer -->
		<view class="fix_foot baiyan aligin_center_item_left" style="height: 100rpx;">
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="heart" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="star" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="chat" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="arrow-up" size="60rpx" color="#808080"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_focus: true,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.fix_foot{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 4;
	}
</style>
