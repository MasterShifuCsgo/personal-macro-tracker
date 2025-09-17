import { useEffect, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import getToday from '../../../../../../global/helpers/getToday'
import TableItem from '../components/TableItem/TableItem'
import StatBlock from '../components/StatBlock/StatBlock.jsx'

export default function Days() {
  const [day, setDays] = useState(null)
  const [foods, setFoods] = useState([])
  const [totalNutrition, setTotalNutrition] = useState()
  const today = useRef(getToday())

  let nutritionValues = [
    'carb',
    'energy',
    'fat',
    'fiber',
    'kcal',
    'protein',
    'salt',
    'serving',
  ]

  useEffect(() => {
    async function start() {
      const day = async () => {
        //get day based on today's date

        let day = await toast.promise(
          api('day', {
            method: 'GET',
            querys: { date: getToday() },
          }),
          {
            loading: 'Getting day... hold on',
            success: 'Got your day!',
            error: 'Something went wrong getting your day',
          },
        )

        console.log(day)
        //if day doesn't exist
        if ('error' in day) {
          day = await toast.promise(api('day', { method: 'POST' }), {
            loading: "Day didn't exist in database. creating day...",
            success: 'Created day!',
            error: 'Failed to create your day',
          })
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
    setFoods(foods)

    let totalNutrition = {
      carb: 0,
      energy: 0,
      fat: 0,
      fiber: 0,
      kcal: 0,
      protein: 0,
      salt: 0,
      serving: 0,
    }

    for (let food of foods) {
      totalNutrition.carb += food.carb
      totalNutrition.energy += food.energy
      totalNutrition.fat += food.fat
      totalNutrition.fiber += food.fiber
      totalNutrition.kcal += food.kcal
      totalNutrition.protein += food.protein
      totalNutrition.salt += food.salt
      totalNutrition.serving += food.serving
    }

    setTotalNutrition(totalNutrition)
  }, [day])

  //accumulates the nutrition of all foods

  return (
    <>
      <Toaster></Toaster>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex justify-center items-end mb-1 gap-2">
          <h1 className="text-2xl">Day</h1>
          <p className="text-2xl">{today.current}</p>
        </div>
        <div
          className="flex flex-col w-screen border-t-2 border-blue-primary pb-1
          justify-center items-center pt-8"
        >
          <div className="flex flex-wrap items-center justify-center">
            {foods.map((food, id) => (
              <TableItem key={id} food={food} type="day" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center p-5 mt-15 mx-2 gap-4 border-1 rounded-lg shadow-xl">
            {!totalNutrition ? (
              <p>Loading total nutrition</p>
            ) : (
              <>                              
                {nutritionValues.map((name, i) => {
                  return (
                    <StatBlock
                      key={i}
                      name={name}
                      number={totalNutrition[name]}
                    />
                  )
                })}                
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
