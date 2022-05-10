import { getData, peopleComparator } from '../data';

export default class DataService {
  constructor() {
    this.data = getData();
  }

  getData() {
    return this.data;
  }

  getFavorites() {
    return this.data.filter((person) => person.favorite);
  }

  toggleFavorite(id) {
    const person = this.data.find((p) => p.id === id);
    person.favorite = !person.favorite;
  }

  filterPeople(filter) {
    let results = this.getData();
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
    if (typeof filter.onlyWithPhoto === 'boolean') {
      results = results.filter((person) => !!person.pictureLarge === filter.onlyWithPhoto);
    }
    if (typeof filter.favorite === 'boolean') {
      results = results.filter((person) => person.favorite === filter.favorite);
    }
    return results;
  }

  sortPeople(opts) {
    let sortingField;
    let ascending = 1;
    if (typeof opts === 'string') {
      if (opts === '') {
        return [...this.data];
      }
      sortingField = opts;
    } else if (typeof opts === 'object') {
      if (opts.field === '') {
        return [...this.data];
      }
      sortingField = opts.field;
      if (opts.ascending !== null && opts.ascending !== undefined) {
        ascending = opts.ascending;
      }
    }
    return [...this.data].sort(peopleComparator(sortingField, ascending));
  }
}
