import * as THREE from 'three';

class GraphicsEngine {
  constructor(imagePath) {
    const self = this;

    // Initialize event inheritance
    H5P.EventDispatcher.call(self);

    this.isUserInteracting = false;
    this.onMouseDownMouseX = 0;
    this.onMouseDownMouseY = 0;
    this.onMouseDownLon = 0;
    this.onMouseDownLat = 0;
    this.lon = 0;
    this.lat = 0;
    this.phi = 0;
    this.theta = 0;

    // Main wrapper element
    this.graphicsWrapper = document.createElement('div');
    this.graphicsWrapper.classList.add('h5p-three-sixty');

    const camera = new THREE.PerspectiveCamera(75, 16/9, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    const scene = new THREE.Scene();

    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(imagePath)
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    this.graphicsWrapper.appendChild(renderer.domElement);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
  }

  initializeMovementListeners() {
    document.addEventListener('mousedown', (event) => {
      event.preventDefault();

      this.isUserInteracting = true;

      this.onMouseDownMouseX = event.clientX;
      this.onMouseDownMouseY = event.clientY;

      this.onMouseDownLon = this.lon;
      this.onMouseDownLat = this.lat;
    }, false);

    document.addEventListener('mousemove', (event) => {
      if (this.isUserInteracting === true) {
        this.lon = (this.onMouseDownMouseX - event.clientX) * 0.1 + this.onMouseDownLon;
        this.lat = (event.clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;
      }
    }, false);

    document.addEventListener('mouseup', () => {
      this.isUserInteracting = false;
    }, false);
  }

  resize() {
    // Resize main wrapping element
    this.graphicsWrapper.style.height = (this.graphicsWrapper.clientWidth / (16 / 9)) + 'px';

    // Resize renderers
    this.renderer.setSize(this.graphicsWrapper.clientWidth, this.graphicsWrapper.clientHeight);
  }

  render() {
    this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
    this.phi = THREE.Math.degToRad( 90 - this.lat );
    this.theta = THREE.Math.degToRad( this.lon );

    this.camera.target.x = 500 * Math.sin( this.phi ) * Math.cos( this.theta );
    this.camera.target.y = 500 * Math.cos( this.phi );
    this.camera.target.z = 500 * Math.sin( this.phi ) * Math.sin( this.theta );

    this.camera.lookAt( this.camera.target );

    // Draw scenes
    this.renderer.render(this.scene, this.camera);
  }

  getWrapper() {
    return this.graphicsWrapper;
  }

  addElement() {
    console.log("adding an element at x, y, z position");
  }
}

export default GraphicsEngine;