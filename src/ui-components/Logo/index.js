import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={`/dashboard`}>
        <Image src={"/airly-logo.svg"} width={"150"} height={"50"} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
