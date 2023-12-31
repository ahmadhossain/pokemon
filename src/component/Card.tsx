import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React, { useState } from "react";
import CardDetails from "./CardDetails";
import Image from "next/image";

const Card = ({ set }: { set: Set }) => {
  const [open, setOpen] = useState(false);
  const [setId, setSetId] = useState<string | undefined>();

  const handleOpen = () => setOpen(!open);

  const handleClick = (id: string) => {
    setOpen(!open);
    setSetId(id);
  };

  return (
    <>
      {open && (
        <CardDetails open={open} handleOpen={handleOpen} setId={setId} />
      )}
      {set && (
        <div
          key={set.id}
          className="border border-gray-400 w-fit  md:w-60 rounded-lg p-[10%]  m-[10%]"
        >
          <Link href={`/sets/${set.id}`}>
            <div>
              <Image
                width={200}
                height={100}
                src={set.images?.logo}
                alt={set.name}
              />
            </div>
          </Link>
          <div className="flex flex-col content-between">
            <p className="pt-3 text-gray-800 mouse-cursor">{set.name}</p>
            <button
              className="text-sm text-blue-500"
              onClick={() => {
                handleClick(set.id);
              }}
            >
              Quick View
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
