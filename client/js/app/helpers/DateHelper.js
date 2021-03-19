class DateHelper {
  
  constructor () {
    throw new Error('This class cannot be instatiated')
  }

  static convertTextToDate (text) {
    return new Date(text.split('-'))
  }

  static convertDateToText (date) {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  }
}