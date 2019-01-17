import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js'
import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'
import MainBuilding from './MainBuilding'
import SubBuilding from './SubBuilding'
// import Flag from './Cloth'
// import { Cloth } from './Cloth'

window.addEventListener('DOMContentLoaded', init)

const windowWidth = 600
const windowHeight = 800

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(windowWidth, windowHeight)
  renderer.setClearColor(0x40e0d0, 1.0)
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(
    45,
    windowWidth / windowHeight,
    0.1,
    2000000
  )
  camera.position.set(0, 0, 1000)

  const controls = new THREE.OrbitControls(camera)

  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight('#fffff0')
  light.castShadow = true;
  light.shadow.mapSize.width = 8192;
  light.shadow.mapSize.height = 8192;
  light.intensity = 2;
  light.position.set(300, 100, 0);
  light.shadow.camera.left = -20000;
  light.shadow.camera.right = 20000;
  light.shadow.camera.top = -20000;
  light.shadow.camera.bottom = 20000;
  light.shadow.camera.far = 20000;
  scene.add(light)

  const amb = new THREE.AmbientLight('#464646', 1.0)
  scene.add(amb)

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100000, 100000),
    new THREE.MeshPhongMaterial({ color: '#d2691e' })
  )
  plane.receiveShadow = true
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  const building1 = new MainBuilding()
  building1.position.set(0, 0, 0)
  building1.castShadow = true
  building1.receiveShadow = true
  building1.rotation.y = -Math.PI / 6
  scene.add(building1)

  const building2 = new SubBuilding()
  building2.castShadow = true
  building2.receiveShadow = true
  building2.position.z = 1300
  scene.add(building2)
  // building.position.z = 50

  // const tri = createFlag()

  // scene.add(tri)
  // console.log(tri)

  // console.log('test', building.children[0].children[0].children[7].children[1].children[80].children[0].children[1].children)

  // const triVertices = building.children[0].children[0].children[7].children[1].children[80].children[0].children[1].children

  const DISTANCE = 1.3; // 旗を分割した頂点間の距離
  const SEGMENTS_X = 5; // 旗のX軸の分割数
  const SEGMENTS_Y = 13; // 旗のY軸の分割数
  const WIDTH = DISTANCE * SEGMENTS_X; // 旗の横幅
  const HEIGHT = DISTANCE * SEGMENTS_Y; // 旗の縦幅

  // 星条旗
  var loader = new THREE.TextureLoader();
  var clothTexture = loader.load("./texture/cloth.png")
  clothTexture.wrapS = THREE.RepeatWrapping;
  clothTexture.wrapT = THREE.RepeatWrapping;
  clothTexture.anisotropy = 16;
  var clothMaterial = new THREE.MeshPhongMaterial({ specular: 0x000000, color: '#f0f', side: THREE.DoubleSide });
  function pf(u, v, target) {
    var x = (u - 0.5) * DISTANCE * SEGMENTS_X
    var y = (v + 0.5) * DISTANCE * SEGMENTS_Y
    var z = 0
    target.set(x, y, z)
    return new THREE.Vector3(x, y, z)
  }
  var cloth = new Cloth(SEGMENTS_X, SEGMENTS_Y, DISTANCE, pf, new THREE.Vector3());
  var clothMeth = new THREE.Mesh(cloth.getGeometry(), clothMaterial);
  clothMeth.position.set(WIDTH / 2, -HEIGHT / 2, 0);
  // scene.add(clothMeth);

  // ポール
  var poleGeometry = new THREE.CylinderGeometry(1, 1, 50, 10, 0, true);
  var poleMaterial = new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0xffffff });
  var poleMesh = new THREE.Mesh(poleGeometry, poleMaterial);
  poleMesh.position.x = 0;
  poleMesh.position.y = 0;
  // scene.add(poleMesh);

  const flag = new THREE.Object3D()
  flag.add(clothMeth)
  flag.add(poleMesh)
  flag.position.set(0, 290, 0)
  scene.add(flag)

  // -------------------------------------------------------------------------------------------------------------------------

  // const flag = Flag
  // flag.position.set(0, 1000, 1000)
  // scene.add(flag)

  animation()

  const startTime = new Date()

  function animation() {
    cloth.windSimulate(Date.now())
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
  }
}

class Cloth {
  constructor(segmentX, segmentY, distance, paramFunc, tgt) {
    this.segmentX = segmentX;
    this.segmentY = segmentY;
    this.distance = distance;
    this.paramFunc = paramFunc;
    this.tgt = tgt
    this.geometry = new THREE.ParametricGeometry(this.paramFunc, this.segmentX, this.segmentY);
    this.windForce = new THREE.Vector3(0, 0, 0);
    this.tmpForce = new THREE.Vector3();
    this.lastTime = null;
    this.particles = [];
    this.constrains = [];
    var u, v;
    for (v = 0; v <= this.segmentY; v++) {
      for (u = 0; u <= this.segmentX; u++) {
        this.particles.push(
          new ClothParticle(u / this.segmentX, v / this.segmentY, 0, 0.1, this.paramFunc, this.tgt)
        );
      }
    }
    for (v = 0; v < this.segmentY; v++) {
      for (u = 0; u < this.segmentX; u++) {
        this.constrains.push([
          this.particles[this.getIndex_(u, v)],
          this.particles[this.getIndex_(u, v + 1)],
          this.distance
        ]);
        this.constrains.push([
          this.particles[this.getIndex_(u, v)],
          this.particles[this.getIndex_(u + 1, v)],
          this.distance
        ]);
      }
    }
    for (u = this.segmentX, v = 0; v < this.segmentY; v++) {
      this.constrains.push([
        this.particles[this.getIndex_(u, v)],
        this.particles[this.getIndex_(u, v + 1)],
        this.distance
      ]);
    }
    for (v = this.segmentY, u = 0; u < this.segmentX; u++) {
      this.constrains.push([
        this.particles[this.getIndex_(u, v)],
        this.particles[this.getIndex_(u + 1, v)],
        this.distance
      ]);
    }
  };

  getGeometry() {
    return this.geometry;
  }

  windSimulate(time) {
    if (!this.lastTime) {
      this.lastTime = time;
      return;
    }
    this.windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(200);
    var i = 0, max;
    for (i = 0, max = this.particles.length; i < max; i = i + 1) {
      this.geometry.vertices[i].copy(this.particles[i].position);
    }
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();
    this.geometry.normalsNeedUpdate = true;
    this.geometry.verticesNeedUpdate = true;
    var faces = this.geometry.faces;
    for (i = 0, max = faces.length; i < max; i = i + 1) {
      this.tmpForce.copy(faces[i].normal).normalize().multiplyScalar(faces[i].normal.dot(this.windForce));
      this.particles[faces[i].a].addForce(this.tmpForce);
      this.particles[faces[i].b].addForce(this.tmpForce);
      this.particles[faces[i].c].addForce(this.tmpForce);
    }
    for (i = 0, max = this.particles.length; i < max; i = i + 1) {
      this.particles[i].addForce(new THREE.Vector3(0, -(981 * 1.4), 0).multiplyScalar(0.1));
      this.particles[i].integrate((18 / 1000) * (18 / 1000));
    }
    for (i = 0, max = this.constrains.length; i < max; i = i + 1) {
      this.satisifyConstrains_(this.constrains[i][0], this.constrains[i][1], this.constrains[i][2]);
    }
    for (i = 0, max = this.particles.length; i < max; i = i + 1) {
      if ((i % (this.segmentX + 1)) == 0) {
        this.particles[i].position.copy(this.particles[i].original);
        this.particles[i].previous.copy(this.particles[i].original);
      }
    }
  };

  getIndex_(u, v) {
    return u + v * (this.segmentX + 1);
  };

  satisifyConstrains_(p1, p2, distance) {
    var diff = new THREE.Vector3();
    diff.subVectors(p2.position, p1.position);
    var currentDist = diff.length();
    if (currentDist == 0) return;
    var correction = diff.multiplyScalar(1 - distance / currentDist);
    var correctionHalf = correction.multiplyScalar(0.5);
    p1.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
  };
}

class ClothParticle {
  constructor(x, y, z, mass, paramFunc, tgt) {
    this.position = paramFunc(x, y, tgt);
    this.previous = paramFunc(x, y, tgt);
    this.original = paramFunc(x, y, tgt);
    this.mass = 1 / mass;
    this.vector = new THREE.Vector3(0, 0, 0);
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();
  };

  addForce(force) {
    this.vector.add(
      this.tmp2.copy(force).multiplyScalar(this.mass)
    );
  };

  integrate(timesq) {
    var newPos = this.tmp.subVectors(this.position, this.previous);
    newPos.multiplyScalar(0.95).add(this.position);
    newPos.add(this.vector.multiplyScalar(timesq));
    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;
    this.vector.set(0, 0, 0);
  };
}
