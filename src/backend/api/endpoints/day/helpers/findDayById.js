import Days, {
  DaysTypeCheck,
} from '../../../../database/models/days.js'

/**
 * Typechecks and populates the foods array, then returns the day.
 * @param {Mongoose.Type.ObjectId} id - id to find with
 * @returns object, day.
 */
export default async function findDayById(id) {
  const { error } = DaysTypeCheck.extract('id').validate(id)
  if (error) {
    return { error: error.details[0].message }
  }
  return await Days.findById(id).populate('foods').exec()
}
