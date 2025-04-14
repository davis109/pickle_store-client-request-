'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ThreeJsPickleJars() {
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
      
      // Create lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      
      // Add spotlight for dramatic effect
      const spotlight = new THREE.SpotLight(0xffa95c, 1);
      spotlight.position.set(-5, 10, 2);
      spotlight.angle = 0.15;
      spotlight.penumbra = 1;
      scene.add(spotlight);
      
      // Create multiple pickle jar types
      const createPickleJar = (type, position) => {
        const jarGroup = new THREE.Group();
        let jarMaterial, jarGeometry, capGeometry, capMaterial;
        
        // Different jar types
        switch(type) {
          case 'mango':
            // Wide jar for mango pickle
            jarGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1.5, 32);
            jarMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xd4e9e2,
              transparent: true,
              opacity: 0.7,
              roughness: 0.1,
              metalness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1
            });
            
            // Orange contents
            const contents = new THREE.Mesh(
              new THREE.CylinderGeometry(0.75, 0.75, 1.0, 32),
              new THREE.MeshStandardMaterial({
                color: 0xff9933, // Mango orange
                roughness: 0.8
              })
            );
            contents.position.y = -0.2;
            jarGroup.add(contents);
            break;
            
          case 'lemon':
            // Tall jar for lemon pickle
            jarGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2.0, 32);
            jarMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xd4f0dd,
              transparent: true,
              opacity: 0.6,
              roughness: 0.1,
              metalness: 0.2,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1
            });
            
            // Yellow contents
            const lemonContents = new THREE.Mesh(
              new THREE.CylinderGeometry(0.45, 0.45, 1.4, 32),
              new THREE.MeshStandardMaterial({
                color: 0xf2d649, // Lemon yellow
                roughness: 0.7
              })
            );
            lemonContents.position.y = -0.2;
            jarGroup.add(lemonContents);
            break;
            
          case 'chili':
            // Short wide jar for chili pickle
            jarGeometry = new THREE.CylinderGeometry(0.7, 0.6, 1.2, 32);
            jarMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xdfe9e2,
              transparent: true,
              opacity: 0.65,
              roughness: 0.15,
              metalness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1
            });
            
            // Red contents
            const chiliContents = new THREE.Mesh(
              new THREE.CylinderGeometry(0.55, 0.45, 0.9, 32),
              new THREE.MeshStandardMaterial({
                color: 0xcc3311, // Chili red
                roughness: 0.8
              })
            );
            chiliContents.position.y = -0.1;
            jarGroup.add(chiliContents);
            break;
            
          default:
            // Default classic jar
            jarGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 32);
            jarMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xd4f0e2,
              transparent: true,
              opacity: 0.6,
              roughness: 0.1,
              metalness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1
            });
        }
        
        // Create the jar
        const jar = new THREE.Mesh(jarGeometry, jarMaterial);
        jarGroup.add(jar);
        
        // Add metal cap to all jars
        capGeometry = new THREE.CylinderGeometry(
          jarGeometry.parameters.radiusTop + 0.05, 
          jarGeometry.parameters.radiusTop + 0.05, 
          0.15, 
          32
        );
        capMaterial = new THREE.MeshStandardMaterial({
          color: 0xdaa520, // Golden color for metal caps
          roughness: 0.4,
          metalness: 0.8
        });
        
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = jarGeometry.parameters.height / 2 + 0.075;
        jarGroup.add(cap);
        
        // Add label texture (simplified)
        const labelGeometry = new THREE.PlaneGeometry(
          jarGeometry.parameters.radiusTop * 1.8, 
          jarGeometry.parameters.height * 0.6
        );
        const labelMaterial = new THREE.MeshStandardMaterial({
          color: type === 'mango' ? 0xffcc88 : 
                 type === 'lemon' ? 0xffffaa : 
                 type === 'chili' ? 0xffaaaa : 0xffffff,
          roughness: 0.8,
          side: THREE.DoubleSide
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.rotation.y = Math.PI / 2;
        label.position.z = jarGeometry.parameters.radiusTop + 0.01;
        jarGroup.add(label);
        
        // Add spices floating inside (small particles)
        const spiceGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const spiceMaterials = [
          new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Red chili
          new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Turmeric
          new THREE.MeshStandardMaterial({ color: 0x000000 }), // Black mustard
          new THREE.MeshStandardMaterial({ color: 0x663300 }), // Fenugreek
        ];
        
        const spicesCount = 30;
        const spices = [];
        
        for (let i = 0; i < spicesCount; i++) {
          const material = spiceMaterials[Math.floor(Math.random() * spiceMaterials.length)];
          const spice = new THREE.Mesh(spiceGeometry, material);
          
          // Position inside jar
          const radius = Math.random() * (jarGeometry.parameters.radiusTop * 0.7);
          const theta = Math.random() * Math.PI * 2;
          const y = (Math.random() - 0.5) * jarGeometry.parameters.height * 0.8;
          
          spice.position.x = radius * Math.cos(theta);
          spice.position.y = y;
          spice.position.z = radius * Math.sin(theta);
          
          jarGroup.add(spice);
          spices.push(spice);
        }
        
        // Store spices for animation
        jarGroup.userData.spices = spices;
        
        // Position the jar
        jarGroup.position.copy(position);
        
        // Add a subtle platform beneath the jar
        const platformGeometry = new THREE.CylinderGeometry(
          jarGeometry.parameters.radiusBottom + 0.2, 
          jarGeometry.parameters.radiusBottom + 0.3, 
          0.1, 
          32
        );
        const platformMaterial = new THREE.MeshStandardMaterial({
          color: 0x663300, // Wood color
          roughness: 0.9
        });
        
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -jarGeometry.parameters.height / 2 - 0.05;
        jarGroup.add(platform);
        
        return jarGroup;
      };
      
      // Create multiple jars with different types
      const jarTypes = ['mango', 'lemon', 'chili', 'default', 'mango'];
      const jars = [];
      
      // Position jars in a circular pattern
      const radius = 4;
      for (let i = 0; i < jarTypes.length; i++) {
        const angle = (i / jarTypes.length) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        
        const position = new THREE.Vector3(x, 0, z);
        const jar = createPickleJar(jarTypes[i], position);
        
        // Rotate jars to face center
        jar.rotation.y = angle + Math.PI;
        
        scene.add(jar);
        jars.push(jar);
      }
      
      // Add floating spice particles in the background
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorsArray = new Float32Array(particlesCount * 3);
      
      // Colors for spices
      const colors = [
        [1.0, 0.3, 0.0],  // Red chili
        [0.9, 0.8, 0.0],  // Turmeric
        [0.5, 0.3, 0.0],  // Cinnamon
        [0.3, 0.6, 0.1],  // Coriander
      ];
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position in a large sphere
        const radius = 8 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = (Math.random() - 0.5) * 5;
        posArray[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
        
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
        size: 0.08,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        blending: THREE.AdditiveBlending
      });
      
      // Points
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Position camera and add orbit controls
      camera.position.set(0, 2, 10);
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      // Mouse interaction for parallax effect
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      
      function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
      }
      
      document.addEventListener('mousemove', onDocumentMouseMove);
      
      // Animation
      const clock = new THREE.Clock();
      
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Update controls
        controls.update();
        
        // Calculate parallax effect
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        
        // Apply subtle camera movement based on mouse
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Animate particles
        particlesMesh.rotation.y = elapsedTime * 0.05;
        
        // Animate spices inside jars
        jars.forEach((jar) => {
          jar.userData.spices.forEach((spice, i) => {
            // Create floating movement for spices
            spice.position.y += Math.sin(elapsedTime + i) * 0.0008;
            spice.position.x += Math.cos(elapsedTime / 2 + i) * 0.0004;
            spice.position.z += Math.sin(elapsedTime / 3 + i) * 0.0004;
          });
        });
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // GSAP animations for jars
      jars.forEach((jar, index) => {
        // Intro animation - jars rise from below
        gsap.fromTo(
          jar.position,
          { y: -5 },
          {
            y: jar.position.y,
            duration: 1.5,
            delay: 0.2 * index,
            ease: "elastic.out(1, 0.8)"
          }
        );
        
        // Continuous subtle floating
        gsap.to(jar.position, {
          y: jar.position.y + 0.3,
          duration: 1.5 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.2
        });
        
        // Subtle rotation
        gsap.to(jar.rotation, {
          y: jar.rotation.y + 0.2,
          duration: 6 + Math.random() * 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
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
        
        controls.dispose();
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