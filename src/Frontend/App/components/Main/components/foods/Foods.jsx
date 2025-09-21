import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../../../../../global/helpers/api.js'
import TableItem from '../components/TableItem/TableItem.jsx'
import { modalController } from '../components/Modal/ModalStore.js'
import { FoodsMetadata } from '../../../../../../shared/FoodsSchema.js'

export default function Foods({foods = [], setFoods}) {	

	useEffect(() => {
		//get foods from
		async function start() {			

			//fetch when no foods exist
			if(foods.length !== 0){				
				return; //foods already fetched
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

	function showAddFoodModal() {
		function ModalForm() {
			function handleSubmit(e) {
				console.log(e.target)
			}

			const [form, setForm] = useState({})

			return (
				<form
					onSubmit={(e) => {
						e.preventDefault()
						handleSubmit(e)
					}}
					className="shadow-form shadow-blue-primary rounded-2xl py-6 p-7 md:px-16
        flex flex-col gap-4">
					{Object.entries(FoodsMetadata).map(
						([name, metadata]) => {
							return (
								<div
									key={name}
									className="flex flex-col">
									<label
										key={`${name}-label`}
										htmlFor={metadata.label}>
										{metadata.label}
									</label>
									<input
										key={`${name}-input`}
										className="px-3 py-2 border-3 rounded-xl border-blue-primary"
										id={metadata.label}
										placeholder={name}
										type={metadata.type}
										value={form[name] || ''}
										//setForm(p => { return { ...p, [name]: newVal }
										onChange={(newVal) => {
											setForm((p) => {
												return {
													...p,
													[name]: newVal
														.target.value,
												}
											})
										}}
										required={metadata.required}
									/>
								</div>
							)
						},
					)}
				</form>
			)
		}

		modalController.open(<ModalForm />)
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<div className="flex justify-center items-center mb-1 gap-2">
					<h1 className="text-2xl">Foods</h1>
					<button
						className="relative 
          px-7 py-1 bg-green-primary text-white font-medium rounded-lg text-xl cursor-pointer"
						onClick={() => {
							showAddFoodModal()
						}}>
						+ Add New Food
					</button>
				</div>
				<div
					className="flex flex-col w-screen border-t-2 border-green-primary pb-1
        justify-center items-center pt-8 mt-2">
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
