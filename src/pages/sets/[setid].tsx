import { getAllSets, getSet } from "@/services/pokemon.services";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import edit from "../../../public/edit.png";

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

  // console.log(tempParams, "temppaths");

  return {
    paths: tempParams.splice(0, 5),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log(typeof context.params?.setid, "Type, Inside getStaticProps");
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
      // console.log(card, "card");
    }
  }

  return {
    props: { card },
    revalidate: 10,
  };
};
const PokemonSet = ({ card }: { card: Set }) => {
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
      {card ? (
        <div className="h-[556px]">
          <div className="text-center max-w-fit border border-gray-400 rounded-lg py-7 px-6 my-20 mx-auto">
            <div className="max-w-[200px] mx-auto">
              <img src={card.images.logo} />
            </div>
            <div className="p-3 flex justify-center items-center gap-2">
              <p className="text-cyan-700 text-2xl">{card.name}</p>
              <div className="cursor-pointer">
                <Image src={edit} width={18} alt="edit icon" />
              </div>
            </div>
            <p className="text-sm">
              <span className="text-gray-600">Series:</span> {card.series}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl">Loading...</div>
      )}
    </>
  );
};

export default PokemonSet;
