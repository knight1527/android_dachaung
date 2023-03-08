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
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="heart" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="star" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;">
				<uni-icons type="chat" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 25%;" @click="scrollToTop">
				<uni-icons type="arrow-up" size="60rpx" color="#808080"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js'
	var self_
	export default {
		data() {
			return {
				is_focus: true,
				tepId: 0,
				article: {},
			}
		},
		onLoad(option) {
			this.tepId = option.id
			$request({
				url: '/article/detail',
				method: 'GET',
				data: {
					articleId: this.tepId,
				}
			}).then(res => {
				this.article = res.data
			}).catch(err => {
				
			})
		},
		created() {
			self_ = this
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
