// функция, возвращающая случайное число из заданного диапазона
// можно выбрать плавающую точку
export const getRandomIntegerFloat = (min, max, numberOfDecimalPlaces = 0) => {
  let randomInt = Math.random() * (max - min + 1) + min;
  randomInt = randomInt.toFixed(numberOfDecimalPlaces);
  return parseFloat(randomInt);
};

// функция, возвращающая случайный элемент из массива
export const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerFloat(0, elements.length - 1)];
};

// функции названы фигПоймиКак, потому что это моки
// на лекции было сказано, что потом это все равно удалим
// и здесь критерии нарушать можно
// поэтому я оторвался по полной:)
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function random(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

export function randoms(arr) {
  const arrayLength = getRandomInt(1, arr.length);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push( random(arr) ); // используем функцию random
  }

  return result;
}

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
