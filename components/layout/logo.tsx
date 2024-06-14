import Image from "next/image";

const Logo = ({ size }: { size: number }) => {
  return (
    <>
      <Image
        className="block dark:hidden"
        src="/lefoot_round-light.png"
        width={size}
        height={size}
        alt="le foot logo"
      />
      <Image
        className="hidden dark:block"
        src="/lefoot_round-dark.png"
        width={size}
        height={size}
        alt="le foot logo"
      />
    </>
  );
};

export default Logo;
