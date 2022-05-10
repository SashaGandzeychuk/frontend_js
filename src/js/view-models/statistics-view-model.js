import EventEmitter from '../event-emitter';

export default class StatisticsViewModel {
  constructor(dataService) {
    this.dataService = dataService;
    this.pageNumber = 1;
    this.totalPages = Math.ceil(this.dataService.getData().length / 10);
    this.currentSortingOpts = {
      field: '',
      ascending: 1,
    };
    this.newPageEmitter = new EventEmitter();
  }

  getCurrentPage() {
    const sortedData = this.dataService.sortPeople(this.currentSortingOpts);
    return sortedData.slice(10 * (this.pageNumber - 1), 10 * this.pageNumber);
  }

  setSortingField(sortingField) {
    if (this.currentSortingOpts.field === sortingField) {
      if (this.currentSortingOpts.ascending === -1) {
        this.currentSortingOpts = {
          field: '',
          ascending: 1,
        };
      } else {
        this.currentSortingOpts = {
          field: sortingField,
          ascending: -1,
        };
      }
    } else {
      this.currentSortingOpts = {
        field: sortingField,
        ascending: 1,
      };
    }
    this.newPageEmitter.emit(this.getCurrentPage());
  }

  setPage(page) {
    this.pageNumber = page;
    this.newPageEmitter.emit(this.getCurrentPage());
  }
}