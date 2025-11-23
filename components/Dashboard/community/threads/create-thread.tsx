"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadCategories } from "@/lib/utils";
import { FaPenFancy } from "react-icons/fa6";
import { createThreadAction } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateThreadSchema = z.object({
  title: z.string().min(1, { error: "Title field cannot be empty." }),
  prompt: z.string().min(1, { error: "Prompt field cannot be empty." }),
  category: z.union(threadCategories.map((item) => z.literal(item))),
});

type CreateThreadFormType = z.infer<typeof CreateThreadSchema>;

const CreateThread = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateThreadFormType>({
    resolver: zodResolver(CreateThreadSchema),
  });
  const router = useRouter();

  const createNewThread = async (formData: CreateThreadFormType) => {
    const response = await createThreadAction(formData.title, formData.prompt, formData.category);
    if(response.success){
      toast.success(response.message);
      reset();
      router.refresh();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createNewThread)}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <FaPenFancy className="text-cyan-600" />
        Start a new thread
      </div>
      <div className="grid gap-3 md:grid-cols-2 items-start">
        <div className="flex flex-col gap-2">
          <input
            {...register("title")}
            type="text"
            placeholder="Thread title"
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
          {errors.title && (
            <p className="text-sm text-red-500">
              {errors.title.message || "Invalid title"}
            </p>
          )}
        </div>
        <select
          {...register("category")}
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700"
        >
          {threadCategories.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        {...register("prompt")}
        rows={4}
        placeholder="What are you exploring? Keep spoilers hidden until the end."
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
      />
      {errors.prompt && (
        <p className="text-sm text-red-500">
          {errors.prompt.message || "Invalid prompt"}
        </p>
      )}
      <button
        disabled={isSubmitting}
        className={`inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-cyan-700 ${
          isSubmitting
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-cyan-700 cursor-pointer"
        }`}
      >
        Post thread
      </button>
    </form>
  );
};

export default CreateThread;
