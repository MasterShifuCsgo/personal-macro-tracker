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
 * @param {String} call - what endpoint to call 'day' or 'foods'?
 * @param {Object} options - hold optional paramters for fetch and url
 * @param {string} [options.method] - GET, POST, PUT, DELETE, ...
 * @param {Object} [options.querys] - holds key value pairs of what to add in queries. {day_id: "1234"}
 */
export default async function api(call, { method = "GET", querys}) {    
  const result = await fetch(
    `${API_BASE_URL}/${call}
    ${querys ? transformObjectToQueryString(querys) : ""}`, //add queries if exist
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((r) => r.json())
    .then((json) => {return json});

  return result
}
