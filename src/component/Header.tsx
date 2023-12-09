import { useRouter } from "next/router";
import Image from "next/image";

import { useUser } from "@/Hooks/useUser";
import logoutImg from "../../public/logout.png";
import cardImg from "../../public/cart.png";
import { Button } from "@material-tailwind/react";

const Header = () => {
  const router = useRouter();
  const { isLogin, logout } = useUser();
  const isHide = router.route === "/login";
  return (
    <div className="w-full py-5 px-8 border-b flex justify-end gap-5">
      <button className="text-red-300" onClick={() => router.push("/cart")}>
        <Image width={30} src={cardImg} alt="Cart Image" />
      </button>
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
            className={isHide ? "hidden" : ""}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </>
    </div>
  );
};

export default Header;
