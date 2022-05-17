import EventEmitter from '../event-emitter';
import { getPercentageForSearch, search } from '../data';

export default class TeacherListViewModel {
  constructor(dataService) {
    this.dataService = dataService;

    this.data = [...this.dataService.data];
    this.filters = {
      age: {
        min: 0,
        max: 120,
      },
      country: null,
      gender: null,
      onlyWithPhoto: undefined,
      favorite: undefined,
    };
    this.query = '';

    this.newListEmitter = new EventEmitter();
    this.dataUpdatedEmitter = new EventEmitter();
    this.newListEmitter.subscribe(() => this.updateData());

    this.dataService.dataUpdatedEmitter.subscribe(() => {
      this.newListEmitter.emit();
    });
    this.dataService.favoritesUpdatedEmitter.subscribe(() => {
      this.newListEmitter.emit();
    });
  }

  onAgeFilterChanged(newValue) {
    if (newValue.includes('-')) {
      const limits = newValue.split('-');
      const min = Number(limits[0]);
      const max = Number(limits[1]);
      this.filters.age = {
        min,
        max,
      };
    } else {
      this.filters.age = {
        min: 0,
        max: 120,
      };
    }
    this.newListEmitter.emit();
  }

  onCountryFilterChanged(newValue) {
    if (newValue.toLowerCase() === 'any') {
      this.filters.country = null;
    } else {
      this.filters.country = newValue;
    }
    this.newListEmitter.emit();
  }

  onSexFilterChanged(newValue) {
    if (newValue.toLowerCase() === 'any') {
      this.filters.gender = null;
    } else {
      this.filters.gender = newValue;
    }
    this.newListEmitter.emit();
  }

  onOnlyFavoritesFilterChanged(checked) {
    this.filters.favorite = checked || undefined;
    this.newListEmitter.emit();
  }

  onOnlyWithPhotoFilterChanged(checked) {
    this.filters.onlyWithPhoto = checked || undefined;
    this.newListEmitter.emit();
  }

  onSearch(newQuery) {
    this.query = newQuery;
    console.log(`Percentage for found: ${getPercentageForSearch(this.dataService.data, this.query)}%`);
    this.newListEmitter.emit();
  }

  updateData() {
    this.data = this.dataService.filterPeople(this.filters);
    if (this.query !== '') {
      this.data = search(this.data, this.query);
    }
    this.dataUpdatedEmitter.emit(this.data);
  }
}
