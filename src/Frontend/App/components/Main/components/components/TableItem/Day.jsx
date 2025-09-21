import { modalController } from '../Modal/ModalStore.js'
import FoodDetailsColumn from '../FoodDetails/FoodDetailsColumn.jsx'

/**
 * @param {{ food: Object }} props - Object containing food details like protein, kcal, etc.
 * @returns {JSX.Element} JSX element representing the right side of the TableItem
 */
export default function Day({ food }) {
  function ShowFoodDeatails() {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Food Details</h1>
        <FoodDetailsColumn food={food} />
      </div>
    )
  }

  return (
    <div
      className="bg-blue-primary rounded-2xl cursor-pointer
      grid place-items-center w-16 clickable"
      onClick={() => {
        //open the View Food modal
        modalController.open(ShowFoodDeatails)
      }}>
      <img
        src="/Magnifying_glass.png"
        alt="Magnifying glass"
        className="w-10"
      />
    </div>
  )
}