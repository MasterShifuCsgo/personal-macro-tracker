import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import getToday from '../../../../../../global/helpers/getToday'
import TableItem from '../components/TableItem/TableItem'
import FoodDetailsRow from '../components/FoodDetails/FoodDetailsRow.jsx'

export default function Days({
	day = null,
	setDay = () => {},
	fetchAgain = false,
	setFetchAgain = () => {}
}) {
	const [foods, setFoods] = useState([]) //foods that have been set in day. not all the foods.
	const [totalNutrition, setTotalNutrition] = useState()
	const today = useRef(getToday())
	
	//get days
	useEffect(() => {
		async function start() {
			const fetchDay = async () => {
				//get day based on today's date

				if (day && !fetchAgain) {
					return day //already fetched day
				}
				setFetchAgain(false); //do not fetch again next time this component comes alive

				let fetchedDay = await toast.promise(
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

				//if day doesn't exist
				if ('error' in fetchedDay) {
					fetchedDay = await toast.promise(
						api('day', { method: 'POST' }),
						{
							loading:
								"Day didn't exist in database. creating day...",
							success: 'Created day!',
							error: 'Failed to create your day',
						},
					)
				}

				return fetchedDay.result
			}

			const fetchedDay = await fetchDay()
			setDay(fetchedDay)
		}

		start()

		return () => {}
	}, [])

	//put foods in day into foods hook variable
	useEffect(() => {
		const foods = Array.isArray(day?.foods) ? day.foods : []
		setFoods(foods)

		let totalNutrition = {
			energy: 0,
			carb: 0,
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
			<div className="flex flex-col justify-center items-center ">
				<div className="flex justify-center items-end mb-1 gap-2">
					<h1 className="text-2xl">Day</h1>
					<p className="text-2xl">{today.current}</p>
				</div>
				<div
					className="flex flex-col w-screen border-t-2 border-blue-primary pb-1
          justify-center items-center pt-8">
					<div className="flex flex-wrap items-center justify-center w-screen">
						{foods.map((food, id) => (
							<TableItem
								key={id + 'key'}
								id={id}
								food={food}
								type="day"
							/>
						))}
					</div>
					{!totalNutrition ? (
						<p>Loading total nutrition...</p>
					) : (
						<FoodDetailsRow food={totalNutrition} />
					)}
				</div>
			</div>
		</>
	)
}
