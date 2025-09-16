import Days, {
  DaysTypeCheck,
} from '../../../../database/models/days.js'

/**
 * Typechecks and populates the foods array, then returns the day.
 * @param {string} date - "day-month-year" date to find with
 * @returns object, day.
 */
export default async function findDayByDate(date) {
  const { error } = DaysTypeCheck.extract('date').validate(date)
  if (error) {
    return { error: error.details[0].message }
  }
  return await Days.findOne({ date }).populate('foods').exec()
}
