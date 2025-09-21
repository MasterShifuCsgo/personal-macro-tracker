import NumberFormatter from "../helpers/NumberFormatter.js"

export default function StatBlock({
	name = 'None',
	number = '00',
	max_length = Infinity,
}) {
	

	let namef = name.slice(0, max_length)
	if (namef.length == max_length && name.length > namef.length) {
		namef += '.'
	}

	const numberf = NumberFormatter(name, number)

	return (
		<div className="w-max px-2">
			<div className="w-min">
				<p className="text-gray-500 font-medium">{namef}</p>
			</div>
			<p className="ml-1 text-2xl">{numberf}</p>
		</div>
	)
}
