import TeacherListViewModel from './view-models/teacher-list-viewmodel';
import DataService from './services/data-service';
import StatisticsViewModel from './view-models/statistics-view-model';
import FavoritesViewModel from './view-models/favorites-viewmodel';
import AddTeacherFormController from './controller/add-teacher-form-controller';
import TeacherListController from './controller/teacher-list-controller';
import StatisticsController from './controller/statistics-controller';
import FavoriteTeachersController from './controller/favorite-teachers-controller';
import ModalController from './controller/modal-controller';
import ValidatorService from './services/validator-service';

const dataService = new DataService();
const validatorService = new ValidatorService();
const modalController = new ModalController({
  overlayId: 'modalOverlay',
  modalBoxId: 'modalBox',
});

const teachersListViewModel = new TeacherListViewModel(dataService);
const statisticsViewModel = new StatisticsViewModel(dataService);
const favoritesViewModel = new FavoritesViewModel(dataService);

const addTeacherFormController = new AddTeacherFormController({
  dataService,
  modalController,
  validatorService,
});
const teachersListController = new TeacherListController({
  viewModel: teachersListViewModel,
  modalController,
});
const statisticsController = new StatisticsController(statisticsViewModel);
const favoritesController = new FavoriteTeachersController({
  viewModel: favoritesViewModel,
  modalController,
});

addTeacherFormController.connect('addTeacherBtn');
addTeacherFormController.connect('addTeacherBtnFooter');
teachersListController.connect({
  teachersListDiv: 'teachers-list',
  searchForm: 'searchForm',
  ageFilterInput: 'inAgeFilter',
  countryFilterInput: 'inCountryFilter',
  sexFilterInput: 'inSexFilter',
  withPhotoFilterInput: 'inWithPhotoFilter',
  onlyFavoritesFilterInput: 'inOnlyFavoritesFilter',
});
statisticsController.connect({
  statsTable: 'statsTableBody',
  pagingRow: 'pagingRow',
  nameRowHeader: 'nameRowHeader',
  specialityRowHeader: 'courseRowHeader',
  ageRowHeader: 'ageRowHeader',
  genderRowHeader: 'genderRowHeader',
  nationalityRowHeader: 'nationalityRowHeader',
});
favoritesController.connect({
  favoritesList: 'favoritesList',
  favoritesPanel: 'favorite-teachers-panel',
});
