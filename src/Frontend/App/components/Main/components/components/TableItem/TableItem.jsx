import StatBlock from '../StatBlock/StatBlock'

export default function TableItem({ food }) {  

  return (
    <div
      className="shadow-tableItem
    flex w-max rounded-xl px-8 py-4">
      <div className='flex flex-col gap-1'>
        <p className='text-xl font-bold'>Minced meat</p>
        <div className='flex gap-7'>                    
          <StatBlock name="Protein" number={food.protein} />
          <StatBlock name="Carbs" number={food.carb} />
          <StatBlock name="Fats" number={food.fat} />            
        </div>          
      </div>    
      <div className='bg-blue-primary rounded-2xl cursor-pointer
      grid place-items-center w-16'>
        <img src="/Magnifying_glass.png" alt="Magnifying glass"
        className='w-10'/>
      </div>
    </div>
  )
}
