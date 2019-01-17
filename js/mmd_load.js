// Waiting end of load page
window.addEventListener('load', init);

function init() {
    // Display size
    const width = 960;
    const height = 540;

    // Renderer, pixel ratio (for adopt to Retina?) and renderer size
    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 2500, +6000);
    const controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // MMD
    const mmdloader = new THREE.MMDLoader();
    mmdloader.load('../models/AkatsukiYuni/yuni_v1.02.pmx', (object) => {
        const mmdmesh = object;
        mmdmesh.position.set(0, -1200, 0);
        mmdmesh.scale.set(150, 150, 150);
        scene.add(mmdmesh);
    });

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight); // add to scene

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    // create stardust
    createStarField();
    function createStarField(){
        const geometry = new THREE.Geometry();
        for(let i = 0; i < 10000; i++){
            geometry.vertices.push(new THREE.Vector3(
                12000 * (Math.random() - 0.5),
                12000 * (Math.random() - 0.5),
                12000 * (Math.random() - 0.5),
            ));
        }

        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xFFFFFF,
        });

        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    let rotX = rotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    // get mouse position when moving
    document.addEventListener("mousemove", (event) => {
        //mouseX = event.pageX;
        //mouseY = event.pageY;
    });

    tick();

    // loop event function calling every frame
    function tick() {
        // evaluate ratio of mouse position to window size 
        const targetRotX = (mouseX / window.innerWidth) * 360;
        const targetRotY = (mouseY / window.innerHeight) * 360;
        // Easing
        rotX += (targetRotX - rotX) * 0.02;
        rotY += (targetRotY - rotY) * 0.02;
        const radX = rotX * Math.PI / 180.0;
        const radY = rotY * Math.PI / 180.0;

        camera.position.x = 6000 * Math.sin(radX);
        camera.position.z = 6000 * Math.cos(radY);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
    }
}

