import { useState } from 'react';
import './app.css'

function App() {

  const [main, setMain] = useState<string>('');
  const [notFloat, setNotFloat] = useState<boolean>(true);
  const [span, setSpan] = useState<string>('');
  const [eqFlag, setEqFlag] = useState<boolean>(false);


  return (
    <>
      <h1>Simple Calculator!</h1>
      <div className="flx-calc">
        <input type="text" id='input' className='flex-itm inputflx' value={main} />
        <label htmlFor="input" className='lableshow flex-itm'>{span}</label>
        <div className="grid-container flex-itm">
          <button onClick={() => { handleDelete() }} className="grid-item bc">DEL</button>
          <button onClick={() => { handleClean() }} className="grid-item bc">AC</button>
          <button onClick={() => { handleoprator('\u00F7') }} className="grid-item bdiv">&divide;</button>
          <button onClick={() => { handleoprator('\u00D7') }} className="grid-item bcross">&times;</button>
          <button onClick={() => { handleNumber("7") }} className="grid-item b7">7</button>
          <button onClick={() => { handleNumber("8") }} className="grid-item b8">8</button>
          <button onClick={() => { handleNumber("9") }} className="grid-item b9">9</button>
          <button onClick={() => { handleoprator('-') }} className="grid-item bmin">-</button>
          <button onClick={() => { handleNumber("4") }} className="grid-item b4">4</button>
          <button onClick={() => { handleNumber("5") }} className="grid-item b5">5</button>
          <button onClick={() => { handleNumber("6") }} className="grid-item b6">6</button>
          <button onClick={() => { handleoprator('+') }} className="grid-item bplus">+</button>
          <button onClick={() => { handleNumber("1") }} className="grid-item b1">1</button>
          <button onClick={() => { handleNumber("2") }} className="grid-item b2">2</button>
          <button onClick={() => { handleNumber("3") }} className="grid-item b3">3</button>
          <button onClick={() => { handleNumber("0") }} className="grid-item b0">0</button>
          <button onClick={() => { handleDot() }} className="grid-item bdot">.</button>
          <button onClick={() => { handleEqu() }} className="grid-item beq">=</button>
        </div>
      </div >
      <ul>
        <li>Please check for bugs and report them !</li>
      </ul>
    </>
  );

  function handleNumber(n: string): void {
    if (!eqFlag) {
      setMain((prevMain) => {
        return prevMain + n;
      });
      setSpan((prevSpan) => {
        return prevSpan + n;
      })
    }
  }

  function handleDot() {
    if (notFloat && !eqFlag) {
      setMain((prevMain) => {
        return prevMain + ".";
      })
      setSpan((prevSpan) => {
        return prevSpan + ".";
      })
      setNotFloat(false);
    }
  }

  function handleClean(): void {
    setMain('');
    setSpan('');
    setNotFloat(true);
    setEqFlag(false)
  }

  function handleDelete() {
    if (main !== '' && main.slice(-1) !== "." && !eqFlag) {
      setMain(prevMain => {
        return prevMain.slice(0, -1)
      })
      setSpan(prevSpan => {
        return prevSpan.slice(0, -1)
      })
    } else if (main !== '' && main.slice(-1) === "." && !eqFlag) {
      setSpan(prevSpan => {
        return prevSpan.slice(0, -1)
      })
      setMain(prevMain => {
        setNotFloat(true);
        return prevMain.slice(0, -1)
      })
    }
  }

  function handleoprator(item: string) {
    setNotFloat(true);
    if (main !== '' && !eqFlag) {
      setSpan((prevSpan) => {
        return prevSpan + item;
      });
      setMain('');
    } else if (main === '' && span === '') {
      return;
    } else if (main === '' && span !== '' && !eqFlag) {
      setSpan((prevSpan) => {
        return prevSpan.slice(0, -1) + item;
      });
    }
  }

  function handleEqu() {
    if (span && !eqFlag) {
      if (["+", "-", "\u00F7", "\u00D7"].includes(span.slice(-1))) {
        setSpan(prevSpan => {
          setEqFlag(true);
          setMain(calculate(prevSpan.slice(0, -1)));
          return prevSpan.slice(0, -1) + "=" + calculate(prevSpan.slice(0, -1));
        });
      } else {
        setEqFlag(true);
        setMain(calculate(span));
        setSpan(prevSpan => {
          return prevSpan + "=" + calculate(span)
        })
      }
    }
  }


  // mantegh mohasebe riazi yek reshte!
  function calculate(span: string): string {

    const myNumbers = span.split(/[+\-\u00F7\u00D7]/).map(item => parseFloat(item));
    const myOperateor = span.match(/[+\-\u00F7\u00D7]/g);

    if (myOperateor?.length) {
      let i = 0;
      while (i < myOperateor.length) {
        if (myOperateor[i] === '\u00D7') {
          let eq = myNumbers[i] * myNumbers[i + 1];
          myNumbers[i] = eq;
          myNumbers.splice(i + 1, 1);
          myOperateor.splice(i, 1);
        } else if (myOperateor[i] === '\u00F7' && myNumbers[i + 1] !== 0) {
          let eq = myNumbers[i] / myNumbers[i + 1];
          myNumbers[i] = eq;
          myNumbers.splice(i + 1, 1);
          myOperateor.splice(i, 1);
        } else if (myOperateor[i] === '\u00F7' && myNumbers[i + 1] === 0) {
          return "Invalid";
        } else { i++; }
      }
    }

    if (myOperateor?.length) {
      let i = 0;
      while (i < myOperateor.length) {
        if (myOperateor[i] === '+') {
          let eq = myNumbers[i] + myNumbers[i + 1];
          myNumbers[i] = eq;
          myNumbers.splice(i + 1, 1);
          myOperateor.splice(i, 1);
        } else if (myOperateor[i] === '-') {
          let eq = myNumbers[i] - myNumbers[i + 1];
          myNumbers[i] = eq;
          myNumbers.splice(i + 1, 1);
          myOperateor.splice(i, 1);
        } else { i++; }
      }
    }

    return String(myNumbers[0]);
  }


}
export default App;
