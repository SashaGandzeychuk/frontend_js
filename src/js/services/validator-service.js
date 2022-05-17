import { validatePerson } from '../data';

export default class ValidatorService {
  constructor() {
    this.countries = {
      australia: /^\+61 ?\d ?\d{4} ?\d{4}$/,
      canada: /^\+1\d{3}-?\d{3}-?\d{4}$/,
      denmark: /^\+45 ?\d{2} ?\d{2} ?\d{2} ?\d{2}$/,
      finland: /^\+358 ?\d{3}-?\d{4}-?\d{3}$/,
      france: /^\+33 ?\d ?\d{2} ?\d{2} ?\d{2} ?\d{2}$/,
      germany: /^\+49 ?\d{3} ?\d{7}$/,
      iran: /^\+98 ?9\d{2} ?\d{3} ?\d{4}$/,
      ireland: /^\+353 ?\d ?\d{3} ?\d{4}$/,
      netherlands: /^\+31 ?\d{3}-?\d{4}-?\d{2}$/,
      new_zealand: /^\+64 ?\d ?\d{4} ?\d{4}$/,
      norway: /^\+47 ?\d{8} ?\d{8}$/,
      spain: /^\++34 ?\d{2} ?\d{3} ?\d{3}$/,
      switzerland: /^\+41 ?\d{2} \d{3} \d{2} \d{2}$/,
      turkey: /^\+90 ?\d{3} \d{3} \d{4}$/,
      ukraine: /^\+380\d{9}$/,
      united_states: /^\+1 ?((\(\d{3}\))|(\d{3})) ?\d{3}-?\d{4}$/,
    };
  }

  validateTeacher(teacher) {
    const countryName = teacher.country.toLowerCase()
      .replace(' ', '_');
    if (this.countries[countryName] === undefined) {
      return ['invalid country'];
    }
    return validatePerson(teacher, this.countries[countryName]);
  }
}
