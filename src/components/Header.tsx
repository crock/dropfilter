import { Link } from "@tanstack/react-router";
import { MoonIcon, SunIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-6xl h-full flex items-center justify-between">
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="[&.active]:font-bold">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-row justify-start items-center">
          <FunnelIcon className="w-6 h-6 mr-2 text-black dark:text-white" />
          <span className="text-2xl font-bold">Dropfilter</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
          >
            <span className="text-gray-600 dark:text-gray-300">
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </span>
          </button>
          <a
            href="https://github.com/crock/dropfilter"
            target="_blank"
            title="Contribute on GitHub"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex flex-row items-center"
          >
            <svg
              enableBackground="new 0 0 512 512"
              width="24px"
              height="24px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="mr-2"
            >
              <path
                clipRule="evenodd"
                d="M192,368.004c0-8.844,7.156-16,16-16s16,7.156,16,16  s-7.156,16-16,16S192,376.848,192,368.004L192,368.004z M349.328,494.16c-4.266,1.219-8.672,2.094-13.328,2.094  c-26.516,0-48-21.484-48-48v-58.188c0-20.094,12.898-37.156,30.797-43.438C353.164,335.082,384,306.082,384,272.004V240  c0-15.164-6.188-29.285-16-41.367V162.5c0-17.668-14.328-23.719-32-13.496l-24.516,14.176C303.633,161.145,295.703,160,288,160h-64  c-7.699,0-15.633,1.145-23.484,3.18L176,149.004c-17.668-10.223-32-4.172-32,13.496v36.133c-9.812,12.082-16,26.203-16,41.367  v32.004c0,23.281,14.488,44.188,34.578,58.812l-0.02,0.031c4.172,2.859,6.945,7.688,6.945,13.156c0,8.828-7.176,16-16,16  c-4.52,0-8.574-1.891-11.48-4.906C115.004,334.629,96,305.035,96,272.004V240c0-18.523,6.012-35.977,16-51.375v-47.633  c0-35.336,28.645-47.438,64-26.996l27.461,15.887C210.309,128.719,217.172,128,224,128h64c6.828,0,13.688,0.719,20.539,1.883  L336,113.996c35.359-20.441,64-8.34,64,26.996v47.633c9.984,15.398,16,32.852,16,51.375v32.004  c0,47.609-39.25,88.141-85.531,104.359c-0.055,0.047-0.109,0.172-0.188,0.188c-6.016,2.312-10.281,8.125-10.281,14.953v56.75  c0,8.844,7.156,16,16,16c1.336,0,2.562-0.375,3.797-0.688C421.969,430.41,480,350.066,480,256c0-123.715-100.281-224-224-224  C132.285,32,32,132.285,32,256c0,97.41,62.254,180.066,149.121,210.895c0.445,0.047,0.852,0.234,1.316,0.234  c5.277,0,9.562-4.297,9.562-9.562c0-5.281-4.285-9.562-9.562-9.562c-0.113,0-0.113-0.094-0.191-0.141  c-53.16-1.422-53.219-63.859-70.246-63.859c-8.844,0-16-7.156-16-16s7.156-16,16-16c1.688,0,4.207,0,7.988,0  c32.02,0,27.445,64,72.012,64c17.668,0,32,14.328,32,32v28c0,15.453-12.527,28-28.004,28c-1.688,0-3.277-0.344-4.887-0.656  C81.203,474.613,0,374.926,0,256C0,114.617,114.617,0,256,0s256,114.617,256,256C512,364.41,444.508,456.848,349.328,494.16  L349.328,494.16z"
                className="fill-black dark:fill-white"
                fillRule="evenodd"
              />
            </svg>
            <span className="hidden lg:block">
              Contribute on GitHub
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
