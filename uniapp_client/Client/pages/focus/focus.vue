<template>
	<view class="container" @touchstart="touchStart" @touchend="touchEnd">
		<uni-row>
			<!-- swiper_nav-->
			<view class="fill_width aligin_center_item_left fixed_eventNav" style="height: 100rpx;">
				<view class="fill_height aligin_center_item" style="width: 50%;" @click="changeIndex(0)">
					<text class="padding_tb_20" :class="{'border_line':showIndex == 0}">关注</text>
				</view>
				<view class="fill_height aligin_center_item" style="width: 50%;" @click="changeIndex(1)">
					<text class="padding_tb_20" :class="{'border_line':showIndex == 1}">粉丝</text>
				</view>
			</view>
			<!-- 占位 -->
			<view style="height: 100rpx;"></view>
		</uni-row>
		
		<!-- 手动swiper -->
		<view class="margin_top_10 margin_lr_10">
			<uni-transition :modeClass="transType" :show="showIndex == 0">
				<view v-show="showIndex == 0">
					<view v-for="(user, index) in user.focus" :key="user.id">
						<!-- 用户预览卡片 -->
						<view @click="goToDetail(user.id)" class="border_line_grey_bt_tiny aligin_center_item_left margin_bt_15" style="height: 130rpx;border-radius: 10rpx;overflow: hidden;">
							<view class="fill_height aligin_center_item" style="width: 30%;">
								<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" :src="user.avatar"></image>
							</view>
							<view class="fill_height aligin_center_item_left" style="width: 50%;">
								<text>{{user.nickname}}</text>
							</view>
							<view class="fill_height aligin_center_item_left" style="width: 20%;">
								<uni-icons type="right" size="22"></uni-icons>
							</view>
						</view>
					</view>
					
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
					</view>
					<!-- 占位 -->
					<view style="height: 1000rpx;"></view>
				</view>
			</uni-transition>
			<!-- 用户 -->
			<uni-transition :modeClass="transType" :show="showIndex == 1">
				<view v-show="showIndex == 1">
					<view v-for="(user, index) in user.focused" :key="user.id">
						<!-- 用户预览卡片 -->
						<view @click="goToDetail(user.id)" class="border_line_grey_bt_tiny aligin_center_item_left margin_bt_15" style="height: 130rpx;border-radius: 10rpx;overflow: hidden;">
							<view class="fill_height aligin_center_item" style="width: 30%;">
								<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" :src="user.avatar"></image>
							</view>
							<view class="fill_height aligin_center_item_left" style="width: 50%;">
								<text>{{user.nickname}}</text>
							</view>
							<view class="fill_height aligin_center_item_left" style="width: 20%;">
								<uni-icons type="right" size="22"></uni-icons>
							</view>
						</view>
					</view>
		
										
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
					</view>
					<!-- 占位 -->
					<view style="height: 1000rpx;"></view>
				</view>
			</uni-transition>
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
				showIndex: 0,
				transType: ['fade','slide-left'],
				/* 加载更多 */
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				status: 'more',
				user: {},
			}
		},
		onLoad() {
			/* 数据初始化 */
			$request({
				url: '/user/self',
				method: 'POST',
			}).then(res => {
				this.user = res.data
			}).catch(err => {});
		},
		created() {
			self_ = this
		},
		methods: {
			/* 手动swiper */
			/**
			* 触摸开始  
			**/  
			touchStart(e) {  
					console.log("触摸开始")  
					this.touchStartX = e.touches[0].clientX;  
					this.touchStartY = e.touches[0].clientY;  
			},  
			/**  
			* 触摸结束  
			**/  
			touchEnd(e) {  
					console.log("触摸结束")  
					let deltaX = e.changedTouches[0].clientX - this.touchStartX;  
					let deltaY = e.changedTouches[0].clientY - this.touchStartY;  
					if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {  
							if (deltaX >= 0) {  
								if(this.showIndex == 0){
									this.showIndex = 1
								}else{
									this.showIndex--
								}
								this.transType = ['fade','slide-left']
								console.log("左滑" + this.showIndex)  
								console.log('x:' + this.touchStartX + 'y:' + this.touchStartY)  
							} else {  
								this.showIndex = (this.showIndex + 1)%2
								this.transType = ['fade','slide-right']
								console.log("右滑" + this.showIndex)  
							}  
					} else if(Math.abs(deltaY) > 50&& Math.abs(deltaX) < Math.abs(deltaY)) {  
							if (deltaY < 0) { 
									console.log("上滑")  
							} else {  
								console.log('x:' + this.touchStartX + 'y:' + this.touchStartY)
								console.log("下滑")  
							}  
					} else {  
							console.log("可能是误触！")  
					}  
			},
			/* 改变显示模块 */
			changeIndex(index){
				this.showIndex = index
			},
			/* 跳转详情 */
			goToDetail(id){
				uni.navigateTo({
					url: '/pages/self/self_detail/self_detail?id=' + id,
				})
			}
		}
	}
</script>

<style lang="scss">
	.fixed_eventNav{
		background-color: white;
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 4;
	}
</style>
