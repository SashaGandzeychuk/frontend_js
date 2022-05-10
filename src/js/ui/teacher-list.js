import { createTeacherInfoModal, openModal } from './modals';

function createTeacherAvatar(teacher) {
  const outerAvatarDiv = document.createElement('div');
  outerAvatarDiv.classList.add('teacher-avatar');
  if (teacher.pictureLarge) {
    const avatarImg = document.createElement('img');
    avatarImg.src = teacher.pictureLarge;
    avatarImg.classList.add('teacher-avatar__img');
    avatarImg.alt = 'Teacher photo';
    outerAvatarDiv.appendChild(avatarImg);
  } else {
    const avatarPlaceholder = document.createElement('h3');
    avatarPlaceholder.classList.add('teacher-avatar__placeholder');
    const wordsInName = teacher.fullName.split(' ');
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
  return outerAvatarDiv;
}

function createTeacherShortInfo(teacher) {
  const teacherInfoDiv = document.createElement('div');
  teacherInfoDiv.classList.add('teacher-compact-info');
  const teacherAvatar = createTeacherAvatar(teacher);
  teacherInfoDiv.appendChild(teacherAvatar);
  teacherInfoDiv.dataset.teacherId = teacher.id;
  teacherInfoDiv.innerHTML += `<p class="teacher-compact-info__name">${teacher.fullName}</p>
                <p class="teacher-compact-info__specialty">${teacher.course}</p>
                <p class="teacher-compact-info__nationality">${teacher.country}</p>`;
  teacherInfoDiv.onclick = () => {
    const teacherInfoModal = createTeacherInfoModal(teacher);
    openModal(teacherInfoModal);
  };
  return teacherInfoDiv;
}

export function renderTeachersList(model) {
  const teachersList = document.getElementById('teachers-list');
  teachersList.innerHTML = '';
  const renderedTeachers = model.data.slice(0, 8);
  renderedTeachers.map((teacher) => createTeacherShortInfo(teacher))
    .forEach((div) => teachersList.appendChild(div));
}

export function initTeachersList(model) {
  document.getElementById('inAgeFilter').onchange = (ev) => {
    model.onAgeFilterChanged(ev.target.value);
  };
  document.getElementById('inSexFilter').onchange = (ev) => {
    model.onSexFilterChanged(ev.target.value);
  };
  document.getElementById('inWithPhotoFilter').onchange = (ev) => {
    model.onOnlyWithPhotoFilterChanged(ev.target.checked);
  };
  document.getElementById('inOnlyFavoritesFilter').onchange = (ev) => {
    model.onOnlyFavoritesFilterChanged(ev.target.checked);
  };
  model.dataUpdatedEmitter.subscribe(() => {
    renderTeachersList(model);
  });
  renderTeachersList(model);
}
