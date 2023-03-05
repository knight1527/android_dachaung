<template>
	<view class="container"  @touchstart="touchStart" @touchend="touchEnd">
		
		<uni-row>
			<!-- 滚动到顶部显示 -->
			<view style="height: 110rpx;"  v-show="scroll_show">
				<view style="height: 100rpx;width:100%;" class="baiyan fixed">
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;" @click="openSection(1)">
							<text class="aligin_center_item height_100per " :class="{'border_line':show}">推荐</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;" @click="openSection(2)">
							<text class="aligin_center_item height_100per " :class="{'border_line':!show}">关注</text>
						</view>
					</uni-col>
				</view>
			</view>
			<!-- 滚动到顶部隐藏 -->
			<view  v-show="!scroll_show">
				<!-- 搜索框 -->
				<view style="height: 110rpx;" class="baiyan">
					<uni-col :span="20">
						<view class="margin_10">
							<uni-easyinput placeholder="搜索内容" clearable></uni-easyinput>
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
				<view style="height: 90rpx;" class="baiyan">
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;" @click="openSection(1)">
							<text class="aligin_center_item height_100per " :class="{'border_line':show}">推荐</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;" @click="openSection(2)">
							<text class="aligin_center_item height_100per " :class="{'border_line':!show}">关注</text>
						</view>
					</uni-col>
				</view>
			</view>
			
		</uni-row>
		
		<!-- 推荐文章列表 -->
		<uni-transition :modeClass="transl" :show="show">
			<view class="margin_top_20" v-show="show">
				
				<!-- 轮播图 -->
				<view id="navTop" style="height: 300rpx;">
					<swiper class="fill" circular="true" autoplay="true" indicator-dots="true" :interval="interval">
						<swiper-item>
							<view  class="fill">
								<image  class="fill" src="../../static/ad/home2.jpg" mode="scaleToFill"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="fill"> 
								<image  class="fill" src="../../static/ad/ad1.jpg" mode="scaleToFill"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="fill">
								<image  class="fill" src="../../static/ad/ad2.jpg" mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>

				
				<!-- 文章 -->
				<scroll-view >
					<view style="height: 1000rpx;background-color: #03dac5;"></view>
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
					
					
					
					
					<!-- 文章弹出层 -->
					<uni-popup type="bottom" ref="popup">
						<view style="height: 400rpx;width: 100%;background-color: antiquewhite;">
							
						</view>
					</uni-popup>
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
					</view>
				</scroll-view>
				
				
			</view>
		</uni-transition>
		
	
	  <!-- 关注文章列表 -->
		<uni-transition :modeClass="transr" :show="!show">
			<view class="margin_top_20" v-show="!show">
				<view id="navTop2"></view>
				<!-- 没有关注 -->
				<view style="height: 1300rpx;" v-if="article_arr[0].id==0">
					<view style="margin-top: 80rpx;" class="aligin_center_item_v">
						<image src="../../static/imgs/nothing.png"></image>
						<view style="font-size: 38rpx;font-weight: 500;color: #03dac5;">去发现优秀作者吧</view>
					</view>
				</view>
				<!-- 有关注 -->
				<!-- 文章 -->
				<scroll-view v-if="article_arr[0].id!=0">
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
					
					<!-- 文章弹出层 -->
					<uni-popup type="bottom" ref="popup">
						<view style="height: 400rpx;width: 100%;background-color: antiquewhite;">
							
						</view>
					</uni-popup>
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
					</view>
				</scroll-view>
			</view>
		</uni-transition>
		
		
		<!-- 新增内容 -->		
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom"></uni-fab>
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js'
	var self_
	export default {
		data() {
			return {
				pattern: {
					buttonColor: '#03dac5',
					iconColor: '#fff'
				},
				show: false,
				scroll_show: false,
				transl: ['fade','slide-left'],
				transr: ['fade','slide-right'],
				interval: '2000',
				/* 加载更多 */
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				status: 'more',
				/* 文章对象数组 */
				article_arr:[{
					id:0,
					title:'',
					comments: 0,
					likes: 0,
					avatar: '',
					author: {
						id: 0,
						avatar: '',
						nickname: '',
					}
				}]
			}
		},
		created() {
			self_ = this;
			self_.openSection(1)
		},
		onLoad() {
			
		},
		onReady() {
			
		},
		onPageScroll() {
			self_.nav_fixed_top()
		},
		methods: {
			openSection(index){
				if (index == '1'){
					this.scroll_show = false
					this.show = true;
				}else{
					this.scroll_show = false
					this.show = false;
				}
			},
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
								if(this.touchStartY > 223 || this.touchStartY < 89){
									self_.openSection(1)
								}
								console.log("左滑")  
								console.log('x:' + this.touchStartX + 'y:' + this.touchStartY)  
							} else {  
								if(this.touchStartY > 223 || this.touchStartY < 89){
									self_.openSection(2)
								}
									console.log("右滑")  
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
			/* 加载更多 */
			clickLoadMore(e){
				this.status = 'loading'
				this.timer = setTimeout(()=>{   //设置延迟执行
				    this.status='nomore'
				},1000);
			},
			/* 页面滚动导航栏吸顶 */
			nav_fixed_top(){
				const query = uni.createSelectorQuery().in(this);
				let navToTop = 0
				if(this.show){
					query.select('#navTop').boundingClientRect(data => {
						navToTop = data.top
						if(navToTop <= 46){
							this.scroll_show = true;
						}else{
							this.scroll_show = false;
						}
					}).exec()
				}else{
					query.select('#navTop2').boundingClientRect(data => {
						navToTop = data.top
						if(navToTop <= 50){
							this.scroll_show = true;
						}else{
							this.scroll_show = false;
						}
					}).exec()
				}
			}
		}
	}
</script>

<style lang="scss">
	.fixed{
		position: fixed;
		top: 0;
		z-index: 1;
	}
	
</style>
