"use client";
import { useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { useEffect, useState } from "react";

export default function GoldParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="gold-particles"
      particlesLoaded={particlesLoaded}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#FFD700", "#D4AF37", "#fff8dc"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.6, max: 1 },
          },
          size: {
            value: { min: 1.5, max: 3.5 },
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 100,
              size: 4,
              duration: 0.7,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}