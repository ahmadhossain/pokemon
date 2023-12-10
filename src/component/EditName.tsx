import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FormEvent, useState } from "react";

const EditName = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const [name, setName] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    name.length === 0 && setIsShow(true);
    console.log("Name " + name);
  };

  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogBody>
        <form
          onSubmit={handleSubmit}
          className="pt-4 flex flex-col justify-center"
        >
          <label className="text-sm pb-1 mr-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="rounded px-2 py-1 border border-gray-300 focus:outline-none"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsShow(false);
            }}
          />
        </form>
        {isShow && (
          <p className="pt-2 text-red-400 text-center">Input is empty!</p>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="text"
          color="green"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditName;
