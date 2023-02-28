<script>
	export default {
		globalData: {
			//BASEURL: `http://localhost:8096`
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import './common/mine.css';
	/* #endif*/
	
	/* .status_bar {
		height: var(--status-bar-height);
		width: 100%;
		
	} */
</style>
