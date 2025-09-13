import { useEffect, useState } from "react"
import api from "../../../../../../global/helpers/api"
import getToday from "../../../../../../global/helpers/getToday"

export default function Days() {
  const [day, setDay] = useState(null)

  useEffect(() => {
    const start = async () => {
      const fetchedDay = await api("days", {
        method: "GET",
        querys: { day_id: getToday() },
      })
      console.log(fetchedDay)
      setDay(fetchedDay)
    }
    start()
  }, [])

  console.log(day)

  return <></>
}
