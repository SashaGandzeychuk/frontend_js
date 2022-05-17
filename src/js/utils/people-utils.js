export const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

export function idToString(id) {
  if (typeof id === 'object') {
    return `${id.name}${id.value}`;
  }
  return id;
}

export function getPersonName(person) {
  if (typeof person.name === 'object') {
    return {
      title: person.name.title,
      fullName: `${person.name.first} ${person.name.last}`,
    };
  }
  return {
    title: person.title,
    fullName: person.full_name,
  };
}

export function getPersonPicture(person) {
  if (typeof person.picture === 'object') {
    return {
      large: person.picture.large,
      thumbnail: person.picture.thumbnail,
    };
  }
  return {
    title: person.picture_large,
    fullName: person.picture_thumbnail,
  };
}

export function getPersonLocation(person) {
  if (typeof person.location === 'object') {
    return {
      city: person.location.city,
      state: person.location.state,
      country: person.location.country,
      postcode: person.location.postcode,
      coordinates: person.location.coordinates,
      timezone: person.location.timezone,
    };
  }
  return {
    city: person.city ? person.city : null,
    state: person.state ? person.state : null,
    country: person.country ? person.country : null,
    postcode: person.postcode ? person.postcode : null,
    coordinates: person.coordinates ? person.coordinates : null,
    timezone: person.timezone ? person.timezone : {},
  };
}

export function getPersonBirthDate(person) {
  if (typeof person.dob === 'object') {
    return {
      birthDate: person.dob.date,
      age: person.dob.age,
    };
  }
  if (typeof person.b_day === 'string') {
    const birthYear = Number(person.b_day.substring(0, 4));
    const currentYear = new Date().getFullYear();
    return {
      birthDate: person.b_day,
      age: currentYear - birthYear,
    };
  }
  return {
    birthDate: null,
    age: null,
  };
}

export function getRandomCourse() {
  const randomCourseIndex = Math.floor(Math.random() * courses.length);
  return courses[randomCourseIndex];
}
