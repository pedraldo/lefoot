import Link from "next/link";
import { RiBarChart2Line, RiFootballLine, RiTeamLine } from "react-icons/ri";
import NavLink from "./nav-link";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 bg-primary-foreground border-t md:hidden">
      <div className="container mx-auto flex h-16 items-center justify-around px-4">
        {/* <Link
          href="/stats"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiBarChart2Line className="h-7 w-7" />
          <span className="font-light text-xs">Stats</span>
        </Link> */}
        <NavLink href="/stats" label="Stats" Icon={<RiBarChart2Line />} />
        {/* <Link
          href="/fixtures"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiFootballLine className="h-7 w-7" />
          <span className="font-light text-xs">Matchs</span>
        </Link> */}
        <NavLink href="/fixtures" label="Matchs" Icon={<RiFootballLine />} />
        {/* <Link
          href="/players"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiTeamLine className="h-7 w-7" />
          <span className="font-light text-xs">Joueurs</span>
        </Link> */}
        <NavLink href="/players" label="Joueurs" Icon={<RiTeamLine />} />
      </div>
    </footer>
  );
};

export default Footer;
