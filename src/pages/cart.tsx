import { useCart } from "@/Hooks/useCart";
import Image from "next/image";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import deleteImg from "../../public/delete.png";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart, deleteItem } = useCart();
  const [cartObject, setCartObject] = useState(cart);
  console.log(cart);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const cartObj = cartData ? JSON.parse(cartData) : null;

    if (cartObj) {
      setCartObject(cartObj);
    }
  }, []);

  useEffect(() => {
    if (cart.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartObject(cart);
    }
  }, [cart]);

  if (cartObject.length === 0)
    return (
      <p className="h-[556px] text-cyan-400 text-center text-xl mt-20">
        Cart is empty!
      </p>
    );
  return (
    <div className="min-h-[calc(100vh-59px)]">
      {cartObject?.map((el: Set) => (
        <div key={el.id} className="flex px-20 py-3 border">
          <img className="w-14" src={el.images.logo} alt={el.id} />
          <div className="w-full flex justify-center items-center">
            <p>{el.name}</p>
          </div>
          <div
            className="cursor-pointer flex justify-center items-center"
            onClick={() => deleteItem(el.id)}
          >
            <Image width={30} src={deleteImg} alt="delete image" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
