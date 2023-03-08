<template>
	<view class="container" @touchstart="touchStart" @touchend="touchEnd">
		<view class="border_line_grey_bt_tiny fixed_eventNav">
			<uni-row>
				<uni-col :span="4">
					<view class="aligin_center_item" style="height: 100rpx;" @click="back">
						<uni-icons type="arrow-left" color="#808080" size="26"></uni-icons>
					</view>
				</uni-col>
				<uni-col :span="20">
					<view class="aligin_center_item" style="height: 100rpx;">
						<view class="fill_height aligin_center_item" style="width: 80%;">
							<uni-easyinput v-model="searchText" placeholder="搜索" clearable></uni-easyinput>
						</view>
						<view class="fill_height aligin_center_item" style="width: 20%;">
							<uni-icons type="search" size="26" color="#808080"></uni-icons>
						</view>
					</view>
				</uni-col>
			</uni-row>
			
			<!-- swiper_nav-->
			<view class="fill_width aligin_center_item_left" style="height: 100rpx;">
				<view class="fill_height aligin_center_item" style="width: 33%;" @click="changeIndex(0)">
					<text class="padding_tb_20" :class="{'border_line':showIndex == 0}">文章</text>
				</view>
				<view class="fill_height aligin_center_item" style="width: 33%;" @click="changeIndex(1)">
					<text class="padding_tb_20" :class="{'border_line':showIndex == 1}">赛事</text>
				</view>
				<view class="fill_height aligin_center_item" style="width: 33%;" @click="changeIndex(2)">
					<text class="padding_tb_20" :class="{'border_line':showIndex == 2}">用户</text>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 200rpx;"></view>
		
		<!-- 手动swiper -->
		<view class="margin_top_10 margin_lr_10">
			<!-- 文章 -->
			<uni-transition :modeClass="transType" :show="showIndex == 0">
				<view v-show="showIndex == 0">
					<!-- 文章预览卡片 -->
					<view class="border_line_grey_bt margin_top_20 padding_rl_20">
						<uni-row>
							<view style="height: 75rpx;">
								<uni-col :span="2">
									 <view class="fill aligin_center_text_left" style="height:75rpx;">
											<image class="sec_avatar" src="../../static/logo.png"></image>
									 </view>
								</uni-col>
								<uni-col :span="17">
									<view class="fill aligin_center_text_left" style="height: 75rpx;overflow: hidden;">
										<text>author</text>
									</view>
								</uni-col>
								<uni-col :span="5">
									<view class="fill aligin_center_text_right" style="height: 75rpx;">
										<uni-icons type="more-filled"></uni-icons>
										<text>{{"\u00A0"}}</text>
									</view>
								</uni-col>
							</view>
						</uni-row>
						<uni-row>
							<view style="height: 175rpx;">
								<uni-col :span="16">
									<view class="fill" style="height: 175rpx;">
										<uni-row>
											<view class="fill padding_top_10" style="height: 110rpx;">
												<view class="fill white-space">标题</view>
											</view>
										</uni-row>
										<uni-row>
											<view class="fill aligin_center_text_left" style="height: 60rpx;">
												<view class="sec_message">
													评论:<text>10</text>
												</view>
												<view class="sec_message">
													点赞:<text>10</text>
												</view>
												<view class="sec_message">2022-12-03</view>
											</view>
										</uni-row>
									</view>
								</uni-col>
								<uni-col :span="8">
									<view class="fill aligin_center_item" style="height: 175rpx;">
										<image mode="scaleToFill" 
										style="height: 160rpx;width: 220rpx;border-radius: 8rpx;"
										 src="../../static/ad/home2.jpg"></image>
									</view>
								</uni-col>
							</view>
						</uni-row>
					</view>
					
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
					</view>
					<!-- 占位 -->
					<view style="height: 1000rpx;"></view>
				</view>
			</uni-transition>
			<!-- 赛事 -->
			<uni-transition :modeClass="transType" :show="showIndex == 1">
				<view v-show="showIndex == 1">
					<!-- 赛事预览卡片 -->
					<!-- 赛事卡片 （卡片中图片默认提供几种）-->
					<view class="margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan" style="position: relative;">
						<!-- 赛事状态 -->
						<view style="height: 55rpx;width:150rpx" class="absolute_event_status box_radius_20 aligin_center_item status_before">已结束</view>
						<!-- 图片 -->
						<view style="height: 230rpx;width: 100%;background-color: antiquewhite;">
							<image class="fill" src="../../static/ad/ad2.jpg"></image>
						</view>
						<!-- 信息 -->
						<view class="margin_lr_10 margin_bt_15">
							<view class="fill_width eventTitle padding_tb_10 overflowHide">
								<text>2023ACM程序设计竞赛中国区预选赛</text>
							</view>
							<!-- 时间 -->
							<view class="fill_width aligin_center_text_left eventTime margin_top_5">
								<view class="margin_right_10" style="color: black;">报名时间 ：</view>
								<view class="margin_lr_10">2022-10-2</view>
								<view>--</view>
								<view class="margin_lr_10">2022-10-2</view>
							</view>
							<view class="fill_width aligin_center_text_left eventTime margin_top_5">
								<view class="margin_right_10" style="color: black;">结束时间 ：</view>
								<view class="margin_lr_10">2022-10-2</view>
								<view>--</view>
								<view class="margin_lr_10">2022-10-2</view>
							</view>
							<view class="fill_width aligin_center_text_left margin_bt_15 event_other">
								<view class="margin_right_10">主办方：</view>
								<view class="margin_left_15">机构名称</view>
							</view>
							<view class="fill_width aligin_center_text_left event_other">
								<view>收藏： {{0}}</view>
								<view class="margin_lr_50">|</view>
								<view>评论：{{0}}</view>
								<view class="margin_lr_50">|</view>
								<view>级别：{{"其他"}}</view>
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
			<uni-transition :modeClass="transType" :show="showIndex == 2">
				<view v-show="showIndex == 2">
					<!-- 用户预览卡片 -->
					<view @click="gotoDetail" class="border_line_grey_bt_tiny aligin_center_item_left margin_bt_15" style="height: 130rpx;border-radius: 10rpx;overflow: hidden;">
						<view class="fill_height aligin_center_item" style="width: 30%;">
							<image style="height: 100rpx;width: 100rpx;border-radius: 50%;" src="../../static/faces/2-thump.jpg"></image>
						</view>
						<view class="fill_height aligin_center_item_left" style="width: 50%;">
							<text>author</text>
						</view>
						<view class="fill_height aligin_center_item_left" style="width: 20%;">
							<uni-icons type="right" size="22"></uni-icons>
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
	var self_;
	export default {
		data() {
			return {
				/* 加载更多 */
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				status: 'more',
				/* nav */
				showIndex: 0,
				transType: ['fade','slide-left'],
				/* 搜索文本 */
				searchText: '',
			}
		},
		onLoad(option) {
			this.searchText = option.searchText
			this.showIndex = option.showIndex
		},
		created() {
			self_ = this
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			/* 加载更多 */
			clickLoadMore(e){
				this.status = 'loading'
				this.timer = setTimeout(()=>{   //设置延迟执行
				    this.status='nomore'
				},1000);
			},
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
									this.showIndex = 2
								}else{
									this.showIndex--
								}
								this.transType = ['fade','slide-left']
								console.log("左滑" + this.showIndex)  
								console.log('x:' + this.touchStartX + 'y:' + this.touchStartY)  
							} else {  
								this.showIndex = (this.showIndex + 1)%3
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
			gotoDetail(){
				
			},
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
