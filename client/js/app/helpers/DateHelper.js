class DateHelper {
  
  constructor () {
    throw new Error('This class cannot be instatiated')
  }

  static convertTextToDate (text) {
    if(!/\d{4}-\d{2}-\d{2}/.test(text)) {
      throw new Error('Date pattern must be yyyy-mm-dd')
    }

    return new Date(text.split('-'))
  }

  static convertDateToText (date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}