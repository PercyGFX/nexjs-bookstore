"use client";
import Header from "@/app/components/Header";
import { useForm } from "react-hook-form";
import { BookType } from "./types/types";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Header />

      {/* hero section */}

      <div className="flex flex-row justify-center my-6 ">
        <div className="bg-white rounded-md shadow-md mx-2 p-4 w-full md:w-6/12">
          <p className="font-poppins font-semibold text-lg">Add a Book</p>
          <form>
            <input
              required
              placeholder="Book Name"
              className="my-3 indigo-form"
              {...register("bookName", { required: true })}
            />
            <input
              required
              placeholder="Author"
              className="my-3 indigo-form"
              {...register("author", { required: true })}
            />
            <textarea
              className="indigo-form my-3"
              placeholder="description"
              {...register("description", { required: true })}
              rows={4}
              required
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="indigo-button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* hero section */}
    </div>
  );
}
