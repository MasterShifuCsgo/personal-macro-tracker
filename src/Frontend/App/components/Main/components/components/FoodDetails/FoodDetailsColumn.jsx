import NumberFormatter from '../helpers/NumberFormatter.js';

/**
 * @param {Object} food - list of food attributes (kcal, protein).
 */
export default function FoodDetailsColumn({ food }) {  
  return (
    <div className="flex flex-col">
      <p className="text-xl">
        <span className='text-2xl'>{food.name}</span> - <span className='text-2xl'>{food.serving}g</span>
      </p>
      <div
        className="flex flex-col flex-wrap justify-center px-4 py-5
        border-1 rounded-lg shadow-xl text-2xl font-bold">
        {Object.entries(food).map(([name, number], id) => {
          if (name[0] === '_' || name === 'name') {
            return
          }
          
          const numberf = NumberFormatter(name, number);

          return (
            <p key={id}>
              {name}: {numberf}
            </p>
          )
        })}
      </div>
    </div>
  )
}
