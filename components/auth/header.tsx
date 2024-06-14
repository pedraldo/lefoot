import { Poppins } from "next/font/google";
import Logo from "../layout/logo";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div>
        <Logo size={128} />
      </div>
      <p className="text-xl">{label}</p>
    </div>
  );
}
