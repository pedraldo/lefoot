import { ThemeToggle } from "@/theme/ThemeToggle";
import Link from "next/link";
import UserDropdownMenu from "../user-dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary-foreground border-b">
      <div className="container m-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-lg font-bold" prefetch={false}>
            le foot
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/stats"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Stats
          </Link>
          <Link
            href="/fixtures"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Matchs
          </Link>
          <Link
            href="/players"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Joueurs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
