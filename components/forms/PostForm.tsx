"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { newPostSchema } from "@/lib/validations";
import { Post } from "@/app/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios  from "axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import Loader from "../shared/Loader";

export default function PostForm({ post }: { post?: Post }) {
  const { data: session } = useSession()
  const userId = session?.user?.id || "";  // 1. Define your form.
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useLoading()
  const [imageUrl, setImageUrl] = useState<string | undefined>(post?.img || '')
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      desc: post?.desc ? post?.desc : "",
      file: [],
      userId: userId || ""
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: createPost, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      return await axios.post("/api/post", data)
    },

    onError: (error) => {
      console.log(error);
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Failed to add post",
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allPost']
      });
    },

  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof newPostSchema>) {

    console.log(values);
    setIsLoading(true)

    const postValues = {
      ...values,
      img: imageUrl
    }


    console.log("post values", postValues);

    await createPost(postValues)
      .then((res) => {
        if (res.status == 200) {
          toast({
            title: "Success",
            description: "Post added successfully",
          })
          router.push('/')
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      })
    setIsLoading(false)

  }

  useEffect(() => {
    if (userId) {
      form.setValue("userId", userId);
    }
  }, [form, userId])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label" >desccription</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label" >Add photos</FormLabel>
              <FormControl>
          <FileUploader
          fieldChange={field.onChange}
          mediaUrl={imageUrl}
          setImage={(url)=>setImageUrl(url)}
          />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 justify-end">
          <Button className="shad-button_dark_4" type="button">cancel</Button>
          <Button className="shad-button_primary whitespace-nowrap" disabled={isLoading} type="submit">{isLoading ? (
            <div className="flex-center gap-2">
              <Loader /> submiting
            </div>
          ) : <p>submit</p>}</Button>
        </div>
      </form>
    </Form>
  );

}