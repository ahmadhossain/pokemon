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
                className="pt-2 text-2xl text-cyan-800 font-medium mouse-cursor"
                // onClick={() => {
                //   mutation.mutate({ setId: id as string, setName: "abc" });
                // }}
              >
                {set.name}
              </p>
              <p>
                <span className="text-sm text-gray-500">Printed: </span>
                {set.printedTotal}
              </p>
              <p className="text-sm">
                <span className="text-sm text-gray-500">Code: </span>
                {set.ptcgoCode}
              </p>
              <p className="text-blue-500">
                <span className="text-blue-300 text-sm">Series: </span>
                {set.series}
              </p>
              <p>
                <span className="text-gray-500">Total: </span>
                {set.total}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Released: </span>
                {set.releaseDate}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Updated: </span>
                {set.updatedAt}
              </p>
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
