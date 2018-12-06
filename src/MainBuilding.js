import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class MainBuilding extends THREE.Object3D {
  constructor() {
    super()

    this.towerHeight = 250
    this.tBW = 140 // towerBottomWidth
    this.tTW = 60 // towerTopWidth

    this.material = new THREE.MeshPhongMaterial({ color: '#cd853f' })
    this.roofMaterial = new THREE.MeshPhongMaterial({ color: '#ff0000' })

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
    const mesh1 = new THREE.Mesh(geo1, this.material)

    const towertVertices2 = [
      new THREE.Vector3(-this.tBW / 2 + windowX1, windowY, -windowX1),
      new THREE.Vector3(-10, windowY, -windowX1),
      new THREE.Vector3(-10 + 2, windowY + 10, -windowX2),
      new THREE.Vector3(-this.tBW / 2 + windowX2, windowY + 10, -windowX2),
      // --------------------------------------------
      new THREE.Vector3(-this.tBW / 2 + windowX1 + 10, windowY, -10 - windowX1),
      new THREE.Vector3(-10, windowY, -10 - windowX1),
      new THREE.Vector3(-10 + 2, windowY + 10, -10 - windowX2),
      new THREE.Vector3(
        -this.tBW / 2 + windowX2 + 10,
        windowY + 10,
        -10 - windowX2
      ),
    ]
    const geo2 = new THREE.ConvexGeometry(towertVertices2)
    const mesh2 = new THREE.Mesh(geo2, this.material)

    const towertVertices3 = [
      new THREE.Vector3(this.tBW / 2 - windowX1, windowY, -windowX1),
      new THREE.Vector3(10, windowY, -windowX1),
      new THREE.Vector3(10 - 2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2, windowY + 10, -windowX2),
      // --------------------------------------------
      new THREE.Vector3(this.tBW / 2 - windowX1 - 10, windowY, -10 - windowX1),
      new THREE.Vector3(10, windowY, -10 - windowX1),
      new THREE.Vector3(10 - 2, windowY + 10, -10 - windowX2),
      new THREE.Vector3(
        this.tBW / 2 - windowX2 - 10,
        windowY + 10,
        -10 - windowX2
      ),
    ]
    const geo3 = new THREE.ConvexGeometry(towertVertices3)
    const mesh3 = new THREE.Mesh(geo3, this.material)

    const towertVertices4 = [
      new THREE.Vector3(-this.tBW / 2 + windowX2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tBW / 2 - windowX2, windowY + 10, -windowX2),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -40),
      // ----------------------------------------------
      new THREE.Vector3(
        -this.tBW / 2 + windowX2 + 10,
        windowY + 10,
        -10 - windowX2
      ),
      new THREE.Vector3(
        this.tBW / 2 - windowX2 - 10,
        windowY + 10,
        -10 - windowX2
      ),
      new THREE.Vector3(this.tTW / 2 - 10, this.towerHeight, -50),
      new THREE.Vector3(-this.tTW / 2 + 10, this.towerHeight, -50),
    ]
    const geo4 = new THREE.ConvexGeometry(towertVertices4)
    const mesh4 = new THREE.Mesh(geo4, this.material)

    const vertices5 = [
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -100),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -100),
    ]
    const geo5 = new THREE.ConvexGeometry(vertices5)
    const face5 = new THREE.Mesh(geo5, this.material)

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

    const roofs = new THREE.Object3D()

    const roof1 = this.createRoof(127.2, 40, 'top')

    roofs.add(roof1)

    tower.add(face1)
    tower.add(face2)
    tower.add(face3)
    tower.add(face4)
    tower.add(face5)
    tower.add(roofs)

    return tower
  }

  createUnder1() {
    const under1 = new THREE.Object3D()

    const face1 = new THREE.Object3D()

    const vertices1 = [
      new THREE.Vector3(-this.tBW / 2 - 20, 60, 0),
      new THREE.Vector3(this.tBW / 2 + 20, 60, 0),
      new THREE.Vector3(this.tBW / 2 + 20, 20, 0),
      new THREE.Vector3(-this.tBW / 2 - 20, 20, 0),
      new THREE.Vector3(-this.tBW / 2 - 20, 60, -10),
      new THREE.Vector3(this.tBW / 2 + 20, 60, -10),
      new THREE.Vector3(this.tBW / 2 + 20, 20, -10),
      new THREE.Vector3(-this.tBW / 2 - 20, 20, -10),
    ]
    const geo1 = new THREE.ConvexGeometry(vertices1)
    const mesh1 = new THREE.Mesh(geo1, this.material)

    const vertices2 = [
      new THREE.Vector3(-this.tBW / 2 - 20, 20, 0),
      new THREE.Vector3(-15, 20, 0),
      new THREE.Vector3(-15, 0, 0),
      new THREE.Vector3(-this.tBW / 2 - 20, 0, 0),
      new THREE.Vector3(-this.tBW / 2 - 20, 20, -10),
      new THREE.Vector3(-15, 20, -10),
      new THREE.Vector3(-15, 0, -10),
      new THREE.Vector3(-this.tBW / 2 - 20, 0, -10),
    ]
    const geo2 = new THREE.ConvexGeometry(vertices2)
    const mesh2 = new THREE.Mesh(geo2, this.material)

    const vertices3 = [
      new THREE.Vector3(this.tBW / 2 + 20, 20, 0),
      new THREE.Vector3(15, 20, 0),
      new THREE.Vector3(15, 0, 0),
      new THREE.Vector3(this.tBW / 2 + 20, 0, 0),
      new THREE.Vector3(this.tBW / 2 + 20, 20, -10),
      new THREE.Vector3(15, 20, -10),
      new THREE.Vector3(15, 0, -10),
      new THREE.Vector3(this.tBW / 2 + 20, 0, -10),
    ]
    const geo3 = new THREE.ConvexGeometry(vertices3)
    const mesh3 = new THREE.Mesh(geo3, this.material)

    face1.add(mesh1)
    face1.add(mesh2)
    face1.add(mesh3)

    const face2 = face1.clone()
    face2.rotation.y = Math.PI / 2
    face2.position.x = this.tBW / 2 + 20 + 10
    face2.position.z = -this.tBW / 2 - 20 - 10

    const face3 = face1.clone()
    face3.rotation.y = Math.PI / 2
    face3.position.x = -this.tBW / 2 - 20
    face3.position.z = -this.tBW / 2 - 20 - 10

    const face4 = face1.clone()
    face4.position.z = -this.tBW - 20 - 30

    const stick1 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 60, 10),
      this.material
    )

    const stick2 = stick1.clone()
    const stick3 = stick1.clone()
    const stick4 = stick1.clone()

    stick1.position.x = this.tBW / 2 + 20 + 5
    stick1.position.y = 30
    stick1.position.z = -5

    stick2.position.x = -this.tBW / 2 - 20 - 5
    stick2.position.y = 30
    stick2.position.z = -5

    stick3.position.x = -this.tBW / 2 - 20 - 5
    stick3.position.y = 30
    stick3.position.z = -this.tBW - 20 - 35

    stick4.position.x = this.tBW / 2 + 20 + 5
    stick4.position.y = 30
    stick4.position.z = -this.tBW - 20 - 35

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(this.tBW + 40, 10, this.tBW + 40),
      this.material
    )
    top.position.y = 55
    top.position.z = -this.tBW / 2 - 20 - 10

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(this.tBW + 40 + 20, 10, this.tBW + 40 + 20),
      this.material
    )
    bottom.position.y = -5
    bottom.position.z = -this.tBW / 2 - 20 - 10

    const roofs = new THREE.Object3D()

    const roof1 = this.createRoof(this.tBW + 40, 60)

    const roof2 = roof1.clone()
    const roof3 = roof1.clone()
    const roof4 = roof1.clone()

    roof2.rotation.y = Math.PI / 2
    roof2.position.x = this.tBW / 2 + 20 + 10
    roof2.position.z = -this.tBW / 2 - 20 - 10

    roof3.rotation.y = -Math.PI / 2
    roof3.position.x = -this.tBW / 2 - 20 - 10
    roof3.position.z = -this.tBW / 2 - 20 - 10

    roof4.rotation.y = Math.PI
    roof4.position.z = -this.tBW - 20 - 40

    roofs.add(roof1)
    roofs.add(roof2)
    roofs.add(roof3)
    roofs.add(roof4)

    under1.add(face1)
    under1.add(face2)
    under1.add(face3)
    under1.add(face4)
    under1.add(stick1)
    under1.add(stick2)
    under1.add(stick3)
    under1.add(stick4)
    under1.add(top)
    under1.add(bottom)
    under1.add(roofs)

    return under1
  }

  createUnder2() {
    const under2 = new THREE.Object3D()

    const face1 = new THREE.Object3D()

    const curveFace = new THREE.Object3D()

    const vertices1 = [
      new THREE.Vector3(-this.tBW / 2 - 40, 70, 0),
      new THREE.Vector3(this.tBW / 2 + 40, 70, 0),
      new THREE.Vector3(this.tBW / 2 + 40, 40, 0),
      new THREE.Vector3(-this.tBW / 2 - 40, 40, 0),
      new THREE.Vector3(-this.tBW / 2 - 40, 70, -10),
      new THREE.Vector3(this.tBW / 2 + 40, 70, -10),
      new THREE.Vector3(this.tBW / 2 + 40, 40, -10),
      new THREE.Vector3(-this.tBW / 2 - 40, 40, -10),
    ]
    const geo1 = new THREE.ConvexGeometry(vertices1)
    const mesh1 = new THREE.Mesh(geo1, this.material)

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-15, 0, 0),
      new THREE.Vector3(0, 20, 0),
      new THREE.Vector3(15, 0, 0)
    )
    const curvePoint = curve.getPoints(40)
    for (let i = 0; i < curvePoint.length; i++) {
      if (i > 0) {
        if (i < 20) {
          const curveVertices = [
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, 0),
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, 0),
            new THREE.Vector3(-this.tBW / 2 - 40, curvePoint[i].y, 0),
            new THREE.Vector3(-this.tBW / 2 - 40, curvePoint[i].y, -10),
            new THREE.Vector3(-this.tBW / 2 - 40, curvePoint[i - 1].y, -10),
            new THREE.Vector3(-this.tBW / 2 - 40, curvePoint[i - 1].y, 0),
          ]
          const geo = new THREE.ConvexGeometry(curveVertices)
          const mesh = new THREE.Mesh(geo, this.material)
          curveFace.add(mesh)
        } else if (i >= 20) {
          const curveVertices = [
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, 0),
            new THREE.Vector3(curvePoint[i].x, curvePoint[i].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, -10),
            new THREE.Vector3(curvePoint[i - 1].x, curvePoint[i - 1].y, 0),
            new THREE.Vector3(this.tBW / 2 + 40, curvePoint[i].y, 0),
            new THREE.Vector3(this.tBW / 2 + 40, curvePoint[i].y, -10),
            new THREE.Vector3(this.tBW / 2 + 40, curvePoint[i - 1].y, -10),
            new THREE.Vector3(this.tBW / 2 + 40, curvePoint[i - 1].y, 0),
          ]
          const geo = new THREE.ConvexGeometry(curveVertices)
          const mesh = new THREE.Mesh(geo, this.material)
          curveFace.add(mesh)
        }
      }
    }
    curveFace.position.y = 30

    const vertices2 = [
      new THREE.Vector3(-this.tBW / 2 - 40, 30, 0),
      new THREE.Vector3(-15, 30, 0),
      new THREE.Vector3(-15, 0, 0),
      new THREE.Vector3(-this.tBW / 2 - 40, 0, 0),
      new THREE.Vector3(-this.tBW / 2 - 40, 30, -10),
      new THREE.Vector3(-15, 30, -10),
      new THREE.Vector3(-15, 0, -10),
      new THREE.Vector3(-this.tBW / 2 - 40, 0, -10),
    ]
    const geo2 = new THREE.ConvexGeometry(vertices2)
    const mesh2 = new THREE.Mesh(geo2, this.material)

    const vertices3 = [
      new THREE.Vector3(this.tBW / 2 + 40, 30, 0),
      new THREE.Vector3(15, 30, 0),
      new THREE.Vector3(15, 0, 0),
      new THREE.Vector3(this.tBW / 2 + 40, 0, 0),
      new THREE.Vector3(this.tBW / 2 + 40, 30, -10),
      new THREE.Vector3(15, 30, -10),
      new THREE.Vector3(15, 0, -10),
      new THREE.Vector3(this.tBW / 2 + 40, 0, -10),
    ]
    const geo3 = new THREE.ConvexGeometry(vertices3)
    const mesh3 = new THREE.Mesh(geo3, this.material)

    face1.add(mesh1)
    face1.add(mesh2)
    face1.add(mesh3)
    face1.add(curveFace)

    const face2 = face1.clone()
    face2.rotation.y = Math.PI / 2
    face2.position.x = this.tBW / 2 + 40 + 10
    face2.position.z = -this.tBW / 2 - 40 - 10

    const face3 = face1.clone()
    face3.rotation.y = Math.PI / 2
    face3.position.x = -this.tBW / 2 - 40
    face3.position.z = -this.tBW / 2 - 40 - 10

    const face4 = face1.clone()
    face4.position.z = -this.tBW - 40 - 50

    const stick1 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 70, 10),
      this.material
    )

    const stick2 = stick1.clone()
    const stick3 = stick1.clone()
    const stick4 = stick1.clone()

    stick1.position.x = this.tBW / 2 + 40 + 5
    stick1.position.y = 35
    stick1.position.z = -5

    stick2.position.x = -this.tBW / 2 - 40 - 5
    stick2.position.y = 35
    stick2.position.z = -5

    stick3.position.x = -this.tBW / 2 - 40 - 5
    stick3.position.y = 35
    stick3.position.z = -this.tBW - 40 - 55

    stick4.position.x = this.tBW / 2 + 40 + 5
    stick4.position.y = 35
    stick4.position.z = -this.tBW - 40 - 55

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(-this.tBW - 40 - 40, 10, -this.tBW - 40 - 40),
      this.material
    )
    top.position.y = 65
    top.position.z = -this.tBW / 2 - 40 - 10

    const roofs = new THREE.Object3D()

    const roof1 = this.createRoof(this.tBW + 80, 70)

    const roof2 = roof1.clone()
    const roof3 = roof1.clone()
    const roof4 = roof1.clone()

    roof2.rotation.y = Math.PI / 2
    roof2.position.x = this.tBW / 2 + 40 + 10
    roof2.position.z = -this.tBW / 2 - 40 - 10

    roof3.rotation.y = -Math.PI / 2
    roof3.position.x = -this.tBW / 2 - 40 - 10
    roof3.position.z = -this.tBW / 2 - 40 - 10

    roof4.rotation.y = Math.PI
    roof4.position.z = -this.tBW - 40 - 60

    roofs.add(roof1)
    roofs.add(roof2)
    roofs.add(roof3)
    roofs.add(roof4)

    under2.add(face1)
    under2.add(face2)
    under2.add(face3)
    under2.add(face4)
    under2.add(top)
    under2.add(stick1)
    under2.add(stick2)
    under2.add(stick3)
    under2.add(stick4)
    under2.add(roofs)

    return under2
  }

  createRoof(w, h, state = 'under') {
    let vertices
    if (state === 'top') {
      vertices = [
        new THREE.Vector3(w / 2, h, 0),
        new THREE.Vector3(w / 2, h + 5, 0),
        new THREE.Vector3(-w / 2, h + 5, 0),
        new THREE.Vector3(-w / 2, h, 0),
        new THREE.Vector3(w / 2 + 15, h, 15),
        new THREE.Vector3(-w / 2 - 15, h, 15),
      ]
    } else {
      vertices = [
        new THREE.Vector3(w / 2 + 10, h, 0),
        new THREE.Vector3(w / 2 + 10, h + 5, 0),
        new THREE.Vector3(-w / 2 - 10, h + 5, 0),
        new THREE.Vector3(-w / 2 - 10, h, 0),
        new THREE.Vector3(w / 2 + 25, h, 15),
        new THREE.Vector3(-w / 2 - 25, h, 15),
      ]
    }

    const geo = new THREE.ConvexGeometry(vertices)
    const roof = new THREE.Mesh(geo, this.roofMaterial)

    return roof
  }

  createBuilding() {
    const building = new THREE.Object3D()

    const tower = this.createTower()
    tower.position.y = 140
    tower.position.z = -50

    const under1 = this.createUnder1()
    under1.position.y = 80
    under1.position.z = -20

    const under2 = this.createUnder2()
    under2.position.z = 0

    building.add(tower)
    building.add(under1)
    building.add(under2)

    return building
  }
}
