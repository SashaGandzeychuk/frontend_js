import TeachersBaseController from './teachers-base-controller';

export default class TeacherListController extends TeachersBaseController {
  constructor({
    viewModel,
    modalController,
  }) {
    super(viewModel, modalController);
    this.viewModel = viewModel;
    this.viewModel.dataUpdatedEmitter.subscribe(() => {
      this.renderTeachersList();
    });
    this.viewModel.dataService.dataUpdatedEmitter.subscribe(() => {
      this.renderCountriesSelectBox();
    });
  }

  connect({
    teachersListDiv,
    searchForm,
    ageFilterInput,
    countryFilterInput,
    sexFilterInput,
    withPhotoFilterInput,
    onlyFavoritesFilterInput,
  }) {
    this.attachElements({
      teachersListDiv,
      countryFilterInput,
      searchForm,
      ageFilterInput,
      sexFilterInput,
      withPhotoFilterInput,
      onlyFavoritesFilterInput,
    });

    this.render();
  }

  render() {
    this.renderCountriesSelectBox();
    this.renderTeachersList();
  }

  attachElements({
    teachersListDiv,
    countryFilterInput,
    searchForm,
    ageFilterInput,
    sexFilterInput,
    withPhotoFilterInput,
    onlyFavoritesFilterInput,
  }) {
    this.teachersList = document.getElementById(teachersListDiv);
    this.countrySelectBox = document.getElementById(countryFilterInput);

    document.getElementById(searchForm).onsubmit = (ev) => {
      ev.preventDefault();
      const query = ev.target.elements.namedItem('query').value;
      this.viewModel.onSearch(query);
    };
    document.getElementById(ageFilterInput).onchange = (ev) => {
      this.viewModel.onAgeFilterChanged(ev.target.value);
    };
    document.getElementById(countryFilterInput).onchange = (ev) => {
      this.viewModel.onCountryFilterChanged(ev.target.value);
    };
    document.getElementById(sexFilterInput).onchange = (ev) => {
      this.viewModel.onSexFilterChanged(ev.target.value);
    };
    document.getElementById(withPhotoFilterInput).onchange = (ev) => {
      this.viewModel.onOnlyWithPhotoFilterChanged(ev.target.checked);
    };
    document.getElementById(onlyFavoritesFilterInput).onchange = (ev) => {
      this.viewModel.onOnlyFavoritesFilterChanged(ev.target.checked);
    };
  }

  renderTeachersList() {
    this.teachersList.innerHTML = '';
    const renderedTeachers = this.viewModel.data.slice(0, 8);
    renderedTeachers
      .map((teacher) => super.createTeacherShortInfo(teacher))
      .forEach((div) => this.teachersList.appendChild(div));
  }

  renderCountriesSelectBox() {
    this.countrySelectBox.innerHTML = '';
    const { countries } = this.viewModel.dataService;
    const anyOption = document.createElement('option');
    anyOption.innerText = 'Any';
    this.countrySelectBox.appendChild(anyOption);
    countries.forEach((country) => {
      const countryOption = document.createElement('option');
      countryOption.innerText = country;
      this.countrySelectBox.appendChild(countryOption);
    });
  }
}
