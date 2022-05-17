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
} = require('../assets/data-mock');
require('../scss/index.scss');

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
  const names = new Set();
  data.forEach((user) => {
    const name = getPersonName(user).fullName;
    names.add(name);
  });
  // merging additional users with user mocks by id
  additionalUsers.forEach((user) => {
    const name = getPersonName(user).fullName;
    if (!names.has(name)) {
      data.push(user);
      names.add(name);
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
    full_name: name.fullName,
    city: capitalize(location.city),
    state: capitalize(location.state),
    country: capitalize(location.country),
    postcode: location.postcode,
    coordinates: location.coordinates,
    timezone: location.timezone,
    email: resource.email ? resource.email : null,
    b_date: birthDate.date,
    age: birthDate.age,
    phone: resource.phone ? resource.phone : null,
    picture_large: picture.large,
    picture_thumbnail: picture.thumbnail,
    id: idToString(resource.id),
    favorite: resource.favorite === true,
    bg_color: resource.bg_color ? resource.bg_color : '#fff',
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
  const fullNameIsValid = typeof person.full_name === 'string' && isUpperCase(person.full_name.charAt(0));
  const genderIsValid = typeof person.gender === 'string' && isUpperCase(person.gender.charAt(0));
  const noteIsValid = typeof person.note === 'string' && (person.note.length === 0 || isUpperCase(person.note.charAt(0)));
  const stateIsValid = !person.state || (typeof person.state === 'string' && isUpperCase(person.state.charAt(0)));
  const countryIsValid = person.country === null || (typeof person.country === 'string' && isUpperCase(person.country.charAt(0)));
  // const phoneIsValid = person.phone === null || phoneRegex.test(person.phone);
  const emailIsValid = person.email === null || (typeof person.email === 'string' && person.email.includes('@'));
  const errors = [];
  if (!ageIsNumeric) {
    errors.push('Invalid age');
  }
  if (!fullNameIsValid) {
    errors.push('Invalid name');
  }
  if (!genderIsValid) {
    errors.push('Invalid sex');
  }
  if (!noteIsValid) {
    errors.push('Invalid comment');
  }
  if (!stateIsValid) {
    errors.push('Invalid state');
  }
  if (!countryIsValid) {
    errors.push('Invalid country');
  }
  // if (!phoneIsValid) {
  //   errors.push('Invalid phone number');
  // }
  if (!emailIsValid) {
    errors.push('Invalid email');
  }
  return errors;
}

export function search(data, query) {
  if (!Number.isNaN(Number(query))) {
    return data.filter((person) => person.age === Number(query));
  }
  return data.filter((person) => person.full_name.includes(query) || person.note.includes(query));
}

export function getPercentageForSearch(data, query) {
  const searchResults = search(data, query);
  return (searchResults.length / data.length) * 100;
}

const fetchedData = getData();

window.debugInfo = {
  fetchedData,
  search,
  getPercentageForSearch,
};
