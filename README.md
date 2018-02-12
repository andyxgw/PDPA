## SCORM Functions
File location: js/SCORMFunctions.js
Below covers the essential functions and their respective parameters (if any)

| Functions      | Description           | Parameter(s)  |
| ------------- |-----------| -------|
| CheckBookMark() | To retrieve bookmark value. If no value exist, user will be redirected to the default first page of the module/course. |  |
| SetBookMark(num) | Use page number as the bookmark value and set it into LMS. |  A integer value  |
| GetBookMarkPage() | To retrieve bookmark value | |
| SetSlideData() | Set user learning data. Data stored as array e.g. 1,1,0,0,0. 1 refers to page read and 0 refers to page unread | |
| GetSlideData() | To retrieve user learning data. Data stored as array e.g. 1,1,0,0,0. 1 refers to page read and 0 refers to page unread | |
| IsLessonCompleted() | Access user learning data and verify last page has been read. If yes, set the status of the lesson as completed. | |
| doExitTasks() | Perform series of functions which include setting user learning data and set lesson learning duration when user close the LMS window | |

<br />

## Base Functions
File location: js/base.js

The following covers the customizable variables to fit into the context of the entire SCORM package. Only change the value of the variables stated below. These variables are at the top lines of the JS file.

| Variable      | Acceptable Values  | Description  |
| ------------- |--------------------|--------------|
| HygieneFactorMode | true / false  | To set whether the package require hygiene factor to be implemented |
| TotalPages | <i>integer</i>  | To set the number of pages, including the subpages for the package. This will automatically indicate the last page where learners will not be able to proceed forward. |
| StartPageNo | <i>integer</i>  | To set the start page number, exclude the splash/intro page of the package (if any). This will automatically prevent learners from being able to navigated to the previous page |

<br />

## Menu Listing
File location: js/index.html
'''
aaa
'''
