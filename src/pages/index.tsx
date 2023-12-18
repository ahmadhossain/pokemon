import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSidePropsContext } from "next";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { useSets } from "@/Hooks/reactQuery";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import { getAllSets } from "@/services/pokemon.services";
import { QueryKeys } from "@/Enums";
import Card from "@/component/Card";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 12 * 60 * 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CardSets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default function Home() {
  const setsObject = useSets();
  const sets = setsObject.data;

  sets?.sort((a, b) =>
    a.releaseDate > b.releaseDate ? -1 : b.releaseDate > a.releaseDate ? 1 : 0
  );
  console.log(setsObject.data);

  return (
    <div className="grid grid-cols-3 min-h-[calc(100vh-103px)] justify-items-center lg:grid-cols-4 text-center">
      {sets
        ? sets.map((set: Set) => <Card key={set.id} set={set} />)
        : "Loading..."}
    </div>
  );
}
