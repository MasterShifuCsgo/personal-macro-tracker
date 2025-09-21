import Days from './components/days/Days.jsx'
import Foods from './components/foods/Foods.jsx'
import { useState } from 'react'

export default function Main({ activeComponent }) {
  const [fetchAgain, setFetchAgain] = useState(false) // used to make day fetch again when
  const [day, setDay] = useState(null) // for day
  const [foods, setFoods] = useState([]) // for foods

  return (
    <main>
      {activeComponent === 'days' ? (
        <Days
          day={day}
          setDay={setDay}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      ) : (
        <Foods foods={foods} setFoods={setFoods} />
      )}
    </main>
  )
}
