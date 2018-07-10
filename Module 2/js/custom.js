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




/*------------------------------------------------------------------
/ CUSTOM FUNCTION (Updated 09/07/2018. Andy)
-------------------------------------------------------------------*/
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

function IsMultipleSelectionQuiz(QuizBoolean)
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

	options = document.getElementById(QuestionID).getElementsByTagName("input");

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

		options[i].disabled =true;
	}

	if(correct)
	{
		return true;
	}
	else {
		return false;
	}
}

function ValidateImageCheckboxQuiz(QuestionID)
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
			document.getElementsByClassName("cbResponse")[i].innerHTML = '<img src="images/MarkerRight.png" class="responseImg" />';
		}
		else {
			correct = false;
			document.getElementsByClassName("cbResponse")[i].innerHTML = '<img src="images/MarkerWrong.png" class="responseImg" />';
		}

		$('.image-checkbox').on('click', function(e) {
			if ($(this).hasClass("image-checkbox-checked")) {
			   $(this).addClass("image-checkbox-checked");
			}
			else {
				$(this).removeClass("image-checkbox-checked");
			}

		});
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
		if(options[i].checked == false)
		{
			correct = false;
		}
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

		options[i].disabled =true;
	}

	if(correct)
	{
		return true;
	}
	else {
		return false;
	}
}

function SetClickableArea(NumOfArea)
{
	for(var i=1; i<NumOfArea+1; i++)
	{
		$(".CanvasPanel").append('<input type="hidden" id="S'+i+'" value="0" />');
	}
}

function ActivateClickableArea(VarName, PanelName)
{
	var VisitedColor = "#00ffff";
	var DefaultColor = "#ffffff";


	$(VarName).hover(function() {
	  $(this).css("background", VisitedColor);
	});

	$(VarName).mouseout(function() {
	  $(this).css("background", DefaultColor);
	});

	$(VarName).click(function(e){
		var ClickIndex = VarName.substring(2);
		var Alphabet = VarName.substring(2,1);
		var TotalInputCount;

		$(this).addClass('ClickableCanvasBox_Curr');
		$(this).unbind('mouseenter mouseleave mouseout');
		$(".CanvasBox2").hide();
		$(PanelName).show();
		TotalInputCount = $('.CanvasPanel input:hidden').length;

		for(var i=1; i<TotalInputCount+1; i++)
		{
			if($("#S"+i).val() == 1)
			{
				$("#"+Alphabet+i).prepend('<span class="VisitedImage"/>');
				$("#"+Alphabet+i).css("background","#cccccc");
				$("#"+Alphabet+i).css("border","0.2em solid #a2abb4");
			}
		}
		$("#S"+ClickIndex).val(1);
	})
}














/*------------------------------------------------------------------
/ CUSTOM ACTIONS (Updated 09/07/2018. Andy)
-------------------------------------------------------------------*/
$('#ReviewBtn').click(function(e) {
	$('.popup-wrap3').fadeIn(250);
	$('.popup-box3').removeClass('transform-out').addClass('transform-in');
	e.preventDefault();
});




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
