import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const VRScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null); // Ref for storing the animation mixer
  const clock = new THREE.Clock(); // To track the time for animations

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);  // Black background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,  // Near plane set to 0.1
      1000
    );
    camera.position.set(0, 1.6, 10);  // Camera position

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Enable WebXR
    renderer.xr.enabled = true;

    // Add VRButton to enable VR mode
    document.body.appendChild(VRButton.createButton(renderer));

    // Orbit Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    // Lights setup
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);  // Increased intensity
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);  // Increased intensity
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/models/solar_system_animation/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);  // Adjust scale to fit within the scene
        model.position.set(0, 0, -15);  // Position the model in front of the camera
        scene.add(model);  // Add the model to the scene

        if (gltf.animations && gltf.animations.length) {
          // Initialize the mixer for animations
          const mixer = new THREE.AnimationMixer(model);

          // Play each animation clip
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();  // Start animation
          });

          // Save the mixer in the ref for later updates
          mixerRef.current = mixer;
          console.log('Animations started:', gltf.animations.map((a) => a.name));
        } else {
          console.warn('No animations found in GLTF');
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Animation loop
    const animate = () => {
      if (mixerRef.current) {
        const delta = clock.getDelta(); // Get the time between frames
        mixerRef.current.update(delta); // Update the animations
      }
      controls.update(); // Update the controls
      renderer.render(scene, camera); // Render the scene
      requestAnimationFrame(animate); // Call the next frame
    };
    animate();

    // Handle resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',  // Ensure the background is black
      }}
    />
  );
};

export default VRScene;

