import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={`/dashboard`}>
        <Image src={"/asdf-logo.svg"} width={"150"} height={"50"} alt="logo" priority/>
      </Link>
    </div>
  );
};

export default Logo;
