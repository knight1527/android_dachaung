<template>
	<view class="container">
		<view class="fixed_eventNav">
			<uni-row>
				<view style="height: 110rpx;" class="baiyan">
					<uni-col :span="20">
						<view class="margin_10">
							<uni-easyinput placeholder="搜索赛事" clearable></uni-easyinput>
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
			<view class="popup_content aligin_center_item" v-for="(item,index) in categories" :key="item">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':index==category_index}" @click="choseCategory(index)">
					{{item}}
					<view class="margin_left_30" v-if="index==category_index">
						<uni-icons type="checkmarkempty" color="#03dac5" size="26"></uni-icons>
					</view>
				</view>	
			</view>
		</uni-popup>
		<!-- 级别 -->
		<uni-popup ref="popup_level" backgroundColor="#fff" type="top">
			<view class="aligin_center_item" style="height: 50rpx;font-size: 30rpx;color: grey;">赛事级别</view>
			<view class="popup_content aligin_center_item" v-for="(item,index) in levels" :key="item">
				<view class="fill_width margin_15 popup_item aligin_center_item" :class="{'item_active':index==level_index}" @click="choseLevel(index)">
					{{item}}
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
				category_index: 0,
				level_index: 0,
				categories: ['全部','工科类','理学类','军事类','经济类','文体类','综合类'], 
				levels: ['全部','世界级','国家级','省级','校级','其他'],
				/* 赛事卡片数组 */
				event_arr: [{
					id:0,
					title: '',
					avatar: '',
					registrationTime: '',
					registrationEndTime: '',
					duringTime: '',
					duringEndTime: '',
					comments: 0,
					collected: 0,
					level: '',
					category: '',
					/* 主办单位 */
					hostUnit: [''],
					/* 赛事状态（进行中，报名中，已结束） */
					status: 1,
					status_content: '进行中',
					author: {
						id: 0,
						avatar: '',
						nickname: '',
					}
				}]
			}
		},
		onPageScroll() {
			
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
				this.timer = setTimeout(()=>{   //设置延迟执行
				    this.status='nomore'
				},1000);
			},
			search(){
				uni.navigateTo({
					url: '/pages/search_result/search_result',
				})
			},
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
