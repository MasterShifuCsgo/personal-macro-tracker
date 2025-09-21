export default function Navbar({ component, setComponent }) {
  const buttonStyle = `border-1 px-4 py-1 rounded-md border-blue-primary cursor-pointer text-1xl font-semibold`
  const buttonSelected = `bg-blue-primary text-white`
  const buttons = [
    {
      name: 'Days',
      selected: component === 'days',
      onClick: () => setComponent('days'),
    },
    {
      name: 'Foods',
      selected: component === 'foods',
      onClick: () => setComponent('foods'),
      style: "bg-green-primary border-green-primary"
    },
  ]

  return (
    <nav className="flex flex-col p-4 ">
      <h1 className="text-2xl font-semibold">View Table</h1>
      <div className="flex gap-4 pt-3">
        {buttons.map(button => (
          <button
            key={button.name}
            onClick={button.onClick}
            className={`${buttonStyle} 
            ${button.selected ? buttonSelected + " " + button?.style : ''
              }`}
          >
            {button.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
