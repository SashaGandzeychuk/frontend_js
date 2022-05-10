import EventEmitter from '../event-emitter';

export default class FavoritesViewModel {
  constructor(dataService) {
    this.dataService = dataService;
    this.rowStart = 0;
    this.changedRowEmitter = new EventEmitter();
  }

  nextTeacherInRow() {
    if (this.rowStart + 4 < this.dataService.getFavorites().length) {
      this.rowStart += 1;
      this.changedRowEmitter.emit();
    }
  }

  prevTeacherInRow() {
    if (this.rowStart > 0) {
      this.rowStart -= 1;
      this.changedRowEmitter.emit();
    }
  }
}
