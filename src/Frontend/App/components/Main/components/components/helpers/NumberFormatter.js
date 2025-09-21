/**
 * 
 * @param {string} name - name of what to format
 * @param {number} value - number to return
 * @returns based on the name, gives the number as a formatted string. e.g input: name, Kaspar. gives just Kaspar. energy: kcal and defaults to 'g' for grams. 
 */
export default function NumberFormatter(name, value_p = 0) {
  
    const value = value_p || 0

		switch (name) {
			case 'name':
				return value // leave as-is

			case 'energy':
				return `${value}kcal` // append kcal

      case 'kcal':
				return `${value}` // append kcal

			default:
				return `${value}g` // append g for everything else
		}
	}