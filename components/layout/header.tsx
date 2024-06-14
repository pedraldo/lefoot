import { ThemeToggle } from "@/theme/ThemeToggle";
import Link from "next/link";
import { RiBarChart2Line, RiFootballLine, RiTeamLine } from "react-icons/ri";
import UserDropdownMenu from "../user-dropdown-menu";
import Logo from "./logo";
import NavLink from "./nav-link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary-foreground border-b">
      <div className="container m-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-lg font-bold" prefetch={false}>
            <Logo size={56} />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-16">
          {/* <Link
            href="/stats"
            className={
              "inline-flex items-center gap-2 transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50"
            }
            prefetch={false}
          >
            <RiBarChart2Line className="h-7 w-7" />
            Stats
          </Link>
          <Link
            href="/fixtures"
            className={
              "inline-flex items-center gap-2 transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50"
            }
            prefetch={false}
          >
            <RiFootballLine className="h-7 w-7" />
            Matchs
          </Link>
          <Link
            href="/players"
            className={
              "inline-flex items-center gap-2 transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50"
            }
            prefetch={false}
          >
            <RiTeamLine className="h-7 w-7" />
            Joueurs
          </Link> */}

          <NavLink href="/stats" label="Stats" Icon={<RiBarChart2Line />} />
          <NavLink href="/fixtures" label="Matchs" Icon={<RiFootballLine />} />
          <NavLink href="/players" label="Joueurs" Icon={<RiTeamLine />} />
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
