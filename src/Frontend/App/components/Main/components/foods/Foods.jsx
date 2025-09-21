import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import TableItem from '../components/TableItem/TableItem.jsx'
import { modalController } from '../components/Modal/ModalStore.js'
import AddFood from './AddFood.jsx'

export default function Foods({ foods = [], setFoods }) {

  useEffect(() => {
    //get foods from
    async function start() {
      //fetch when no foods exist
      if (foods.length !== 0) {
        return //foods already fetched
      }

      let fetchedFoods = await toast.promise(
        api('food', { method: 'GET' }),
        {
          loading: 'Getting foods... Hold on',
          success: 'Received foods!',
          error: 'Somethind went wrong getting foods...',
        },
      )

      setFoods(fetchedFoods.result)
    }

    start()
  }, [])

  return (
    <>      
        <div className="flex flex-col justify-center items-center w-screen">
          <div className="flex justify-center items-center mb-1 gap-2">
            <h1 className="text-2xl">Foods</h1>
            <button
              className="relative 
            px-7 py-1 bg-green-primary text-white font-medium rounded-lg text-xl cursor-pointer"
              onClick={() => {
                modalController.open(AddFood)
              }}>
              + Add New Food
            </button>
          </div>
          <div
            className="flex flex-col border-t-2 border-green-primary pb-1
          justify-center items-center pt-8 mt-2 w-screen">
            <div className="flex flex-wrap items-center justify-center">
              {foods.map((food, id) => (
                <TableItem
                  key={id + 'key'}
                  id={id}
                  food={food}
                  type="food"
                />
              ))}
            </div>
          </div>
        </div>
    </>
  )
}
