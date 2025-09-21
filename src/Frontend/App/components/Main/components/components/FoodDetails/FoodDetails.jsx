import StatBlock from '../StatBlock/StatBlock.jsx'

/**
 * @param {Object} food - list of food attributes (kcal, protein).
 */
export default function FoodDetails({ food }) {
	return (
		<div
			className="flex flex-wrap justify-center p-5
     m-2 gap-4 border-1 rounded-lg shadow-xl">
			{Object.entries(food).map(([name, number]) => {
				if (name[0] === '_') {
					return
				}

				return (
					<StatBlock key={name} name={name} number={number} />
				)
			})}
		</div>
	)
}
