import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js'
import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'
import MainBuilding from './MainBuilding'

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
  camera.position.set(0, 50, 150)

  const controls = new THREE.OrbitControls(camera)

  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight('#ffffff')
  light.intensity = 2
  light.position.set(1, 1, 1)
  scene.add(light)

  /*
  const amb = new THREE.AmbientLight('#464646')
  scene.add(amb)
  */

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100000, 100000),
    new THREE.MeshPhongMaterial({ color: 0xe9967a })
  )
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // const building = new MainBuilding()
  // building.position.z = 50

  const tri = createFlag()

  scene.add(tri)
  console.log(tri)

  // console.log('test', building.children[0].children[0].children[7].children[1].children[80].children[0].children[1].children)

  // const triVertices = building.children[0].children[0].children[7].children[1].children[80].children[0].children[1].children

  animation()

  const startTime = new Date()

  function animation() {
    const time = (new Date - startTime) / 1000
    for (let i = 0; i < tri.children.length; i++) {
      const vs = tri.children[i].geometry.vertices
      console.log('vs', vs)
      for (let k = 0; k < vs.length; k++) {
        const v = vs[k]
        v.z = 1 * Math.sin(-i / 2 + time * 15)
      }
    }
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
  }
}

function createFlag() {
  const flags = new THREE.Object3D()
  flags.name = 'flags'

  const flag1 = new THREE.Object3D()
  flag1.name = 'flag1'

  const tri = new THREE.Object3D()
  tri.name = 'tri'

  const x = []
  const y = []
  for (let i = 0; i < 36; i++) {
    x.push(i)
    y.push(1 / 7 * i)
  }

  for (let i = 0; i < x.length; i++) {
    if (i !== 0) {
      const v = [
        new THREE.Vector3(x[i], 50 - y[i], 0),
        new THREE.Vector3(x[i], 40 + y[i], 0),
        new THREE.Vector3(x[i - 1], 50 - y[i - 1], 0),
        new THREE.Vector3(x[i - 1], 40 + y[i - 1], 0),
      ]
      const geo = new THREE.ConvexGeometry(v)
      geo.verticesNeedUpdate = true
      const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: '#ffd700' }))
      mesh.name = 'mesh' + i
      mesh.rotation.y = Math.PI
      tri.add(mesh)
    }
  }

  // flags.add(tri)

  return tri
}
