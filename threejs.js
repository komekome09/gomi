var gggui = function() {
    this.message = 'hoge';
    this.angle = 0.01;
}

var main = function() {
    // fatgui
    var text = new gggui();
    var gui = new dat.GUI();

    gui.add(text, 'angle', -Math.PI, Math.PI).listen();

    // create scene
    var scene = new THREE.Scene();
    
    // create camera
    var width = window.innerWidth / 2;
    var height = window.innerHeight / 2;
    var fov = 60;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 50);

    // renderer information in DOM
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    // directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    scene.add(directionalLight);

    // add box
    var geometry = new THREE.CubeGeometry(30, 30, 30);
    var material = new THREE.MeshPhongMaterial({color: 0xff0000});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    mesh.useQuaternion = true;
    var axis = new THREE.Vector3(1, 1, 1).normalize();
    var angle = Math.PI / 3;
    var q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    mesh.quaternion.copy(q);

    // rendering
    renderer.render(scene, camera);

    // rotate
    (function rotate(){
        requestAnimationFrame(rotate);
        //mesh.rotation.set(mesh.rotation.z + text.vz,  mesh.rotation.y + text.vy, mesh.rotation.x + text.vx);
        angle = text.angle;
        q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
        mesh.quaternion.copy(q);
        renderer.render(scene, camera);
    })();

    var a = Math.PI / 180;
    (function update(){
        requestAnimationFrame(update);
        text.angle += a;
        if(text.angle > Math.PI){
            text.angle = Math.PI;
            a = -Math.PI / 180;
        }else if(text.angle < -Math.PI){
            text.angle = - Math.PI;
            a = Math.PI / 180;
        }
    })();
}
window.addEventListener('DOMContentLoaded', main, false);
