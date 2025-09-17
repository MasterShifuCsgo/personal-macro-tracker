import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import TableItem from '../components/TableItem/TableItem.jsx'

export default function Foods() {
  const [foods, setFoods] = useState([])

  useEffect(() => {
    //get foods from
    async function start() {
      
      let foods = await toast.promise(api('food', { method: 'GET' }), {
        loading: 'Getting foods... Hold on',
        success: 'Received foods!',
        error: 'Somethind went wrong getting foods...',
      })

      setFoods(foods.result)
    }

    start()
  }, [])

  return (
    <>
      <Toaster></Toaster>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-end mb-1 gap-2">
          <h1 className="text-2xl">Foods</h1>
        </div>
        <div
          className="flex flex-col w-screen border-t-2 border-green-primary pb-1
        justify-center items-center pt-8"
        >
          <div className="flex flex-wrap items-center justify-center">
            {foods.map((food, id) => (
              <TableItem key={id} food={food} type="food"/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
