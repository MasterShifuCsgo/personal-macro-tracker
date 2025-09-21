import toast from 'react-hot-toast'
import api from '../../../../../../../global/helpers/api.js'
import getToday from '../../../../../../../global/helpers/getToday'
import { modalController } from '../Modal/ModalStore.js'
/**
 *
 * @param {{food: Object}} food - Holds food details like protein, kcal and so on
 * @returns
 */
export default function Food({ food }) {


  function DeleteConformation() {
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

    const handleConfirm = () => {
      deleteFood(food._id)
      modalController.close()
    }

    return (
      <div className="flex flex-col gap-3 items-center">
        <p className="text-red-500 font-extrabold text-2xl">
          Are you sure you want to delete this?
        </p>
        <div className="flex gap-2">
          <button className="btn" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn" onClick={modalController.close}>
            No
          </button>
        </div>
      </div>
    )
  }

  const buttons = [
    //result: deletes food from the dom if successfully deleted.
    {
      path: '/Trash.png',
      bg_color: 'bg-red-primary',
      onClick: async () => {
        modalController.open(DeleteConformation)
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
          ...new Set([...day.foods.map((f) => f['_id']), food['_id']]),
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
            clickable w-max p-2 rounded-lg cursor-pointer`}
          onClick={pic.onClick}>
          <img key={index + 'b'} src={pic.path} className="w-8" />
        </div>
      ))}
    </div>
  )
}
