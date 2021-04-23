import dayjs from 'dayjs';
import {titles, genres, posters, descriptions, directors, writers, actors, countries, ageRatings} from'./const.js';
import {getRandomIntegerFloat, getRandomArrayElement, randoms} from '../utils/util.js';


const generateDate = () => {
  const daysGap = getRandomIntegerFloat(-36500, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateId = () => Math.random().toString();

export const generateCard = () => {
  const date = generateDate();
  const posterName = posters[getRandomIntegerFloat(0, posters.length - 1)];

  return {
    id: generateId(),
    title: getRandomArrayElement(titles),
    genres: randoms(genres),
    ratio: getRandomIntegerFloat(4, 9.9, 1),
    date,
    releaseDate: dayjs(date).format('MMM D, YYYY'),
    year: dayjs(date).format('YYYY'),
    comments: getRandomIntegerFloat(1, 5),
    poster: `./images/posters/${posterName}`,
    description: randoms(descriptions),
    duration: `${getRandomIntegerFloat(1,3)}h ${getRandomIntegerFloat(1,59)}m`,
    director: getRandomArrayElement(directors),
    writers: randoms(writers),
    actors: randoms(actors),
    country: getRandomArrayElement(countries),
    ageRating: getRandomArrayElement(ageRatings),
    isWatchlist: Boolean(getRandomIntegerFloat(0, 1)),
    isWatched: Boolean(getRandomIntegerFloat(0, 1)),
    isFavorite: Boolean(getRandomIntegerFloat(0, 1)),
  };
};

