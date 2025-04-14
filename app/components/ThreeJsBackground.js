'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ThreeJsBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Dynamically import Three.js to avoid server-side rendering issues
    const setupThreeJS = async () => {
      if (!canvasRef.current) return;
      
      // Dynamically import THREE
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');
      
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        alpha: true,
        antialias: true 
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xfff0dd, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create pickle jar shapes
      const jarGroup = new THREE.Group();
      scene.add(jarGroup);
      
      // Create multiple pickle jars
      const createPickleJar = (x, y, z, scale, rotationY) => {
        const jarGroup = new THREE.Group();
        
        // Jar body (cylinder)
        const jarGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32);
        const jarMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xd4f0e2,
          transparent: true,
          opacity: 0.6,
          roughness: 0.1,
          metalness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });
        
        const jar = new THREE.Mesh(jarGeometry, jarMaterial);
        jarGroup.add(jar);
        
        // Jar cap
        const capGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.15, 32);
        const capMaterial = new THREE.MeshStandardMaterial({
          color: 0xffaa00,
          roughness: 0.5,
          metalness: 0.8
        });
        
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 0.675;
        jarGroup.add(cap);
        
        // Add pickles inside the jar (small green cylinders at angles)
        const pickleGeometry = new THREE.CapsuleGeometry(0.08, 0.5, 4, 8);
        const pickleMaterial = new THREE.MeshStandardMaterial({
          color: 0x7a9a3e, // Pickle green
          roughness: 0.7
        });
        
        for (let i = 0; i < 5; i++) {
          const pickle = new THREE.Mesh(pickleGeometry, pickleMaterial);
          pickle.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI
          );
          pickle.position.set(
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6
          );
          jarGroup.add(pickle);
        }
        
        // Add spices (small dots)
        const spiceGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        const spiceMaterials = [
          new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Red chili
          new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Turmeric
          new THREE.MeshStandardMaterial({ color: 0x000000 })  // Mustard
        ];
        
        for (let i = 0; i < 20; i++) {
          const spice = new THREE.Mesh(
            spiceGeometry, 
            spiceMaterials[Math.floor(Math.random() * spiceMaterials.length)]
          );
          spice.position.set(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8
          );
          jarGroup.add(spice);
        }
        
        // Position and scale the jar group
        jarGroup.position.set(x, y, z);
        jarGroup.scale.set(scale, scale, scale);
        jarGroup.rotation.y = rotationY;
        
        return jarGroup;
      };
      
      // Create multiple jars in the scene
      const jars = [];
      for (let i = 0; i < 5; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 5;
        const z = (Math.random() - 0.5) * 5 - 5; // Push back in z
        const scale = 0.8 + Math.random() * 0.4;
        const jar = createPickleJar(x, y, z, scale, Math.random() * Math.PI * 2);
        scene.add(jar);
        jars.push(jar);
      }
      
      // Add floating spices particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 300;
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorsArray = new Float32Array(particlesCount * 3);
      
      // Colors for spices
      const colors = [
        [1.0, 0.2, 0.0],  // Red chili
        [0.9, 0.8, 0.0],  // Turmeric
        [0.0, 0.0, 0.0],  // Black pepper
        [0.3, 0.5, 0.1]   // Coriander
      ];
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position in a sphere
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 15 - 5;
        
        // Random color from colors array
        const colorIndex = Math.floor(Math.random() * colors.length);
        colorsArray[i] = colors[colorIndex][0];
        colorsArray[i + 1] = colors[colorIndex][1];
        colorsArray[i + 2] = colors[colorIndex][2];
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
      
      // Material with vertex colors
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        blending: THREE.AdditiveBlending
      });
      
      // Points
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Camera position
      camera.position.z = 8;
      
      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      
      function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
      }
      
      document.addEventListener('mousemove', onDocumentMouseMove);
      
      // Animation
      const clock = new THREE.Clock();
      
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate particles
        particlesMesh.rotation.x = elapsedTime * 0.05;
        particlesMesh.rotation.y = elapsedTime * 0.08;
        
        // Animate jars
        jars.forEach((jar, index) => {
          jar.rotation.y = elapsedTime * 0.2 + index;
          jar.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.2 + jar.userData.originalY;
        });
        
        // Apply mouse movement effect
        scene.rotation.x += (mouseY * 2 - scene.rotation.x) * 0.05;
        scene.rotation.y += (mouseX * 2 - scene.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      
      // Store original Y positions
      jars.forEach(jar => {
        jar.userData.originalY = jar.position.y;
      });
      
      animate();
      
      // GSAP animations for extra flair
      jars.forEach((jar, index) => {
        // Randomly float up and down
        gsap.to(jar.position, {
          y: `+=${Math.random() * 0.5}`,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
        
        // Subtle rotation
        gsap.to(jar.rotation, {
          x: Math.PI * 2,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          ease: "none"
        });
      });
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        
        // Dispose of all geometries and materials
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        
        renderer.dispose();
      };
    };
    
    setupThreeJS();
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
} 