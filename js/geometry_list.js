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

    // Object container
    const container = new THREE.Object3D();
    scene.add(container);

    // Material (load earth texture)
    const loader = new THREE.TextureLoader();
    const texture = loader.load('pic/earthmap1k.jpg');
    const material = new THREE.MeshStandardMaterial({map: texture});

    // Geometry listed
    const GeometryList = [
        new THREE.SphereGeometry(300, 30, 30),
        new THREE.BoxGeometry(300, 300, 300),
        new THREE.TetrahedronGeometry(300, 4),
        new THREE.PlaneGeometry(300, 20, 32),
        new THREE.ConeGeometry(300, 20, 32),
        new THREE.CylinderGeometry(300, 300, 20, 32),
        new THREE.TorusGeometry(300, 100, 16, 100)
    ];

    GeometryList.map((geometry, index) => {
        // Create mesh from geometry ad texture
        const mesh = new THREE.Mesh(geometry, material);
        container.add(mesh);

        mesh.position.x = 1200 * Math.sin(index / GeometryList.length * Math.PI * 2);
        mesh.position.y = 1200 * Math.cos(index / GeometryList.length * Math.PI * 2);
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

        //container.rotation.y += 0.01;
        container.rotation.x = Math.cos(radX);
        container.rotation.z = Math.sin(2*radY-Math.PI/4);

        camera.position.x = 6000 * Math.sin(radX);
        camera.position.z = 6000 * Math.cos(radY);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
    }
}
