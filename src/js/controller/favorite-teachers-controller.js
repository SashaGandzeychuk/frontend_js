import TeachersBaseController from './teachers-base-controller';
import isMobile from '../utils/mobile-utils';

export default class FavoriteTeachersController extends TeachersBaseController {
  constructor({
    viewModel,
    modalController,
  }) {
    super(viewModel, modalController);
    this.viewModel = viewModel;
    this.viewModel.changedRowEmitter.subscribe(() => this.renderFavorites());
  }

  connect({
    favoritesList,
    favoritesPanel,
  }) {
    this.favoritesPanel = document.getElementById(favoritesPanel);
    this.favoritesList = document.getElementById(favoritesList);
    this.renderFavorites();
  }

  renderPrevButton() {
    if (this.viewModel.dataService.getFavorites().length <= 4) return;
    const disabled = this.viewModel.rowStart <= 0;
    const prevButton = document.createElement('button');
    prevButton.onclick = () => {
      this.viewModel.prevTeacherInRow();
    };
    prevButton.innerText = '〈';
    prevButton.disabled = disabled;
    prevButton.classList.add('favorite-teachers__prev');
    this.favoritesPanel.appendChild(prevButton);
  }

  renderNextButton() {
    const favoritesLength = this.viewModel.dataService.getFavorites().length;
    if (favoritesLength <= 4) return;
    const disabled = this.viewModel.rowStart + 4 >= favoritesLength;
    const nextButton = document.createElement('button');
    nextButton.onclick = () => {
      this.viewModel.nextTeacherInRow();
    };
    nextButton.innerText = '〉';
    nextButton.disabled = disabled;
    nextButton.classList.add('favorite-teachers__next');
    this.favoritesPanel.appendChild(nextButton);
  }

  renderMobileButtons() {
    const favoritesLength = this.viewModel.dataService.getFavorites().length;
    if (favoritesLength <= 4) return;
    const prevButton = document.createElement('button');
    prevButton.onclick = () => {
      this.viewModel.prevTeacherInRow();
    };
    prevButton.innerText = '〈';
    prevButton.disabled = this.viewModel.rowStart <= 0;
    prevButton.classList.add('favorite-teachers__prev');

    const nextButton = document.createElement('button');
    nextButton.onclick = () => {
      this.viewModel.nextTeacherInRow();
    };
    nextButton.innerText = '〉';
    nextButton.disabled = this.viewModel.rowStart + 4 >= favoritesLength;
    nextButton.classList.add('favorite-teachers__next');

    const buttonsPanel = document.createElement('div');
    buttonsPanel.classList.add('mobile-only');
    buttonsPanel.classList.add('favorite-teachers__mobile-buttons-panel');
    buttonsPanel.appendChild(prevButton);
    buttonsPanel.appendChild(nextButton);
    this.favoritesPanel.appendChild(buttonsPanel);
  }

  renderFavoriteList() {
    this.favoritesList.innerHTML = '';
    if (this.viewModel.favorites.length === 0) {
      const noFavoriteTeachersText = document.createElement('p');
      noFavoriteTeachersText.innerText = 'You have no favorite teachers';
      noFavoriteTeachersText.style.color = 'rgb(136, 136, 151)';
      this.favoritesList.appendChild(noFavoriteTeachersText);
      this.favoritesPanel.appendChild(this.favoritesList);
      return;
    }
    const renderedTeachers = this.viewModel.favorites;
    renderedTeachers.map((teacher) => super.createTeacherShortInfo(teacher))
      .forEach((div) => this.favoritesList.appendChild(div));
    this.favoritesPanel.appendChild(this.favoritesList);
  }

  renderFavorites() {
    this.favoritesPanel.innerHTML = '';
    if (!isMobile()) {
      this.renderPrevButton(false);
    }
    this.renderFavoriteList();
    if (!isMobile()) {
      this.renderNextButton();
    }
    if (isMobile()) {
      this.renderMobileButtons();
    }
  }
}
