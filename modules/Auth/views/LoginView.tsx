/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Image, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useInput } from "shared/hooks/form";
import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { initializeUserState } from "@/shared/providers/authSlice";
import { API_login } from "@/shared/apis";
import { RootState } from "@/shared/providers";
import { useApiHandler } from "@/shared/hooks";

export default function LoginView() {
  const router = useRouter();
  const dispatcher = useDispatch();
  const device = useSelector((state: RootState) => state.device);
  const { fetch, loading: loadingLogin } = useApiHandler(API_login, { silence: false })

  const { input, handleInput, setInput } = useInput({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    try {
      if (input.email !== undefined && input.password !== undefined) {
        const result = await fetch({
          data: {
            email: input.email,
            password: input.password,
          }
        });

        if (result) {
          const userData = result.data;
          dispatcher(initializeUserState({ id: userData.data.id, token: userData.data.token, }));
          router.replace("/overview");
        }
      }
    } catch (error) { console.warn(error) }
  };

  useEffect(() => {
    setInput((prev) => ({ ...prev, deviceToken: device.data?.token }));
  }, [device.data?.token]);

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 px-4 flex items-center justify-center">
        <div className="flex flex-col gap-5 min-w-[90%] lg:min-w-[60%] max-w-[90%] lg:max-w-[60%]">
          <Title order={1}>Masuk</Title>
          <Text>
            <span className="text-secondary">Selamat datang di</span> <b>HRIS</b>
          </Text>
          <TextInput
            label="Email"
            placeholder="Email"
            value={input.email}
            onChange={handleInput("email")}
          />
          <PasswordInput
            label="Password"
            value={input.password || ''}
            onChange={handleInput("password")}
            placeholder="Password"
          />

          <Button type="submit" loading={loadingLogin} onClick={() => login()}>
            <h3>Masuk</h3>
          </Button>
        </div>
      </div>
      <div className="flex-1 hidden md:block bg-red-500">
        <Image
          src="/bg-signin.png"
          alt="background login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
