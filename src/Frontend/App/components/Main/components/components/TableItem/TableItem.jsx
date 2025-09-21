import StatBlock from '../StatBlock/StatBlock'
import Day from './Day.jsx'
import Food from './Food.jsx'

/**
 *
 * @param {Mongoose objectID} id = food ID
 * @param {Object} food - food to be shown
 * @returns JSX
 */
export default function TableItem({ id, food, type = 'day' }) {
  return (
    <div
      id={id}
      className="shadow-tableItem
      flex w-min rounded-xl mx-2 px-4 py-4 gap-8
      overflow-auto">
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold">{food.name}</p>
        <div className="flex ">
          <StatBlock name="Protein" number={food.protein} />
          <StatBlock name="Carbs" number={food.carb} />
          <StatBlock name="Fats" number={food.fat} />
        </div>
      </div>
      <div className="flex">
        {type === 'day' ? <Day food={food} /> : <Food food={food} />}
      </div>
    </div>
  )
}
