import EventEmitter from '../event-emitter';

export default class TeacherListViewModel {
  constructor(dataService) {
    this.dataService = dataService;
    this.data = Array.from(this.dataService.getData());
    this.filters = {
      age: {
        min: 0,
        max: 120,
      },
      gender: null,
      onlyWithPhoto: undefined,
      favorite: false,
    };
    this.newListEmitter = new EventEmitter();
    this.dataUpdatedEmitter = new EventEmitter();
    this.newListEmitter.subscribe(() => this.updateData());
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

  updateData() {
    this.data = this.dataService.filterPeople(this.filters);
    this.dataUpdatedEmitter.emit(this.data);
  }
}
