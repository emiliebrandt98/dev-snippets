export default function DarkLightMode() {
  function handleToggleColorMode() {}
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="autmatic">Automatic</label>
        <input
          type="radio"
          value="Automatic"
          name="apperance"
          id="autmatic"
          defaultChecked
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="light">Light</label>
        <input type="radio" value="Light" name="apperance" id="light" />
      </div>

      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="dark">Dark</label>
        <input type="radio" value="Dark" name="apperance" id="dark" />
      </div>
    </div>
  );
}
