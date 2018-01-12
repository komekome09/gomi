var min = document.querySelector("[data-task-list]");
console.log(min);

var wunderlistSDK = require('wunderlist');
var wunderlistAPI = new wunderlistSDK({
    'accessToken': 'c214666c1492e2bc0d2f752a7547458a56b6cba580a1263d468180de89c4',
    'clientID': '2e6b1559523a40c6d1d7'
});

wunderlistAPI.http.lists.all()
    .done(function(lists){
        document.querySelector('[data-task-list]').innerHTML = lists;
    })
    .fail(function(){
        document.querySelector('[data-task-list]').innerHTML = ['error'];
    });
