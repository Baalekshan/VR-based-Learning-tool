import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';

const VRScene: React.FC = () => {
  const sceneRef = useRef(null);
  const [completedSolarSystem, setCompletedSolarSystem] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isMoving, setIsMoving] = useState(false);
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

      setIsMoving(true);

      switch (e.key.toLowerCase()) {
        case 'w':
          camera.setAttribute('position', {
            x: pos.x - Math.sin(rot.y * Math.PI / 180) * moveSpeed,
            y: pos.y,
            z: pos.z - Math.cos(rot.y * Math.PI / 180) * moveSpeed
          });
          break;
        case 's':
          camera.setAttribute('position', {
            x: pos.x + Math.sin(rot.y * Math.PI / 180) * moveSpeed,
            y: pos.y,
            z: pos.z + Math.cos(rot.y * Math.PI / 180) * moveSpeed
          });
          break;
        case 'a':
          camera.setAttribute('position', {
            x: pos.x - Math.cos(rot.y * Math.PI / 180) * moveSpeed,
            y: pos.y,
            z: pos.z + Math.sin(rot.y * Math.PI / 180) * moveSpeed
          });
          break;
        case 'd':
          camera.setAttribute('position', {
            x: pos.x + Math.cos(rot.y * Math.PI / 180) * moveSpeed,
            y: pos.y,
            z: pos.z - Math.sin(rot.y * Math.PI / 180) * moveSpeed
          });
          break;
        case ' ':
          camera.setAttribute('position', {
            x: pos.x,
            y: pos.y + moveSpeed,
            z: pos.z
          });
          break;
        case 'shift':
          camera.setAttribute('position', {
            x: pos.x,
            y: pos.y - moveSpeed,
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

    const handleKeyUp = () => {
      setIsMoving(false);
    };

    // Update position and rotation display
    const updatePosition = () => {
      const camera = document.querySelector('a-camera');
      if (camera) {
        const pos = camera.getAttribute('position');
        const rot = camera.getAttribute('rotation');
        setPosition({
          x: Number(pos.x.toFixed(2)),
          y: Number(pos.y.toFixed(2)),
          z: Number(pos.z.toFixed(2))
        });
        setRotation({
          x: Number(rot.x.toFixed(2)),
          y: Number(rot.y.toFixed(2)),
          z: Number(rot.z.toFixed(2))
        });
      }
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    updatePosition();

    return () => {
      if (model) {
        model.removeEventListener('model-loaded', handleModelLoaded);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
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
        renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true"
        background="color: #000000"
        loading-screen="enabled: true"
      >
        {/* Skybox with space background */}
        <a-sky 
          src="https://cdn.glitch.global/f4b2afd1-d1e5-4ad0-8681-623d1235f0cb/space.jpg?v=1689324492405"
          radius="5000"
          segments-height="64"
          segments-width="64"
        ></a-sky>

        {/* Camera with enhanced movement controls */}
        <a-entity position="0 1.6 10">
          <a-camera 
            wasd-controls="enabled: true; acceleration: 50; fly: true"
            look-controls="enabled: true; pointerLockEnabled: true"
            movement-controls="speed: 0.5; fly: true"
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
      </a-scene>

      {/* Enhanced Controls Overlay */}
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
            <li>W/S: Move forward/backward</li>
            <li>A/D: Move left/right</li>
            <li>Space/Shift: Move up/down</li>
            <li>Q/E: Turn left/right</li>
            <li>Mouse: Look around</li>
          </ul>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Position:</h4>
          <p style={{ margin: '0' }}>X: {position.x} Y: {position.y} Z: {position.z}</p>
          <p style={{ margin: '0' }}>Rotation: {rotation.y}°</p>
          <p style={{ margin: '0' }}>Status: {isMoving ? 'Moving' : 'Stationary'}</p>
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