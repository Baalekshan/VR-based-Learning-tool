import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aframe';
import 'aframe-look-at-component';

const Store3DAFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update position
    const updatePosition = () => {
      const camera = document.querySelector('a-camera');
      if (camera) {
        const pos = camera.getAttribute('position');
        setPosition({
          x: Number(pos.x.toFixed(2)),
          y: Number(pos.y.toFixed(2)),
          z: Number(pos.z.toFixed(2))
        });

        // Check if user is near shopping area and redirect automatically
        if (Math.abs(pos.x - (-22.89)) < 1 && Math.abs(pos.z - (-31.06)) < 1) {
          navigate('/shopping');
        }
      }
      requestAnimationFrame(updatePosition);
    };
    updatePosition();

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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <a-scene
        vr-mode-ui="enabled: true"
        renderer="logarithmicDepthBuffer: true; antialias: true; precision: high"
        background="color: #f0f0f0"
        environment="preset: forest; dressingAmount: 1; dressingColor: #445500; groundColor: #445500; ground: hills; groundYScale: 5; groundTexture: walkernoise; groundColor2: #445500; skyType: gradient; skyColor: #445500; horizonColor: #445500; lighting: none"
      >
        {/* Camera */}
        <a-camera
          position="-22 5 -24"
          wasd-controls="enabled: true; acceleration: 100"
          look-controls="enabled: true; pointerLockEnabled: true"
        >
          <a-entity
            cursor="fuse: false"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"
          ></a-entity>
        </a-camera>

        {/* Model */}
        <a-entity
          gltf-model="/6twelve.glb"
          position="0 0 -5"
          scale="2 2 2"
          rotation="0 0 0"
        ></a-entity>

        {/* Shopping Area Marker */}
        <a-entity
          position="-22.89 1 -31.06"
          geometry="primitive: cylinder; radius: 1; height: 0.1"
          material="color: #4CAF50; opacity: 0.5; transparent: true"
        ></a-entity>

        {/* Shopping Area Text */}
        <a-entity
          position="-22.89 3 -31.06"
          text="value: SHOPPING AREA; color: white; align: center; width: 4"
        ></a-entity>

        {/* Lights */}
        <a-light type="ambient" intensity="0.8" color="#ffffff"></a-light>
        <a-light type="directional" intensity="1" position="5 5 5" color="#ffffff"></a-light>
        <a-light type="point" intensity="0.5" position="-5 5 -5" color="#ffffff"></a-light>
        <a-light type="hemisphere" intensity="0.5" groundColor="#445500" skyColor="#ffffff"></a-light>

        {/* Environment */}
        <a-entity environment="preset: forest"></a-entity>
      </a-scene>

      {/* Position Display */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '16px',
        zIndex: 1000,
        border: '2px solid white'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Current Position:</div>
        <div>X: {position.x}</div>
        <div>Y: {position.y}</div>
        <div>Z: {position.z}</div>
      </div>

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

export default Store3DAFrame; 