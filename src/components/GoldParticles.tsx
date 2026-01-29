"use client";
import { useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";
import { Particles } from "@tsparticles/react";

export default function GoldParticles() {
  // Configuración de partículas doradas
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="gold-particles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 30,
        particles: {
            number: {
              value: 70,
              density: { enable: true },
            },
          color: {
            value: ["#FFD700", "#D4AF37", "#fff8dc"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.6, max: 1 },
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.6,
              sync: false,
            },
          },
          size: {
            value: { min: 1.5, max: 3.5 },
            animation: {
              enable: true,
              speed: 0.15,
              minimumValue: 1.5,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.10,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          links: {
            enable: false,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 100,
              duration: 0.7,
              size: 4,
              opacity: 1,
            },
            repulse: {
              distance: 70,
              duration: 0.5,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
