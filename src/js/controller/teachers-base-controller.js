export default class TeachersBaseController {
  constructor(viewModel, modalController) {
    this.viewModel = viewModel;
    this.modalController = modalController;
  }

  // eslint-disable-next-line class-methods-use-this
  createTeacherAvatar(teacher) {
    const outerOuterAvatarDiv = document.createElement('div');
    if (teacher.favorite) {
      outerOuterAvatarDiv.classList.add('favorite-teacher-star');
    }
    const outerAvatarDiv = document.createElement('div');
    outerAvatarDiv.classList.add('teacher-avatar');
    if (teacher.picture_large) {
      const avatarImg = document.createElement('img');
      avatarImg.src = teacher.picture_large;
      avatarImg.classList.add('teacher-avatar__img');
      avatarImg.alt = 'Teacher photo';
      outerAvatarDiv.appendChild(avatarImg);
    } else {
      const avatarPlaceholder = document.createElement('h3');
      avatarPlaceholder.classList.add('teacher-avatar__placeholder');
      const wordsInName = teacher.full_name.split(' ');
      let initials;
      if (wordsInName.length > 1) {
        initials = `${wordsInName[0][0]}.${wordsInName[wordsInName.length - 1][0]}`.toUpperCase();
      } else {
        // eslint-disable-next-line prefer-destructuring
        initials = wordsInName[0][0];
      }
      avatarPlaceholder.textContent = initials;
      outerAvatarDiv.appendChild(avatarPlaceholder);
    }
    outerOuterAvatarDiv.appendChild(outerAvatarDiv);
    return outerOuterAvatarDiv;
  }

  createTeacherShortInfo(teacher) {
    const teacherInfoDiv = document.createElement('div');
    teacherInfoDiv.classList.add('teacher-compact-info');
    const teacherAvatar = this.createTeacherAvatar(teacher);
    teacherInfoDiv.appendChild(teacherAvatar);
    const [firstName, lastName] = teacher.full_name.split(' ');
    teacherInfoDiv.innerHTML += `<p class="teacher-compact-info__name">${firstName}<br>${lastName}</p>
                <p class="teacher-compact-info__specialty">${teacher.course}</p>
                <p class="teacher-compact-info__nationality">${teacher.country}</p>`;
    teacherInfoDiv.onclick = () => {
      const teacherInfoModal = this.createTeacherInfoModal(teacher);
      this.modalController.openModal(teacherInfoModal, 'Teacher Info');
      const toggleFavoriteBtn = document.getElementById('toggleFavoriteBtn');
      toggleFavoriteBtn.onclick = () => {
        this.viewModel.dataService.toggleFavorite(teacher.full_name);
        toggleFavoriteBtn.innerText = teacher.favorite ? '★' : '☆';
      };
      const toggleFavoriteBtnMobile = document.getElementById('toggleFavoriteBtnMobile');
      toggleFavoriteBtnMobile.onclick = () => {
        this.viewModel.dataService.toggleFavorite(teacher.full_name);
        toggleFavoriteBtnMobile.innerText = teacher.favorite ? '★ Delete from favorites' : '☆ Add to favorites';
      };
    };
    return teacherInfoDiv;
  }

  // eslint-disable-next-line class-methods-use-this
  createTeacherInfoModal(teacher) {
    const teacherInfoDiv = document.createElement('div');
    teacherInfoDiv.classList.add('teacher-full-info');
    teacherInfoDiv.innerHTML = `
                        ${teacher.picture_large ? `<img class="teacher-full-info__avatar"
                             src="${teacher.picture_large}"
                             alt="Teacher photo"/>` : ''}
                        <button class="teacher-full-info__toggle-favorite not-mobile" id="toggleFavoriteBtn">${teacher.favorite ? '★' : '☆'}</button>
                        <button class="btn small-btn teacher-full-info__toggle-favorite-mobile mobile-only" id="toggleFavoriteBtnMobile">${teacher.favorite ? '★ Delete from favorites' : '☆ Add to favorites'}</button>
                        <p class="teacher-full-info__name">${teacher.full_name}</p>
                        <p class="teacher-full-info__specialty">${teacher.course}</p>
                        <p class="teacher-full-info__info">${teacher.city}, ${teacher.state ? `${teacher.state},` : ''} ${teacher.country}</p>
                        <p class="teacher-full-info__info">${teacher.age}, ${teacher.gender}</p>
                        <a href="mailto://${teacher.email}" class="teacher-full-info__info teacher-full-info__email">${teacher.email}</a>
                        <p class="teacher-full-info__info">${teacher.phone}</p>
                        <p class="teacher-full-info__desc">${teacher.note}</p>
                        <div class="teacher-full-info__map-btn">toggle map</div>
  `;
    return teacherInfoDiv;
  }
}
