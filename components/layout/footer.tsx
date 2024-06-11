import Link from "next/link";
import { RiBarChart2Line, RiFootballLine, RiTeamLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 bg-primary-foreground border-t md:hidden">
      <div className="container mx-auto flex h-16 items-center justify-around px-4">
        <Link
          href="/stats"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiBarChart2Line className="h-7 w-7" />
          <span className="font-light text-xs">Stats</span>
        </Link>
        <Link
          href="/fixtures"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiFootballLine className="h-7 w-7" />
          <span className="font-light text-xs">Matchs</span>
        </Link>
        <Link
          href="/players"
          className={
            "inline-flex flex-col items-center gap-1 font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-0 dark:hover:text-gray-50 "
          }
          prefetch={false}
        >
          <RiTeamLine className="h-7 w-7" />
          <span className="font-light text-xs">Joueurs</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
