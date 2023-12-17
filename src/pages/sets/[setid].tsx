import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { Button } from "@material-tailwind/react";

import { getAllSets, getSet } from "@/services/pokemon.services";
import edit from "../../../public/edit.png";
import EditName from "@/component/EditName";
import { useCart } from "@/Hooks/useCart";
import { useSet } from "@/Hooks/reactQuery";

export const getStaticPaths: GetStaticPaths = async (qry) => {
  const sets = await getAllSets();
  const tempPaths = sets.map((x) => x.id);
  const tempParams: { params: { setid: string } }[] = [];

  tempPaths.forEach((el) => {
    tempParams.push({
      params: {
        setid: el,
      },
    });
  });

  return {
    paths: tempParams.splice(0, 5),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let card = {};
  try {
    const id = context.params?.setid as string;
    card = await getSet(id);
  } catch (e) {
    if (Object.keys(card).length === 0) {
      return {
        props: { card: {} },
        revalidate: 10,
      };
    }
  }

  return {
    props: { card },
    revalidate: 10,
  };
};

const PokemonSet = ({ card }: { card: Set }) => {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  let setObject;
  if (card?.id) {
    setObject = useSet(card.id as string);
  }

  const set = setObject?.data;

  console.log(set, "set");

  const handleOpen = () => setOpen(!open);

  let err = false;
  if (card && Object.keys(card).length === 0) err = true;

  if (err)
    return (
      <p className="h-[556px] text-cyan-400 text-center text-xl mt-20">
        Card not found!
      </p>
    );
  return (
    <>
      {open && (
        <EditName
          setId={set?.id as string}
          open={open}
          handleOpen={handleOpen}
        />
      )}
      {set ? (
        <div className="h-[calc(100vh-184px)]">
          <div className="text-center max-w-fit border border-gray-400 rounded-lg py-7 px-6 my-20 mx-auto">
            <div className="max-w-[200px] mx-auto">
              <Image
                width={200}
                height={100}
                src={set.images.logo}
                alt={set.name}
              />
            </div>
            <div className="p-3 flex justify-center items-center gap-2">
              <p className="text-cyan-700 text-2xl">{set.name}</p>
              <div onClick={handleOpen} className="cursor-pointer">
                <Image src={edit} width={18} alt="edit icon" />
              </div>
            </div>
            <p className="text-sm">
              <span className="text-gray-600">Series:</span> {set.series}
            </p>
            <Button
              variant="text"
              color="green"
              onClick={() => addItem(set)}
              className="mt-1"
            >
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-59px)] text-center text-cyan-400 text-2xl mt-20">
          Loading...
        </div>
      )}
    </>
  );
};

export default PokemonSet;
