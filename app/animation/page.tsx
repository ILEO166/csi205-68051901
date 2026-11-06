
'use client';

import { checkLogin } from '@/utils/login';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type BallType =
  | 'none'
  | 'basketball'
  | 'football'
  | 'volleyball'
  | 'face';

export default function Page() {

  const router = useRouter();
    useEffect(() => checkLogin(router, "/animation"), [router]);

  // Default settings
  const fieldWidth = 640;
  const fieldHeight = 480;
  const ballRadius = 50;
  const velocity = 100;

  // Internal calculation
  const ballDiameter = ballRadius * 2;
  const xVelocity = Math.round(velocity * Math.sqrt(2));                                 
  const yVelocity = Math.round(velocity * Math.sqrt(2));

  const frameRate = 25;
  const frameTime = 1 / frameRate;

  const xMax = fieldWidth - ballDiameter - 4;
  const yMax = fieldHeight - ballDiameter - 4;

  const rotationSpeed = 180;

  // State
  const [ballType, setBallType] = useState<BallType>('none');
  const [running, setRunning] = useState(false);
  const [moveRight, setMoveRight] = useState(true);
  const [moveDown, setMoveDown] = useState(true);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);



  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ไม่ให้ Spacebar เลื่อนหน้าเว็บหรือกดปุ่มที่มีโฟกัส
      if (event.code === 'Space') {
        event.preventDefault();

        if (event.repeat) return;

        setRunning((prev) => !prev);
      }

      // Change ball type
      if (event.code === 'Digit1' || event.code === 'Numpad1') {
        setBallType('none');
      } else if (event.code === 'Digit2' || event.code === 'Numpad2') {
        setBallType('basketball');
      } else if (event.code === 'Digit3' || event.code === 'Numpad3') {
        setBallType('football');
      } else if (event.code === 'Digit4' || event.code === 'Numpad4') {
        setBallType('volleyball');
      } else if (event.code === 'Digit5' || event.code === 'Numpad5') {
        setBallType('face');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Animation timer
  useEffect(() => {
    if (!running) return;

    timer.current = setTimeout(() => {
      // X axis
      let xNext: number;

      if (moveRight) {
        xNext = x + xVelocity / frameRate;

        if (xNext >= xMax) {
          xNext = xMax - (xNext - xMax);
          setMoveRight(false);
        }
      } else {
        xNext = x - xVelocity / frameRate;

        if (xNext <= 0) {
          xNext = -xNext;
          setMoveRight(true);
        }
      }

      setX(xNext);

      // Y axis
      let yNext: number;

      if (moveDown) {
        yNext = y + yVelocity / frameRate;

        if (yNext >= yMax) {
          yNext = yMax - (yNext - yMax);
          setMoveDown(false);
        }
      } else {
        yNext = y - yVelocity / frameRate;

        if (yNext <= 0) {
          yNext = -yNext;
          setMoveDown(true);
        }
      }

      setY(yNext);

      // Rotation
      setRotation((prev) =>
        (prev + rotationSpeed / frameRate) % 360
      );
    }, frameTime * 1000);

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [
    running,
    x,
    y,
    moveRight,
    moveDown,
    xVelocity,
    yVelocity,
    xMax,
    yMax,
    frameTime,
    rotationSpeed,
  ]);

  // Ball images
  const ballImages: Record<BallType, string> = {
    none: '',
    basketball: '/basketball.png',
    football: '/football.png',
    volleyball: '/volleyball.png',
    face: '/face.jpg',
  };

  // Ball buttons
  const ballButtons: { label: string; value: BallType }[] = [
    { label: 'None', value: 'none' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Football', value: 'football' },
    { label: 'Volleyball', value: 'volleyball' },
    { label: 'Face', value: 'face' },
  ];

  return (
    <main className='flex flex-col items-center gap-6 p-4'>

      {/* Animation field */}
      <div
        className='relative overflow-hidden rounded-3xl border-2 border-black'
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          maxWidth: '100%',
          backgroundImage: 'url(/field.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Ball */}
        <div
          className='absolute rounded-full border border-black'
          style={{
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
            backgroundColor: 'lightgray',
            backgroundImage: ballImages[ballType]
              ? `url(${ballImages[ballType]})`
              : 'none',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            top: `${y}px`,
            left: `${x}px`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap items-center justify-center gap-3'>

        {/* Play / Pause */}
        <button
          className={`rounded-lg px-6 py-3 font-semibold text-white ${
            running
              ? 'bg-red-600'
              : 'bg-green-600'
          }`}
          onClick={() => setRunning((prev) => !prev)}
        >
          {running ? '⏸ Pause' : '▶ Play'}
        </button>

        {/* Ball Type Buttons */}
        {ballButtons.map((ball) => (
          <button
            key={ball.value}
            onClick={() => setBallType(ball.value)}
            className={`rounded-lg border px-4 py-3 transition-colors ${
              ballType === ball.value
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-400 bg-white text-black hover:bg-gray-100'
            }`}
          >
            {ball.label}
          </button>
        ))}
      </div>
    </main>
  );
}
