<template>
	<view class="container">
		
		<view class="fill_width margin_b0ttom_10" style="height: 350rpx;">
			<image class="fill" :src="event.avatar"></image>
		</view>
		<!-- 标题 -->
		<view class="margin_20 aligin_center_item sec_title">
			<text>{{event.title}}</text>
		</view>
		<view class="border_line_grey_bt_tiny fill_width">
			<view class="margin_lr_50 aligin_center_item_left" style="height: 80rpx;">
				<text style="font-size: 30rpx;color: #808080;">赛事分享者</text>
			</view>
			<view class="border_line_grey_b_tiny"></view>
			<view class="margin_lr_30 aligin_center_item_left" style="height: 140rpx;">
				<view class="fill_height aligin_center_item" style="width: 20%;">
					<image style="height: 90rpx;width: 90rpx;border-radius: 50%;" :src="event.user.avatar"></image>
				</view>
				<view class="fill_height aligin_center_item_left" style="width: 40%;">
					<text>{{event.user.nickname}}</text>
				</view>
				<view class="fill_height aligin_center_item" style="width: 40%;">
					<view v-show="event.user.id!=currentUser.id">
						<button class="margin_none" size="mini" type="primary" plain="true" v-show="!is_focus" @click="focus(1)">关注</button>
						<button class="margin_none" size="mini" disabled="true" v-show="is_focus" @click="focus(2)">已关注</button>
					</view>
					<button class="margin_none" size="mini" plain type="warn" v-show="event.user.id==currentUser.id">编辑</button>
				</view>
			</view>
		</view>
		
		<view class="fill_width padding_rl_20">
			<view class="margin_15 aligin_center_item_left" style="height: 80rpx;">
				<text style="font-size: 45rpx;font-weight: 500;letter-spacing: 5rpx;">竞赛详情</text>
			</view>	
		</view>
		
		<view class="margin_lr_20" style="overflow: scroll;">
			<!-- 详情markdown -->
			<rich-text :nodes="description_html"></rich-text>
		</view>
		
		
		<view class="margin_20 baiyan padding_10" style="font-size: 32rpx;">
			<view class="margin_bt_15 aligin_center_item_left">
				<view>分类：</view>
				<view>{{event.type.name}}</view>
			</view>
			<view class="margin_bt_15 aligin_center_item_left">
				<view>级别：</view>
				<view>{{event.level.name}}</view>
			</view>
			<view class=" aligin_center_text_left margin_top_5">
				<view class="margin_right_10">报名时间 ：</view>
				<view class="margin_lr_10">{{formatDate(event.registerAt)}}</view>
				<view>--</view>
				<view class="margin_lr_10">{{formatDate(event.registerEnd)}}</view>
			</view>
			<view class=" aligin_center_text_left margin_top_5">
				<view class="margin_right_10">结束时间 ：</view>
				<view class="margin_lr_10">{{formatDate(event.progressAt)}}</view>
				<view>--</view>
				<view class="margin_lr_10">{{formatDate(event.progressEnd)}}</view>
			</view>
			<view class=" aligin_center_text_left margin_bt_15">
				<view class="margin_right_10">主办方：</view>
				<view class="margin_left_15">{{event.company}}</view>
			</view>
		</view>
		
		<!-- comments -->
		<view id="chat" class="margin_bt_30 padding_left_20 fill_width aligin_center_item_left border_line_grey_t_tiny" style="60rpx">
			<uni-icons type="chatboxes" color="#808080"></uni-icons>
			<view class="margin_lr_10"></view>
			<text style="color: #808080;">comments</text>
		</view>
		<view class="margin_20 aligin_center_item_left" style="height: 200rpx;baiyan">
			<textarea style="font-size: 32rpx;height:180rpx;width:95%;" class="border padding_10" v-model="commentText" placeholder="欢迎评论!"></textarea>
		</view>
		<view class="margin_20" >
			<button type="primary" size="default">发布</button>
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
						<view>测试</view>
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
						<view class="margin_lr_10"></view><text>{{1}}</text><text>条回复></text>
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
											<view><text style="color:#03dac5;">@author: </text>测试</view>
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
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;" @click="favorites">
				<uni-icons type="star" size="60rpx" :color="is_favorites?'#FF8C00':'#808080'"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;" @click="chat">
				<uni-icons type="chat" size="60rpx" color="#808080"></uni-icons>
			</view>
			<view class="padding_10 aligin_center_item" style="height: 100%;width: 33%;" @click="scrollToTop">
				<uni-icons type="arrow-up" size="60rpx" color="#808080"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	//导入封装的request方法
	import {$request} from '@/utils/request.js';
	import marked from "@/common/marked";
	import hljs from "highlight.js";
	import "highlight.js/styles/base16/mocha.css";
	import moment from 'moment';
	var self_;
	export default {
		data() {
			return {
				is_focus: true,
				is_favorites: true,
				tepId: 0,
				event:{
					user: {},
					type: {},
					level: {},
				},
				commentText: '',
				currentUser: {},
				description_html: ''
			}
		},
		computed:{
			/* 时间格式化 */
			formatDate: function(time){
				return function(time){
					return moment(time).format('YYYY-MM-DD')
				};
			},
		},
		created() {
			self_ = this;
		},
		onLoad(option) {
			this.tepId = option.id;
			$request({
				url: '/event/detail',
				method: 'GET',
				data:{
					eventId: this.tepId,
				},
			}).then(res => {
				this.event = res.data;
				this.description_html = marked.marked(this.event.description,{
					highlight: function(code){
						return hljs.highlightAuto(code).value
					}
				});
				const regex = new RegExp('<img', 'gi');
				this.description_html = this.description_html.replace(regex, `<img style="max-width: 100%;"`)	
			}).catch(err => {
				
			});
			$request({
				url: '/user/self',
				method: 'POST',
			}).then(res => {
				this.currentUser = res.data
			}).catch(err => {
				
			})
		},
		onShow() {
			self_.judgeFocus();
			self_.judgeFavorites();
		},
		methods: {
			scrollToTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
				})
			},
			/* 滚动到评论 */
			chat(){
				uni.createSelectorQuery()
					.select('#chat')
					.boundingClientRect(res => {
						uni.pageScrollTo({
							scrollTop: res.top,
							duration: 300,
						})
					}).exec();
			},
			/* 判断是否已关注 */
			judgeFocus(){
				if(this.currentUser.focus != null){
					for(let i = 0; i < this.currentUser.focus.length;i++){
						if(this.event.user.id == this.currentUser.focus[i].id){
							this.is_focus = true;
							return
						}
					}
				}
				this.is_focus = false
			},
			//判断收藏
			judgeFavorites(){
				if(this.currentUser.favoritesEvents != null){
					for(let i = 0;i<this.currentUser.favoritesEvents.length;i++){
						if(this.event.id == this.currentUser.favoritesEvents[i].id){
							this.is_favorites = true;
							return;
						}
					}
				}
				this.is_favorites = false
			},
			favorites(){
				if(!this.is_favorites){
					this.is_favorites = true
					$request({
						url: '/favorites_e',
						method: 'GET',
						data: {
							eventId: this.event.id,
						}
					}).then(res => {
						console.log("收藏成功")
					}).catch(err => {console.log(err.code + err.msg)})
				}else{
					this.is_favorites = false
					$request({
						url: '/cancel_favorites_e',
						method: 'GET',
						data: {
							eventId: this.event.id,
						}
					}).then(res => {
						console.log("取消收藏成功")
					}).catch(err => {console.log(err.code + err.msg)})
				}
			},
			/* 关注 */
			focus(type){
				this.is_focus = !this.is_focus;
				if(type == 1){
					$request({
						url: '/user/focus',
						method: 'POST',
						data:{
							userId: this.event.user.id
						}
					}).then(res => {
						console.log("关注成功！")
					}).catch(err => {console.log(err.code + err.msg)});
				}else{
					$request({
						url: '/user/cancelFocus',
						method: 'POST',
						data:{
							userId: this.event.user.id
						}
					}).then(res => {
						console.log("取消关注成功！")
					}).catch(err => {console.log(err.code + err.msg)});
				}
			}
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
