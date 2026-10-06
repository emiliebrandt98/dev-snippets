export default function DarkLightMode({ onToggleColorMode, mode }) {
  return (
    <section className="flex flex-row gap-2">
      <div className="flex flex-col basis-1/3 items-center gap-2 py-2">
        <label className="inheriat" htmlFor="automatic">
          Automatic
        </label>
        <input
          type="radio"
          value="automatic"
          name="appearance"
          id="automatic"
          checked={mode === "automatic"}
          onChange={onToggleColorMode}
          className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-purple-600 checked:bg-purple-600 focus:outline-none transition-all relative flex items-center justify-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white checked:after:block after:hidden checked:drop-shadow-lg checked:drop-shadow-purple-500/50"
        />
      </div>

      <div className="flex flex-col items-center gap-2 basis-1/3 py-2">
        <label htmlFor="light">Light</label>
        <input
          type="radio"
          value="light"
          name="appearance"
          id="light"
          checked={mode === "light"}
          onChange={onToggleColorMode}
          className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-purple-600 checked:bg-purple-600 focus:outline-none transition-all relative flex items-center justify-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white checked:after:block after:hidden checked:drop-shadow-lg checked:drop-shadow-purple-500/50"
        />
      </div>

      <div className="flex flex-col items-center gap-2 basis-1/3 py-2">
        <label htmlFor="dark">Dark</label>
        <input
          type="radio"
          value="dark"
          name="appearance"
          id="dark"
          checked={mode === "dark"}
          onChange={onToggleColorMode}
          className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-purple-600 checked:bg-purple-600 focus:outline-none transition-all relative flex items-center justify-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white checked:after:block after:hidden checked:drop-shadow-lg checked:drop-shadow-purple-500/50"
        />
      </div>
    </section>
  );
}
