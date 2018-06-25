var HygieneFactorMode = false;
var SubPagesMode = true;
var CheckBoxMode = true;
var TrackProgressInTopic = false;
var HeaderNavigation = false;

var TotalPages = 31;
var LastPage = TotalPages - 1;
var ContentPage = 2;
var PagesArray = [];

var StartPageNo = 3;
var MenuPageNo = 2;
var PageNo = 1;
var TopicNumber;
var TotalPagesInTopic;
var PageInTopic;

var TotalPagesWithSubPages = 11;
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

	LoadPage();


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



// Load Specific Page
function LoadPage() {
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
