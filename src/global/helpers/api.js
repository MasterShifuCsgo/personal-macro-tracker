const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 
 * @returns Example: { field: "1245" } -> ?field=1245
 */
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
 * @param {Object} [options.body] - send body
 * @returns {<Promise>() => JSON} - promise that holds the received JSON
 */
export default async function api(
  endpoint,
  { method = "GET", querys, body }
) {  
  const result = await fetch(
    `${API_BASE_URL}/${endpoint}${querys ? transformObjectToQueryString(querys) : ""}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }
  )
    .then((r) => {
      if(r.status == 204){
        return;
      }      
      return r.json()
    })
    .then((serialized) => serialized)
    .catch((err) => {
      console.error("something went wrong with api call:\n", err);
      throw err;
    })

  return result
}
