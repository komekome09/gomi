var config = {
    "control": {
        "disableUnmentioned": false, 
        "lightenMentioned": true, 
    },
    "color": {
        "selected": 0x88ff88,
        "background": 0x114488
    }
};
var container = document.getElementById( "globalArea" );
var controller = new GIO.Controller( container, config );

controller.addDataAsync('hoge.json', function(){
    controller.init();
});

controller.onCountryPicked(function(select, relate){
    console.log(select, relate);
});
//controller.addData( data );
//controller.init();

