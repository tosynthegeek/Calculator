function() {
    let screen = document.querySelector('.screen input');
    let buttons = document.querySelectorAll('.buttons .btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
  
    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        let value = e.target.dataset.num;
        screen.value += value;
      });
    });
  
    equal.addEventListener('click', function(e) {
      if (screen.value.trim() === "") {
        screen.value = "Please enter";
      } else {
        try {
          let result = evaluateExpression(screen.value);
          screen.value = result;
        } catch (error) {
          screen.value = "Empty expression";
        }
      }
    });
  
    clear.addEventListener('click', function(e) {
      screen.value = "";
    });
  
    function evaluateExpression(expression) {
      const operators = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
      };
  
      const tokens = expression.split(/([+\-*/])/);
  
      let values = [];
      let currentOperator = null;
  
      for (let token of tokens) {
        if (token === "+" || token === "-" || token === "*" || token === "/") {
          currentOperator = token;
        } else {
          let value = parseFloat(token);
          if (isNaN(value)) {
            throw new Error("Invalid expression");
          }
  
          if (currentOperator !== null) {
            let previousValue = values.pop();
            let result = operators[currentOperator](previousValue, value);
            values.push(result);
            currentOperator = null;
          } else {
            values.push(value);
          }
        }
      }
  
      if (values.length === 0) {
        throw new Error("Invalid expression");
      }
  
      return values[0];
    }
  })();
