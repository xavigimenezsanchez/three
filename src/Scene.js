import React, { useEffect } from 'react';
import * as THREE from 'three';
import  OrbitControls  from 'orbit-controls-es6'
import { BufferAttribute, Color } from 'three';
//https://jsfiddle.net/prisoner849/2ncyu9Lb/
    let init = true;
    let mount;
    let camera;
    let controls;
    let isDragging = false
    let dragObject
    let meshs = []
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const plane = new THREE.Plane()
    const pNormal = new THREE.Vector3(0, 1, 0)
    const pIntersect = new THREE.Vector3()
    const planeIntersect = new THREE.Vector3()
    const shift = new THREE.Vector3()
    const texture1 = new THREE.TextureLoader().load('marble-texture.jpg')
    const texture2 = new THREE.TextureLoader().load('wood.jpg')
    const texture3 = new THREE.TextureLoader().load('water.jpg')
    const texture4 = new THREE.TextureLoader().load('silk.jpg')
    const material= [new THREE.MeshBasicMaterial( { map: texture3 } ), new THREE.MeshBasicMaterial( { map: texture2 } ), new THREE.MeshBasicMaterial( { map: texture1 }), new THREE.MeshBasicMaterial( { map: texture4 } )]
    const backgroundTexture = new THREE.TextureLoader().load('background.jpeg')
    const onMouseDown = (event) => {
      console.log(meshs)
      const intersects = raycaster.intersectObjects(meshs);
      if (intersects.length > 0) {
        controls.enabled = false;
        pIntersect.copy(intersects[0].point);
        plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
        shift.subVectors(intersects[0].object.position, intersects[0].point);
        isDragging = true;
        dragObject = intersects[0].object;
      }

    }
    const onMouseUp = (event) => {
      isDragging = false;
      dragObject = null;
      controls.enabled = true;
    }
    const onMouseMove = ( event ) => {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
		
      if (isDragging) {
        raycaster.ray.intersectPlane(plane, planeIntersect);
        dragObject.position.addVectors(planeIntersect, shift);
      }
      
    }

    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    scene.background = new Color( 'orange')
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    
    
    // Create a directional light
    const light = new THREE.DirectionalLight( 0xffffff, 2.0 );

    // move the light back and up a bit
    light.position.set( 10, 10, 10 );
    
    // remember to add the light to the scene
    scene.add( light );

    //scene.add(new THREE.GridHelper(10, 10));

    

const  Scene= ({ dispatch, spheres}) => {
  const update = (spheres) =>{
    meshs = scene.children.filter(x=>x.type=='Mesh');
    if (meshs.length < spheres.length){
      for (let i=0; i < spheres.length; i++) {
        if (scene.children.findIndex(x=>x.uuid === spheres[i].uuid) === -1){
          const geometry = new THREE.SphereBufferGeometry( spheres[i].radius, 32, 32 );
          var mesh = new THREE.Mesh( geometry, material[i%4] );
          mesh.position.x= spheres[i].x
          mesh.position.y= spheres[i].y
          mesh.position.z= spheres[i].z
          dispatch({type: 'SETUUID', value: {id:spheres[i].id, uuid: mesh.uuid}})
          scene.add( mesh );
        }   
      }
    } else {
      for (let i = 0; i < meshs.length; i++ ) {
        if (spheres.findIndex(x=>x.uuid === meshs[i].uuid) === -1) {
          scene.remove(meshs[i])
        }
      }
    }
  }

  useEffect(() => {
      if (init) {
        camera = new THREE.PerspectiveCamera( 60, mount.offsetParent.offsetWidth/window.innerHeight, 1, 1000 );

        mount.appendChild( renderer.domElement );
        mount.addEventListener('mousemove', onMouseMove, false)
        mount.addEventListener('mousedown', onMouseDown, false)
        mount.addEventListener('mouseup', onMouseUp, false)
        renderer.setSize(mount.offsetParent.offsetWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio );
        
        camera.position.set(0, 0, 20);
        camera.lookAt(scene.position);
        controls = new OrbitControls(camera, renderer.domElement)
        scene.background = backgroundTexture
        init = false;
      }
    update(spheres)
     const meshs = scene.children.filter(x=>x.type=='Mesh')

    let direction = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    const velocity = [0.2, 0.1, 0.5, 0.2]
    const gravity = [0.01, 0.02, 0.03, 0.01]
    const bounce = [0.7, 0.6, 0.7, 0.8]
    const position = [5,5,4,3]
    renderer.setAnimationLoop(() => {
      for (let i=0; i < meshs.length; i++) {
        if ((meshs[i].position.y < 0 && direction[i] == -1) || (meshs[i].position.y > position[i] && direction[i] == 1)) {
          direction[i] *= -1
        }
        if (position[i] > 0){
          position[i] -= gravity[i]
          meshs[i].position.y += velocity[i] * direction[i]
        } else {
          position[i] = -2
        }
  
          
        //meshs[i].rotation.x += 0.01;
        meshs[i].rotation.z +=0.03;
    }
      renderer.render(scene, camera);
    })
    // === THREE.JS EXAMPLE CODE END ===
  })
  return (
    <div ref={ref => (mount = ref)} />
  );
}

export default Scene;