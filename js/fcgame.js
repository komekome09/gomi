'use strict';
window.addEventListener('load', init);

var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var Asset = {};
var lastTimestamp = null;

Asset.images = {};
Asset.assets = [
    {type: 'image', name: 'rocket', src: '../assets/space0.png'},
    {type: 'image', name: 'space', src: '../assets/space_bg.jpeg'},
];
Asset.loadAssets = function(onComplete){
    var total = Asset.assets.length;
    var loadCount = 0;

    var onLoad = function(){
        loadCount++;
        if(loadCount >= total){
            onComplete();
        }
    };

    Asset.assets.forEach(function(asset){
        switch(asset.type){
            case 'image':
                  Asset._loadImage(asset, onLoad);
                  break;
        }
    });
};
Asset._loadImage = function(asset, onLoad){
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;

    Asset.images[asset.name] = image;
};

// 初期化
function init(){
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    requestAnimationFrame(update);

    Asset.loadAssets(function(){
        requestAnimationFrame(update);
    });
}

var rocketX = 0;
function update(timestamp){
    var delta = 0;
    if(lastTimestamp != null){
        delta = (timestamp - lastTimestamp)/1000;
    }
    lastTimestamp = timestamp;

    requestAnimationFrame(update);

    rocketX += 100 * delta;

    render();
}

function render(){
    // 全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.htight);

    // 画像を表示
    ctx.drawImage(Asset.images['space'], 0, 0);
    ctx.drawImage(Asset.images['rocket'], rocketX, 0);
}
