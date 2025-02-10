import { Link } from "@tanstack/react-router";
import { FunnelIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full h-auto md:h-80 py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-4 h-full flex flex-col justify-between items-stretch">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col justify-start items-start">
            <div className="flex flex-row justify-start items-center">
              <FunnelIcon className="w-6 h-6 mr-2 text-white" />
              <span className="text-2xl font-bold">Dropfilter</span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border bg-zinc-900 dark:bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-900 dark:supports-[backdrop-filter]:bg-background/60">
                <span className="text-sm text-white dark:text-muted-foreground">
                  Powered by
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1"
                  href="https://www.npmjs.com/package/domainfilter"
                >
                  domainfilter (NPM)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right h-3 w-3 text-white dark:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:mt-0 mt-4"></div>
        </div>

        <div className="w-full h-10 flex flex-row flex-wrap justify-between items-center pt-10 border-t-2 border-gray-700">
          <p className="text-base font-light text-gray-400">
            &copy; 2019-2025 Domaincord Ventures
          </p>
          <p className="text-base italic font-normal text-gray-400">
            Designed and built by{" "}
            <Link
              className="text-green-500 hover:text-green-400 underline"
              href="https://croc.io/?ref=dropfilter"
            >
              Croc Studios
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
