export function openModal(modal) {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'block';
  const modalBox = document.getElementById('modalBox');
  modalBox.appendChild(modal);
}

export function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'none';
  const modalBox = document.getElementById('modalBox');
  modalBox.innerHTML = '';
}

function createModalHeader(title) {
  const header = document.createElement('div');
  header.classList.add('modal__header');
  const titleParagraph = document.createElement('p');
  titleParagraph.classList.add('modal__title');
  titleParagraph.textContent = title;
  header.appendChild(titleParagraph);
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('modal__close');
  closeButton.onclick = () => closeModal();
  header.appendChild(closeButton);
  return header;
}

export function createTeacherInfoModal(teacher) {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal');
  modalDiv.appendChild(createModalHeader('Teacher Info'));
  const teacherInfoDiv = document.createElement('div');
  teacherInfoDiv.classList.add('teacher-full-info');
  teacherInfoDiv.innerHTML = `
                        ${teacher.pictureLarge ? `<img class="teacher-full-info__avatar"
                             src="${teacher.pictureLarge}"
                             alt="Teacher photo"/>` : ''}
                        <p class="teacher-full-info__name">${teacher.fullName}</p>
                        <p class="teacher-full-info__specialty">${teacher.course}</p>
                        <p class="teacher-full-info__info">${teacher.city}, ${teacher.state ? `${teacher.state},` : ''} ${teacher.country}</p>
                        <p class="teacher-full-info__info">${teacher.age}, ${teacher.gender}</p>
                        <a href="mailto://${teacher.email}" class="teacher-full-info__email">${teacher.email}</a>
                        <p class="teacher-full-info__info">${teacher.phone}</p>
                        <p class="teacher-full-info__desc">${teacher.note}</p>
                        <div class="teacher-full-info__map-btn">toggle map</div>
  `;
  modalDiv.appendChild(teacherInfoDiv);
  return modalDiv;
}

export function createAddTeacherModal() {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal');
  modalDiv.appendChild(createModalHeader('Add Teacher'));
  const addTeacherForm = document.createElement('form');
  addTeacherForm.classList.add('modal__content');
  addTeacherForm.classList.add('add-teacher-form');
  addTeacherForm.innerHTML = `
    <div class="fieldset" style="grid-column: 1 / span 2">
                            <label for="inName" class="label">Name</label>
                            <input type="text" id="inName" name="name" required>
                        </div>
                        <div class="fieldset">
                            <label for="inCountry" class="label">Country</label>
                            <input type="text" id="inCountry" name="country" required/>
                        </div>
                        <div class="fieldset">
                            <label for="inCity" class="label">City</label>
                            <input type="text" id="inCity" name="city" required/>
                        </div>
                        <div class="fieldset">
                            <label for="inEmail" class="label">Email</label>
                            <input type="email" id="inEmail" name="email" required/>
                        </div>
                        <div class="fieldset">
                            <label for="inPhone" class="label">Phone</label>
                            <input type="tel" id="inPhone" name="phone" required/>
                        </div>
                        <div class="fieldset">
                            <label for="inBirthdate" class="label">Date of Birth</label>
                            <input type="date" id="inBirthdate" name="birthdate" required/>
                        </div>
                        <div class="fieldset inline-fieldset" style="grid-column: 1 / span 2">
                            <label for="inSex" class="label">Sex</label>
                            <div id="inSex">
                                <label for="inGender__Male">Male</label>
                                <input id="inGender__Male" type="radio" value="male" name="gender"/>
                                <label for="inGender__Female">Female</label>
                                <input id="inGender__Female" type="radio" value="female" name="gender"/>
                                <label for="inGender__NB">Prefer not to say</label>
                                <input id="inGender__NB" type="radio" value="nb" name="gender" checked/>
                            </div>
                        </div>
                        <div class="fieldset inline-fieldset" style="grid-column: 1 / span 2">
                            <label for="inBgColor" class="label">Background color</label>
                            <input type="color" id="inBgColor" name="bgColor" required/>
                        </div>
                        <div class="fieldset" style="grid-column: 1 / span 2">
                            <label for="inComment" class="label">Notes (optional)</label>
                            <textarea rows="4" cols="20" id="inComment" name="comment"></textarea>
                        </div>
                        <button type="submit" class="btn" style="grid-column: 1 / span 2; align-self: end">Add</button>
  `;
  modalDiv.appendChild(addTeacherForm);
  return modalDiv;
}
