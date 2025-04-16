import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';
import * as THREE from 'three';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register custom component for solar system animation control
if (typeof AFRAME !== 'undefined') {
  AFRAME.registerComponent('solar-system-animation', {
    init: function() {
      this.mixer = null;
      this.clock = new THREE.Clock();
      this.actions = [];
      
      this.el.addEventListener('model-loaded', () => {
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
          console.log('Solar system model loaded:', mesh);
          if (mesh.animations && mesh.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(mesh);
            
            mesh.animations.forEach(clip => {
              // Create two actions for the same animation
              const action1 = this.mixer.clipAction(clip);
              const action2 = this.mixer.clipAction(clip);
              
              // Ultra-slow timeScale - complete cycle in 2 minutes (120 seconds)
              const timeScale = clip.duration / 120;
              
              // Configure first action
              action1.setLoop(THREE.LoopRepeat, Infinity);
              action1.clampWhenFinished = false;
              action1.timeScale = timeScale;
              action1.zeroSlopeAtStart = true;
              action1.zeroSlopeAtEnd = true;
              
              // Configure second action with offset
              action2.setLoop(THREE.LoopRepeat, Infinity);
              action2.clampWhenFinished = false;
              action2.timeScale = timeScale;
              action2.zeroSlopeAtStart = true;
              action2.zeroSlopeAtEnd = true;
              
              // Start both actions with an offset
              action1.play();
              this.actions.push(action1);
              
              // Start the second action with a 90-second offset (3/4 through the cycle)
              action2.startAt(clip.duration * 0.75);
              action2.play();
              this.actions.push(action2);
              
              // Set crossfade weights for ultra-smooth blending
              action1.setEffectiveWeight(0.5);
              action2.setEffectiveWeight(0.5);
              
              console.log('Started ultra-slow animation:', {
                name: clip.name,
                duration: clip.duration,
                timeScale,
                cycleTime: '10 seconds',
                offset: 'overlapping at 75%'
              });
            });
          }
        }
      });
    },

    tick: function(time, timeDelta) {
      if (this.mixer) {
        const delta = Math.min(timeDelta / 1000, 0.05);
        this.mixer.update(delta);
      }
    },

    remove: function() {
      if (this.mixer) {
        this.actions.forEach(action => action.stop());
        this.mixer.stopAllAction();
        this.mixer = null;
      }
    }
  });
}

const VRScene: React.FC = () => {
  const sceneRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.email;
  const modelRef = useRef(null);

  useEffect(() => {
    // Add animation check
    const checkAnimation = () => {
      const modelEntity = document.querySelector('#solarSystemModel');
      if (modelEntity) {
        console.log('Checking model animation state');
        const mixer = modelEntity.getAttribute('animation-mixer');
        console.log('Animation mixer:', mixer);
      }
    };

    // Check animation state periodically
    const animationCheckInterval = setInterval(checkAnimation, 5000);

    return () => {
      clearInterval(animationCheckInterval);
    };
  }, []);

  useEffect(() => {
    if (!userEmail || scoreSubmitted) {
      console.log("Score submission skipped:", {
        hasUserEmail: !!userEmail,
        isScoreSubmitted: scoreSubmitted
      });
      return;
    }

    console.log("Attempting to submit score for user:", userEmail);
    
    submitScore('solar-system', 1, userEmail)
      .then((response) => {
        if (response) {
          console.log('Solar system progress saved successfully:', response.message);
          setScoreSubmitted(true);
          toast.success('Solar System Activity completed successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          console.error('Failed to save solar system progress: Authentication or server error');
          setScoreSubmitted(false);
        }
      })
      .catch((err) => {
        console.error('Failed to save solar system progress:', {
          error: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setScoreSubmitted(false);
      });

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
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [userEmail, scoreSubmitted]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <ToastContainer />
      <a-scene
        ref={sceneRef}
        embedded
        vr-mode-ui="enabled: true"
        renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true"
        background="color: #000000"
        loading-screen="enabled: true"
      >
        <a-sky 
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=3000"
          radius="5000"
          segments-height="64"
          segments-width="64"
        ></a-sky>

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

        <a-entity light="type: hemisphere; intensity: 2; color: #ffffff; groundColor: #444444"></a-entity>
        <a-entity light="type: directional; intensity: 2; color: #ffffff" position="5 10 7.5"></a-entity>

        <a-entity
          id="solarSystemModel"
          ref={modelRef}
          gltf-model="/models/solar_system_animation/scene.gltf"
          solar-system-animation
          position="0 0 -15"
          scale="0.5 0.5 0.5"
        ></a-entity>

        <a-entity environment="preset: default;"></a-entity>
        <a-entity oculus-touch-controls="hand: left"></a-entity>
        <a-entity oculus-touch-controls="hand: right"></a-entity>
      </a-scene>

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
        <h3 style={{ margin: '0 0 10px 0' }}>Solar System Controls</h3>
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Navigation:</h4>
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
        <div>
          <h4 style={{ margin: '0 0 5px 0' }}>VR Mode:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>Click VR button to enter VR</li>
            <li>Use controllers to move</li>
            <li>Press menu to exit VR</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VRScene;
