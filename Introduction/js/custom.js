ShortVideoMode(false);
SetSlideData();
UpdateProgress();

console.log("Current Page: "+PageNo);



if(PageNo > ContentPage && ContentPage > 0)
{
  ProgressTracking(PageNo);
}

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


$('.popup-close').click(function(e) {

    var clicked = $("#ClickedImage").val();
    var completed = $("#CompletedImage").val();

    $('#'+clicked).attr("src", completed);
    $('#'+clicked).attr("data-selected", "1");
    ActivateQuiz();

		$('.popup-wrap').fadeOut(300);
		$('.popup-box').removeClass('transform-in').addClass('transform-out');
		e.preventDefault();
});


function UpdateProgress()
{
  if(TotalPagesWithSubPages == 0)
  {
    var BoxNo = PageNo;
    $("#b" + BoxNo).attr("class", "fa fa-check-square-o faCB_visited");
  }
}



function ProgressTracking(currPageNo)
{
    var PageListingDetail = PageListingDetails(currPageNo);
		var TopicNo = PageListingDetail[0];
		var SubPageStartIndex = PageListingDetail[1];
		var SubPagesCount = PageListingDetail[2];
		var SubPageEndIndex = PageListingDetail[3];
    var progressHTML = "";

    for(var i=SubPageStartIndex; i<SubPageEndIndex; i++)
    {
      if(i <= currPageNo)
      {
        progressHTML += '<i class="fa fa-circle TopicBtn topic-accessed"></i>';
      }
      else {
        progressHTML += '<i class="fa fa-circle TopicBtn"></i>';
      }
    }

    $("#ProgressTracker").html(progressHTML);

}



function ShowPopup(ContentType, ClickedImage,ImageFileName, CompletedFileName)
{
  if(ContentType == "Image")
  {
      var imgHTML = '<img src="images/'+ImageFileName+'" border="0" style="width: 90%;">';
      imgHTML += '<input type="hidden" id="ClickedImage" value="'+ClickedImage+'">';
      imgHTML += '<input type="hidden" id="CompletedImage" value="images/'+CompletedFileName+'">';

      $('.popup-wrap').fadeIn(250);
		  $('.popup-box').removeClass('transform-out').addClass('transform-in');
      $("#ImageLoadPanel").html(imgHTML);
  }
}


function ActivateQuiz()
{
  if($("#ImageToClick").length > 0)
  {
    var numInputs = 0;
    for(var q=1; q <= $("#ImageToClick").val(); q++)
    {
      if($('#Image'+q).attr("data-selected") == "1")
      {
        numInputs += 1;
      }
    }

    if(numInputs >= $("#ImageToClick").val())
    {
      EnableQuiz("ChoiceWrapper");
    }
  }
  else {
    EnableQuiz("ChoiceWrapper");
  }
}

function DisableQuiz(element)
{
  $("."+element).css("pointer-events", "none");
}

function EnableQuiz(element)
{
  $("."+element).css("pointer-events", "auto");
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
