<template>
	<view class="container">
		<view class="fixed_eventNav">
			<uni-row>
				<view style="height: 110rpx;" class="baiyan">
					<uni-col :span="20">
						<view class="margin_10">
							<uni-easyinput type="text" v-model="searchText" placeholder="搜索赛事" clearable></uni-easyinput>
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
			</uni-row>
			
			<!-- 条件选项 -->
			<uni-row>
				<view style="height: 80rpx;" class="baiyan eventNav">
					<uni-col :span="12">
						<view @click="openPopup(1)" class=" box_radius margin_10 padding_10 aligin_center_item sec_box_shandow">
							<text class="margin_right_15">选择类别</text>
							<uni-icons type="list"></uni-icons>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view @click="openPopup(2)" class=" box_radius margin_10 padding_10 aligin_center_item sec_box_shandow">
							<text class="margin_right_15">选择级别</text>
							<uni-icons type="settings"></uni-icons>
						</view>
					</uni-col>
				</view>
			</uni-row>
		</view>	
		<!-- 条件选项顶部弹出层 -->
		<!-- 分类 -->
		<uni-popup ref="popup_category" backgroundColor="#fff" type="top">
			<view class="aligin_center_item" style="height: 50rpx;font-size: 30rpx;color: grey;">你在新增赛事时可以申请新的分类</view>
			<!-- 默认全部 -->
			<view class="popup_content aligin_center_item">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':-1==category_index}" @click="choseCategory(-1)">
					{{"全部"}}
					<view class="margin_left_30" v-if="-1==category_index">
						<uni-icons type="checkmarkempty" color="#03dac5" size="26"></uni-icons>
					</view>
				</view>	
			</view>
			<!-- 数据库的分类 -->
			<view class="popup_content aligin_center_item" v-for="(type,index) in categories" :key="type.id">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':index==category_index}" @click="choseCategory(index)">
					{{type.name}}
					<view class="margin_left_30" v-if="index==category_index">
						<uni-icons type="checkmarkempty" color="#03dac5" size="26"></uni-icons>
					</view>
				</view>	
			</view>
		</uni-popup>
		<!-- 级别 -->
		<uni-popup ref="popup_level" backgroundColor="#fff" type="top">
			<view class="aligin_center_item" style="height: 50rpx;font-size: 30rpx;color: grey;">赛事级别</view>
			<!-- 默认全部级别 -->
			<view class="popup_content aligin_center_item">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':-1==level_index}" @click="choseLevel(-1)">
					{{"全部"}}
					<view class="margin_left_30" v-if="-1==level_index">
						<uni-icons type="checkmarkempty" color="#03dac5" size="26"></uni-icons>
					</view>
				</view>	
			</view>
			<!-- 数据库的级别 -->
			<view class="popup_content aligin_center_item" v-for="(level,index) in levels" :key="level.id">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':index==level_index}" @click="choseLevel(index)">
					{{level.name}}
					<view class="margin_left_30" v-if="index==level_index">
						<uni-icons type="checkmarkempty" color="#03dac5" size="26"></uni-icons>
					</view>
				</view>	
			</view>
		</uni-popup>

		<!-- 占位 -->
		<view style="height: 190rpx;"></view>

		<!-- 赛事卡片 -->
		<scroll-view>
			<!-- 赛事卡片 （卡片中图片默认提供几种）-->
			<view v-for="(event, index) in events" :key="event.id">
				<view :id="'item-' + index" v-show="event_type_show(event.type)&&event_level_show(event.level)"
				class="margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan" 
				style="position: relative;">
					<!-- 赛事状态 -->
					<view style="height: 55rpx;width:150rpx" class="absolute_event_status box_radius_20 aligin_center_item" :class="event_status(event)">{{event.status}}</view>
					<!-- 图片 -->
					<view style="height: 230rpx;width: 100%;background-color: antiquewhite;">
						<image class="fill" :src="event.avatar"></image>
					</view>
					<!-- 信息 -->
					<view class="margin_lr_10 margin_bt_15">
						<view class="fill_width eventTitle padding_tb_10 overflowHide">
							<text>{{event.title}}</text>
						</view>
						<!-- 时间 -->
						<view class="fill_width aligin_center_text_left eventTime margin_top_5">
							<view class="margin_right_10" style="color: black;">报名时间 ：</view>
							<view class="margin_lr_10">{{formatDate(event.registerAt)}}</view>
							<view>--</view>
							<view class="margin_lr_10">{{formatDate(event.registerEnd)}}</view>
						</view>
						<view class="fill_width aligin_center_text_left eventTime margin_top_5">
							<view class="margin_right_10" style="color: black;">结束时间 ：</view>
							<view class="margin_lr_10">{{formatDate(event.progressAt)}}</view>
							<view>--</view>
							<view class="margin_lr_10">{{formatDate(event.progressEnd)}}</view>
						</view>
						<view class="fill_width aligin_center_text_left margin_bt_15 event_other">
							<view class="margin_right_10">主办方：</view>
							<view class="margin_left_15">{{event.company}}</view>
						</view>
						<view class="fill_width aligin_center_text_left event_other">
							<view>收藏： {{event.favoritesNum}}</view>
							<view class="margin_lr_50">|</view>
							<view>评论：{{event.commentsNum}}</view>
							<view class="margin_lr_50">|</view>
							<view>级别：{{event.level.name}}</view>
						</view>
					</view>
				</view>
				
			</view>			
		
			
			<!-- 加载更多 -->
			<view class="margin_top_50 aligin_center_item">
				<uni-load-more @clickLoadMore="clickLoadMore(e)" :status="status" color="#03dac5" :contentText="contentText" iconType="circle"></uni-load-more>
			</view>
		</scroll-view>
		
		
		<!-- 新增赛事 -->
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
				/* 加载更多 */
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				status: 'more',
				/* 弹出层 */
				category_index: -1,
				level_index: -1,
				categories: [], 
				levels: [],
				/* 分页 */
				displayCount: 1,
				/* 赛事卡片数组 */
				events: [],
				/* 滚动索引 */
				event_index: 0,
				/* 搜索 */
				searchText: '',
			}
		},
		computed: {
			event_status: function(){
				return function(item){
					if(item.status == '报名中'){
						return 'status_before';
					}else if(item.status == '进行中'){
						return 'status_ing';
					}else{
						return 'status_end';
					}
				};
			},
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
			/* 关于选择筛选卡以后赛事卡片是否显示的计算属性 */
			event_type_show: function(){
				return function(type){
					if(this.category_index != -1){
						console.log(type.name == this.categories[this.category_index].name)
						return type.name == this.categories[this.category_index].name;
					}else{
						return true;
					}
				};
			},
			event_level_show: function(){
				return function(level){
					if(this.level_index != -1){
						console.log(level.name == this.levels[this.level_index].name)
						return level.name == this.levels[this.level_index].name;
					}else{
						return true;
					}
				};
			},
		},
		onPageScroll() {
			
		},
		onLoad() {
			/* 请求数据 */
			$request({
				url: '/type',
				method: 'GET',
			}).then(res => {
				this.categories = res.data
			}).catch(err => {console.log(err.code + err.msg)});
			$request({
				url: '/level',
				method: 'GET',
			}).then(res => {
				this.levels = res.data
			}).catch(err => {console.log(err.code + err.msg)});
			$request({
				url: '/event/index',
				method: 'GET',
				data: {
					pageNum: this.displayCount,
				}
			}).then(res => {
				this.events = res.data
			}).catch(err => {console.log(err.code + err.msg)})
		},
		methods: {
			openPopup(param){
				if(param == 1){
					this.$refs.popup_category.open()
				}else{
					this.$refs.popup_level.open()
				}
			},
			choseCategory(index){
				console.log(this.categories[index])
				this.category_index = index
				console.log(this.category_index)
				this.$refs.popup_category.close()
			},
			choseLevel(index){
				console.log(this.levels[index])
				this.level_index = index
				console.log(this.level_index)
				this.$refs.popup_level.close()
			},
			/* 加载更多 */
			clickLoadMore(e){
				this.status = 'loading'
				/* 请求数据 */
				this.displayCount++
				$request({
					url: '/event/index',
					method: 'GET',
					data: {
						pageNum: this.displayCount,
					}
				}).then(res => {
					this.event_index = this.events.length - 1; 
					if(res.data.length > 0){
						self_.appendEvent(res.data)
						this.status = 'more'
						self_.scrollToItem(this.event_index)
					}else{
						this.status = 'nomore'
					}
				}).catch(err => {
					console.log("请求错误" + err.code + "Msg：" + err.msg)
				});
			},
			search(){
				uni.navigateTo({
					url: '/pages/search_result/search_result?searchText=' + this.searchText + '&showIndex=1',
				})
			},
			/* 内容追加 */
			appendEvent(newEvents){
				this.events.push(...newEvents);
			},
			/* 滚动到指定标签 */
			scrollToItem(index){
				uni.createSelectorQuery()
					.select('#item-' + index)
					.boundingClientRect(res => {
						uni.pageScrollTo({
							scrollTop: res.top,
							duration: 300
						})
					}).exec();
			}
		}
	}
</script>

<style>
	.popup_content{
		height: auto;
		max-height: 200rpx;
		overflow: scroll;
		background-color: #fff;
	}
	.popup_item{
		color: #808080;
		font-size: 35rpx;
		font-weight: 300;
	}
	.item_active{
		color: #03dac5;
	}
	.fixed_eventNav{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 4;
	}
	.eventNav{
		color: #808080;
		font-size: 30rpx;
	}
	
</style>
