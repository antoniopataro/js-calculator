const lightTheme = document.getElementById("light-theme");
const darkTheme = document.getElementById("dark-theme");

const display = document.getElementById("display");
const subDisplay = document.getElementById("sub-display");

const operators = ["/", "*", "-", "+"];

var equation = "";

function handleValue(value) {
  equation += value;

  display.innerText += value;
  subDisplay.innerText += value;
}

function handleOperator(operator) {
  const lastDigit = equation.split(" ").slice(0, -1);

  if (lastDigit === "/" || lastDigit === "*" || lastDigit === "-" || lastDigit === "+") {
    equation = equation.slice(0, -3) + " " + operator + " ";
    subDisplay.innerText = subDisplay.innerText.slice(0, -3) + " " + operator + " ";
    return;
  }

  equation += " " + operator + " ";

  display.innerText = "";
  subDisplay.innerText += " " + operator + " ";
}

function handleSpecial(special) {
  switch (special) {
    case "AllClear": {
      equation = "";
      display.innerText = "";
      subDisplay.innerText = "";
      return;
    }
    case "Invert": {
      equation =
        equation.split(" ").slice(0, -1).join(" ") +
        " " +
        (Number(equation.split(" ")[equation.split(" ").length - 1]) * -1).toString();

      display.innerText = (Number(display.innerText) * -1).toString();
      subDisplay.innerText = equation;
      return;
    }
    case "Percentage": {
      equation =
        equation.split(" ").slice(0, -1).join(" ") +
        " " +
        (Number(equation.split(" ")[equation.split(" ").length - 1]) * 100).toString();

      display.innerText = (Number(display.innerText) * 100).toString();
      subDisplay.innerText = equation;
      return;
    }
    case "Backspace": {
      equation = equation.slice(0, -2);
      return;
    }
    default:
      return;
  }
}

function calculate() {
  const result = eval(equation);

  display.innerText = result;
}

function handleTheme() {
  if (lightTheme.classList.contains("active")) {
    lightTheme.classList.add("inactive");
    lightTheme.classList.remove("active");
    darkTheme.classList.add("active");
    darkTheme.classList.remove("inactive");
  } else {
    darkTheme.classList.add("inactive");
    darkTheme.classList.remove("active");
    lightTheme.classList.add("active");
    lightTheme.classList.remove("inactive");
  }

  changeColors();
}

function changeColors() {
  const isThemeDark = darkTheme.classList.contains("active") ? true : false;

  const body = document.getElementById("body");
  const calculator = document.getElementById("calculator");
  const main = document.getElementById("main");
  const footer = document.getElementById("footer");
  const footerButtons = document.querySelectorAll(".footer-button");
  const themeSwitcher = document.getElementById("theme-switcher");
  const themeIndicator = document.getElementById("theme-indicator");

  const activeButtons = document.querySelectorAll(".active");
  const inactiveButtons = document.querySelectorAll(".inactive");

  if (isThemeDark) {
    body.style.backgroundColor = "#22252d";
    calculator.style.backgroundColor = "#22252d";
    calculator.style.boxShadow = "20px 20px 20px #1d1f26, -20px -20px 20px #272b34";
    main.style.color = "white";
    footer.style.backgroundColor = "#2a2d37";
    themeSwitcher.style.backgroundColor = "#2a2d37";
    themeIndicator.style.transform = "translateX(42px)";
    themeIndicator.style.backgroundColor = "#22252d";

    activeButtons.forEach((button) => {
      button.style.fill = "white";
    });

    inactiveButtons.forEach((button) => {
      button.style.fill = "#d9d9d9";
    });

    footerButtons.forEach((button) => {
      button.style.backgroundColor = "#22252d";

      button.style.color = "white";
      button.classList.contains("special") ? (button.style.color = "#60dcc9") : "";
      button.classList.contains("operator") ? (button.style.color = "#a9585d") : "";
    });

    return;
  }

  body.style.backgroundColor = "white";
  calculator.style.backgroundColor = "#F9F9F9";
  calculator.style.boxShadow = "20px 20px 20px #d4d4d4, -20px -20px 20px #fff";
  main.style.color = "black";
  footer.style.backgroundColor = "#d9d9d9";
  themeSwitcher.style.backgroundColor = "#d9d9d9";
  themeIndicator.style.transform = "translateX(0px)";
  themeIndicator.style.backgroundColor = "white";

  activeButtons.forEach((button) => {
    button.style.fill = "black";
  });

  inactiveButtons.forEach((button) => {
    button.style.fill = "#2A2D39";
  });

  footerButtons.forEach((button) => {
    button.style.backgroundColor = "white";

    button.style.color = "black";
    button.classList.contains("special") ? (button.style.color = "green") : "";
    button.classList.contains("operator") ? (button.style.color = "red") : "";
  });
}
