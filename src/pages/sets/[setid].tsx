import { getAllSets, getSet } from "@/services/pokemon.services";
import { GetStaticPaths, GetStaticProps } from "next";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

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

  console.log(tempParams, "temppaths");

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

  if (err) return <p className="text-center text-xl mt-20">Card not found!</p>;
  return (
    <>
      {card ? (
        <div className="text-center max-w-fit border rounded-lg p-5 my-20 mx-auto">
          <div className="max-w-[200px] mx-auto">
            <img src={card.images.logo} />
          </div>
          <p>Name: {card.name}</p>
          <p>Series: {card.series}</p>
        </div>
      ) : (
        <div className="text-center text-2xl">Loading...</div>
      )}
    </>
  );
};

export default PokemonSet;
