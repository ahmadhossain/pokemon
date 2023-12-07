import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";

import { getAllSets } from "@/services/pokemon.services";
import { QueryKeys } from "@/Enums";
import { useSets } from "@/Hooks/reactQuery";
import Header from "@/component/Header";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = new QueryClient();

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
  console.log(setsObject.data);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 lg:grid-cols-4 text-center">
        {setsObject.data
          ? setsObject.data.map((set: Set) => (
              <div
                key={set.id}
                className="border border-gray-400 w-fit  md:w-60 rounded-lg p-[10%]  m-[10%]"
              >
                <Link href={`/sets/${set.id}`}>
                  <img className="w-22" src={set.images?.logo} />
                </Link>
                <p
                  className="mouse-cursor"
                  // onClick={() => {
                  //   mutation.mutate({ setId: id as string, setName: "abc" });
                  // }}
                >
                  {set.name}
                </p>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
