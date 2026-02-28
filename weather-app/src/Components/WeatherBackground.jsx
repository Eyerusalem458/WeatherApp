import { useEffect, useRef, useState } from "react";
import "../styles/WeatherBackground.css";

function WeatherBackground({ condition, isNight }) {
  const canvasRef = useRef(null);
  const [fade, setFade] = useState(false);

  const main = condition?.toLowerCase() || "";

  // Fade transition on weather change
  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 500);
    return () => clearTimeout(timeout);
  }, [condition]);

  // Ultra-real rain particles using canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drops = [];
    const numDrops =
      main.includes("rain") ||
      main.includes("drizzle") ||
      main.includes("thunder")
        ? 300
        : 0;

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 10 + Math.random() * 15,
        velocityY: 4 + Math.random() * 4,
        velocityX: -1 + Math.random() * 2, // wind effect
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 2;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.velocityX * 2, d.y + d.length);
        ctx.stroke();
        d.x += d.velocityX;
        d.y += d.velocityY;
        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
        if (d.x > canvas.width) d.x = 0;
        if (d.x < 0) d.x = canvas.width;
      });
      animationId = requestAnimationFrame(animate);
    };

    if (numDrops > 0) animate();

    return () => cancelAnimationFrame(animationId);
  }, [main]);

  return (
    <div
      className={`weather-bg-container transition-opacity duration-1000 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      {/* Canvas for rain */}
      {(main.includes("rain") ||
        main.includes("drizzle") ||
        main.includes("thunder")) && (
        <canvas ref={canvasRef} className="weather-canvas"></canvas>
      )}

      {/* Clouds */}
      {main.includes("cloud") && <div className="clouds"></div>}

      {/* Sun / Moon */}
      {main.includes("clear") && !isNight && <div className="sun"></div>}
      {main.includes("clear") && isNight && <div className="moon"></div>}

      {/* Snow */}
      {main.includes("snow") && <div className="snow"></div>}

      {/* Fog / Mist / Haze */}
      {(main.includes("mist") ||
        main.includes("fog") ||
        main.includes("haze") ||
        main.includes("smoke")) && <div className="fog"></div>}

      {/* Lightning */}
      {main.includes("thunder") && <div className="lightning"></div>}

      {/* Stars at night */}
      {isNight && <div className="stars"></div>}
    </div>
  );
}

export default WeatherBackground;
