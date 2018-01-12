console.log("Hello, world");
var timer1;
var timer_count = 0;
var min_start, sec_start;

function countDown() {
    var min = document.getElementById("min").value;
    var sec = document.getElementById("sec").value;
    if(timer_count == 0){
        min_start = min;
        sec_start = sec;
    }
    if(min == 0 && sec == 0){
        cntStop();
        return;
    }
    console.log(timer_count, min, sec);
    var _min = min - ((sec == 0) ? 1 : 0);
    var _sec = ((sec == 0) ? 59 : (sec - 1));
    timer_count++;
    document.getElementById("min").value = _min;
    document.getElementById("sec").value = _sec;
}

function cntStart() {
    var min = document.getElementById("min").value;
    var sec = document.getElementById("sec").value;
    document.getElementById("cd").innerHTML = "";
    timer1 = setInterval("countDown()", 1000);
}

function cntStop() {
    document.getElementById("cd").innerHTML = "Timer stop!!!";
    clearInterval(timer1);
    timer_count = 0;
    document.getElementById("min").value = 0;//min_start;
    document.getElementById("sec").value = 9;//sec_start;
}
