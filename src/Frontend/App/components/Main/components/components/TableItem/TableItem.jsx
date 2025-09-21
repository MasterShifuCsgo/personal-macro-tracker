import getToday from '../../../../../../../global/helpers/getToday'
import StatBlock from '../StatBlock/StatBlock'
import api from '../../../../../../../global/helpers/api.js'
import { modalController } from '../Modal/ModalStore.js'
import toast from 'react-hot-toast'
import FoodDetails from '../FoodDetails/FoodDetails.jsx'

/**
 * @param {{ food: Object }} props - Object containing food details like protein, kcal, etc.
 * @returns {JSX.Element} JSX element representing the right side of the TableItem
 */
function Day({ food }) {
	return (
		<div
			className="bg-blue-primary rounded-2xl cursor-pointer
      grid place-items-center w-16"
			onClick={() => {
				//open the View Food modal
				modalController.open(
					<div className="flex flex-col gap-4">
						<h1 className="text-3xl">Food Details</h1>
						<FoodDetails food={food} />
					</div>,
				)
			}}>
			<img
				src="/Magnifying_glass.png"
				alt="Magnifying glass"
				className="w-10"
			/>
		</div>
	)
}

/**
 *
 * @param {{food: Object}} food - Holds food details like protein, kcal and so on
 * @returns
 */
function Food({ food }) {
	const buttons = [
		//result: deletes food from the dom if successfully deleted.
		{
			path: '/Trash.png',
			bg_color: 'bg-red-primary',
			onClick: async () => {
				const deleteFood = async (food_id) => {
					await toast.promise(
						api('food', {
							method: 'DELETE',
							querys: { food_id: food_id },
						}),
						{
							loading: 'Deleting your food',
							success: 'Deleted Food',
							error: 'Error deleting your food',
						},
					)
				}

				const buttonStyle =
					'cursor-pointer px-6 py-2 font-bold text-xl text-white rounded-lg bg-blue-primary text-white'

				modalController.open(
					<div className="flex flex-col gap-3 items-center">
						<p className="text-red-500 font-extrabold text-2xl">
							Are you sure you want to delete this?
						</p>
						<div className="flex gap-2">
							<button
								className={`${buttonStyle}`}
								onClick={() => {
									deleteFood(food['_id'])
									//delete itself from the DOM?
									modalController.close()
								}}>
								Yes
							</button>
							<button
								className={`${buttonStyle}`}
								onClick={() => modalController.close()}>
								No
							</button>
						</div>
					</div>,
				)
			},
		},
		//result: adds the food to the day.
		{
			path: '/Pencil.png',
			bg_color: 'bg-green-primary',
			onClick: async () => {
				//make api call to add food to this day.
				const today = getToday()
				const { result: day } = await api('day', {
					method: 'GET',
					querys: { date: today },
				})
				const foods = [
					...new Set([
						...day.foods.map((f) => f['_id']),
						food['_id'],
					]),
				]
				await api('day', {
					method: 'PUT',
					querys: { date: today },
					body: { foods: foods },
				})
			},
		},
	]

	return (
		<div className="flex flex-col gap-1">
			{buttons.map((pic, index) => (
				<div
					key={index + 't'}
					className={`${pic.bg_color} 
         w-max p-2 rounded-lg cursor-pointer`}
					onClick={pic.onClick}>
					<img
						key={index + 'b'}
						src={pic.path}
						className="w-8"
					/>
				</div>
			))}
		</div>
	)
}

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
      flex w-max rounded-xl mx-2 px-4 py-4 gap-8
      sm:px-8">
			<div className="flex flex-col gap-1">
				<p className="text-xl font-bold">{food.name}</p>
				<div className="flex gap-2">
					<StatBlock name="Protein" number={food.protein} />
					<StatBlock name="Carbs" number={food.carb} />
					<StatBlock name="Fats" number={food.fat} />
				</div>
			</div>
			<div className="flex">
				{type === 'day' ? (
					<Day food={food} />
				) : (
					<Food food={food} />
				)}
			</div>
		</div>
	)
}
