import { MdDarkMode, MdLightMode } from "react-icons/md";

export const FloatingDarkModeToggle = ({ darkMode, setDarkMode }) => (
    <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center text-xl
               rounded-full bg-gray-200 dark:bg-gray-700/70 text-gray-800 dark:text-gray-300
               shadow-md border border-gray-300 dark:border-gray-600
               hover:brightness-110 transition-all"
        aria-label="Toggle dark mode"
    >
        {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
);
