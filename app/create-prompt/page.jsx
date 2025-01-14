"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session ,status} = useSession({
    required:true,
    onUnauthenticated(){
      router.push('/')
    }
  });
  if(status==="loading")
  {
    return "Loading...";
  }
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          // title:post.title,
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
      session?.user ? (
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPrompt}
        />
      ) : (
        <div className="flex justify-center items-center">NOT LOGGED IN</div>
      )
    
  );
};

export default CreatePrompt;
