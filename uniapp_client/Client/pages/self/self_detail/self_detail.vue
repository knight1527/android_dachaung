<template>
	<view class="container">
		<uni-row>
			<view style="height: 180rpx;" class="aligin_center_text_left border_line_grey_bt">
				<uni-col :span="8">
					<view class="margin_lr_50" style="height: 150rpx;width: 150rpx;border-radius: 150rpx;">
						<image class="fill" :src="user.avatar" ></image>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="padding_right_50 aligin_center_item_right" style="height: 180rpx;">
						<button @click="selfUpdate" class="margin_none" size="mini" type="warn"  plain="true" v-show="user.id==currentUser.id">编辑</button>
						<view v-show="user.id!=currentUser.id">
							<button class="margin_none" size="mini" type="primary" plain="true" v-show="!is_focus" @click="focus(1)">关注</button>
							<button class="margin_none" size="mini" disabled="true" v-show="is_focus" @click="focus(2)">已关注</button>
						</view>
					</view>
				</uni-col>
			</view>
			<view class=" margin_bottom_20">
				<view class="margin_lr_50 self_detail_text">
					<view style="" class="margin_bt_15 aligin_center_item_left">
						{{user.nickname}}
					</view>
					<view style="" class="margin_bt_15 aligin_center_item_left">
						{{user.college}}
					</view>
					<view style="" class="margin_bt_15 aligin_center_item_left">
						{{user.major}}
					</view>
					<view style="" class="margin_bt_15 aligin_center_item_left">
						<uni-icons color="#808080" type="mail-open-filled" size="22"></uni-icons>
						<view class="margin_left_20"></view>
						<view>{{user.email}}</view>
					</view>
					<view style="" class="margin_bt_15 aligin_center_item_left">
						<uni-icons color="#808080" type="navigate" size="22"></uni-icons>
						<view class="margin_left_20"></view>
						<uni-link :href="user.blog" :text="user.blog" color="#03dac5"></uni-link>
					</view>
					<view style="" class="margin_bt_15 aligin_center_item_left">
						<uni-icons color="#808080" type="flag" size="22"></uni-icons>
						<view class="margin_left_20"></view>
						<view>{{user.description}}</view>
					</view>
				</view>
			</view>
		</uni-row>
		<uni-row>
			<!-- 上滑指示线 -->
			<view id="navTop" class="border_line_grey"></view>
			<!-- 上滑固定 -->
			<view style="height: 110rpx;"  v-show="nav_show">
				<view style="height: 100rpx;width:100%;" class="baiyan fixed">
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;">
							<text class="aligin_center_item height_100per " :class="{'border_line':swiperIndex==0}">文章</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;">
							<text class="aligin_center_item height_100per " :class="{'border_line':swiperIndex==1}">赛事</text>
						</view>
					</uni-col>
				</view>
			</view>
			<!-- 上滑隐藏 -->
			<view style="height: 110rpx;"  v-show="!nav_show">
				<view style="height: 100rpx;width:100%;" class="baiyan">
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;">
							<text class="aligin_center_item height_100per " :class="{'border_line':swiperIndex==0}">文章</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="aligin_center_item" style="height: 90rpx;">
							<text class="aligin_center_item height_100per " :class="{'border_line':swiperIndex==1}">赛事</text>
						</view>
					</uni-col>
				</view>
			</view>
		</uni-row>
		
		<uni-row>
			<swiper style="height: 1200rpx;" @change="swiperChage">
				<!-- 文章 -->
				<swiper-item>
					<view v-for="(article, index) in user.articles" :key="article.id">
						<!-- 文章预览卡片 -->
						<view class="border_line_grey_bt margin_top_20 padding_rl_20">
							<uni-row>
								<view style="height: 75rpx;">
									<uni-col :span="2">
										 <view class="fill aligin_center_text_left" style="height:75rpx;">
												<image class="sec_avatar" :src="article.user.avatar" src="../../static/logo.png"></image>
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
													<view class="sec_message">{{formatDate(article.createdAt)}}</view>
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
				</swiper-item>
				<!-- 赛事 -->
				<swiper-item>
					<view v-for="(event, index) in user.events" :key="event.id">
						<!-- 赛事卡片 （卡片中图片默认提供几种）-->
						<view class="margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan" style="position: relative;">
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
				</swiper-item>
			</swiper>
		</uni-row>
		
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js';
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	var self_
	export default {
		data() {
			return {
				is_focus: false,
				/* 导航栏显示 */
				nav_show: false,
				swiperIndex: 0,
				/* 展示的用户 */
				tepId: 0,
				user: {},
				currentUser: {},
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
			/* 时间格式化 */
			formatDate: function(time){
				return function(time){
					return moment(time).format('YYYY-MM-DD')
				};
			},
		},
		onLoad(option) {
			console.log(option.id)
			this.tepId = option.id
			/* 初始化数据 */
			$request({
				url: '/user/selfById',
				method: 'Get',
				data: {
					userId: this.tepId,
				},
			}).then(res => {
				this.user = res.data
			
				/* 获取当前用户 */
				$request({
					url: '/user/selfInfo',
					method: 'Get',
				}).then(res => {
					this.currentUser = res.data
					
					/* 判断编辑，关注，已关注三个按钮显示哪一个 */
					self_.judgeSelf()	
				}).catch(err => {
					console.log(err.code + err.msg)
				});
			}).catch(err => {
				console.log(err.code + err.msg)
			});
			
		},
		onShow() {
			
		},
		created() {
			self_ = this
		},
		onPageScroll() {
			self_.nav_fixed_top()
		},
		methods: {
			swiperChage(e){
				this.swiperIndex = e.detail.current
				console.log(e.detail.current)
			},
			nav_fixed_top(){
				const query = uni.createSelectorQuery().in(this)
				let tep = 0;
				query.select("#navTop").boundingClientRect(data => {
					tep = data.top
					if(tep <= 0){
						this.nav_show = true
					}else{
						this.nav_show = false
					}
				}).exec()
			},
			/* 编辑个人信息页面 */
			selfUpdate(){
				uni.navigateTo({
					url:'/pages/self/self_update/self_update',
				})
			},
			judgeSelf(){
				
				if(this.user.focused != null){
					for(let i = 0; i < this.user.focused.length;i++){
						if(this.currentUser.id == this.user.focused[i].id){
							this.is_focus = true;
							
							return
						}
					}
				}
				this.is_focus = false
				
			},
			/* 关注 */
			focus(type){
				this.is_focus = !this.is_focus;
				if(type == 1){
					$request({
						url: '/user/focus',
						method: 'POST',
						data:{
							userId: this.user.id
						}
					}).then(res => {
						console.log("关注成功！")
					}).catch(err => {console.log(err.code + err.msg)});
				}else{
					$request({
						url: '/user/cancelFocus',
						method: 'POST',
						data:{
							userId: this.user.id
						}
					}).then(res => {
						console.log("取消关注成功！")
					}).catch(err => {console.log(err.code + err.msg)});
				}
			},
		}
	}
</script>

<style lang="scss">
	.self_detail_text{
		color: dimgrey;
		letter-spacing: 4rpx;
		font-weight: 200rpx;
		font-size: 34rpx;
	}
	/* 上滑固定 */
	.fixed{
		position: fixed;
		top: 0;
		z-index: 1;
	}
</style>
