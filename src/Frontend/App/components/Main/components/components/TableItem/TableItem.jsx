import StatBlock from '../StatBlock/StatBlock'


//both functions just hold the right side of the JSX Tableitem
function Day(){
  return(
    <div className='bg-blue-primary rounded-2xl cursor-pointer
      grid place-items-center w-16'>
        <img src="/Magnifying_glass.png" alt="Magnifying glass"
        className='w-10'/>
    </div>
  );
}

function Food(){
  return(
    <div>
      <p>Delete</p>
      <p>add to eaten list</p>
    </div>
  );
}


export default function TableItem({ food, type = "day" }) {  



  return (
    <div
      className="shadow-tableItem
      flex w-max rounded-xl mx-2 px-4 py-4 gap-4
      sm:px-8">
      <div className='flex flex-col gap-1'>
        <p className='text-xl font-bold'>{food.name}</p>
        <div className='flex gap-2'>          
          <StatBlock name="Protein" number={food.protein} />
          <StatBlock name="Carbs" number={food.carb} />
          <StatBlock name="Fats" number={food.fat} />            
        </div>          
      </div>    
      <div className='flex'>
        {type === "day" ? <Day/> : <Food/>} 
      </div>
    </div>
  )
}
