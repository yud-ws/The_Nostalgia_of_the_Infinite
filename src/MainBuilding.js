import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class MainBuilding extends THREE.Object3D {
  constructor() {
    super()
    const tower = this.createBuilding()

    this.add(tower)
  }

  createBuilding() {
    const building = new THREE.Object3D()
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(20, 40, 100, 4, 1, false),
      new THREE.MeshPhongMaterial({ color: '#ffffff' })
    )
    tower.position.y = 50
    building.add(tower)
    return building
  }
}
