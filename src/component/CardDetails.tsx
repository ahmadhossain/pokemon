import { useSet } from "@/Hooks/reactQuery";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Link from "next/link";
import { config } from "process";
import React from "react";

const CardDetails = ({
  open,
  handleOpen,
  setId,
}: {
  open: boolean;
  handleOpen: () => void;
  setId: string | undefined;
}) => {
  const setObject = useSet(setId as string);
  const set = setObject.data;

  console.log(set, "set");
  console.log(setId, "setID");

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogBody>
        {set && (
          <div key={set.id} className="py-5">
            <div className="flex justify-center">
              <img className="w-[60%]" src={set.images?.logo} />
            </div>
            <div className="text-center">
              <p
                className="pt-2 text-2xl text-teal-300 font-medium mouse-cursor"
                // onClick={() => {
                //   mutation.mutate({ setId: id as string, setName: "abc" });
                // }}
              >
                {set.name}
              </p>
              <p>{set.printedTotal}</p>
              <p>{set.ptcgoCode}</p>
              <p>{set.releaseDate}</p>
              <p>{set.series}</p>
              <p>{set.total}</p>
              <p>{set.updatedAt}</p>
            </div>
          </div>
        )}
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
  );
};

export default CardDetails;
