export default function Navbar({ component, setComponent }) {  
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
    <nav className="flex flex-col p-4 w-min">
      <h1 className="text-2xl font-semibold">View Table</h1>
      <div className="flex gap-4 pt-3">
        {buttons.map(button => (
          <button
            key={button.name}
            onClick={button.onClick}
            className={`btn  ${button.selected ? "btn-active" + " " + button?.style : ''
              }`}
          >
            {button.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
