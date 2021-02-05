var lights = new THREE.Group();

    // Directional Light
    var light = new THREE.DirectionalLight(0xffffff, .8);
    light.position.set(3,4,0);
    lights.add(light);

    // Point Light
    light = new THREE.PointLight(0xffffff, .5);
    light.position.set(-5,0,0);
    lights.add(light);

    scene.add(lights);
