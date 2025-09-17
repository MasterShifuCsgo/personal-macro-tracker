export default function StatBlock({ name = 'None', number = '00' }) {
  let max_length = 5
  let p_name = name.slice(0, max_length)
  if (p_name.length == max_length && name.length > p_name.length) {
    p_name += '.'
  }

  return (
    <div className="w-max px-2">
      <div className="w-min">
        <p className="text-gray-500 font-medium">{p_name}</p>
      </div>
      <p className="ml-1 text-2xl">{number}g</p>
    </div>
  )
}
