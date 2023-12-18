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
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/Enums";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
      },
    },
  });
  const id = context.params?.setid as string;

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CardSet, id],
    queryFn: async () => {
      try {
        const card = await getSet(id);
        return card;
      } catch (err) {}
    },
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const PokemonSet = () => {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  const router = useRouter();
  const id = router.query?.setid as string;
  console.log(id, "id");

  const { data: set, isPending, isError } = useSet(id);

  console.log(set, "set data");

  const handleOpen = () => setOpen(!open);

  if (isPending)
    return (
      <div className="h-[calc(100vh-59px)] text-center text-cyan-400 text-2xl mt-20">
        Loading...
      </div>
    );

  if (isError)
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
      {set && (
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
      )}
    </>
  );
};

export default PokemonSet;
