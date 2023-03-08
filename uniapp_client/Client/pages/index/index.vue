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
							<uni-easyinput v-model="searchText" placeholder="搜索内容" clearable></uni-easyinput>
						</view>
					</uni-col>
					<uni-col :span="4" >
						<view style="width: 100%;" class="margin_auto">
							<view class="margin_top_20 margin_left_15">
								<uni-icons type="search" size="28" color="grey" @click="search"></uni-icons>
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
					<!-- 文章预览卡片 -->
					<view v-for="(article, index) in articles" :key="article.id">
						<view @click="goToArticleDetail(article.id)" :id="'item-' + index" class="border_line_grey_bt margin_top_20 padding_rl_20">
							<uni-row>
								<view style="height: 75rpx;">
									<uni-col :span="2">
										 <view class="fill aligin_center_text_left" style="height:75rpx;">
												<image class="sec_avatar" :src="article.user.avatar"></image>
										 </view>
									</uni-col>
									<uni-col :span="17">
										<view class="fill aligin_center_text_left" style="height: 75rpx;overflow: hidden;">
											<text>{{article.user.nickname}}</text>
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
													<view class="fill white-space">{{article.title}}</view>
												</view>
											</uni-row>
											<uni-row>
												<view class="fill aligin_center_text_left" style="height: 60rpx;">
													<view class="sec_message">
														评论:<text>{{article.commentsNum}}</text>
													</view>
													<view class="sec_message">
														点赞:<text>{{article.likesNum}}</text>
													</view>
													<view class="sec_message">{{article.createdTime}}</view>
												</view>
											</uni-row>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="fill aligin_center_item" style="height: 175rpx;">
											<image mode="scaleToFill" 
											style="height: 160rpx;width: 220rpx;border-radius: 8rpx;"
											 :src="article.avatar"></image>
										</view>
									</uni-col>
								</view>
							</uni-row>
						</view>					
						
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
				<view style="height: 1300rpx;" v-if="articles_focus.length == 0">
					<view style="margin-top: 80rpx;" class="aligin_center_item_v">
						<image src="../../static/imgs/nothing.png"></image>
						<view style="font-size: 38rpx;font-weight: 500;color: #03dac5;">去发现优秀作者吧</view>
					</view>
				</view>
				<!-- 有关注 -->
				<!-- 文章 -->
				<scroll-view v-if="articles_focus.length != 0">
					<!-- 文章预览卡片 -->
					<view v-for="(article, index) in displayContent" :key="article.id">
						<view @click="goToArticleDetail(article.id)" :id="'focusItem-' + index" class="border_line_grey_bt margin_top_20 padding_rl_20">
							<uni-row>
								<view style="height: 75rpx;">
									<uni-col :span="2">
										 <view class="fill aligin_center_text_left" style="height:75rpx;">
												<image class="sec_avatar" :src="article.user.avatar"></image>
										 </view>
									</uni-col>
									<uni-col :span="17">
										<view class="fill aligin_center_text_left" style="height: 75rpx;overflow: hidden;">
											<text>{{article.user.nickname}}</text>
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
													<view class="fill white-space">{{article.title}}</view>
												</view>
											</uni-row>
											<uni-row>
												<view class="fill aligin_center_text_left" style="height: 60rpx;">
													<view class="sec_message">
														评论:<text>{{article.commentsNum}}</text>
													</view>
													<view class="sec_message">
														点赞:<text>{{article.likesNum}}</text>
													</view>
													<view class="sec_message">
														{{formatDate(article.createdAt)}}
													</view>
												</view>
											</uni-row>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="fill aligin_center_item" style="height: 175rpx;">
											<image mode="scaleToFill" 
											style="height: 160rpx;width: 220rpx;border-radius: 8rpx;"
											 :src="article.avatar"></image>
										</view>
									</uni-col>
								</view>
							</uni-row>
						</view>
						
					</view>
										
					<!-- 文章弹出层 -->
					<uni-popup type="bottom" ref="popup">
						<view style="height: 400rpx;width: 100%;background-color: antiquewhite;">
							
						</view>
					</uni-popup>
					<!-- 加载更多 -->
					<view class="margin_top_50 aligin_center_item">
						<uni-load-more @clickLoadMore="clickLoadMoreFocus(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
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
				articles: [],
				articles_focus: [],
				/* 非关注有分页 */
				displayCount: 1,
				/* 关注无分页 */
				displayCount_focus: 5,
				/* 滚动页面指示 */
				a_index: 0,
				af_index: 0,
				/* 搜索文本 */
				searchText: '',
			}
		},
		computed: {
			//根据displayCount_focus计算显示多少内容
			displayContent(){
				let index = Math.min(articles_focus.length, displayCount_focus + 5)
				this.af_index = index - 1
				return this.articles_focus.slice(0,index)
			},
			/* 时间格式化 */
			formatDate: function(time){
				return function(time){
					let date = new Date(time)
					return date.toLocaleString('zh-CN', 
					{year:'numeric',
					month: '2-digit',
					day: '2-digit',
					});
				};
			},
		},
		created() {
			self_ = this;
			self_.openSection(1)
		},
		onLoad() {
			console.log("debug")
			/* 请求数据 */
			$request({
				url: '/article/index',
				method: 'GET',
				data: {
					pageNum: this.displayCount,
				}
			}).then(res => {
				this.articles = res.data	
			}).catch(err => {
				console.log("请求错误" + err.code + "Msg：" + err.msg)
			});
			/* 请求数据 */
			$request({
				url: '/article/index_f',
				method: 'GET',
			}).then(res => {
				this.articles_focus = res.data
			}).catch(err => {
				console.log("请求错误" + err.code + "Msg：" + err.msg)
			})
			console.log(this.articles)
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
				/* 请求数据 */
				this.displayCount++
				$request({
					url: '/article/index',
					method: 'GET',
					data: {
						pageNum: this.displayCount,
					}
				}).then(res => {
					this.a_index = this.articles.length - 1;
					if(res.data.length > 0){
						self_.appendArticle(res.data)
						this.status = 'more'
						self_.scrollToItem(0, this.a_index)
					}else{
						this.status = 'nomore'
					}
				}).catch(err => {
					console.log("请求错误" + err.code + "Msg：" + err.msg)
				});
			},
			clickLoadMoreFocus(e){
				this.status = 'loading'
				this.displayCount_focus += 5;
				self_.scrollToItem(1, af_index)
				this.status = 'nomore'
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
			},
			/* 滚动到指定标签 */
			scrollToItem(type, index){
				if(type == 0){
					uni.createSelectorQuery()
						.select('#item-' + index)
						.boundingClientRect(res => {
							uni.pageScrollTo({
								scrollTop: res.top,
								duration: 300
							})
						}).exec();
				}else{
					uni.createSelectorQuery()
						.select('#focusItem-' + index)
						.boundingClientRect(res => {
							uni.pageScrollTo({
								scrollTop: res.top,
								duration: 300
							})
						}).exec();
				}
			},
			/* 文章追加 */
			appendArticle(newAticles){
				this.articles.push(...newAticles);
			},
			/* 搜索 */
			search(){
				uni.navigateTo({
					url: '/pages/search_result/search_result?searchText=' + this.searchText + '&showIndex=0',
				})
			},
			/* 去文章详情 */
			goToArticleDetail(id){
				uni.navigateTo({
					url: '/pages/index/sec_detail/sec_detail?id=' + id,
				})
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
