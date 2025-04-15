import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';

const VRScene: React.FC = () => {
  const sceneRef = useRef(null);
  const [completedSolarSystem, setCompletedSolarSystem] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const userEmail = useAuth();

  useEffect(() => {
    // Once the scene is loaded and model is complete, trigger progress update
    const handleModelLoaded = () => {
      setTimeout(() => {
        setCompletedSolarSystem(true);
      }, 10000);
    };

    const model = document.querySelector('#solarSystemModel');
    if (model) {
      model.addEventListener('model-loaded', handleModelLoaded);
    }

    // Add keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      const camera = document.querySelector('a-camera');
      if (!camera) return;

      const moveSpeed = 0.5;
      const turnSpeed = 0.05;
      const pos = camera.getAttribute('position');
      const rot = camera.getAttribute('rotation');

      switch (e.key) {
        case 'ArrowUp':
          camera.setAttribute('position', {
            x: pos.x,
            y: pos.y,
            z: pos.z - moveSpeed
          });
          break;
        case 'ArrowDown':
          camera.setAttribute('position', {
            x: pos.x,
            y: pos.y,
            z: pos.z + moveSpeed
          });
          break;
        case 'ArrowLeft':
          camera.setAttribute('position', {
            x: pos.x - moveSpeed,
            y: pos.y,
            z: pos.z
          });
          break;
        case 'ArrowRight':
          camera.setAttribute('position', {
            x: pos.x + moveSpeed,
            y: pos.y,
            z: pos.z
          });
          break;
        case 'q':
          camera.setAttribute('rotation', {
            x: rot.x,
            y: rot.y + turnSpeed,
            z: rot.z
          });
          break;
        case 'e':
          camera.setAttribute('rotation', {
            x: rot.x,
            y: rot.y - turnSpeed,
            z: rot.z
          });
          break;
      }
    };

    // Update position display
    const updatePosition = () => {
      const camera = document.querySelector('a-camera');
      if (camera) {
        const pos = camera.getAttribute('position');
        setPosition({
          x: Number(pos.x.toFixed(2)),
          y: Number(pos.y.toFixed(2)),
          z: Number(pos.z.toFixed(2))
        });
      }
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    updatePosition();

    return () => {
      if (model) {
        model.removeEventListener('model-loaded', handleModelLoaded);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateProgress = () => {
    try {
      localStorage.setItem('solarSystemCompleted', 'true');
      if (userEmail) {
        submitScore('solar-system', 1, userEmail)
          .then((result) => {
            console.log('Solar system progress saved:', result);
          })
          .catch((err) => {
            console.error('Failed to save solar system progress:', err);
          });
      }
      console.log('Solar system activity completed');
    } catch (error) {
      console.error('Error updating solar system progress:', error);
    }
  };

  useEffect(() => {
    if (completedSolarSystem) {
      updateProgress();
    }
  }, [completedSolarSystem]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <a-scene
        ref={sceneRef}
        embedded
        vr-mode-ui="enabled: true"
        renderer="antialias: true"
        background="color: black"
        loading-screen="enabled: true"
      >
        {/* Camera with movement controls */}
        <a-entity position="0 1.6 10">
          <a-camera 
            wasd-controls="enabled: true"
            look-controls="enabled: true"
            movement-controls="speed: 0.5"
          >
            <a-entity
              cursor="fuse: false"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: black; shader: flat"
            ></a-entity>
          </a-camera>
        </a-entity>

        {/* Lights */}
        <a-entity light="type: hemisphere; intensity: 2; color: #ffffff; groundColor: #444444"></a-entity>
        <a-entity light="type: directional; intensity: 2; color: #ffffff" position="5 10 7.5"></a-entity>

        {/* Model */}
        <a-entity
          id="solarSystemModel"
          gltf-model="/models/solar_system_animation/scene.gltf"
          animation-mixer
          position="0 0 -15"
          scale="0.5 0.5 0.5"
        ></a-entity>

        {/* Environment & Controls */}
        <a-entity environment="preset: default;"></a-entity>
        <a-entity oculus-touch-controls="hand: left"></a-entity>
        <a-entity oculus-touch-controls="hand: right"></a-entity>

      {/* Controls Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Keyboard Controls:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>↑/↓: Move forward/backward</li>
            <li>←/→: Move left/right</li>
            <li>Q/E: Turn left/right</li>
          </ul>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>VR Controls:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>Click the VR button to enter VR mode</li>
            <li>Use VR controllers to move and interact</li>
            <li>Press the menu button to exit VR</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VRScene;