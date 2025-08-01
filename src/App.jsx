import {useOptimistic, useState} from "react";
import "./index.css";

//Rus
//1 - Создайте состояние input, которое будет отображать результат вычислений в калькуляторе.
//2 - Создайте 2 функции для увеличения или уменьшения значения input на +1 или -1 и
// назначьте их на кнопки +1 / -1.
//3 - Создайте функцию, которая будет выполнять определенную операцию на калькуляторе в
// зависимости от нажатой кнопки. В результате работы этой функции должен получиться полностью
// рабочий калькулятор. Используйте эту функцию в обработчиках событий для всех кнопок.

//P.S. Если сложно продумать одну универсальную функцию, можете создать столько функций, сколько нужно. Не переживайте о чистоте кода.

//P.P.S. В JavaScript есть метод eval(), который преобразует любую строку в JavaScript-выражение.
//Пример: eval("console.log('Hello')") — выполнит этот код.
// Используйте этот метод для всех операций в калькуляторе.


function Calculator() {

  const [input, setInput] = useState("0")
  const [total, setTotal] = useState('0')
  const [secDigit, setSecDigit] = useState('0')
  const [oper, setOper] = useState('+')

  function countDoing(sign) {
    if (sign ==="+"){

      setOper("+");
    console.log('second $$$$$$', secDigit, 'total = ', total)
      const letzteDigit = parseInt(total) + parseInt(secDigit)
      setInput(parseInt(letzteDigit))
      setTotal(letzteDigit)
      setSecDigit('0')
      console.log('lezte dig', letzteDigit)
    }

    if (sign ==="-"){

      setOper('-');
      if (total === "0") {
        // Пользователь только начал ввод — сохраняем это как total, не вычитаем
        setTotal(parseInt(secDigit));
        setInput(parseInt(secDigit));
      } else {
        const letzteDigit = parseInt(total) - parseInt(secDigit);
        setInput(letzteDigit);
        setTotal(letzteDigit);
      }
      setSecDigit('0');
    }

    if (sign ==="*"){
      console.log('mult secDig = ', secDigit)
      setOper('*');
      setTotal((prevTotal) => {
        const numSec = parseInt(secDigit);
        const numTotal = parseInt(prevTotal);

        const result = (numTotal === 0 ? numSec : numTotal * numSec);
        setInput(result);
        setSecDigit('0');

        return result;
      });

    }

    if (sign === "/") {
      setOper("/");

      if (secDigit === "0") {
        // Просто ждём ввода следующей цифры, ничего не делаем
        return;
      }

      const divisor = parseFloat(secDigit);

      if (divisor === 0) {
        setInput("Ошибка: деление на 0");
        setTotal("0");
      } else {
        setTotal((prevTotal) => {
          const numTotal = parseFloat(prevTotal);
          const result = numTotal === 0
              ? divisor // если total = 0, просто сохраняем secDigit
              : numTotal / divisor;

          setInput(result.toString());
          setSecDigit("0");
          return result.toString();
        });
      }
    }
  }

  function generalHandler(digit) {
    console.log('generalHandler works')
    const newInput = secDigit.toString() + digit.toString();
    setInput(parseInt(newInput));
    setSecDigit(parseInt(newInput)) // str
    console.log('newInput = ', newInput)
  }



  function plusInk() {
    setInput((prev) =>  parseInt(prev) + 1);
  }

  function minusDecr() {
    setInput((prev) =>  prev - 1);
  }

  function resetToZero() {
    setInput("0");
    setTotal('0');
    setSecDigit('0')
  }

  function resMachen() {
    const  signt = oper
    const letzteDigit = eval(`${total} ${signt} ${parseInt(secDigit)}`);
    console.log('letzteDigit = ', letzteDigit)
    setInput(letzteDigit)
    setTotal(letzteDigit)
    setSecDigit('0')
    console.log('res Maxhen sec Digit = ', secDigit)
  }


  return (
    <div className="calculator-container">
      <h1 className="calculator-title">UseState Calculator</h1>
      <div className="calculator">
        <div className="display">{input}</div>
        <div className="increment-buttons">
          <button className="increment"
          onClick={plusInk}

          >+1</button>
          <button className="decrement"
          onClick={minusDecr}
          >-1</button>
        </div>
        <div className="buttons">
          <button onClick={() => generalHandler(1)}>1</button>
          <button onClick={() => generalHandler(2)}>2</button>
          <button onClick={() => generalHandler(3)}>3</button>
          <button className="operator" onClick={() => countDoing('+')}>+</button>
          <button onClick={() => generalHandler(4)}>4</button>
          <button onClick={() => generalHandler(5)}>5</button>
          <button onClick={() => generalHandler(6)}>6</button>
          <button className="operator" onClick={() => countDoing('-')}>-</button>
          <button onClick={() => generalHandler(7)}>7</button>
          <button onClick={() => generalHandler(8)}>8</button>
          <button onClick={() => generalHandler(9)}>9</button>
          <button className="operator" onClick={() =>  countDoing('*')}>×</button>
          <button onClick={() => generalHandler(0)}>0</button>
          <button>,</button>
          <button className="equals"
                  onClick={() => resMachen()}
          >=</button>
          <button className="operator" onClick={() => countDoing('/')}>÷</button>
          <button className="clear"
                  onClick={() => resetToZero()}
          >C</button>
        </div>
      </div>
      <div className="technologies-used">
        <p>
          <strong>Technologies used:</strong> React, JSX, CSS Modules, JavaScript (useState, events
          handling)
        </p>
      </div>
    </div>
  );
}

export default Calculator;
