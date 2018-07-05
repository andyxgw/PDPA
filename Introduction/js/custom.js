ShortVideoMode(false);
SetSlideData();
UpdateProgress(PageNo, TopicNumber, PageInTopic, TotalPagesInTopic);

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

$('#ReviewBtn').click(function(e) {
	$('.popup-wrap3').fadeIn(250);
	$('.popup-box3').removeClass('transform-out').addClass('transform-in');
	e.preventDefault();
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

function ShowQuizPopup(QuizResponse, PopUpContent)
{
	$('.popup-wrap3').fadeIn(250);
	$('.popup-box3').removeClass('transform-out').addClass('transform-in');
	var RightIcon = '<span><img src="images/MarkerRight.png" class="quizImg" /></span>';
	var WrongIcon = '<span><img src="images/MarkerWrong.png" class="quizImg" /></span>';
	var PopUpHeader;

	if(QuizResponse == true) {
		PopUpHeader = "THAT IS CORRECT!";
		$("#Q_header").html(PopUpHeader + RightIcon);
	}
	else {
		PopUpHeader = "THAT IS INCORRECT!";
		$("#Q_header").html(PopUpHeader + WrongIcon);
	}

	$("#Q_content").html(PopUpContent);
	$("#SubmitBtn").hide();
	$("#ReviewBtn").show();
}

function IsMultipleSelectionQuiz(QuizBoolean, NoOfOptions)
{
	if(QuizBoolean == false)
	{

		$("input:checkbox").click(function(){
			var checkboxgroup = "input:checkbox[name='"+$(this).attr("name")+"']";
			$(checkboxgroup).prop("checked",false);
			$(this).prop("checked",true);
		});

	}
}

function ValidateCheckboxQuiz(QuestionID)
{
	var options;
	var i;
	var correct = false;

	for(i = 0; i < options.length; i++)
	{
		if(options[i].value == "yes" && options[i].checked == true)
		{
			correct = true;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerRight.png" class="responseImg" />';
		}
		else {
			correct = false;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerWrong.png" class="responseImg" />';
		}
	}

	if(correct)
	{
		return true;
	}
	else {
		return false;
	}
}

function ValidateSingleChoiceQuiz(QuestionID)
{
	var options;
	var i;
	var correct = false;

	options = document.getElementById(QuestionID).getElementsByTagName("input");

	for(i = 0; i < options.length; i++)
	{
		if(options[i].value == "yes" && options[i].checked == true)
		{
			correct = true;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerRight.png" class="responseImg1" />';
		}
		if(options[i].value == "no" && options[i].checked == true)
		{
			correct = false;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerWrong.png" class="responseImg1" />';
		}
		if(options[i].value == "yes" && options[i].checked == false)
		{
			correct = false;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerRight.png" class="responseImg1" />';
		}
		if(options[i].value == "no" && options[i].checked == false)
		{
			correct = true;
			document.getElementsByClassName("response")[i].innerHTML = '<img src="images/MarkerWrong.png" class="responseImg1" />';
		}
		if(options[i].checked == false)
		{
			correct = false;
		}


	}

	if(correct)
	{
		return true;
	}
	else {
		return false;
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
