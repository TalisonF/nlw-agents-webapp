import { ModeToggle } from './mode-toggle';

export function Navbar() {
  return (
    <nav className="">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/** biome-ignore lint/performance/noImgElement: vite rule unnecessary */}
          <img
            alt="Let Me ask Logo"
            className="h-8 dark:invert"
            src="/icon.svg"
          />
          <span className="self-center whitespace-nowrap font-semibold text-2xl dark:text-white">
            Let me ask!
          </span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
