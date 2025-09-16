import { useEffect, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import getToday from '../../../../../../global/helpers/getToday'
import TableItem from '../components/TableItem/TableItem'

export default function Days() {
  const [day, setDays] = useState(null)
  const [foods, setFoods] = useState([]);
  const today = useRef(getToday())

  useEffect(() => {
    async function start() {
      const day = async () => {
        //get day based on today's date
        let day = await api('day', {
          method: 'GET',
          querys: { date: getToday() },
        })

        //if day doesn't exist
        if ('error' in day) {
          toast.loading("Day didn't exist in database. creating day...")          
          day = await api('day', { method: 'POST' })
        }        
        return day.result
      }

      setDays(await day())
    }

    start()

    return () => {}
  }, [])
    
  useEffect(() => {    
    const foods = Array.isArray(day?.foods) ? day.foods : []
    setFoods(foods);    
    console.log("Day:", day);
    console.log("Foods:", foods);
  }, [day])

  return (
    <>
      <Toaster></Toaster>
      <div
        className="flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-end mb-1">
          <h1 className="text-2xl">Day</h1>
          <p className="text-sm">{today.current}</p>
        </div>
        <div className='w-screen border-t-2 border-blue-primary pb-1
        flex justify-center items-center pt-8'>          
            <div className="grid grid-cols-2 gap-6">
              {foods.map((food, id) => (
                <TableItem key={id} food={food} type="day"/>
              ))}
            </div>
        </div>
      </div>
    </>
  )
}
