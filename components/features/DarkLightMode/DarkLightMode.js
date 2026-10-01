export default function DarkLightMode({ onToggleColorMode, mode }) {
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="automatic">Automatic</label>
        <input
          type="radio"
          value="Automatic"
          name="appearance"
          id="automatic"
          checked={mode === "automatic"}
          onChange={onToggleColorMode}
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="light">Light</label>
        <input
          type="radio"
          value="Light"
          name="appearance"
          id="light"
          checked={mode === "light"}
          onChange={onToggleColorMode}
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-20 py-2">
        <label htmlFor="dark">Dark</label>
        <input
          type="radio"
          value="Dark"
          name="appearance"
          id="dark"
          checked={mode === "dark"}
          onChange={onToggleColorMode}
        />
      </div>
    </div>
  );
}
