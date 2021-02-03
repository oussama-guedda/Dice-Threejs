// création des lumières
var lights = new THREE.Group();
var helpers = new THREE.Group();
var gui = new dat.GUI();
gui.add(helpers, 'visible').name("Display helpers");

// Ambient Light
var light = new THREE.AmbientLight(0xffffff, .1);
lights.add(light);

var ctrl = new LightController(light);
ctrl.on(gui.addFolder('Ambient light'))
    .add('visible')
    .add('color')
    .add('intensity', 0, 2);

// Hemisphere light
light = new THREE.HemisphereLight();
light.visible = false;
light.position.set(0,4,0);
light.intensity = .2;
lights.add(light);

ctrl = new LightController(light);
ctrl.on(gui.addFolder('Hemisphere light'))
    .add('visible')
    .add('color')
    .add('groundColor')
    .add('intensity', 0, 2);
if (ctrl.helper) helpers.add(ctrl.helper);

// Directional Light
light = new THREE.DirectionalLight();
light.position.set(3,4,0);
lights.add(light);

ctrl = new LightController(light);
ctrl.on(gui.addFolder('Directional light'))
    .add('visible')
    .add('color')
    .add('intensity', 0, 2);
if (ctrl.helper) helpers.add(ctrl.helper);

// Point light
light = new THREE.PointLight();
light.visible = false;
light.position.set(-3,2,0);
lights.add(light);

ctrl = new LightController(light);
ctrl.on(gui.addFolder('Point light'))
    .add('visible')
    .add('color')
    .add('intensity', 0, 2);
if (ctrl.helper) helpers.add(ctrl.helper);

// Rect Area light
light = new THREE.RectAreaLight(0xffffff, 1, 5, 5);
light.visible = false;
light.position.set(0, 2, 4);
light.lookAt(0,0,0);
lights.add(light);

ctrl = new LightController(light);
ctrl.on(gui.addFolder('Rect Area light'))
    .add('visible')
    .add('color')
    .add('intensity', 0, 5);
if (ctrl.helper) helpers.add(ctrl.helper);

// Spot Light
light = new THREE.SpotLight();
light.visible = false;
light.position.set(-3,5,0);
light.lookAt(0,0,0);
light.angle = .5;
light.distance = 10;
lights.add(light);

ctrl = new LightController(light);
ctrl.on(gui.addFolder('Spot light'))
    .add('visible')
    .add('color')
    .add('intensity', 0, 2)
    .add('distance', 1, 50)
    .add('angle', 0, 1)
    .add('penumbra', 0, 1)
    .add('decay', 1, 2);
if (ctrl.helper) helpers.add(ctrl.helper);

function LightController(light) {

    var helper;
    var internalProps = {};

    if (light.isDirectionalLight) {
        helper = new THREE.DirectionalLightHelper(light);
    } else if (light.isHemisphereLight) {
        helper = new THREE.HemisphereLightHelper(light);
    } else if (light.isPointLight) {
        helper = new THREE.PointLightHelper(light);
    } else if (light.isRectAreaLight && THREE.RectAreaLightHelper) {
        helper = new THREE.RectAreaLightHelper(light);
    } else if (light.isSpotLight) {
        helper = new THREE.SpotLightHelper(light);
    }

    if (helper) {
        helper.visible = light.visible;
    }

    this.on = function(gui) {
        gui.closed = !light.visible;
        return {
            add: function(property, minV, maxV, step) {
                if (property in light && light[property] instanceof THREE.Color) {
                    internalProps[property] = light[property].getHex();
                    var ctrl = gui.addColor(internalProps, property);
                    ctrl.onChange(function(v) {
                        light[property].setHex(v);
                        if (helper) {
                            helper.update();
                        }
                    });
                    return this;
                }
                if (property in light) {
                    internalProps[property] = light[property];
                    var ctrl = gui.add(internalProps, property);
                    if (minV != undefined) {
                        ctrl = ctrl.min(minV);
                    }
                    if (maxV != undefined) {
                        ctrl = ctrl.max(maxV);
                    }
                    if (step != undefined) {
                        ctrl = ctrl.step(step);
                    }
                    ctrl.onChange(function(v) {
                        light[property] = v;
                        if (helper) {
                            helper.update();
                            if (property == "visible") {
                                helper.visible = light.visible;
                            }
                        }
                    });
                }
                return this;
            }
        };
    }

    this.helper = helper;
}

scene.add(lights);
scene.add(helpers);
