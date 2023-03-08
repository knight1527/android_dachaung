<template>
	<view class="container">
		
		<view class="fill_width margin_b0ttom_10" style="height: 350rpx;">
			<image class="fill" src="../../../static/ad/ad1.jpg"></image>
		</view>
		<!-- 标题 -->
		<view class="margin_20 aligin_center_item sec_title">
			<text>Title</text>
		</view>
		<view class="border_line_grey_bt_tiny fill_width">
			<view class="margin_lr_50 aligin_center_item_left" style="height: 80rpx;">
				<text style="font-size: 30rpx;color: #808080;">赛事分享者</text>
			</view>
			<view class="border_line_grey_b_tiny"></view>
			<view class="margin_lr_30 aligin_center_item_left" style="height: 140rpx;">
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
		</view>
		
		<view class="fill_width padding_rl_20">
			<view class="margin_15 aligin_center_item_left" style="height: 80rpx;">
				<text style="font-size: 45rpx;font-weight: 500;letter-spacing: 5rpx;">竞赛详情</text>
			</view>	
		</view>
		
		<view class="margin_lr_20">
			<!-- 详情markdown -->
			<view style="height: 400rpx;background-color: antiquewhite;"></view>
		</view>
		
		
		<view class="margin_20 baiyan padding_10" style="font-size: 32rpx;">
			<view class="margin_bt_15 aligin_center_item_left">
				<view>分类：</view>
				<view>工科类</view>
			</view>
			<view class="margin_bt_15 aligin_center_item_left">
				<view>级别：</view>
				<view>其他</view>
			</view>
			<view class=" aligin_center_text_left margin_top_5">
				<view class="margin_right_10">报名时间 ：</view>
				<view class="margin_lr_10">2022-10-2</view>
				<view>--</view>
				<view class="margin_lr_10">2022-10-2</view>
			</view>
			<view class=" aligin_center_text_left margin_top_5">
				<view class="margin_right_10">结束时间 ：</view>
				<view class="margin_lr_10">2022-10-2</view>
				<view>--</view>
				<view class="margin_lr_10">2022-10-2</view>
			</view>
			<view class=" aligin_center_text_left margin_bt_15">
				<view class="margin_right_10">主办方：</view>
				<view class="margin_left_15">机构名称</view>
			</view>
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
				<!-- avatar -->
				<view class=" margin_lr_20 aligin_center_item_left" style="height: 120rpx;">
					<view class="fill_height aligin_center_item" style="width: 18%;">
						<image style="height: 85rpx;width:85rpx;border-radius:50%" src="../../../static/faces/3-thump.jpg"></image>
					</view>
					<view class="fill_height" style="width: 82%;">
						<view class="fill_width margin_top_20">author</view>
						<view class="time fill_width margin_top_10">2023-03-03</view>
					</view>
				</view>
				<!-- content -->
				<view class=" margin_lr_20 aligin_center_item_left" style="height: 120rpx;">
					<view class="fill_height aligin_center_item" style="width: 18%;">
					</view>
					<view class="fill_height aligin_center_item_left" style="width: 82%;">
						<view>二测积极of第三福建省地方就搜ID飞机三等奖烦都烦死经济法</view>
					</view>
				</view>
				<!-- icons -->
				<view class=" margin_lr_20 aligin_center_item_left" style="height: 80rpx;">
					<view class="fill_height aligin_center_item" style="width: 18%;">
					</view>
					<view class="time fill_height aligin_center_item_left" style="width: 82%;">
						<uni-icons type="heart" color="#808080" size="22"></uni-icons>
						<text class="margin_lr_10">0</text>
						<view class="margin_lr_20"></view>
						<uni-icons type="chat" color="#808080" size="22"></uni-icons>
						<text class="margin_lr_10">0</text>
					</view>
				</view>
				<!-- reply -->
				<view class=" margin_lr_20 aligin_center_item_left" style="height: 80rpx;">
					<view class="fill_height aligin_center_item" style="width: 18%;">
					</view>
					<view class="baiyan fill_height aligin_center_item_left" style="width: 82%;color:#03dac5;font-size:30rpx">
						<view class="margin_lr_10"></view><text>{{0}}</text><text>条回复></text>
					</view>
				</view>
				<!-- reply_content -->
				<view class=" margin_lr_20 aligin_center_item_left">
					<view class="fill_height" style="width: 5%;">
					</view>
					<view class="fill_height aligin_center_item_left" style="width: 95%;">
						<!-- 回复内容放这儿 -->
						<view>
							<view class="aligin_center_item_left padding_tb_5">
								<text style="color: grey;font-size:30rpx;">回复内容</text>
								<view style="margin-left: 500rpx;"></view>
								<uni-icons type="closeempty" color="#808080"></uni-icons>
							</view>
							<view class="margin_bt_30">
									<!-- avatar -->
									<view class=" margin_lr_20 aligin_center_item_left" style="height: 120rpx;">
										<view class="fill_height aligin_center_item" style="width: 18%;">
											<image style="height: 85rpx;width:85rpx;border-radius:50%" src="../../../static/faces/3-thump.jpg"></image>
										</view>
										<view class="fill_height" style="width: 82%;">
											<view class="fill_width margin_top_20">author</view>
											<view class="time fill_width margin_top_10">2023-03-03</view>
										</view>
									</view>
									<!-- content -->
									<view class=" margin_lr_20 aligin_center_item_left" style="height: 120rpx;">
										<view class="fill_height aligin_center_item" style="width: 18%;">
										</view>
										<view class="fill_height aligin_center_item_left" style="width: 82%;">
											<view><text style="color:#03dac5;">@author: </text>二测积极of第三福建省地方就搜ID飞机三等奖烦都烦死经济法</view>
										</view>
									</view>
									<!-- icons -->
									<view class=" margin_lr_20 aligin_center_item_left" style="height: 80rpx;">
										<view class="fill_height aligin_center_item" style="width: 18%;">
										</view>
										<view class="time fill_height aligin_center_item_left" style="width: 82%;">
											<uni-icons type="heart" color="#808080" size="22"></uni-icons>
											<text class="margin_lr_10">0</text>
											<view class="margin_lr_20"></view>
											<uni-icons type="chat" color="#808080" size="22"></uni-icons>
											<text class="margin_lr_10">0</text>
										</view>
									</view>
								</view>
						</view>
						<!-- 回复内容结束 -->
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		<!-- 占位 -->
		<view style="height: 110rpx;"></view>
		<!-- footer -->
		<view class="fix_foot baiyan aligin_center_item_left" style="height: 100rpx;">
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;">
				<uni-icons type="star" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;">
				<uni-icons type="chat" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;" @click="scrollToTop">
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
			scrollToTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
				})
			},
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
