// JavaScript Document// video JavaScript Document
var video = document.getElementById("vPlayer");
var supposedCurrentTime = 0;
var isSeeking = false;
var fadeOut;
var playBtnTxt;

var VideoWidth = 110;
var ActualVideoWidth = VideoWidth + "em";

var playerFontSize = "1.2em";
var playerTimeFontSize = "1.2em";
var playerProgressBarHeight = "1em";
var playerProgressHeight = "1em";
var playerProgressBarWidth = (VideoWidth - 11) + "em";

var playerBG = "#181C62";
var controlColor = "#FFFFFF";
var progressBG = "#8c8c94";
var progressColor = "#FFFFFF";


function insertAfter(referenceNode, newNode){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// set up video player
function setupControls(){
	// remove default video controls
	video.removeAttribute('controls');

	var playDiv = document.createElement('div');
	playDiv.style.position = "absolute";
	playDiv.style.bottom = "40%";
	playDiv.style.left = "45%";
	playDiv.id = "playButton";

	playDiv.innerHTML = '<div id="btnMiddlePlay" style="cursor:pointer;width:12em;height:12em;border-radius: 6em;background-color: rgba(255,255,255,0.5)" onclick="togglePlay();">' +
						'<div style="padding-top:2em;padding-left:4em;"><div style="border-top:4em solid transparent;border-bottom:4em solid transparent;border-left:6em solid rgba(0,0,0,0.8);"></div></div></div>';
	insertAfter(video, playDiv);

	if(!(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i))){
		$("#playButton").hide();
	}

	var controlsDiv = document.createElement('div');
	controlsDiv.style.background = "rgba(24,28,98,0.6)";;
	controlsDiv.style.marginLeft = "0";
	controlsDiv.style.marginRight = "0";
	controlsDiv.style.padding = "0";
	controlsDiv.style.position = "absolute";
	controlsDiv.style.bottom = "0.2em";
	controlsDiv.style.width = ActualVideoWidth;
	controlsDiv.id = "videoControls";



	if(navigator.userAgent.match(/Android/i)){
		playBtnTxt = "&#9658";
	}
	else {
		playBtnTxt = "&#9654";
	}

	controlsDiv.innerHTML = '<div id="btnPlay" style="cursor:pointer;float:left;width:2em;font-size:'+playerFontSize+';color:'+controlColor+';padding-left:0.1em; padding-top:0.2em; padding-bottom:0.1em; background: transparent;" onclick="togglePlay();">' + playBtnTxt + '</div>' +
						'<div id="progress" style="height:'+playerProgressBarHeight+';float:left;margin-top:0.53em;width:'+playerProgressBarWidth+';background-color: '+progressColor+'; border-radius:0">' +
						'<div id="bar" style="width: 0%;height:'+playerProgressHeight+'; padding-top:0.53em; background-color: '+progressBG+';  border-radius:0"></div></div>' +
						'<div id="displayTime" style="float:left;padding-top:0.1em;padding-bottom:0.2em;padding-left:0.5em;font-size:'+playerTimeFontSize+';color:'+controlColor+';">00:00 / 00:00</div>';

	insertAfter(video, controlsDiv);
	toggleControls(true);

  fadeOut = setTimeout(function() {
      if(!video.paused || !video.ended){
        toggleControls(false);
      }
  }, 3000);

	// video control events
	video.onclick = function(){
		togglePlay();
	}

	video.onmousemove = function(){
		toggleControls(true);
		clearTimeout(fadeOut);

		fadeOut = setTimeout(function() {
				if(!video.paused || !video.ended){
					toggleControls(false);
				}
		}, 2000);
	}

	video.addEventListener('timeupdate', function(){
		if (!video.seeking && !isSeeking){
			supposedCurrentTime = video.currentTime;
		}
		updateProgress();
	});

	video.addEventListener('ended', function(){
		btnPlay.innerHTML = playBtnTxt;
		// fix for ie and edge, paused is not set to true in ie and edge when video ended
		if(!video.paused){
			video.pause();
		}
		toggleControls(true);
		supposedCurrentTime = 0;
		PagesArray[PageNo-1] = 1;	// seen page when video ends
		SetSlideData();
		SetBookmark(PageNo);
		IsLessonCompleted();
		if(PageNo != TotalPages)
		{
		EnableNextBtn();
		}
	});

	video.addEventListener('play', function(){
		btnPlay.innerHTML = "&#10073;&#10073;";
		$("#playButton").hide();
		fadeOut = setTimeout(function() {
					toggleControls(false);
		}, 3000);
	});

	video.addEventListener('pause', function(){
		btnPlay.innerHTML = playBtnTxt;
		toggleControls(true);
		// check if ipad or android
		if(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i))
		{	$("#playButton").show();
		}
	});

	video.addEventListener('seeking', function(){
		isSeeking = true;
		var delta = video.currentTime - supposedCurrentTime;
		if (Math.abs(delta) > 0.01) {
			video.currentTime = supposedCurrentTime;
		}
	});

	video.addEventListener('seeked', function(){
		isSeeking = false;
	});
}

// toggle play/pause button
function togglePlay(){
	if(video.paused || video.ended){
		video.play();
		btnPlay.innerHTML = "&#10073;&#10073;";
	}
	else {
		video.pause();
	}
}

// update time elapsed
function updateProgress(){
	displayTime.innerHTML = "00:00 / 00:00";
	var currTime = Math.round(video.currentTime);
	var duration = Math.round(video.duration);

if(!isNaN(duration)) {
	var dmin = Math.floor(currTime / 60);
	var dsec = currTime % 60;
	var minDisplay = (dmin < 10) ? "0" + dmin : dmin;
	var secDisplay = (dsec < 10) ? "0" + dsec : dsec;

	var tmin = Math.floor(duration / 60);
	var tsec = duration % 60;
	var tminDisplay = (tmin < 10) ? "0" + tmin : tmin;
	var tsecDisplay = (tsec < 10) ? "0" + tsec : tsec;

	displayTime.innerHTML = minDisplay + ":" + secDisplay +  " / " + tminDisplay + ":" + tsecDisplay;
	bar.style.width =  ((video.currentTime / video.duration) * 100) + '%';
}

}

function toggleControls(boolDisplay){
	boolDisplay ? $("#videoControls").show() : $("#videoControls").hide();
}

setupControls();
