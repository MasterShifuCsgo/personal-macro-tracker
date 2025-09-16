export default function StatBlock({ name = 'None', number = 'NaN' }) {
  let max_length = 4
  let p_name = name.slice(0, max_length)
  if (p_name.length == max_length && name.length > p_name.length) {
    p_name += '.'
  }

  return (
    <div>
      <div className="w-16">
        <p className="text-gray-500 font-medium">{p_name}</p>
      </div>
      <p className="ml-1 text-2xl">{number}g</p>
    </div>
  )
}
