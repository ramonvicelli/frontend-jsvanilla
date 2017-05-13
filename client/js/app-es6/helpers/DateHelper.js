export class DateHelper {

  constructor() {
    throw new Error("DateHelper can't be instantiated")
  }

  static stringToDate(text) {
    if (!/\d{4}-\d{2}-\d{2}/.test(text)) {
      throw new Error('Should be in format yyyy-mm-dd');
    }

    return new Date(text.split('-'));
    // return new Date(text.replace(/-/g,','));
  }

  static dateToString(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
