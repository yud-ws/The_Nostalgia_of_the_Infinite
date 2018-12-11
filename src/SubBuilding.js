import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class SubBuilding extends THREE.Object3D {
  constructor() {
    super()

    this.material = new THREE.MeshPhongMaterial({ color: '#cd853f' })

    this.add(this.create())
  }

  create() {
    const building = new THREE.Object3D()
    building.name = 'sub building'

    const pillars = new THREE.Object3D()

    const pillar1 = this.createPillar()

    const pillar2 = pillar1.clone()
    pillar2.position.x = 40

    const pillar3 = pillar1.clone()
    pillar3.position.x = 80

    const pillar4 = pillar1.clone()
    pillar4.position.x = 120

    // pillar4までをクローンして四方を囲む"

    pillars.add(pillar1)
    pillars.add(pillar2)
    pillars.add(pillar3)
    pillars.add(pillar4)

    building.add(pillars)

    return building
  }

  createPillar() {
    const pillars = new THREE.Object3D()
    pillars.name = 'pillars'

    const pillar1 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 100, 10, 10, 200),
      this.material
    )
    pillar1.position.y = 50
    pillar1.position.x = -15
    pillar1.position.z = -5

    const pillar2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 100, 10, 10, 200),
      this.material
    )
    pillar2.position.y = 50
    pillar2.position.x = 15
    pillar2.position.z = -5

    const curveFace = new THREE.Object3D()

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-10, 100, 0),
      new THREE.Vector3(0, 120, 0),
      new THREE.Vector3(10, 100, 0)
    )
    const curvePoint = curve.getPoints(400)
    for (let i = 0; i < curvePoint.length; i++) {
      if (i > 0) {
        if (i < 200) {
          const curveVertices = [
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, 0),
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, 0),
            new THREE.Vector3(-20, curvePoint[i].y, 0),
            new THREE.Vector3(-20, curvePoint[i].y, -10),
            new THREE.Vector3(-20, curvePoint[i - 1].y, -10),
            new THREE.Vector3(-20, curvePoint[i - 1].y, 0),
          ]
          const geo = new THREE.ConvexGeometry(curveVertices)
          const mesh = new THREE.Mesh(geo, this.material)
          curveFace.add(mesh)
        } else if (i >= 200) {
          const curveVertices = [
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, 0),
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, 0),
            new THREE.Vector3(20, curvePoint[i].y, 0),
            new THREE.Vector3(20, curvePoint[i].y, -10),
            new THREE.Vector3(20, curvePoint[i - 1].y, -10),
            new THREE.Vector3(20, curvePoint[i - 1].y, 0),
          ]
          const geo = new THREE.ConvexGeometry(curveVertices)
          const mesh = new THREE.Mesh(geo, this.material)
          curveFace.add(mesh)
        }
      }
    }

    pillars.add(pillar1)
    pillars.add(pillar2)
    pillars.add(curveFace)

    return pillars
  }
}
