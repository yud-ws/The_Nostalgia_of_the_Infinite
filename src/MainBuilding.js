import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class MainBuilding extends THREE.Object3D {
  constructor() {
    super()

    this.towerHeight = 250
    this.tBW = 140 // towerBottomWidth
    this.tTW = 60 // towerTopWidth

    const tower = this.createBuilding()

    this.add(tower)
  }

  createTower() {
    const tower = new THREE.Object3D()
    const face1 = new THREE.Object3D()

    const windowY = 110
    const windowX1 = 17.6
    const windowX2 = 19.2

    const towertVertices1 = [
      new THREE.Vector3(-this.tBW / 2, 0, 0),
      new THREE.Vector3(this.tBW / 2, 0, 0),
      new THREE.Vector3(this.tBW / 2 - windowX1, windowY, -windowX1),
      new THREE.Vector3(-this.tBW / 2 + windowX1, windowY, -windowX1),
      // --------------------------------------------
      new THREE.Vector3(-this.tBW / 2 + 10, 0, -10),
      new THREE.Vector3(this.tBW / 2 - 10, 0, -10),
      new THREE.Vector3(this.tBW / 2 - 10 - windowX1, windowY, -10 - windowX1),
      new THREE.Vector3(-this.tBW / 2 + 10 + windowX1, windowY, -10 - windowX1),
    ]
    const geo1 = new THREE.ConvexGeometry(towertVertices1)
    const mesh1 = new THREE.Mesh(geo1, new THREE.MeshPhongMaterial({ color: '#ffffcc' }))

    const towertVertices2 = [
      new THREE.Vector3(-this.tBW / 2 + windowX1, windowY, -windowX1),
      new THREE.Vector3(-10, windowY, -windowX1),
      new THREE.Vector3(-10 + 2, windowY + 10, -windowX2),
      new THREE.Vector3(-this.tBW / 2 + windowX2, windowY + 10, -windowX2),
      // --------------------------------------------
      new THREE.Vector3(-this.tBW / 2 + windowX1 + 10, windowY, -10 - windowX1),
      new THREE.Vector3(-10, windowY, -10 - windowX1),
      new THREE.Vector3(-10 + 2, windowY + 10, -10 - windowX2),
      new THREE.Vector3(-this.tBW / 2 + windowX2 + 10, windowY + 10, -10 - windowX2),
    ]
    const geo2 = new THREE.ConvexGeometry(towertVertices2)
    const mesh2 = new THREE.Mesh(geo2, new THREE.MeshPhongMaterial({ color: '#ffffcc' }))

    const towertVertices3 = [
      new THREE.Vector3(this.tBW / 2 - windowX1, windowY, -windowX1),
      new THREE.Vector3(10, windowY, -windowX1),
      new THREE.Vector3(10 - 2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2, windowY + 10, -windowX2),
      // --------------------------------------------
      new THREE.Vector3(this.tBW / 2 - windowX1 - 10, windowY, -10 - windowX1),
      new THREE.Vector3(10, windowY, -10 - windowX1),
      new THREE.Vector3(10 - 2, windowY + 10, -10 - windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2 - 10, windowY + 10, -10 - windowX2),
    ]
    const geo3 = new THREE.ConvexGeometry(towertVertices3)
    const mesh3 = new THREE.Mesh(geo3, new THREE.MeshPhongMaterial({ color: '#ffffcc' }))

    const towertVertices4 = [
      new THREE.Vector3(-this.tBW / 2 + windowX2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -40),
      // ----------------------------------------------
      new THREE.Vector3(-this.tBW / 2 + windowX2 + 10, windowY + 10, - 10 - windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2 - 10, windowY + 10, -10 - windowX2),
      new THREE.Vector3(this.tTW / 2 - 10, this.towerHeight, -50),
      new THREE.Vector3(-this.tTW / 2 + 10, this.towerHeight, -50),
    ]
    const geo4 = new THREE.ConvexGeometry(towertVertices4)
    const mesh4 = new THREE.Mesh(geo4, new THREE.MeshPhongMaterial({ color: '#ffffcc' }))

    const vertices5 = [
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -100),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -100),
    ]
    const geo5 = new THREE.ConvexGeometry(vertices5)
    const face5 = new THREE.Mesh(geo5, new THREE.MeshPhongMaterial({ color: '#ffffcc' }))

    face1.add(mesh1)
    face1.add(mesh2)
    face1.add(mesh3)
    face1.add(mesh4)

    const face2 = face1.clone()
    face2.rotation.y = -Math.PI / 2
    face2.position.x = -this.tBW / 2
    face2.position.z = -this.tBW / 2

    const face3 = face1.clone()
    face3.rotation.y = Math.PI / 2
    face3.position.x = this.tBW / 2
    face3.position.z = -this.tBW / 2

    const face4 = face1.clone()
    face4.rotation.y = Math.PI
    face4.position.z = -this.tBW

    tower.add(face1)
    tower.add(face2)
    tower.add(face3)
    tower.add(face4)
    tower.add(face5)

    return tower
  }

  createBuilding() {
    const building = new THREE.Object3D()

    // const testV = [
    //   new THREE.Vector3(-50, 0, 0),
    //   new THREE.Vector3(50, 0, 0),
    //   new THREE.Vector3(25, 200, 0),
    //   new THREE.Vector3(-25, 200, 0),
    // ]
    // const testGeo = new THREE.ConvexGeometry(testV)
    // const testMesh = new THREE.Mesh(testGeo, new THREE.MeshPhongMaterial({ color: '#ffffff' }))
    // testMesh.position.y = 20

    const under1 = new THREE.Object3D()

    const mesh1 = new THREE.Mesh(
      new THREE.BoxGeometry(170, 30, 170),
      new THREE.MeshPhongMaterial({ color: '#fff000' })
    )

    under1.add(mesh1)
    under1.position.y = 85
    under1.position.z = -70

    const tower = this.createTower()
    tower.position.y = 100
    building.add(tower)
    building.add(under1)

    return building
  }
}
