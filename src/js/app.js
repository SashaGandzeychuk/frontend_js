import { capitalize, isUpperCase } from './str-utils';
import {
  getPersonBirthDate,
  getPersonLocation,
  getPersonName,
  getRandomCourse,
  idToString,
} from './people-utils';

const {
  additionalUsers,
  randomUserMock,
} = require('./data-mock');
require('../css/app.css');

/** ******** Your code here! *********** */

const peopleComparator = (field, ascending) => (a, b) => {
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
    pictureLarge: resource.picture_large ? resource.picture_large : null,
    pictureThumbnail: resource.picture_thumbnail ? resource.picture_thumbnail : null,
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

function validatePerson(person, phoneRegex) {
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

export function filterPeople(data, filter) {
  let results = data;
  if (filter.country) {
    results = results.filter((person) => person.country === filter.country);
  }
  if (filter.age) {
    if (typeof filter.age === 'number') {
      results = results.filter((person) => person.age === filter.age);
    } else if (typeof filter.age === 'object') {
      if (filter.age.min) {
        results = results.filter((person) => person.age >= filter.age.min);
      }
      if (filter.age.max) {
        results = results.filter((person) => person.age < filter.age.max);
      }
    }
  }
  if (filter.gender) {
    results = results.filter((person) => person.gender === filter.gender);
  }
  if (typeof filter.favorite === 'boolean') {
    results = results.filter((person) => person.favorite === filter.favorite);
  }
  return results;
}

export function sortPeople(data, opts) {
  let sortingField;
  let ascending = 1;
  if (typeof opts === 'string') {
    sortingField = opts;
  } else if (typeof opts === 'object') {
    sortingField = opts.field;
    if (opts.ascending !== null && opts.ascending !== undefined) {
      ascending = opts.ascending;
    }
  }
  return data.sort(peopleComparator(sortingField, ascending));
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
console.log('fetchedData')
console.dir(fetchedData);

console.log('search')
console.dir(search(fetchedData, {age: 47}));

console.log('filterPeople')
console.dir(filterPeople(fetchedData, {gender: 'Male'}));

console.log('sortPeople')
console.dir(sortPeople(fetchedData, 'age'));

fetchedData.forEach((person) => {
  const isValid = validatePerson(person, /[0-9-+]+/);
  if (!isValid) {
    console.log(`${person.fullName}: ${isValid}`);
  }
});

window.debugInfo = {
  fetchedData,
  search,
  filterPeople,
  sortPeople,
  getPercentageForSearch,
};
