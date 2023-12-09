import { useRouter } from "next/router";
import Image from "next/image";

import { useUser } from "@/Hooks/useUser";
import { Button } from "@material-tailwind/react";
import logoutImg from "../../public/logout.png";
import cardImg from "../../public/cart.png";
import logo from "../../public/logo.png";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const { isLogin, logout } = useUser();
  const isHide = router.route === "/login";
  return (
    <div className="w-full py-5 px-10 border-b border-gray-300 flex justify-between gap-5">
      <Link href="/">
        <Image width={35} src={logo} alt="Cart Image" />
      </Link>
      <div className="flex gap-8">
        <Link href="/cart">
          <Image width={30} src={cardImg} alt="Cart Image" />
        </Link>
        <>
          {isLogin && (
            <div className="flex gap-5">
              <p>Codecamp</p>
              <button onClick={() => logout()}>
                <Image width={30} src={logoutImg} alt="Logout Image" />
              </button>
            </div>
          )}
          {!isLogin && (
            <Button
              variant="gradient"
              size="sm"
              className={`${isHide ? "hidden" : ""}`}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}
        </>
      </div>
    </div>
  );
};

export default Header;
