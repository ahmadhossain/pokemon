import { useUser } from "@/Hooks/useUser";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name " + name);
    console.log("password " + password);

    if (name === "codecamp" && password === "123") {
      login();
      router.push("/");
    } else {
      setIsShow(true);
    }
  };

  return (
    <div className="w-full h-[636px] p-5 flex justify-center py-20">
      <form
        className="w-[22%] shadow-md border border-gray-300 py-8 px-7 rounded-lg h-fit"
        onSubmit={handleSubmit}
      >
        <h1 className="text-start text-2xl text-center font-normal font-lg">
          Login
        </h1>
        <div className="my-2 flex flex-col">
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-sm pb-1 mr-12" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="rounded px-2 py-1 border border-gray-300 focus:outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-2 w-full py-2 mr-3 rounded-lg text-sm text-white px-2 bg-blue-400">
          Login
        </button>
        {isShow && <p className="pt-2 text-red-600 text-center">Wrong!</p>}
      </form>
    </div>
  );
};

export default LoginPage;
