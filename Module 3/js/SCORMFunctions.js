var strStartDate;
var strEndDate;
var PageNo = 0;
var completedslide = -1;
var page, cpage;
var winWidth;
var winHeight;
var pixelRatio;
var CheckBoxNo;
var PageStatus;

function doEntryTasks()
{
  try
  {
    strStartDate = new Date();
    doLMSInitialize();
    console.log("SD: "+doLMSGetValue("cmi.suspend_data"));
    console.log("LL: "+doLMSGetValue("cmi.core.lesson_location"));
    console.log("LS: "+doLMSGetValue("cmi.core.lesson_status"));
		CheckBookMark();
	}
	catch (ex) { }
}

/*
Check the last accessed page upon login.
If there is no value to the last accessed page, users will be brought to the first page.
*/
function CheckBookMark()
{
	var BMPage = GetBookmark();

  if(BMPage == null || BMPage == 'null' || BMPage == undefined || BMPage == 'undefined' || BMPage == "")
  {
    PageNo = 1;
  }
  else
  {
    PageNo = BMPage;
    GetSlideData();
  }
  NavigatePage(PageNo);
}



function SetBookmark(num){
	doLMSSetValue("cmi.core.lesson_location", num);
	doLMSCommit();
}


function GetBookmark(){
	var ll;
	completionStatus = doLMSGetValue("cmi.core.lesson_status");

	if(completionStatus == "completed" || completionStatus == "passed")
	{
		ll = 1;
	}
  else {
    ll = doLMSGetValue("cmi.core.lesson_location");
  }

	return ll;
}

function SetSlideData(){

	 var strLMS = "";

	 for(var i=0; i<PagesArray.length; i++)
	 {
		 if(i == 0)
		 {
		 	strLMS += PagesArray[i];
		 }
		 else
		 {
		 	strLMS += "/" + PagesArray[i];
		 }

	 }

	 console.log("SET suspend_data: " + strLMS);
   doLMSSetValue("cmi.suspend_data", strLMS);
	 doLMSCommit();
}



/*
Access LMS to retrieve the data of which pages are read/unread.
*/
function GetSlideData(){

	var strLMS = doLMSGetValue("cmi.suspend_data");
	var strLMS_Array = strLMS.split("/");

	for(var i=0; i<PagesArray.length; i++)
	{
		PagesArray[i] = parseInt(strLMS_Array[i]);

		if(PagesArray[i] == 1)
		{
      CheckBoxNo = i + 1;
      GetProgress(CheckBoxNo);
		}
	}
  console.log("PagesArray: "+PagesArray);
}

function IsLessonCompleted() {

	var CompletedStatus = false;
	var ViewedPageCount = 0;

	 if(PagesArray[LastPage] == 1)
	 {

		for(var i=0; i<PagesArray.length; i++)
		{
			if(PagesArray[i] == 1)
			{
				ViewedPageCount = ViewedPageCount + 1;
			}
		}

		if(ViewedPageCount == TotalPages)
		{
			CompletedStatus = true;
		}
		else
		{
			CompletedStatus = false;
		}
	 }
	 else
	 {
		 CompletedStatus = false;
	 }

   console.log("ViewedPageCount: "+ViewedPageCount);

	 if(CompletedStatus == true)
	 {
		 doLMSSetValue("cmi.core.lesson_status", "completed");
	 }
	 else
	 {
		 doLMSSetValue("cmi.core.lesson_status", "incomplete");
	 }
	 doLMSCommit();
}

var IsUnloadCalled = false;

function callOnBeforeUnload() {
    if (!IsUnloadCalled) {
		doExitTasks();
        IsUnloadCalled = true;
    }
}


function doExitTasks() {
	try
	{
	  //SetSlideData();
	  var formattedTime = "";
	  if (strStartDate) {
			var currentDate = new Date().getTime();
			var elapsedSeconds = ((currentDate - strStartDate) / 1000);
			formattedTime = convertTotalSeconds(elapsedSeconds);
		}
		else {
			formattedTime = "00:00:00.0";
		}
		doLMSSetValue("cmi.core.session_time", formattedTime);
		doLMSCommit();
		doLMSFinish();
	}
	catch(ex)
	{
	}
}


function convertTotalSeconds(ts) {
    var sec = (ts % 60);

    ts -= sec;
    var tmp = (ts % 3600);  //# of seconds in the total # of minutes
    ts -= tmp;              //# of seconds in the total # of hours

    // convert seconds to conform to CMITimespan type (e.g. SS.00)
    sec = Math.round(sec * 100) / 100;

    var strSec = new String(sec);
    var strWholeSec = strSec;
    var strFractionSec = "";

    if (strSec.indexOf(".") != -1) {
        strWholeSec = strSec.substring(0, strSec.indexOf("."));
        strFractionSec = strSec.substring(strSec.indexOf(".") + 1, strSec.length);
    }

    if (strWholeSec.length < 2) {
        strWholeSec = "0" + strWholeSec;
    }
    strSec = strWholeSec;

    if (strFractionSec.length) {
        strSec = strSec + "." + strFractionSec;
    }


    if ((ts % 3600) != 0)
        var hour = 0;
    else var hour = (ts / 3600);
    if ((tmp % 60) != 0)
        var min = 0;
    else var min = (tmp / 60);

    if ((new String(hour)).length < 2)
        hour = "0" + hour;
    if ((new String(min)).length < 2)
        min = "0" + min;

    var rtnVal = hour + ":" + min + ":" + strSec;

    return rtnVal;
}
