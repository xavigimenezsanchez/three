import React, { useEffect } from 'react';
import * as THREE from 'three';
import { BufferAttribute, Color } from 'three';





const  Scene= () => {
  let mount;
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    scene.background = new Color( 'skyblue')
    var camera = new THREE.PerspectiveCamera( 45, mount.offsetWidth/window.innerHeight, 1, 500 );
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.offsetWidth, window.innerHeight-30 );
    renderer.setPixelRatio( window.devicePixelRatio );
    mount.appendChild( renderer.domElement );
    camera.position.set( 0 , 0 , 10)
    
    // Create a directional light
    const light = new THREE.DirectionalLight( 0xffffff, 5.0 );

    // move the light back and up a bit
    light.position.set( 10, 10, 10 );

    // remember to add the light to the scene
    scene.add( light );

    var material = new THREE.MeshStandardMaterial( {color: 0x800080});
    var material2 = new THREE.MeshStandardMaterial( {color: 'green'});

    let geometry = new THREE.SphereBufferGeometry( 0.5, 32, 32 );
    let geometry2 = new THREE.SphereBufferGeometry( 1, 20, 20 );
    var mesh = new THREE.Mesh( geometry, material );
    var mesh2 = new THREE.Mesh( geometry2, material2 );
    scene.add( mesh );
    scene.add( mesh2 )
    renderer.render( scene, camera );
    let direction = -1
    mesh2.position.z -=1
    var animate = () => {
        
      requestAnimationFrame( animate );
      if ((mesh.position.y < -2 && direction == -1) || (mesh.position.y > 2 && direction == 1))
        direction *= -1
      mesh.position.y += 0.01 * direction
      
      mesh.rotation.x += 0.01;
      mesh.rotation.z += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  })
  return (
    <div ref={ref => (mount = ref)} />
  );
}

export default Scene;