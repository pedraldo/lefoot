import { ThemeToggle } from "@/theme/ThemeToggle";
import Link from "next/link";
import { RiBarChart2Line, RiFootballLine, RiTeamLine } from "react-icons/ri";
import Logo from "./logo";
import NavLink from "./nav-link";
import UserDropdownMenu from "../user/user-dropdown-menu";

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
          <NavLink
            hrefSuffix="stats"
            label="Stats"
            Icon={<RiBarChart2Line />}
          />
          <NavLink
            hrefSuffix="fixtures"
            label="Matchs"
            Icon={<RiFootballLine />}
          />
          <NavLink
            hrefSuffix="players"
            label="Effectif"
            Icon={<RiTeamLine />}
          />
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
