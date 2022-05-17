import { getData, peopleComparator, search } from '../data';
import EventEmitter from '../event-emitter';
import { courses } from '../utils/people-utils';

export default class DataService {
  constructor() {
    this.data = getData();
    this.dataUpdatedEmitter = new EventEmitter();
    this.favoritesUpdatedEmitter = new EventEmitter();
    this.countries = [
      'Australia',
      'Canada',
      'Denmark',
      'Finland',
      'France',
      'Germany',
      'Iran',
      'Ireland',
      'Netherlands',
      'New Zealand',
      'Norway',
      'Spain',
      'Switzerland',
      'Turkey',
      'Ukraine',
      'United States',
    ];
    this.courses = courses;
  }

  getFavorites() {
    return this.data.filter((person) => person.favorite);
  }

  addTeacher(teacher) {
    this.data = [...this.data, teacher];
    this.dataUpdatedEmitter.emit();
  }

  toggleFavorite(name) {
    const person = this.data.find((p) => p.full_name === name);
    person.favorite = !person.favorite;
    this.favoritesUpdatedEmitter.emit(this.getFavorites());
  }

  filterPeople(filter) {
    let results = this.data;
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
      results = results.filter((person) => !!person.picture_large === filter.onlyWithPhoto);
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

  search(query) {
    return search(this.data, query);
  }
}
