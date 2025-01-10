"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import axios, { AxiosError } from "axios"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerValidation } from "@/lib/validations";
import Image from "next/image";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { useState } from "react";
import { apiUrl } from "@/app/constants";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsloading(true)
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, values)
      console.log(res.data);

      if (res.status==200) {
        setIsloading(false)
        router.push("/login")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      if(error instanceof AxiosError)
      console.log(error.response?.data);
    }
    finally {
      setIsloading(false);
    }
  }

  return (
    <div className="flex justify-center items-center overflow-x-hidden">
      <div className="w-1/2 flex flex-col items-center justify-between overflow-x-hidden">
        <Form {...form}>
          <div className="flex-center sm:w-420 flex-col">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={80}
              height={100}
              className="mt-3 mr-10"
            />
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-7">
              Creat a new account
            </h2>
            <p className="text-light-3 small-medium md:base-regular">
              To use snapgram,please enter your details
            </p>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 w-full mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">
                {isLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
              <p className="text-small-regular text-light-2 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-500 text-small-semibold ml-1"
                >

                  login
                </Link>
              </p>
            </form>
          </div>
        </Form>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}

export default Register;
