'use client';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Brain, Zap, Bug, TestTube, Eye, Link2 } from 'lucide-react';

// Matrix characters for signals
const MATRIX_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Define neuron types and their characteristics
const NEURON_TYPES = {
  SENSORY: {
    color: 'rgb(28, 255, 179)',  // Softer teal green
    char: 'S',
    connectionProbability: 0.04,
    pulseSpeed: 0.08,
    size: 3.8,
    maxConnections: 6,
    glowIntensity: 0.6
  },
  MOTOR: {
    color: 'rgb(20, 184, 166)',  // Darker teal
    char: 'M',
    connectionProbability: 0.03,
    pulseSpeed: 0.06,
    size: 3.5,
    maxConnections: 5,
    glowIntensity: 0.5
  },
  INTERNEURON: {
    color: 'rgb(94, 234, 212)',  // Light teal
    char: 'I',
    connectionProbability: 0.05,
    pulseSpeed: 0.07,
    size: 3.2,
    maxConnections: 7,
    glowIntensity: 0.4
  },
  MUSCLE: {
    color: 'rgb(17, 94, 89)',  // Deep teal
    char: 'C',
    connectionProbability: 0.03,
    pulseSpeed: 0.05,
    size: 3.6,
    maxConnections: 4,
    glowIntensity: 0.5
  }
} as const;

type NeuronType = keyof typeof NEURON_TYPES;

interface Neuron {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  type: NeuronType;
  pulse: number;
  lastConnectionTime: number;
}

interface Connection {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
  life: number;
  strength: number;
  startType: NeuronType;
  endType: NeuronType;
  travelingSignals: Array<{
    progress: number;
    speed: number;
    intensity: number;
  }>;
}

export const MatrixBrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sphereCenter, setSphereCenter] = useState({ x: 0, y: 0 });
  const [sphereRadius, setSphereRadius] = useState(0);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  // Memoize the project function
  const project = useMemo(() => {
    return (x: number, y: number, z: number, rotation: number, canvas: HTMLCanvasElement, radius: number) => {
      const rotatedX = x * Math.cos(rotation) - z * Math.sin(rotation);
      const rotatedZ = x * Math.sin(rotation) + z * Math.cos(rotation);
      const perspective = 1000;
      const scale = perspective / (perspective + rotatedZ + radius);
      
      return {
        x: canvas.width/2 + rotatedX * scale,
        y: canvas.height/2 + y * scale,
        z: rotatedZ
      };
    };
  }, []);

  // Optimize connection creation with better distance calculation
  const createConnection = useCallback((
    source: Neuron,
    target: Neuron,
    radius: number,
    currentTime: number
  ) => {
    const sourceType = NEURON_TYPES[source.type];
    const existingConnections = connectionsRef.current.filter(
      c => (c.start.x === source.x && c.start.y === source.y && c.start.z === source.z) || 
          (c.end.x === source.x && c.end.y === source.y && c.end.z === source.z)
    ).length;

    if (existingConnections >= sourceType.maxConnections) return;

    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dz = target.z - source.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (dist > radius * 0.5) return;

    // Calculate connection strength based on distance
    const strength = Math.max(0.3, 1 - (dist / (radius * 0.5)));

    connectionsRef.current.push({
      start: { x: source.x, y: source.y, z: source.z },
      end: { x: target.x, y: target.y, z: target.z },
      life: 1.0,
      strength,
      startType: source.type,
      endType: target.type,
      travelingSignals: [{
        progress: 0,
        speed: 0.03 + Math.random() * 0.04,
        intensity: 0.6 + Math.random() * 0.4
      }]
    });
    source.lastConnectionTime = currentTime;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Enable alpha blending optimization
    ctx.globalCompositeOperation = 'lighter';

    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      const newRadius = Math.min(width, height) * 0.3;
      setSphereRadius(newRadius);
      setSphereCenter({ x: width / 2, y: height / 2 });
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize neurons with optimized distribution
    const numPoints = 180; // Reduced for better performance
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    let rotation = 0;

    // Create neurons with improved distribution
    neuronsRef.current = Array.from({ length: numPoints }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Improved neuron type assignment
      const heightRatio = y / radius;
      const radiusRatio = Math.sqrt(x * x + z * z) / radius;
      const angleRatio = (Math.atan2(z, x) + Math.PI) / (2 * Math.PI);

      let type: NeuronType;
      if (heightRatio > 0.3) type = 'SENSORY';
      else if (heightRatio < -0.3) type = 'MOTOR';
      else if (radiusRatio > 0.7 && angleRatio < 0.5) type = 'MUSCLE';
      else type = 'INTERNEURON';

      return {
        x, y, z,
        screenX: 0,
        screenY: 0,
        type,
        pulse: Math.random() * Math.PI * 2,
        lastConnectionTime: 0
      };
    });

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.0004 * deltaTime;

      // Update neurons with optimized calculations
      neuronsRef.current.forEach(neuron => {
        const projected = project(neuron.x, neuron.y, neuron.z, rotation, canvas, radius);
        neuron.screenX = projected.x;
        neuron.screenY = projected.y;
        neuron.pulse += NEURON_TYPES[neuron.type].pulseSpeed * deltaTime * 0.05;
      });

      // Sort neurons by depth for correct rendering
      const sortedNeurons = [...neuronsRef.current].sort((a, b) => {
        const projA = project(a.x, a.y, a.z, rotation, canvas, radius);
        const projB = project(b.x, b.y, b.z, rotation, canvas, radius);
        return projB.z - projA.z;
      });

      // Draw and update neurons
      sortedNeurons.forEach((neuron) => {
        const neuronStyle = NEURON_TYPES[neuron.type];
        const currentTime = timestamp;
        
        // Create new connections with optimized timing
        if (currentTime - neuron.lastConnectionTime > 800 && 
            Math.random() < neuronStyle.connectionProbability * (deltaTime / 16)) {
          
          const nearbyNeurons = neuronsRef.current.filter(n => n !== neuron);
          if (nearbyNeurons.length > 0) {
            const target = nearbyNeurons[Math.floor(Math.random() * nearbyNeurons.length)];
            createConnection(neuron, target, radius, currentTime);
          }
        }

        // Enhanced neuron rendering
        const projected = project(neuron.x, neuron.y, neuron.z, rotation, canvas, radius);
        const depth = (projected.z + radius) / (2 * radius);
        const pulseScale = 1 + Math.sin(neuron.pulse) * 0.15;
        const size = neuronStyle.size * pulseScale * (0.5 + depth * 0.5);
        const intensity = (Math.sin(neuron.pulse) + 1) * 0.5;
        const opacity = 0.2 + depth * 0.5;

        // Draw enhanced glow with larger radius
        const gradient = ctx.createRadialGradient(
          neuron.screenX, neuron.screenY, 0,
          neuron.screenX, neuron.screenY, size * 3.5
        );
        gradient.addColorStop(0, neuronStyle.color.replace('rgb', 'rgba').replace(')', `, ${opacity * neuronStyle.glowIntensity * 0.7})`));
        gradient.addColorStop(0.5, neuronStyle.color.replace('rgb', 'rgba').replace(')', `, ${opacity * neuronStyle.glowIntensity * 0.3})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(neuron.screenX, neuron.screenY, size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw neuron core with enhanced effect
        ctx.beginPath();
        ctx.arc(neuron.screenX, neuron.screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = neuronStyle.color.replace('rgb', 'rgba').replace(')', `, ${opacity * (0.4 + intensity * 0.6)})`);
        ctx.fill();

        // Draw character with improved visibility
        ctx.font = `bold ${12 * pulseScale * (0.5 + depth * 0.5)}px monospace`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * intensity * 0.9})`;
        ctx.fillText(neuronStyle.char, neuron.screenX - 4, neuron.screenY + 4);
      });

      // Update and draw connections with enhanced effects
      for (let i = connectionsRef.current.length - 1; i >= 0; i--) {
        const connection = connectionsRef.current[i];
        
        const projectedStart = project(connection.start.x, connection.start.y, connection.start.z, rotation, canvas, radius);
        const projectedEnd = project(connection.end.x, connection.end.y, connection.end.z, rotation, canvas, radius);
        const depth = (projectedStart.z + projectedEnd.z + 2 * radius) / (4 * radius);

        // Enhanced connection gradient
        const startColor = NEURON_TYPES[connection.startType].color;
        const endColor = NEURON_TYPES[connection.endType].color;
        
        const gradient = ctx.createLinearGradient(
          projectedStart.x, projectedStart.y,
          projectedEnd.x, projectedEnd.y
        );
        gradient.addColorStop(0, startColor.replace('rgb', 'rgba').replace(')', `, ${depth * connection.life * connection.strength * 0.6})`));
        gradient.addColorStop(0.5, `rgba(28, 255, 179, ${depth * connection.life * connection.strength * 0.3})`);
        gradient.addColorStop(1, endColor.replace('rgb', 'rgba').replace(')', `, ${depth * connection.life * connection.strength * 0.6})`));
        
        // Draw main connection with thinner line
        ctx.beginPath();
        ctx.moveTo(projectedStart.x, projectedStart.y);
        ctx.lineTo(projectedEnd.x, projectedEnd.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 * connection.strength * depth;
        ctx.stroke();

        // Draw enhanced glow effect with larger spread
        ctx.beginPath();
        ctx.moveTo(projectedStart.x, projectedStart.y);
        ctx.lineTo(projectedEnd.x, projectedEnd.y);
        ctx.strokeStyle = `rgba(28, 255, 179, ${depth * 0.15})`;
        ctx.lineWidth = 3 * connection.strength * depth;
        ctx.stroke();

        // Update and draw traveling signals
        for (let j = connection.travelingSignals.length - 1; j >= 0; j--) {
          const signal = connection.travelingSignals[j];
          signal.progress += signal.speed * deltaTime * 0.05;
          
          if (signal.progress > 1) {
            connection.travelingSignals.splice(j, 1);
            // Add new signal with probability
            if (Math.random() < 0.3 && connection.travelingSignals.length < 2) {
              connection.travelingSignals.push({
                progress: 0,
                speed: 0.03 + Math.random() * 0.04,
                intensity: 0.6 + Math.random() * 0.4
              });
            }
            continue;
          }

          const signalPos = {
            x: connection.start.x + (connection.end.x - connection.start.x) * signal.progress,
            y: connection.start.y + (connection.end.y - connection.start.y) * signal.progress,
            z: connection.start.z + (connection.end.z - connection.start.z) * signal.progress
          };
          
          const projectedSignal = project(signalPos.x, signalPos.y, signalPos.z, rotation, canvas, radius);
          const signalDepth = (projectedSignal.z + radius) / (2 * radius);
          
          // Enhanced signal rendering with softer glow
          const signalSize = 2.5 * signal.intensity * (0.5 + signalDepth * 0.5);
          
          // Improved glow effect with larger radius
          const signalGradient = ctx.createRadialGradient(
            projectedSignal.x, projectedSignal.y, 0,
            projectedSignal.x, projectedSignal.y, signalSize * 3
          );
          signalGradient.addColorStop(0, `rgba(28, 255, 179, ${signalDepth * connection.life * signal.intensity * 0.7})`);
          signalGradient.addColorStop(0.5, `rgba(28, 255, 179, ${signalDepth * connection.life * signal.intensity * 0.3})`);
          signalGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(projectedSignal.x, projectedSignal.y, signalSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = signalGradient;
          ctx.fill();

          // Draw signal core
          ctx.beginPath();
          ctx.arc(projectedSignal.x, projectedSignal.y, signalSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 70, ${signalDepth * connection.life * signal.intensity})`;
          ctx.fill();

          // Add matrix character with improved visibility
          if (Math.random() < 0.08) {
            ctx.font = `bold ${signalSize * 2}px monospace`;
            ctx.fillStyle = `rgba(255, 255, 255, ${signalDepth * connection.life * signal.intensity * 0.9})`;
            ctx.fillText(
              MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              projectedSignal.x - signalSize,
              projectedSignal.y + signalSize
            );
          }
        }

        // Optimized connection life decay
        connection.life -= 0.0008 * deltaTime;
        if (connection.life <= 0) {
          connectionsRef.current.splice(i, 1);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [project, createConnection]);

  return (
    <div className="relative w-full h-screen max-md:h-[140vh]">
      <canvas
        ref={canvasRef}
        className="absolute max-md:hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-70"
        style={{ mixBlendMode: 'screen' }}
      />
      <div 
        className="absolute  max-md:hidden pointer-events-none h-64 w-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${sphereCenter.x}px`,
          top: `${sphereCenter.y}px`,
          transform: `translate(-50%, -50%) scale(${sphereRadius / 500})`
        }}
      >
        <div className="material scale-[0.8]" style={{ opacity: 0.8 }}>
          {[...Array(24)].map((_, i) => (
            <div key={i} className="dna" />
          ))}
        </div>
      </div>

      {/* Features Container - Now with responsive classes */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 py-8 pointer-events-none">
        {/* Left Features Section */}
        <div className="w-full lg:w-96 space-y-4 mb-8 lg:mb-0">
          {[
            {
              title: "Neural Network Simulation",
              description: "Advanced biological simulation featuring specialized neurons: movement, sensory, motor, and interneurons working in harmony.",
              icon: Brain
            },
            {
              title: "Real-Time Adaptation",
              description: "Dynamic weight adjustments based on blockchain transactions and environmental stimuli, enabling continuous learning and evolution.",
              icon: Zap
            },
            {
              title: "Biological Mimicry",
              description: "Inspired by tardigrades' resilience, simulating their unique survival abilities and adaptability to extreme conditions.",
              icon: Bug
            }
          ].map((feature, index) => (
            <div key={feature.title} className="relative group">
              {/* Connection line - Hidden on mobile */}
              <div 
                className="hidden lg:block absolute left-full top-1/2 w-32 h-px bg-gradient-to-r from-white via-white/50 to-transparent"
                style={{
                  transform: `rotate(${(index - 1) * -15}deg)`,
                  transformOrigin: 'left center',
                  opacity: 0,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 200 + 500}ms`
                }}
              />
              
              <div
                className="opacity-0 lg:-translate-x-4 animate-fade-in-up bg-black/40 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-neutral-800 hover:border-white transition-all duration-300 lg:hover:-translate-x-2 relative z-10 pointer-events-auto"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="flex items-start space-x-4">
                  <feature.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-neutral-200 mb-2 bg-clip-text text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Features Section */}
        <div className="w-full lg:w-96 space-y-4">
          {[
            {
              title: "Research Applications",
              description: "Enabling studies in extreme environments, space exploration, and synthetic biology through advanced simulation.",
              icon: TestTube
            },
            {
              title: "Interactive Learning",
              description: "Real-time visualization of neural interactions, allowing users to observe and understand complex biological processes.",
              icon: Eye
            },
            {
              title: "Decentralized Evolution",
              description: "Community-driven development where each interaction shapes the organism's neural pathways and behavior.",
              icon: Link2
            }
          ].map((feature, index) => (
            <div key={feature.title} className="relative">
              {/* Connection line - Hidden on mobile */}
              <div 
                className="hidden lg:block absolute right-full top-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-white"
                style={{
                  transform: `rotate(${(index - 1) * 10}deg)`,
                  transformOrigin: 'right center',
                  opacity: 0,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 200 + 500}ms`
                }}
              />
              
              <div
                className="opacity-0 lg:translate-x-4 animate-fade-in-up bg-black/40 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-neutral-800 hover:border-white transition-all duration-300 lg:hover:translate-x-2 pointer-events-auto"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="flex items-start space-x-4">
                  <feature.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-neutral-200 mb-2 bg-clip-text text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}; 
