ShortVideoMode(false);
SetSlideData();
UpdateProgress(PageNo, TopicNumber, PageInTopic, TotalPagesInTopic);
CheckVideoVisibility();

console.log("Current Page: "+PageNo);


if(HygieneFactorMode == true)
{
	if(PageNo > ContentPage)
	{
		if(PagesArray[PageNo-1] == 1 && QuizPage != true)
		{
			EnableNextBtn();
		}

		if(PagesArray[PageNo-1] == 1 && QuizPage == true)
		{
			EnableNextBtn();
		}

		if ($('#vPlayer').length > 0)
		{
			if(PagesArray[PageNo-1] == 1)
			{
				EnableNextBtn();
			}
		}
	}
}

$('.popup-close2').click(function(e) {
	$('.popup-wrap2').fadeOut(500);
	$('.popup-box2').removeClass('transform-in').addClass('transform-out');
	e.preventDefault();
});

$('.TextLink').click(function(e) {
	$(this).css("color", "#d8a749");
});





function ShowTextPopup(PopUpHeader, PopUpContent, PopUpFooter)
{
    $('.popup-wrap2').fadeIn(250);
	  $('.popup-box2').removeClass('transform-out').addClass('transform-in');
		$("#PU_header").html(PopUpHeader);
    $("#PU_content").html(PopUpContent);

		if(PopUpFooter == "")
		{
			$(".BottomPanel").hide();
		}
		else {
			$(".BottomPanel").show();
			$("#PU_footer").html(PopUpFooter);
		}
}








var PageListingDetails = function(strPageNo)
{
	var TopicNo;
	var SubPages;
	var SubPageStartIndex;
	var SubPageEndIndex;

	if(strPageNo == 2 || strPageNo < 4)
		{
			TopicNo = 1;
			SubPages = 2;
			SubPageStartIndex = 2;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 4 || strPageNo < 8)
		{
			TopicNo = 2;
			SubPages = 4;
			SubPageStartIndex = 4;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 8)
		{
			TopicNo = 3;
			SubPages = 1;
			SubPageStartIndex = 8;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 9 || strPageNo < 13)
		{
			TopicNo = 4;
			SubPages = 4;
			SubPageStartIndex = 9;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 13 || strPageNo < 16)
		{
			TopicNo = 5;
			SubPages = 3;
			SubPageStartIndex = 13;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 16 || strPageNo < 18)
		{
			TopicNo = 6;
			SubPages = 2;
			SubPageStartIndex = 16;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 18 || strPageNo < 28)
		{
			TopicNo = 7;
			SubPages = 10;
			SubPageStartIndex = 18;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else if(strPageNo == 28)
		{
			TopicNo = 8;
			SubPages = 1;
			SubPageStartIndex = 28;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}
		else
		{
			TopicNo = 1;
			SubPages = 1;
			SubPageStartIndex = 0;
			SubPageEndIndex = (SubPageStartIndex + SubPages);
		}

		return [TopicNo, SubPageStartIndex, SubPages, SubPageEndIndex];
}
