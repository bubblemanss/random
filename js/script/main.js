var HEIGHT = 800,
    WIDTH = 800;

var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;


function threejs() {
    var $container = $('#container');

    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);

    var scene = new THREE.Scene();

    scene.add(camera);

    camera.position.z = 300;

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    var radius = 50,
        segments = 16,
        rings = 16;

    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load(
        'assets/images/beauty.jpg',
        function (tex) {
            return tex;
        },
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( xhr ) {
            console.log( 'An error happened' );
        });
    var geo = new THREE.BoxGeometry(100,100,100);
    var bufGeo = new THREE.BufferGeometry();
    bufGeo.fromGeometry(geo);

    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
    var materials = new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5})
    ]);
    var box = new THREE.Mesh(
        bufGeo,
        materials);
    box.position.set(0, 0, 0);
    scene.add(box);

    var textureLoader = new THREE.TextureLoader();
    var texture3 = textureLoader.load(
        'assets/images/particle.png',
        function (tex) {
            return tex;
        },
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( xhr ) {
            console.log( 'An error happened' );
        });

    var particleCount = 1800,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 20,
            map: texture3,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
    for (var p = 0; p < particleCount; p++) {
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);
        particles.vertices.push(particle);
    }

    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    scene.add(particleSystem);

    function update() {
        box.geometry.rotateX(0.03);
        box.geometry.rotateY(0.02);
        box.geometry.rotateZ(0.005);

        scene.remove(particleSystem);

        particles = new THREE.Geometry();
        for (var p = 0; p < particleCount; p++) {
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);
        particles.vertices.push(particle);
        }

        particleSystem = new THREE.Points(
            particles,
            pMaterial);
            scene.add(particleSystem);


        renderer.render(scene, camera);
        requestAnimationFrame(update);

    }
    requestAnimationFrame(update);
}

threejs();
