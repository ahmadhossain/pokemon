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
    }
    setIsShow(true);
  };

  return (
    <div className="w-full h-screen p-5 flex justify-center items-center">
      <form
        className="w-[25%] border p-8 rounded-lg h-fit shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-start text-2xl text-center font-normal font-lg">
          Login
        </h1>
        <div className="my-2 flex flex-col">
          <label className="mr-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="rounded px-2 py-1 border"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="mr-12" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="rounded px-2 py-1 border"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full py-2 mr-3 border rounded text-sm px-2  bg-sky-400">
          Login
        </button>
        {isShow && <p className="text-red-600 text-center">Wrong!</p>}
      </form>
    </div>
  );
};

export default LoginPage;
