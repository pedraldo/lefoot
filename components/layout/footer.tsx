import { RiBarChart2Line, RiFootballLine, RiTeamLine } from "react-icons/ri";
import NavLink from "./nav-link";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 bg-primary-foreground border-t md:hidden">
      <div className="container mx-auto flex h-16 items-center justify-around px-4">
        <NavLink hrefSuffix="stats" label="Stats" Icon={<RiBarChart2Line />} />
        <NavLink
          hrefSuffix="fixtures"
          label="Matchs"
          Icon={<RiFootballLine />}
        />
        <NavLink
          hrefSuffix="players"
          label="Joueur·euse·s"
          Icon={<RiTeamLine />}
        />
      </div>
    </footer>
  );
};

export default Footer;
