export default class AddTeacherFormController {
  constructor({
    dataService,
    modalController,
    validatorService,
  }) {
    this.dataService = dataService;
    this.modalController = modalController;
    this.validatorService = validatorService;
  }

  connect(openButtonId) {
    const openButton = document.getElementById(openButtonId);
    openButton.onclick = () => {
      this.openAddTeacherModal();
    };
  }

  openAddTeacherModal() {
    this.modalController.openModal(this.createAddTeacherModal(), 'Add Teacher');
  }

  createAddTeacherModal() {
    const addTeacherForm = document.createElement('form');
    addTeacherForm.classList.add('modal__content');
    addTeacherForm.classList.add('add-teacher-form');
    addTeacherForm.onsubmit = (ev) => {
      ev.preventDefault();
      this.createTeacher(ev.target.elements);
    };
    const coursesOptions = this.dataService.courses.map((course) => `<option>${course}</option>`)
      .join('\n');
    const countriesOptions = this.dataService.countries.map((country) => `<option>${country}</option>`)
      .join('\n');
    addTeacherForm.innerHTML = `
                        <div class="fieldset" style="grid-column: 1 / span 2">
                            <label for="inName" class="label">Name</label>
                            <input type="text" id="inName" name="name" class="add-teacher-form__input" placeholder="Enter name" required>
                        </div>
                        <div class="fieldset" style="grid-column: 1 / span 2">
                            <label for="inSpeciality" class="label">Speciality</label>
                            <select id="inSpeciality" name="speciality" class="add-teacher-form__input" required>
                                ${coursesOptions}
                            </select>
                        </div>
                        <div class="fieldset add-teacher-form__full-row-on-mobile">
                            <label for="inCountry" class="label">Country</label>
                            <select id="inCountry" name="country" class="add-teacher-form__input" required>
                                ${countriesOptions}
                            </select>
                        </div>
                        <div class="fieldset add-teacher-form__full-row-on-mobile">
                            <label for="inCity" class="label">City</label>
                            <input type="text" id="inCity" name="city" class="add-teacher-form__input" required/>
                        </div>
                        <div class="fieldset add-teacher-form__full-row-on-mobile">
                            <label for="inEmail" class="label">Email</label>
                            <input type="email" id="inEmail" name="email" class="add-teacher-form__input" required/>
                        </div>
                        <div class="fieldset add-teacher-form__full-row-on-mobile">
                            <label for="inPhone" class="label">Phone</label>
                            <input type="tel" id="inPhone" name="phone" class="add-teacher-form__input"/>
                        </div>
                        <div class="fieldset add-teacher-form__full-row-on-mobile">
                            <label for="inBirthdate" class="label">Date of Birth</label>
                            <input type="date" id="inBirthdate" name="birthdate" placeholder="dd/mm/yyyy" value="" class="add-teacher-form__input" required/>
                        </div>
                        <div class="fieldset inline-fieldset inline-fieldset__wide" style="grid-column: 1 / span 2">
                            <label for="inSex" class="label">Sex</label>
                            <div id="inSex">
                                <label for="inGender__Male">Male</label>
                                <input id="inGender__Male" type="radio" value="Male" name="gender"/>
                                <label for="inGender__Female">Female</label>
                                <input id="inGender__Female" type="radio" value="Female" name="gender"/>
                                <label for="inGender__NB">Prefer not to say</label>
                                <input id="inGender__NB" type="radio" value="NB" name="gender" checked/>
                            </div>
                        </div>
                        <div class="fieldset inline-fieldset inline-fieldset__wide" style="grid-column: 1 / span 2">
                            <label for="inBgColor" class="label">Background color</label>
                            <input type="color" id="inBgColor" name="bgColor" required/>
                        </div>
                        <div class="fieldset" style="grid-column: 1 / span 2">
                            <label for="inComment" class="label">Notes (optional)</label>
                            <textarea rows="4" cols="20" id="inComment" name="comment"></textarea>
                        </div>
                        <button type="submit" class="btn" style="grid-column: 1 / span 2; align-self: end">Add</button>
  `;
    return addTeacherForm;
  }

  createTeacher(formData) {
    const teacher = {
      full_name: formData.namedItem('name').value,
      country: formData.namedItem('country').value,
      city: formData.namedItem('city').value,
      email: formData.namedItem('email').value,
      phone: formData.namedItem('phone').value,
      b_date: formData.namedItem('birthdate').value,
      gender: formData.namedItem('gender').value,
      bg_color: formData.namedItem('bgColor').value,
      note: formData.namedItem('comment').value,
      course: formData.namedItem('speciality').value,
    };
    const birthYear = Number(teacher.b_date.substring(0, 4));
    const currentYear = new Date().getFullYear();
    teacher.age = currentYear - birthYear;
    const errors = this.validatorService.validateTeacher(teacher);
    if (errors.length !== 0) {
      alert(errors.join('\n'));
      return;
    }
    this.dataService.addTeacher(teacher);
    this.modalController.closeModal();
  }
}
