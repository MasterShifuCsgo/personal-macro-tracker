export default function StatBlock({
	name = 'None',
	number = '00',
	max_length = Infinity,
}) {
	function formatNumber(name, value) {
		switch (name) {
			case 'name':
				return value // leave as-is

			case 'energy':
				return `${value}kcal` // append kcal

			default:
				return `${value}g` // append g for everything else
		}
	}

	let namef = name.slice(0, max_length)
	if (namef.length == max_length && name.length > namef.length) {
		namef += '.'
	}

	const numberf = formatNumber(name, number)

	return (
		<div className="w-max px-2">
			<div className="w-min">
				<p className="text-gray-500 font-medium">{namef}</p>
			</div>
			<p className="ml-1 text-2xl">{numberf}</p>
		</div>
	)
}
