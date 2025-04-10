import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Html, OrbitControls } from '@react-three/drei';
import { VRButton, XR, Interactive, useXR, createXRStore, XRStore } from '@react-three/xr';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

function Model() {
  const gltf = useGLTF('/6twelve.glb');
  
  useEffect(() => {
    if (!gltf) {
      console.error('Model failed to load');
      return;
    }
    
    console.log('Model loaded successfully:', gltf.scene);
    
    // Center the model
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    
    // Scale the model if needed
    const scale = 1.0; // Adjust this value if the model is too large or small
    gltf.scene.scale.set(scale, scale, scale);
  }, [gltf]);
  
  if (!gltf) {
    return (
      <Html>
        <div style={{ color: 'red', padding: '20px' }}>
          Error loading model
        </div>
      </Html>
    );
  }
  
  return <primitive object={gltf.scene} />;
}

function FirstPersonControls() {
  const { camera } = useThree();
  const moveSpeed = 0.5;
  const turnSpeed = 0.05;
  
  // Define boundary limits
  const boundaryX = 3.2;
  const boundaryZ = 22;
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const direction = new THREE.Vector3();
      
      switch (e.key) {
        case 'ArrowUp':
          direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
          // Check if moving forward would exceed the Z boundary
          const newZForward = camera.position.z + direction.z * moveSpeed;
          if (newZForward <= boundaryZ) {
            camera.position.addScaledVector(direction, moveSpeed);
          }
          break;
        case 'ArrowDown':
          direction.set(0, 0, 1).applyQuaternion(camera.quaternion);
          camera.position.addScaledVector(direction, moveSpeed);
          break;
        case 'ArrowLeft':
          direction.set(-1, 0, 0).applyQuaternion(camera.quaternion);
          // Check if moving left would exceed the X boundary
          const newXLeft = camera.position.x + direction.x * moveSpeed;
          if (newXLeft >= -boundaryX) {
            camera.position.addScaledVector(direction, moveSpeed);
          }
          break;
        case 'ArrowRight':
          direction.set(1, 0, 0).applyQuaternion(camera.quaternion);
          // Check if moving right would exceed the X boundary
          const newXRight = camera.position.x + direction.x * moveSpeed;
          // Only check the remaining X boundary
          if (newXRight <= boundaryX) {
            camera.position.addScaledVector(direction, moveSpeed);
          }
          break;
        case 'q':
          camera.rotation.y += turnSpeed;
          break;
        case 'e':
          camera.rotation.y -= turnSpeed;
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);
  
  // Mouse look controls
  useEffect(() => {
    let isPointerLocked = false;
    
    const handlePointerLockChange = () => {
      isPointerLocked = document.pointerLockElement !== null;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked) return;
      
      // Horizontal rotation (yaw)
      camera.rotation.y -= e.movementX * 0.002;
      
      // Vertical rotation (pitch) with limits
      const verticalRotation = camera.rotation.x - e.movementY * 0.002;
      camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, verticalRotation));
    };
    
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera]);
  
  return null;
}

// Controls overlay component
function ControlsOverlay() {
  const [showControls, setShowControls] = useState(true);
  
  const requestPointerLock = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.requestPointerLock();
    }
  };
  
  return (
    <>
      <div 
        style={{
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
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
          <button 
            onClick={() => setShowControls(!showControls)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {showControls ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showControls && (
          <>
            <div style={{ marginBottom: '10px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>Mouse Controls:</h4>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Click on the 3D view to enable mouse look</li>
                <li>Move mouse to look around</li>
                <li>Press ESC to exit mouse look</li>
              </ul>
            </div>
            
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
          </>
        )}
      </div>
      
      <button
        onClick={requestPointerLock}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          zIndex: 1000
        }}
      >
        Click to Enable Mouse Look
      </button>
    </>
  );
}

function PositionDisplay({ onPositionChange }: { onPositionChange: (pos: { x: number, y: number, z: number }) => void }) {
  const { camera } = useThree();

  useFrame(() => {
    onPositionChange({
      x: Number(camera.position.x.toFixed(2)),
      y: Number(camera.position.y.toFixed(2)),
      z: Number(camera.position.z.toFixed(2))
    });
  });

  return null;
}

const Store3D: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [showShoppingPrompt, setShowShoppingPrompt] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xrStore = createXRStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const checkVRSupport = async () => {
      if (typeof navigator !== 'undefined' && 'xr' in navigator && navigator.xr) {
        try {
          const supported = await navigator.xr.isSessionSupported('immersive-vr');
          setIsVRSupported(supported);
        } catch (error) {
          console.error('Error checking VR support:', error);
          setIsVRSupported(false);
        }
      }
    };
    checkVRSupport();

    return () => clearTimeout(timer);
  }, []);

  // Function to show shopping prompt when user is at specific coordinates
  useEffect(() => {
    // Check if user is near the shopping area coordinates
    if (Math.abs(position.x - 1.2) < 1 && Math.abs(position.z - (-18.07)) < 1) {
      setShowShoppingPrompt(true);
    }
  }, [position]);

  const goToShopping = () => {
    navigate('/shopping');
  };

  const enterVR = async () => {
    if (!isVRSupported) {
      alert('VR is not supported on your device or browser.');
      return;
    }

    try {
      // Get the canvas element
      const canvas = canvasRef.current || document.querySelector('canvas');
      if (!canvas) {
        throw new Error('Canvas element not found');
      }

      // Request VR session
      const session = await navigator.xr.requestSession('immersive-vr', {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
      });

      // Set VR mode state
      setIsVRMode(true);

      // In a real implementation, we would:
      // 1. Set up the XR renderer
      // 2. Configure the session
      // 3. Handle VR input
      // 4. Render the scene in VR

      // For now, we'll just show a message
      alert('VR session started! In a complete implementation, this would enter full VR mode.');
      
      // Listen for session end
      session.addEventListener('end', () => {
        setIsVRMode(false);
      });
    } catch (err) {
      console.error('Error entering VR:', err);
      alert('Failed to enter VR mode: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas ref={canvasRef} camera={{ position: [6.2, -6.11, -16], fov: 75 }}>
        <XR store={xrStore}>
          {isVRSupported && (
            <>
              <VRButton />
              <Interactive store={xrStore}>
                <mesh />
              </Interactive>
            </>
          )}
          <PerspectiveCamera 
            makeDefault 
            position={[6.2, -6.11, -16]}
            fov={75}
          />
          <color attach="background" args={['#f0f0f0']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <FirstPersonControls />
          <PositionDisplay onPositionChange={setPosition} />
        </XR>
      </Canvas>
      
      {/* VR Button */}
      <button
        onClick={enterVR}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: isVRMode ? '#4CAF50' : (isVRSupported ? '#2196F3' : '#999'),
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: isVRSupported ? 'pointer' : 'not-allowed',
          zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'background 0.3s ease'
        }}
        disabled={!isVRSupported}
      >
        {isVRMode ? 'VR Mode Active' : (isVRSupported ? 'Enter VR' : 'VR Not Supported')}
      </button>
      
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
      {showShoppingPrompt && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          zIndex: 1000,
          border: '2px solid white'
        }}>
          <h2 style={{ margin: '0 0 15px 0' }}>Shopping Interface Available</h2>
          <p style={{ margin: '0 0 20px 0' }}>You've found the shopping area!</p>
          <button 
            onClick={goToShopping}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Enter Shopping Interface
          </button>
        </div>
      )}
      <ControlsOverlay />
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          Loading 3D Model...
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          Error loading model: {error}
        </div>
      )}
    </div>
  );
};

export default Store3D; 