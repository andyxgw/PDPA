
videojs(document.getElementsByClassName('video-js')[0], {
    controlBar: {
		autoplay: true,
		preload: "auto",
		fullscreenToggle: true,
		volumeControl: false
    }
}, function() {  

});


if(HygieneFactorMode == true)
{
	PreventVideoSeeking();
}
	

videojs(document.getElementsByClassName('video-js')[0]).ready(function() {
	var vidPlayer = this;
	var currentTime = 0;

	vidPlayer.on("seeking", function(event) {
		//alert(vidPlayer.currentTime());
	});
	
	vidPlayer.on("seeked", function(event) {
		console.log(vidPlayer.currentTime);
	});
	
	vidPlayer.on("ended", function(event) {
		
	});
	

});







	
	
	
	
	
	
	
	
