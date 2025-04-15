import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';

const VRScene: React.FC = () => {
  const sceneRef = useRef(null);
  const [completedSolarSystem, setCompletedSolarSystem] = useState(false);
  const userEmail = useAuth();

  useEffect(() => {
    // Once the scene is loaded and model is complete, trigger progress update
    const handleModelLoaded = () => {
      // Add delay to allow animation to complete or to simulate interaction-based completion
      setTimeout(() => {
        setCompletedSolarSystem(true);
      }, 10000); // Example: wait 10 seconds
    };

    const model = document.querySelector('#solarSystemModel');
    if (model) {
      model.addEventListener('model-loaded', handleModelLoaded);
    }

    return () => {
      if (model) {
        model.removeEventListener('model-loaded', handleModelLoaded);
      }
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
        {/* Camera */}
        <a-entity position="0 1.6 10">
          <a-camera wasd-controls-enabled="false" look-controls-enabled="true"></a-camera>
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
    </div>
  );
};

export default VRScene;