
'use client';

import { checkLogin } from '@/utils/login';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type CalcState = 'first' | 'operator' | 'second';
type Operator = '+' | '-' | '?';

interface CalculatorData {
  state: CalcState;
  display: string;
  first: number;
  second: number;
  operator: Operator;
  lastChar: string;
}

const init = (): CalculatorData => ({
  state: 'first',
  display: '0',
  first: 0,
  second: 0,
  operator: '?',
  lastChar: '',
});

const insertSeparator = (
  str: string,
  separator = ' ',
  groupSize = 3
): string => {
  let resultString = '';
  let counter = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    resultString = str[i] + resultString;

    if (i !== 0 && counter % groupSize === groupSize - 1) {
      resultString = separator + resultString;
    }

    counter++;
  }

  return resultString;
};

export default function Page() {
  const router = useRouter();
    useEffect(() => checkLogin(router, "/calculator"), [router]);

  const dataRef = useRef<CalculatorData>(init());
  const [display, setDisplay] = useState('0');

  const render = () => {
    setDisplay(dataRef.current.display);
  };

  // Number click
  const numberClick = (num: number) => {
    const data = dataRef.current;

    switch (data.state) {
      case 'first':
        if (data.lastChar === '=') {
          data.display = String(num);
          data.lastChar = '';
        } else if (data.display === '0') {
          data.display = String(num);
        } else if (data.display.length < 9) {
          data.display += String(num);
        }
        break;

      case 'operator':
        data.display = String(num);
        data.state = 'second';
        break;

      case 'second':
        if (data.display === '0') {
          data.display = String(num);
        } else if (data.display.length < 9) {
          data.display += String(num);
        }
        break;
    }

    render();
  };

  // Operator click
  const operatorClick = (op: '+' | '-') => {
    const data = dataRef.current;

    switch (data.state) {
      case 'first':
        data.first = Number(data.display);
        data.operator = op;
        data.state = 'operator';
        break;

      case 'operator':
        data.operator = op;
        break;

      case 'second':
        data.second = Number(data.display);

        if (data.operator === '+') {
          data.first = data.first + data.second;
        } else if (data.operator === '-') {
          data.first = data.first - data.second;
        }

        data.display = String(data.first);
        data.operator = op;
        data.state = 'operator';
        break;
    }

    data.lastChar = '';
    render();
  };

  // Equal click
  const equalClick = () => {
    const data = dataRef.current;

    if (data.state === 'operator') {
      data.second = data.first;

      if (data.operator === '+') {
        data.first = data.first + data.second;
      } else if (data.operator === '-') {
        data.first = data.first - data.second;
      }

      data.display = String(data.first);
      data.state = 'first';
      data.lastChar = '=';
    } else if (data.state === 'second') {
      data.second = Number(data.display);

      if (data.operator === '+') {
        data.first = data.first + data.second;
      } else if (data.operator === '-') {
        data.first = data.first - data.second;
      }

      data.display = String(data.first);
      data.state = 'first';
      data.lastChar = '=';
    } else if (data.state === 'first' && data.lastChar === '=') {
      if (data.operator === '+') {
        data.first = data.first + data.second;
      } else if (data.operator === '-') {
        data.first = data.first - data.second;
      }

      data.display = String(data.first);
    }

    render();
  };

  // Clear
  const ceClick = () => {
    dataRef.current = init();
    render();
  };

  // Keyboard
  const handlersRef = useRef({
    numberClick,
    operatorClick,
    equalClick,
    ceClick,
  });

  handlersRef.current = {
    numberClick,
    operatorClick,
    equalClick,
    ceClick,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handlers = handlersRef.current;

      if (e.key >= '0' && e.key <= '9' && e.key.length === 1) {
        handlers.numberClick(Number(e.key));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handlers.equalClick();
      } else if (e.key === 'Escape') {
        handlers.ceClick();
      } else if (e.key === '+') {
        handlers.operatorClick('+');
      } else if (e.key === '-') {
        handlers.operatorClick('-');
      } else if (e.key === '=') {
        handlers.operatorClick('+');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Button style
  const buttonStyle = (color: string, disabled = false) => ({
    width: '70px',
    height: '64px',
    borderRadius: '6px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '22px',
    fontWeight: 'bold' as const,
    border: '1px solid #777',
    cursor: disabled ? 'default' : 'pointer',
    color: 'black',
    backgroundColor: color,
    boxShadow:
      'inset 0 1px 1px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    opacity: 1,
  });

  const blue = 'rgb(97, 97, 221)';
  const green = 'rgb(101, 236, 101)';
  const orange = 'rgb(239, 164, 24)';

  return (
    <main
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '40px 0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          border: '4px solid #4a4a4a',
          borderRadius: '12px',
          backgroundColor: '#555555',
          boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
          padding: '10px 10px 0 10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '12px',
            backgroundColor: '#dcdcdc',
            boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
          }}
        >
          {/* Screen */}
          <div
            style={{
              backgroundColor: 'rgb(127, 240, 240)',
              border: '1px solid #777',
              borderRadius: '5px',
              textAlign: 'right',
              height: '45px',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: '12px',
              fontSize: '28px',
              color: 'black',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {insertSeparator(display)}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '6px',
            }}
          >
            <button style={buttonStyle(green, true)} disabled>MC</button>
            <button style={buttonStyle(green, true)} disabled>MR</button>
            <button style={buttonStyle(green, true)} disabled>M+</button>
            <button style={buttonStyle(green, true)} disabled>M-</button>
            <button style={buttonStyle(orange)} onClick={ceClick}>CE</button>

            <button style={buttonStyle(blue)} onClick={() => numberClick(7)}>7</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(8)}>8</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(9)}>9</button>
            <button style={buttonStyle(green, true)} disabled>÷</button>
            <button style={buttonStyle(green, true)} disabled>√</button>

            <button style={buttonStyle(blue)} onClick={() => numberClick(4)}>4</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(5)}>5</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(6)}>6</button>
            <button style={buttonStyle(green, true)} disabled>×</button>
            <button style={buttonStyle(green, true)} disabled>%</button>

            <button style={buttonStyle(blue)} onClick={() => numberClick(1)}>1</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(2)}>2</button>
            <button style={buttonStyle(blue)} onClick={() => numberClick(3)}>3</button>
            <button style={buttonStyle(green)} onClick={() => operatorClick('-')}>−</button>
            <button style={buttonStyle(green, true)} disabled>1/x</button>

            <button style={buttonStyle(blue)} onClick={() => numberClick(0)}>0</button>
            <button style={buttonStyle(blue, true)} disabled>.</button>
            <button style={buttonStyle(blue, true)} disabled>±</button>
            <button style={buttonStyle(green)} onClick={() => operatorClick('+')}>+</button>
            <button style={buttonStyle(green)} onClick={equalClick}>=</button>
          </div>
        </div>

        {/* Student */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '12px',
            letterSpacing: '2px',
            padding: '8px 0',
            textAlign: 'center',
          }}
        >
          68051901 Saranyapong Saeueng
        </div>
      </div>
    </main>
  );
}
