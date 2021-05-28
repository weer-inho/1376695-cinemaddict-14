import dayjs from 'dayjs';
import {titles, genres, posters, descriptions, directors, writers, actors, countries, ageRatings, emotions} from'./const.js';
import {getRandomIntegerFloat, getRandomArrayElement, getRandomArray} from '../utils/common.js';


const generateDate = () => {
  const daysGap = getRandomIntegerFloat(-36500, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateId = () => Math.random().toString();

const generateComment = () => {
  const commentDate = generateDate();

  return {
    text: getRandomArray(descriptions),
    emoji: getRandomArrayElement(emotions),
    author: getRandomArrayElement(writers),
    commentDate: dayjs(commentDate).format('MM/DD/YYYY h:mm A'),
  };
};

export const generateComments = (count) => {
  return new Array(count).fill().map(generateComment);
};

export const generateCard = () => {
  const date = generateDate();
  const comments = getRandomIntegerFloat(1, 5);
  const posterName = posters[getRandomIntegerFloat(0, posters.length - 1)];

  return {
    id: generateId(),
    title: getRandomArrayElement(titles),
    genres: getRandomArray(genres),
    ratio: getRandomIntegerFloat(4, 9.9, 1),
    date,
    releaseDate: dayjs(date).format('MMM D, YYYY'),
    year: dayjs(date).format('YYYY'),
    comments,
    commentsArray: generateComments(comments),
    poster: `./images/posters/${posterName}`,
    description: getRandomArray(descriptions),
    duration: `${getRandomIntegerFloat(1,3)}h ${getRandomIntegerFloat(1,59)}m`,
    director: getRandomArrayElement(directors),
    writers: getRandomArray(writers),
    actors: getRandomArray(actors),
    country: getRandomArrayElement(countries),
    ageRating: getRandomArrayElement(ageRatings),
    isWatchlist: Boolean(getRandomIntegerFloat(0, 1)),
    isWatched: Boolean(getRandomIntegerFloat(0, 1)),
    isFavorite: Boolean(getRandomIntegerFloat(0, 1)),
  };
};


