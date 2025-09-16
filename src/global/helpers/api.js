const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function transformObjectToQueryString(obj) {
  let final_string = "?"
  for (const [key, value] of Object.entries(obj)) {
    final_string += `${key}=${value}&`
  }
  return final_string.slice(0, -1) //return without &
}

/**
 *
 * @param {String} endpoint - what endpoint to call 'day' or 'foods'?
 * @param {Object} options - hold optional paramters for fetch and url
 * @param {string} [options.method] - GET, POST, PUT, DELETE, ...
 * @param {Object} [options.querys] - holds key value pairs of what to add in queries. {day_id: "1234"}
 * @returns {JSON} - received json
 */
export default async function api(
  endpoint,
  { method = "GET", querys }
) {
  const result = await fetch(
    `${API_BASE_URL}/${endpoint}${querys ? transformObjectToQueryString(querys) : ""}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((r) => r.json())
    .then((json) => json)
    .catch((err) => {
      console.error("something went wrong with api call: ", err)
    })

  return result
}
