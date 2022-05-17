import EventEmitter from '../event-emitter';

export default class FavoritesViewModel {
  constructor(dataService) {
    this.dataService = dataService;
    this.rowStart = 0;
    this.lastLength = 0; // specifically for enable scrolling back on deleting from favorites
    this.changedRowEmitter = new EventEmitter();
    this.dataService.favoritesUpdatedEmitter.subscribe((favorites) => {
      if (favorites.length < this.lastLength) {
        if (this.rowStart > 0) {
          this.prevTeacherInRow();
        }
      }
      this.lastLength = favorites.length;
      this.changedRowEmitter.emit();
    });
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

  get favorites() {
    return this.dataService.getFavorites().slice(this.rowStart, this.rowStart + 4);
  }
}
