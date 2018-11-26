import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class MainBuilding extends THREE.Object3D {
  constructor() {
    super()

    this.towerHeight = 200
    this.tBW = 100 // towerBottomWidth
    this.tTW = 50 // towerTopWidth

    const tower = this.createBuilding()

    this.add(tower)
  }

  createBuilding() {
    const building = new THREE.Object3D()

    const testV = [
      new THREE.Vector3(-50, 0, 0),
      new THREE.Vector3(50, 0, 0),
      new THREE.Vector3(25, 200, 0),
      new THREE.Vector3(-25, 200, 0),
    ]
    const testGeo = new THREE.ConvexGeometry(testV)
    const testMesh = new THREE.Mesh(testGeo, new THREE.MeshPhongMaterial({ color: '#ffffff' }))
    testMesh.position.y = 20
    // const tower = new THREE.Mesh(
    //   new THREE.CylinderGeometry(20, 40, 150, 4, 1, false),
    //   new THREE.MeshPhongMaterial({ color: '#ffffff' })
    // )
    // tower.position.y = 185

    // const under1 = new THREE.Mesh(
    //   new THREE.BoxGeometry(100, 30, 100),
    //   new THREE.MeshPhongMaterial({ color: '#ffff00' })
    // )
    // under1.position.y = 85

    // const under2 = new THREE.Mesh(
    //   new THREE.BoxGeometry(120, 30, 120),
    //   new THREE.MeshPhongMaterial({ color: '#ff0000' })
    // )
    // under2.position.y = 30

    const tower = new THREE.Object3D()

    const towertVertices1 = [
      new THREE.Vector3(-this.tBW / 2, 0, 0),
      new THREE.Vector3(this.tBW / 2, 0, 0),
      new THREE.Vector3(this.tBW / 2 - 10, 80, 0),
      new THREE.Vector3(-this.tBW / 2 + 10, 80, 0),
      new THREE.Vector3(-this.tBW / 2, 0, -10),
      new THREE.Vector3(this.tBW / 2, 0, -10),
      new THREE.Vector3(this.tBW / 2 - 10, 80, -10),
      new THREE.Vector3(-this.tBW / 2 + 10, 80, -10),
    ]
    const geo1 = new THREE.ConvexGeometry(towertVertices1)
    const mesh1 = new THREE.Mesh(geo1, new THREE.MeshPhongMaterial({ color: '#ffffff' }))

    const towertVertices2 = [
      new THREE.Vector3(-this.tBW / 2 + 10, 80, 0),
      new THREE.Vector3(-8, 80, 0),
      new THREE.Vector3(-7, 90, 0),
      new THREE.Vector3(-this.tBW / 2 + 11.25, 90, 0),
      new THREE.Vector3(-this.tBW / 2 + 10, 80, -10),
      new THREE.Vector3(-8, 80, -10),
      new THREE.Vector3(-7, 90, -10),
      new THREE.Vector3(-this.tBW / 2 + 11.25, 90, -10),
    ]
    const geo2 = new THREE.ConvexGeometry(towertVertices2)
    const mesh2 = new THREE.Mesh(geo2, new THREE.MeshPhongMaterial({ color: '#ffff00' }))

    const towertVertices3 = [
      new THREE.Vector3(this.tBW / 2 - 10, 80, 0),
      new THREE.Vector3(8, 80, 0),
      new THREE.Vector3(7, 90, 0),
      new THREE.Vector3(this.tBW / 2 - 11.25, 90, 0),
      new THREE.Vector3(this.tBW / 2 - 10, 80, -10),
      new THREE.Vector3(8, 80, -10),
      new THREE.Vector3(7, 90, -10),
      new THREE.Vector3(this.tBW / 2 - 11.25, 90, -10),
    ]
    const geo3 = new THREE.ConvexGeometry(towertVertices3)
    const mesh3 = new THREE.Mesh(geo3, new THREE.MeshPhongMaterial({ color: '#ffff00' }))

    const towertVertices4 = [
      new THREE.Vector3(-this.tBW / 2 + 11.25, 90, 0),
      new THREE.Vector3(this.tBW / 2 - 11.25, 90, 0),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, 0),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, 0),
      new THREE.Vector3(-this.tBW / 2 + 11.25, 90, -10),
      new THREE.Vector3(this.tBW / 2 - 11.25, 90, -10),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -10),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -10),
    ]
    const geo4 = new THREE.ConvexGeometry(towertVertices4)
    const mesh4 = new THREE.Mesh(geo4, new THREE.MeshPhongMaterial({ color: '#ffffff' }))

    tower.add(mesh1)
    tower.add(mesh2)
    tower.add(mesh3)
    tower.add(mesh4)

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(5, 5, 5),
      new THREE.MeshPhongMaterial({ color: '#ffffff' })
    )
    box.position.x = -20
    box.position.z = -80

    building.add(tower)
    building.add(box)

    return building
  }
}
