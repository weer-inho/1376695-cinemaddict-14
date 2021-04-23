// функция, возвращающая случайное число из заданного диапазона
// можно выбрать плавающую точку
const getRandomIntegerFloat = (min, max, numberOfDecimalPlaces = 0) => {
  let randomInt = Math.random() * (max - min + 1) + min;
  randomInt = randomInt.toFixed(numberOfDecimalPlaces);
  return parseFloat(randomInt);
};

const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const renderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// функция, возвращающая случайный элемент из массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerFloat(0, elements.length - 1)];
};

// функции названы фигПоймиКак, потому что это моки
// на лекции было сказано, что потом это все равно удалим
// и здесь критерии нарушать можно
// поэтому я оторвался по полной:)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

const compare = (a, b, property) => {
  if (a.property < b.property) {
    return -1;
  }
  if (a.property > b.property) {
    return 1;
  }
  return 0;
};

function randoms(arr) {
  const arrayLength = getRandomInt(1, arr.length);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push( random(arr) ); // используем функцию random
  }

  return result;
}

export {
  getRandomIntegerFloat,
  getRandomArrayElement,
  randoms,
  renderTemplate,
  compare,
  createElement,
  renderPosition,
  renderElement
};
