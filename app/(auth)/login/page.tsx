"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Form,FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { loginValidation } from "@/lib/validations";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidation>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!result) {
        throw new Error("Erreur de connexion");
      }

      if (result.error) {
        setErrorMessage(" Erreur pour l'authentification ");
        return;
      }

      if (result.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setErrorMessage("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-1/2 flex flex-col items-center justify-between">
        <Form {...form}>
          <div className="flex-center sm:w-420 flex-col">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
              Login account
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
                  "Login"
                )}
              </Button>
              <p className="text-small-regular text-light-2 text-center">
                {" don't you have an account? "}
                <Link
                  href="/register"
                  className="text-primary-500 text-small-semibold ml-1"
                >
                  sign up
                </Link>
              </p>
              {errorMessage && <span className="text-red text-xl">
                {errorMessage}
              </span>
              }
            </form>
          </div>
        </Form>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}

export default LoginPage;


