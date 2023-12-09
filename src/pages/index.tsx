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
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const setsObject = useSets();
  console.log(setsObject.data);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <div className="p-10">
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Add to Cart</span>
          </Button>
        </DialogFooter>
      </Dialog>
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
                <button className="text-sm text-blue-500" onClick={handleOpen}>
                  Quick View
                </button>
              </div>
            ))
          : "Loading..."}
      </div>
    </>
  );
}
