export const getRandomIntegerFloat = (min, max, numberOfDecimalPlaces = 0) => {
  let randomInt = Math.random() * (max - min + 1) + min;
  randomInt = randomInt.toFixed(numberOfDecimalPlaces);
  return parseFloat(randomInt);
};

export const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerFloat(0, elements.length - 1)];
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomArray(array) {
// export function randoms(array) {
  const arrayLength = getRandomInt(1, array.length);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(getRandomArrayElement(array));
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
