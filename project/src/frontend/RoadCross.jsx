import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
// @ts-expect-error
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../utils/UseAuth';
import { submitScore } from '../utils/submitScore';

const TrafficScene = () => {
  const redLightRef = useRef(null);
  const greenLightRef = useRef(null);
  const carRefs = useRef([]);
  const warningRef = useRef(null);
  const [score, setScore] = useState(0);
  const isRedLightRef = useRef(true);
  const hasCrossedRef = useRef(false);
  const hasStartedCrossingRef = useRef(false);
  const email = useAuth();
  console.log(email);

  const handleHome = () => {
    window.location.href = '/asdpage';
  };
  const enterVR = () => {
    const scene = document.querySelector('a-scene');
    if (scene?.enterVR) {
      scene.enterVR();
    }
  };

  useEffect(() => {
    if (score > 0 && email) {
      submitScore('road-crossing', score, email);
      toast.success('Score submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [score, email]);
  
  
  const exitVR = () => {
    const scene = document.querySelector('a-scene');
    if (scene?.exitVR) {
      scene.exitVR();
    }
    toast.success('Activity completed successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });

  };

  useEffect(() => {
    const toggleTrafficLight = () => {
      if (isRedLightRef.current) {
        redLightRef.current.setAttribute('color', 'black');
        greenLightRef.current.setAttribute('color', 'green');
      } else {
        redLightRef.current.setAttribute('color', 'red');
        greenLightRef.current.setAttribute('color', 'black');
        hasCrossedRef.current = false;
        hasStartedCrossingRef.current = false;
      }
      isRedLightRef.current = !isRedLightRef.current;
    };

    const intervalId = setInterval(toggleTrafficLight, 5000);

    const moveCars = () => {
      carRefs.current.forEach((car, index) => {
        if (!car) return;
        const speed = 0.08 + index * 0.05;
        const pos = car.getAttribute('position');

        const zebraStart = 3.5;
        const zebraEnd = -1;
        const isInZebraCrossing = pos.x > zebraStart && pos.x < zebraEnd;

        if (!isRedLightRef.current && pos.x > zebraStart && pos.x <= zebraStart + speed) {
          return;
        }

        if (!isRedLightRef.current || (isRedLightRef.current && !isInZebraCrossing)) {
          car.setAttribute('position', { x: pos.x - speed, y: pos.y, z: pos.z });
        }

        if (pos.x < -20) {
          car.setAttribute('position', { x: 20, y: pos.y, z: pos.z });
        }
      });

      const camera = document.querySelector('a-camera');
      if (camera) {
        const camPos = camera.object3D.position;

        warningRef.current.setAttribute('visible', isRedLightRef.current && camPos.z < 2.9 && camPos.z > -6);

        if (!isRedLightRef.current && camPos.z < 3.5 && camPos.z > -1) {
          hasStartedCrossingRef.current = true;
        }

        if (hasStartedCrossingRef.current && !isRedLightRef.current && camPos.z < -8 && !hasCrossedRef.current) {
          setScore(prevScore => 10);
          hasCrossedRef.current = true;
          exitVR(); // Exit VR and show toast
        }

        if (isRedLightRef.current) {
          hasStartedCrossingRef.current = false;
          hasCrossedRef.current = false;
        }
      }

      requestAnimationFrame(moveCars);
    };

    requestAnimationFrame(moveCars);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ToastContainer />
      <button onClick={enterVR} style={{ position: "fixed", bottom: "20px", right: "20px", padding: "10px 20px", fontSize: "16px", fontWeight: "bold", background: "#333", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px", zIndex: 1000 }}>
        VR
      </button>
      <button onClick={handleHome} style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px', zIndex: 1000 }}>
        Home
      </button>
      
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '18px', textAlign: 'center', zIndex: 1000 }}>
        <h2>Welcome to Road Crossing Activity</h2>
        <p>Cross the road successfully to complete the task!</p>
      </div>

      <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '18px', textAlign: 'center', zIndex: 1000 }}>
        <h3>Score: {score}</h3>
      </div>

      <a-scene>
        <a-entity position="0 1 3">
          <a-camera></a-camera>
        </a-entity>

        <a-sky color="#87CEEB"></a-sky>
        <a-plane position="0 0 -10" rotation="-90 0 0" width="100" height="100" material="src: url(/assets/grass.jpg); repeat: 50 50;"></a-plane>

        {[...Array(3)].map((_, i) => (
          <a-box key={i} position={`0 0.1 ${-5.5 + i * 3}`} width="40" height="0.2" depth="3" material="src: url(/assets/lines-traffic-paved-roads-background.jpg);"></a-box>
        ))}

        {[...Array(15)].map((_, i) => (
          <a-box key={`stripe-${i}`} position={`0 0.05 ${-4.1 + (i - 4.5) * 0.6}`} rotation="0 90 0" height="0.35" width="0.6" depth="2" color={i % 2 === 0 ? 'white' : 'black'}></a-box>
        ))}

        <a-entity id="traffic-signal" position="-2 2 -10.5">
          <a-image src="/assets/pedest-sign.png" width="1" height="1" position="0 1.51 0"></a-image>
          <a-cylinder position="0 -1 0" radius="0.05" height="2" color="gray"></a-cylinder>
          <a-box position="0 0.5 0" width="0.5" height="1" depth="0.5" color="black"></a-box>
          <a-sphere ref={redLightRef} position="0 0.75 0.3" radius="0.2" color="red"></a-sphere>
          <a-sphere ref={greenLightRef} position="0 0.25 0.3" radius="0.2" color="black"></a-sphere>
        </a-entity>

        {[...Array(3)].map((_, i) => (
          <a-entity key={i} ref={el => (carRefs.current[i] = el)} position={`20 0 ${-5.5 + i * 3}`} rotation="0 -90 0" scale="100 100 100">
            <a-entity gltf-model="url(/models/car/scene.gltf)"></a-entity>
          </a-entity>
        ))}

        <a-entity ref={warningRef} position="0 2 -8" look-at="[camera]" visible="false">
          <a-text value="STOP! It's not safe to cross!" color="red" align="center" width="5"></a-text>
        </a-entity>
      </a-scene>
    </>
  );
};

export default TrafficScene;
