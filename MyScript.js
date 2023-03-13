//#region <Fetch Data>


/* function Keys(){
    const userID="0c81a8e6-37fd-4b83-bbe9-8317ed1ab640";
    const apiKey ="f44c7b35-dac6-4a9b-8844-b84f0bb083bf";
  
    return [userID,apiKey];
  } */

function  getTaskofDay(response,dateOfTask){
    var tasks = response.data
    var todayTasks=[];
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].history.length; j++) {
            var hisTodayDate = new Date(tasks[i].history[j].date);
            if(IsSameDay(hisTodayDate,dateOfTask)){
                todayTasks.push([tasks[i].history[j],tasks[i].text]); //format: datetime, text
            }
        }
    }
    todayTasks.sort((a,b)=>a[0].date.getTime()-b[0].date.getTime()); //sort the tasks by time

    return todayTasks;
}
  
function printMDofTodayTasks(todyaTaskList){
    var htmlText="";
    var taskText="";
    for (let i = 0; i < todyaTaskList.length; i++) {
        var taskDate=new Date (todyaTaskList[i][0].date);
        var taskTime=taskDate.customFormat("#hh#:#mm#");
        var taskText=taskText.concat("- [x] ",taskTime," ",todyaTaskList[i][1])
        htmlText=htmlText.concat(taskText,"<br>");
        
    }
    document.getElementById("taskText").innerHTML=htmlText;
}
  
function getTasks(user, api){
    const getTasksAPI = 'https://habitica.com/api/v3/tasks/user';
    const Http = new XMLHttpRequest();
  
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var responseJson = JSON.parse(this.responseText);
          var today = new Date();
          displayTaskofDay(responseJson,today);
      }
    };

    Http.open("GET", getTasksAPI);
    Http.setRequestHeader("x-api-user", user);
    Http.setRequestHeader("x-api-key", api);
    Http.send();
    //Http.addEventListener("load", reqListener);
    //Http.addEventListener("progress", updateProgress);
    //Http.addEventListener("load", transferComplete);
    //Http.addEventListener("error", transferFailed);
    //Http.addEventListener("abort", transferCanceled);
}


//#endregion


//#region <Utility Functions>
function ParseToLocalDate(ISOstring){
    const date = new Date(ISOstring);
    return date.toLocaleDateString('en-US',{ dateStyle: 'short'});
  }
  

function IsSameDay(date1, date2){
    const date1String=ParseToLocalDate(date1);
    const date2String=ParseToLocalDate(date2);
    if (date1String.trim()===date1String.trim()){
        return true;
      }else{
        return false;
      }

}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
//#endregion
function loadInfo(){//complete
    var apiKey=getCookie("APIKey");
    var userID=getCookie("UserID");
    if(!(apiKey==="" || userID=== ""))
        document.getElementById("apiText").value=apiKey;
        document.getElementById("userID").value=userID;

}

function main(){
/*     const MyKeys=Keys();
    const userID= MyKeys[0];
    const apiKey = MyKeys[1]; */
    var apiKey=document.getElementById("apiText").value;
    var userID=document.getElementById("userID").value;

    setCookie("APIKey", apiKey, "30");
    setCookie("UserID",userID,"30");


    console.log("user ID: ",userID);
    console.log("API Key: ",apiKey);
    console.log("fetching data...");
    var tasks = getTaskofDay(userID,apiKey);
    printMDofTodayTasks(tasks);

}