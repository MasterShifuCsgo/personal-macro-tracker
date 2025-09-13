const today = new Date();

/**
 * 
 * @returns 'date-month-year'. This is how dates are stored in the database
 */
export default function getToday() {
  return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
}
