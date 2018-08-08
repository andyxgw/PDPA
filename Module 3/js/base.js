var HygieneFactorMode = false;
var SubPagesMode = false;
var CheckBoxMode = true;
var TrackProgressInTopic = false;
var HeaderNavigation = false;

var TotalPages = 5;
var LastPage = TotalPages - 1;
var ContentPage = 0;
var PagesArray = [];

var StartPageNo = 1;
var MenuPageNo = 0;
var PageNo = 1;
var TopicNumber;
var TotalPagesInTopic;
var PageInTopic;
var PlayerID;

var TotalPagesWithSubPages = 0;
var PagesWithSubPagesArray = [];

var UserAnswersCount = 0
var UserAnswers = [];
var submitFlag = false;

var splashScreen = $('#splashScreen');
var introScreen = $('#introScreen');
var mainContent = $('#main_content');
var content = $('#content');

var containerOriginalWidth = 1400;
var containerOriginalHeight = 1000; // Footer will take up 140px

PagesArray.length = TotalPages;
PagesWithSubPagesArray.length = TotalPagesWithSubPages;

for(var i=0;i<PagesArray.length;++i)
{
	PagesArray[i] = 0;
}

if(TotalPagesWithSubPages > 0)
{
	for(var i=0; i<TotalPagesWithSubPages; ++i)
	{
		PagesWithSubPagesArray[i] = 0;
	}
}

window.addEventListener("resize", resizeWindow);
window.addEventListener("orientationchange", resizeWindow);

/* Execution of functions upon document loaded */
$(document).ready(function(e) {

	resizeWindow();
	mainContent.show();

	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');

	});

	$('#sidebarCollapse').click(function (e) {
		$('#sidebar').addClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

	$('.menulink').click(function(e) {
		var ClickedID = $(this).attr("id");
		var NavPageID = ClickedID.substring(1);
		VerifyToProceed(NavPageID);
	});

	tabModule.init();
	DisableRightClick(true);

	$('#homeBtn').click(function(e) {
		//$('#sidebar').removeClass('active');
		NavigatePage(StartPageNo);
		e.preventDefault();
	  });

	$('#glossaryBtn').click(function(e) {
		$('.popup-wrap').fadeIn(250);
		$('.popup-box').removeClass('transform-out').addClass('transform-in');
		$('#sidebar').removeClass('active');
		e.preventDefault();
		StopVideoOrAudio();

	  });

	$('.popup-close').click(function(e) {
		$('.popup-wrap').fadeOut(500);
		$('.popup-box').removeClass('transform-in').addClass('transform-out');
		e.preventDefault();
		ResumeVideoOrAudio();

	});

	$('#helpBtn').click(function(e) {
		$('.popup-wrap1').fadeIn(250);
		$('.popup-box1').removeClass('transform-out').addClass('transform-in');
		StopVideoOrAudio();
		$('#vPlayer1').trigger('play');
		e.preventDefault();
	});

	$('.popup-close1').click(function(e) {
		$('.popup-wrap1').fadeOut(500);
		$('.popup-box1').removeClass('transform-in').addClass('transform-out');
		$('#vPlayer1').trigger('pause');
		ResumeVideoOrAudio();
		e.preventDefault();
	});


});

/* Resize window to match the viewport dimension */
function resizeWindow() {
	var ratio;
	var pixelRatio;
    var width, height;
	var winWidth, winHeight;
    var containerNewWidth, containerNewHeight;

	if (typeof (window.innerWidth) == 'number')
	{
		winWidth = window.innerWidth;
		winHeight = window.innerHeight;
	}
	else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
	{
		//IE 6+ in 'standards compliant mode'
		winWidth = document.documentElement.clientWidth;
		winHeight = document.documentElement.clientHeight;
	}
	else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		//IE 4 compatible
		winWidth = document.body.clientWidth;
		winHeight = document.body.clientHeight - 10;
	}



	if(winWidth<=winHeight)
	{
		pixelRatio = 10 * (winWidth/containerOriginalWidth) + 'px';
		if(mainContent.offsetHeight > winHeight && mainContent.offsetWidth != winWidth)
			pixelRatio = 10 * (winHeight/containerOriginalHeight) + 'px';
	}
	if(winWidth>winHeight)
	{
		pixelRatio = 10 * (winHeight/containerOriginalHeight) + 'px';
		if(mainContent.offsetWidth >= winWidth)
		{
			if(winWidth>winHeight && mainContent.offsetWidth==winWidth)
			{
				if(mainContent.offsetHeight < winHeight)
					pixelRatio = 10 * (winWidth/containerOriginalWidth) + 'px';
			}
		}
	}
	splashScreen.css("font-size", pixelRatio);
	introScreen.css("font-size", pixelRatio);
	mainContent.css("font-size", pixelRatio);
}



// Disable and hide scroll bar
function disableScrollBars() {
	document.documentElement.style.overflow = 'hidden';  // firefox, chrome
	document.body.style.overflow = "hidden";
	document.body.scroll = "no"; // ie only
}

function DisableRightClick(booleanOption)
{
	if(booleanOption == true)
	{
		document.addEventListener("contextmenu", function(e){
			e.preventDefault();
		}, false);
	}
}


// Load Specific Page
function LoadPage() {
	if(PageNo == 1)
	{
		if(HygieneFactorMode == false)
		{
			DisablePrevBtn();
			EnableNextBtn();
			PagesArray[PageNo-1] = 1;
		}
		else
		{
			DisablePrevBtn();
			DisableNextBtn();
		}
	}

	if(PageNo > 1)
	{
		if(HygieneFactorMode == false)
		{
			EnablePrevBtn();
			EnableNextBtn();
		}
		else
		{
			EnablePrevBtn();
			DisableNextBtn();
		}
	}
	//CheckPageStatus();
	if(PageNo == TotalPages)
	{
		PagesArray[PageNo-1] = 1;    // Check if current page is at last page
		DisableNextBtn();
	}

	PageName = GeneratePageName(PageNo);
	SetBookmark(PageNo);
	$('#content').load(PageName);
	$('#PageReader').text("Page " + PageNo + " of " + TotalPages);
}

function GeneratePageName(PageNo)
{
	if(PageNo < 10){
		fileStr = 'pages/p0'+PageNo+'.html';
	}
	else{
		fileStr = 'pages/p'+PageNo+'.html'
	}

	return fileStr;
}

function UpdateProgress(PageNo, TopicNumber, PageInTopic, TotalPagesInTopic)
{
	PagesArray[PageNo-1] = 1;
	SetSlideData();
	SetBookmark(PageNo);
	IsLessonCompleted();

	var BoxNo;

	if(TotalPagesWithSubPages == 0)
  {
		BoxNo = PageNo;
    $("#b" + BoxNo).attr("class", "fa fa-check-square-o faCB_visited");
  }
	else
	{
			if(PageInTopic == TotalPagesInTopic)
			{
				BoxNo = TopicNo;
				$("#b"+BoxNo+"_"+PageInTopic).attr("class", "fa fa-check-square-o faCB_visited");
				$("#b"+BoxNo).attr("class", "fa fa-check-square-o faCB_visited");
			}
	}
}

function GetProgress(IndexPageNo)
{
	if(SubPagesMode == false)
	{
		$("#b" + IndexPageNo).attr("class", "fa fa-check-square-o faCB_visited");
	}
}

function DisablePrevBtn()
{
	$(".PrevBtn").css("visibility", "visible");
	$(".PrevBtn").css("opacity", "0.4");
	$(".PrevBtn").css("-webkit-filter", "grayscale(100%)");
	$(".PrevBtn").css("filter", "grayscale(100%)");
	$(".PrevBtn").css("filter", "alpha(opacity=40)");
	$("#PrevNav").css('cursor','default');
	$('#PrevBtn').unbind('click', function(e){
		StopVideoOrAudio();
		e.preventDefault();
		return false;
	})
	$('#PrevBtn').off("click");
}

function EnablePrevBtn()
{
	$(".PrevBtn").css("visibility", "visible");
	$(".PrevBtn").css("opacity", "1");
	$(".PrevBtn").css("-webkit-filter", "grayscale(0%)");
	$(".PrevBtn").css("filter", "grayscale(0%)");
	$(".PrevBtn").css("filter", "alpha(opacity=100)");
	$("#PrevNav").css('cursor','pointer');
	$('#PrevBtn').bind('click', function(e){
		StopVideoOrAudio();
        NavigatePage('Prev');
		e.stopImmediatePropagation();
	})
}

function DisableNextBtn()
{
	$(".NextBtn").css("visibility", "visible");
	$(".NextBtn").css("opacity", "0.4");
	$(".NextBtn").css("-webkit-filter", "grayscale(100%)");
	$(".NextBtn").css("filter", "grayscale(100%)");
	$(".NextBtn").css("filter", "alpha(opacity=40)");
	$("#ClickToProceed").css("visibility", "hidden");
	$('#NextBtn').unbind('click', function(e){
		StopVideoOrAudio();
        e.preventDefault();
		return false;
	})
	$('#NextBtn').off("click");

}

function EnableNextBtn()
{
	$(".NextBtn").css("visibility", "visible");
	$(".NextBtn").css("opacity", "1");
	$(".NextBtn").css("-webkit-filter", "grayscale(0%)");
	$(".NextBtn").css("filter", "grayscale(0%)");
	$(".NextBtn").css("filter", "alpha(opacity=100)");
	$("#NextNav").css('cursor','pointer');
	$("#ClickToProceed").css("visibility", "visible");
	$('#NextBtn').bind('click', function(e){
		StopVideoOrAudio();
        NavigatePage('Next');
		e.stopImmediatePropagation();
	})
}

$("#PrevBtn").click(function(e) {
	StopVideoOrAudio();
	NavigatePage('Prev');
	e.stopImmediatePropagation();
});

$("#NextBtn").click(function(e){
	StopVideoOrAudio();
	NavigatePage('Next');
	e.stopImmediatePropagation();
});


// Perform Navigation
function NavigatePage(varMode)
{
	var OkToProceed = false;
	var TopicCompleted;

	if(varMode == 'Next')
	{
		if(PageNo != TotalPages)
		{
			PagesArray[PageNo-1] = 1;
			PageNo = PageNo + 1;
			OkToProceed = true;
		}
		else
		{
			OkToProceed = false;
		}
	}
	else if (varMode == 'Prev')
	{
		if(PageNo > 1)
		{
			if(PageNo > StartPageNo)
			{
				PageNo = PageNo - 1;
			}
			else
			{
				PageNo = PageNo - 1;
			}
			OkToProceed = true;
		}
		else
		{
			OkToProceed = false;
		}
	}
	else
	{
		PageNo = parseInt(varMode);
		OkToProceed = true;
	}

	if(OkToProceed == true)
	{
		StopVideoOrAudio();
		LoadPage();
	}
}

function VerifyToProceed(DestPageNo)
{
	if(PagesArray[DestPageNo-1] == 1)
	{
		NavigatePage(DestPageNo);
	}
}

function StopVideoOrAudio()
{
	if ($('#vPlayer').length != 0 )
	{
		$('#vPlayer').trigger('pause');
		PlayerID = '#vPlayer'
	}

	if ($('#vPlayer2').length != 0 )
	{
		$('#vPlayer2').pause;
		PlayerID = '#vPlayer2'
	}

	if ($('#vPlayer3').length != 0 )
	{
		$('#vPlayer3').trigger('pause');
		PlayerID = '#vPlayer3'
	}

	if ($('#vPlayer4').length != 0 )
	{
		$('#vPlayer4').trigger('pause');
		PlayerID = '#vPlayer4'
	}

	if ($('#vPlayer5').length != 0 )
	{
		$('#vPlayer5').trigger('pause');
		PlayerID = '#vPlayer5'
	}

	if ($('#vPlayer6').length != 0 )
	{
		$('#vPlayer6').trigger('pause');
		PlayerID = '#vPlayer6'
	}

	if(document.getElementById('VoiceOver') != null) {
		var audioVO = document.getElementById('VoiceOver');
		audioVO.pause();
	}

	if(document.getElementById('VoiceOver1') != null) {
		var audioVO1 = document.getElementById('VoiceOver1');
		audioVO1.pause();
	}

	if(document.getElementById('VoiceOver2') != null) {
		var audioVO2 = document.getElementById('VoiceOver2');
		audioVO2.pause();
	}

	if(document.getElementById('VoiceOver3') != null) {
		var audioVO3 = document.getElementById('VoiceOver3');
		audioVO3.pause();
	}

	if(document.getElementById('VoiceOver4') != null) {
		var audioVO4 = document.getElementById('VoiceOver4');
		audioVO4.pause();
	}

	if(document.getElementById('VoiceOver5') != null) {
		var audioVO5 = document.getElementById('VoiceOver5');
		audioVO5.pause();
	}

	if(document.getElementById('VoiceOver6') != null) {
		var audioVO6 = document.getElementById('VoiceOver6');
		audioVO6.pause();
	}

	if(document.getElementById('VoiceOver7') != null) {
		var audioVO7 = document.getElementById('VoiceOver7');
		audioVO7.pause();
	}
}

function ResumeVideoOrAudio()
{
	$(PlayerID).trigger('play');
}


function ShortVideoMode(boolDisplay)
{
	if(boolDisplay == true)
	{
		if($("#vPlayer").length > 0)
		{
			$("#vPlayer").attr("src","test/ShortVideo.mp4");
		}
		if($("#vPlayer2").length > 0)
		{
			$("#vPlayer2").attr("src","test/ShortVideo.mp4");
		}
		if($("#vPlayer3").length > 0)
		{
			$("#vPlayer3").attr("src","test/ShortVideo.mp4");
		}
		if($("#vPlayer4").length > 0)
		{
			$("#vPlayer4").attr("src","test/ShortVideo.mp4");
		}
		if($("#vPlayer5").length > 0)
		{
			$("#vPlayer5").attr("src","test/ShortVideo.mp4");
		}
		if($("#vPlayer6").length > 0)
		{
			$("#vPlayer6").attr("src","test/ShortVideo.mp4");
		}
	}
}
