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

    const building = this.createBuilding()

    this.add(building)

    this.castShadow = true
    this.receiveShadow = true
  }

  createTower() {
    const tower = new THREE.Object3D()
    tower.name = 'tower'

    const face1 = new THREE.Object3D()
    face1.name = 'tower face1'

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
    mesh1.castShadow = true
    mesh1.receiveShadow = true

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
    mesh2.castShadow = true
    mesh2.receiveShadow = true

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
    mesh3.castShadow = true
    mesh3.receiveShadow = true

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
    mesh4.castShadow = true
    mesh4.receiveShadow = true

    const vertices5 = [
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -40),
      new THREE.Vector3(-this.tTW / 2, this.towerHeight, -100),
      new THREE.Vector3(this.tTW / 2, this.towerHeight, -100),
    ]
    const geo5 = new THREE.ConvexGeometry(vertices5)
    const face5 = new THREE.Mesh(geo5, this.material)
    face5.castShadow = true
    face5.receiveShadow = true

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
    roofs.name = 'tower roof'

    const roof1 = this.createRoof(124, 50, 'top')

    const roof2 = roof1.clone()
    const roof3 = roof1.clone()
    const roof4 = roof1.clone()

    roof2.rotation.y = Math.PI / 2
    roof2.position.x = 124 / 2 + 10 - 2.5
    roof2.position.z = -124 / 2 - 8

    roof3.rotation.y = -Math.PI / 2
    roof3.position.x = -124 / 2 - 10 + 2.5
    roof3.position.z = -124 / 2 - 8

    roof4.rotation.y = Math.PI
    roof4.position.z = -124 - 8 - 7.5

    roofs.add(roof1)
    roofs.add(roof2)
    roofs.add(roof3)
    roofs.add(roof4)

    const pillars = new THREE.Object3D()
    pillars.name = 'tower pillars'

    const pillars1 = new THREE.Object3D()
    pillars1.name = 'tower pillars1'
    let x = -this.tBW / 2 - 10 + 22.86
    for (let i = 0; i < 6; i++) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 50, 36),
        this.material
      )
      pillar.castShadow = true
      pillar.receiveShadow = true
      pillar.position.x = x
      pillar.position.y = 25
      pillar.position.z = 10
      x += 22.86
      pillars1.add(pillar)
    }

    const pillars2 = pillars1.clone()
    pillars2.rotation.y = Math.PI / 2
    pillars2.position.x = x - 10
    pillars2.position.z = -this.tBW / 2

    const pillars3 = pillars2.clone()
    pillars3.position.x = -x - 10

    const pillars4 = pillars1.clone()
    pillars4.position.z = -this.tBW - 20

    const p1 = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 50, 36),
      this.material
    )
    p1.castShadow = true
    p1.receiveShadow = true
    const p2 = p1.clone()
    const p3 = p1.clone()
    const p4 = p1.clone()

    p1.position.x = x
    p1.position.y = 25
    p1.position.z = 10

    p2.position.x = -x
    p2.position.y = 25
    p2.position.z = 10

    p3.position.x = -x
    p3.position.y = 25
    p3.position.z = -this.tBW - 10

    p4.position.x = x
    p4.position.y = 25
    p4.position.z = -this.tBW - 10

    pillars.add(pillars1)
    pillars.add(pillars2)
    pillars.add(pillars3)
    pillars.add(pillars4)
    pillars.add(p1)
    pillars.add(p2)
    pillars.add(p3)
    pillars.add(p4)

    const top = this.createTop()

    tower.add(face1)
    tower.add(face2)
    tower.add(face3)
    tower.add(face4)
    tower.add(face5)
    tower.add(roofs)
    tower.add(pillars)
    tower.add(top)

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
    mesh1.castShadow = true
    mesh1.receiveShadow = true

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
    mesh2.castShadow = true
    mesh2.receiveShadow = true

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
    mesh3.castShadow = true
    mesh3.receiveShadow = true

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
    stick1.castShadow = true
    stick1.receiveShadow = true

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
    top.castShadow = true
    top.receiveShadow = true
    top.position.y = 55
    top.position.z = -this.tBW / 2 - 20 - 10

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(this.tBW + 40 + 20, 10, this.tBW + 40 + 20),
      this.material
    )
    bottom.castShadow = true
    bottom.receiveShadow = true
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
    under2.name = 'under2'

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
    mesh1.castShadow = true
    mesh1.receiveShadow = true

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
          mesh.castShadow = true
          mesh.receiveShadow = true
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
          mesh.castShadow = true
          mesh.receiveShadow = true
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
    mesh2.castShadow = true
    mesh2.receiveShadow = true

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
    mesh3.castShadow = true
    mesh3.receiveShadow = true

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
    stick1.castShadow = true
    stick1.receiveShadow = true

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
    top.castShadow = true
    top.receiveShadow = true
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

    const pillars = new THREE.Object3D()

    const pillars1 = new THREE.Object3D()
    let x = -this.tBW / 2 - 40 - 20 + 32.5
    for (let i = 0; i < 7; i++) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 70, 36),
        this.material
      )
      pillar.castShadow = true
      pillar.receiveShadow = true
      pillar.position.x = x
      pillar.position.y = 35
      pillar.position.z = 10
      x += 32.5
      pillars1.add(pillar)
    }

    const pillars2 = pillars1.clone()
    pillars2.rotation.y = Math.PI / 2
    pillars2.position.x = x - 10
    pillars2.position.z = -this.tBW / 2 - 40 - 10

    const pillars3 = pillars2.clone()
    pillars3.position.x = -x - 10

    const pillars4 = pillars1.clone()
    pillars4.position.z = -this.tBW - 80 - 40

    const p1 = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 70, 36),
      this.material
    )
    p1.castShadow = true
    p1.receiveShadow = true
    p1.position.x = x
    p1.position.y = 35
    p1.position.z = 10

    const p2 = p1.clone()
    p2.position.x = -x

    const p3 = p2.clone()
    p3.position.z = -this.tBW - 80 - 30

    const p4 = p3.clone()
    p4.position.x = x

    pillars.add(pillars1)
    pillars.add(pillars2)
    pillars.add(pillars3)
    pillars.add(pillars4)
    pillars.add(p1)
    pillars.add(p2)
    pillars.add(p3)
    pillars.add(p4)

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
    under2.add(pillars)

    return under2
  }

  createRoof(w, h, state = 'under') {
    let vertices
    if (state === 'top') {
      vertices = [
        new THREE.Vector3(w / 2, h, -8),
        new THREE.Vector3(w / 2, h + 5, -8),
        new THREE.Vector3(-w / 2, h + 5, -8),
        new THREE.Vector3(-w / 2, h, -8),
        new THREE.Vector3(w / 2 + 30, h, -8 + 30),
        new THREE.Vector3(-w / 2 - 30, h, -8 + 30),
      ]
    } else {
      vertices = [
        new THREE.Vector3(w / 2 + 10, h, 0),
        new THREE.Vector3(w / 2 + 10, h + 5, 0),
        new THREE.Vector3(-w / 2 - 10, h + 5, 0),
        new THREE.Vector3(-w / 2 - 10, h, 0),
        new THREE.Vector3(w / 2 + 30, h, 20),
        new THREE.Vector3(-w / 2 - 30, h, 20),
      ]
    }

    const geo = new THREE.ConvexGeometry(vertices)
    const roof = new THREE.Mesh(geo, this.roofMaterial)
    roof.castShadow = true
    roof.receiveShadow = true

    return roof
  }

  createTop() {
    const top = new THREE.Object3D()
    top.name = 'top'

    const pillars = new THREE.Object3D()
    pillars.name = 'top pillars'

    const pillars1 = new THREE.Object3D()
    pillars1.name = 'top pillars1'
    let x = -this.tTW / 2 + 4 + 13
    for (let i = 0; i < 3; i++) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 40, 36),
        this.material
      )
      pillar.castShadow = true
      pillar.receiveShadow = true
      pillar.position.x = x
      pillar.position.y = 270
      pillar.position.z = -44
      x += 13
      pillars1.add(pillar)
    }

    const pillars2 = pillars1.clone()
    pillars2.rotation.y = Math.PI / 2
    pillars2.position.x = this.tTW + 10
    pillars2.position.z = -this.tTW - 10

    const pillars3 = pillars2.clone()
    pillars3.position.x = 17.3

    const pillars4 = pillars1.clone()
    pillars4.position.z = -this.tTW + 7.3

    const p1 = new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 40, 36),
      this.material
    )
    p1.castShadow = true
    p1.receiveShadow = true
    p1.position.x = x
    p1.position.y = 270
    p1.position.z = -44

    const p2 = p1.clone()
    p2.position.x = -this.tTW / 2 + 4

    const p3 = p2.clone()
    p3.position.z = -this.tTW - 36.7

    const p4 = p3.clone()
    p4.position.x = x

    pillars.add(pillars1)
    pillars.add(pillars2)
    pillars.add(pillars3)
    pillars.add(pillars4)
    pillars.add(p1)
    pillars.add(p2)
    pillars.add(p3)
    pillars.add(p4)

    const curve1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-this.tTW / 2, 0, 0),
      new THREE.Vector3(0, 60, -this.tTW / 2),
      new THREE.Vector3(this.tTW / 2, 0, -this.tTW)
    )
    const curvePoint1 = curve1.getPoints(40)

    const curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(this.tTW / 2, 0, 0),
      new THREE.Vector3(0, 60, -this.tTW / 2),
      new THREE.Vector3(-this.tTW / 2, 0, -this.tTW)
    )
    const curvePoint2 = curve2.getPoints(40)
    // console.log(curvePoint1)

    const head = new THREE.Object3D()
    head.name = 'top head'

    for (let i = 0; i < curvePoint1.length; i++) {
      if (i !== 0) {
        const vs = [
          new THREE.Vector3(curvePoint1[i].x, curvePoint1[i].y, curvePoint1[i].z),
          new THREE.Vector3(curvePoint2[i].x, curvePoint2[i].y, curvePoint2[i].z),
          new THREE.Vector3(curvePoint1[i - 1].x, curvePoint1[i - 1].y, curvePoint1[i - 1].z),
          new THREE.Vector3(curvePoint2[i - 1].x, curvePoint2[i - 1].y, curvePoint2[i - 1].z),
        ]
        const geo = new THREE.ConvexGeometry(vs)
        const mesh1 = new THREE.Mesh(geo, this.roofMaterial)
        mesh1.castShadow = true
        mesh1.receiveShadow = true
        const mesh2 = mesh1.clone()
        mesh2.rotation.y = Math.PI / 2
        mesh2.position.x = this.tTW / 2
        mesh2.position.z = -this.tTW / 2
        head.add(mesh1)
        head.add(mesh2)
      }
    }

    const flags = this.createFlag()

    head.add(flags)

    head.position.y = 290
    head.position.z = -40

    // const geo1 = new THREE.Geometry()
    // geo1.vertices = curvePoint1
    // const line1 = new THREE.Line(
    //   geo1, new THREE.LineBasicMaterial({ color: 0xff0000 })
    // )
    // line1.position.y = 290
    // line1.position.z = -40

    // const geo2 = new THREE.Geometry()
    // geo2.vertices = curvePoint2
    // const line2 = new THREE.Line(
    //   geo2, new THREE.LineBasicMaterial({ color: 0xff0000 })
    // )
    // line2.position.y = 290
    // line2.position.z = -40

    top.add(pillars)
    top.add(head)
    // top.add(line1)
    // top.add(line2)

    return top
  }

  createFlag() {
    const flags = new THREE.Object3D()
    flags.name = 'flags'

    const flag1 = new THREE.Object3D()
    flag1.name = 'flag1'

    const stick = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 50, 36),
      new THREE.MeshPhongMaterial({ color: '#000' })
    )
    stick.castShadow = true
    stick.receiveShadow = true
    stick.position.y = 25

    flag1.add(stick)

    // const tri = new THREE.Object3D()
    // tri.name = 'tri'

    // const x = []
    // const y = []
    // for (let i = 0; i < 36; i++) {
    //   x.push(i)
    //   y.push(1 / 7 * i)
    // }

    // for (let i = 0; i < x.length; i++) {
    //   if (i !== 0) {
    //     const v = [
    //       new THREE.Vector3(x[i], 50 - y[i], 0),
    //       new THREE.Vector3(x[i], 40 + y[i], 0),
    //       new THREE.Vector3(x[i - 1], 50 - y[i - 1], 0),
    //       new THREE.Vector3(x[i - 1], 40 + y[i - 1], 0),
    //     ]
    //     const geo = new THREE.ConvexGeometry(v)
    //     geo.verticesNeedUpdate = true
    //     const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: '#ffd700' }))
    //     mesh.name = 'mesh' + i
    //     mesh.rotation.y = Math.PI
    //     tri.add(mesh)
    //   }
    // }
    // console.log(tri.children[0])
    // flag1.add(tri)

    const triV = [
      new THREE.Vector3(0, 50, 0),
      new THREE.Vector3(0, 40, 0),
      new THREE.Vector3(35, 45, 0),
      new THREE.Vector3(35, 45, 0),
    ]

    const triG = new THREE.ConvexGeometry(triV, 10)
    // console.log(triG)
    const tri = new THREE.Mesh(triG, new THREE.MeshPhongMaterial({ color: '#ffd700' }))
    tri.castShadow = true
    tri.receiveShadow = true
    tri.rotation.y = Math.PI

    flag1.add(stick)
    flag1.add(tri)

    flag1.position.x = 27
    flag1.position.z = -3

    // console.log(flag1)

    const flag2 = flag1.clone()
    flag2.position.x = -27
    flag2.children[1].material = new THREE.MeshPhongMaterial({ color: '#fffaf0' })
    // console.log(flag2.children[1])

    const flag3 = flag2.clone()
    flag3.position.z = -57
    flag3.children[1].material = new THREE.MeshPhongMaterial({ color: '#ffa500' })

    const flag4 = flag3.clone()
    flag4.position.x = 27
    flag4.children[1].material = new THREE.MeshPhongMaterial({ color: '#ffdab9' })

    flags.add(flag1)
    flags.add(flag2)
    flags.add(flag3)
    flags.add(flag4)

    return flags
  }

  createBuilding() {
    const building = new THREE.Object3D()
    building.name = 'building'

    const tower = this.createTower()
    tower.position.y = 140
    tower.position.z = -50

    const under1 = this.createUnder1()
    under1.position.y = 80
    under1.position.z = -20

    const under2 = this.createUnder2()
    under2.position.z = 0

    // const top = this.createTop()
    // top.position.y = 380
    // top.position.z = -50 - 40

    building.add(tower)
    building.add(under1)
    building.add(under2)
    // building.add(top)

    building.castShadow = true
    building.receiveShadow = true

    return building
  }
}
