import { useCart } from "@/Hooks/useCart";
import Image from "next/image";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import deleteImg from "../../public/delete.png";

const CartPage = () => {
  const { cart, deleteItem } = useCart();
  console.log(cart);
  return (
    <div className="min-h-[calc(100vh-59px)]">
      {cart.map((el: Set) => (
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
