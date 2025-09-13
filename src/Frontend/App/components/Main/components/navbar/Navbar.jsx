export default function Navbar({ component, setComponent }) {
  const buttonStyle = `border-1 px-4 py-1 rounded-md border-blue-primary cursor-pointer text-1xl`
  const buttonSelected = `bg-blue-primary text-white`
  const buttons = [
    {
      name: "Days",
      selected: component === "days",
      onClick: () => setComponent("days"),
    },
    {
      name: "Foods",
      selected: component === "foods",
      onClick: () => setComponent("foods"),
    },
  ]

  return (
    <nav className="flex flex-col pl-5 border-b-2 pb-2">
      <h1 className="font-bold text-2xl">View Table</h1>
      <div className="flex gap-4 pl-10 pt-2">
        {buttons.map((button) => (
          <button
            key={button.name} // FIX: unique key for map
            onClick={button.onClick}
            className={`${buttonStyle} ${
              button.selected ? buttonSelected : ""
            }`}
          >
            {button.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
