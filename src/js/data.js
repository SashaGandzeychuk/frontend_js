import { capitalize, isUpperCase } from './utils/str-utils';
import {
  getPersonBirthDate,
  getPersonLocation,
  getPersonName, getPersonPicture,
  getRandomCourse,
  idToString,
} from './utils/people-utils';

const {
  additionalUsers,
  randomUserMock,
} = require('./data-mock');
require('../css/app.css');

export const peopleComparator = (field, ascending) => (a, b) => {
  if (a[field] > b[field]) {
    return ascending;
  }
  if (a[field] < b[field]) {
    return -ascending;
  }
  return 0;
};

function fetchData() {
  const data = [...randomUserMock];
  const ids = new Set();
  data.forEach((user) => {
    const id = idToString(user.id);
    ids.add(id);
  });
  // merging additional users with user mocks by id
  additionalUsers.forEach((user) => {
    const id = idToString(user.id);
    if (!ids.has(id)) {
      data.push(user);
      ids.add(id);
    }
  });
  return data;
}

function extractPersonFromResource(resource) {
  const name = getPersonName(resource);
  const location = getPersonLocation(resource);
  const birthDate = getPersonBirthDate(resource);
  const picture = getPersonPicture(resource);
  return {
    gender: capitalize(resource.gender),
    title: capitalize(name.title),
    fullName: name.fullName,
    city: capitalize(location.city),
    state: capitalize(location.state),
    country: capitalize(location.country),
    postcode: location.postcode,
    coordinates: location.coordinates,
    timezone: location.timezone,
    email: resource.email ? resource.email : null,
    birthDate: birthDate.date,
    age: birthDate.age,
    phone: resource.phone ? resource.phone : null,
    pictureLarge: picture.large,
    pictureThumbnail: picture.thumbnail,
    id: idToString(resource.id),
    favorite: resource.favorite === true,
    backgroundColor: resource.bg_color ? resource.bg_color : '#fff',
    note: capitalize(resource.note ? resource.note : ''),
    course: resource.course ? capitalize(resource.course) : getRandomCourse(),
  };
}

export function getData() {
  const fetchedData = fetchData();
  return fetchedData.map((person) => extractPersonFromResource(person));
}

export function validatePerson(person, phoneRegex) {
  const ageIsNumeric = person.age === null || typeof person.age === 'number';
  const fullNameIsValid = typeof person.fullName === 'string' && isUpperCase(person.fullName.charAt(0));
  const genderIsValid = typeof person.gender === 'string' && isUpperCase(person.gender.charAt(0));
  const noteIsValid = typeof person.note === 'string' && (person.note.length === 0 || isUpperCase(person.note.charAt(0)));
  const stateIsValid = person.state === null || (typeof person.state === 'string' && isUpperCase(person.state.charAt(0)));
  const countryIsValid = person.country === null || (typeof person.country === 'string' && isUpperCase(person.country.charAt(0)));
  const phoneIsValid = person.phone === null || phoneRegex.test(person.phone);
  const emailIsValid = person.email === null || (typeof person.email === 'string' && person.email.includes('@'));
  const isValid = ageIsNumeric
    && fullNameIsValid
    && genderIsValid
    && noteIsValid
    && stateIsValid
    && countryIsValid
    && phoneIsValid
    && emailIsValid;
  if (!isValid) {
    console.dir({
      ageIsNumeric,
      fullNameIsValid,
      genderIsValid,
      noteIsValid,
      stateIsValid,
      countryIsValid,
      phoneIsValid,
      emailIsValid,
    });
  }
  return isValid;
}

export function search(data, query) {
  if (typeof query === 'string') {
    return data.filter((person) => person.fullName.startsWith(query));
  }
  if (typeof query === 'object') {
    let results = data;
    if (query.name) {
      results = results.filter((person) => person.fullName.startsWith(query.name));
    }
    if (query.age) {
      results = results.filter((person) => person.age === query.age);
    }
    if (query.note) {
      results = results.filter((person) => person.note && person.note.includes(query.note));
    }
    return results;
  }
  return [];
}

export function getPercentageForSearch(data, query) {
  const searchResults = search(data, query);
  return (searchResults.length / data.length) * 100;
}

const fetchedData = getData();
console.dir(fetchedData);
fetchedData.forEach((person) => {
  const isValid = validatePerson(person, /[0-9-+]+/);
  if (!isValid) {
    console.log(`${person.fullName}: ${isValid}`);
  }
});

window.debugInfo = {
  fetchedData,
  search,
  getPercentageForSearch,
};
