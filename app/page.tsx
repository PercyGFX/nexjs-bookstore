"use client";
import React from "react";
import Header from "@/app/components/Header";
import { useForm, FieldError, set } from "react-hook-form";
import { BookType } from "./types/types";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const [books, setBooks] = React.useState<BookType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch("https://65b37237770d43aba479c9a7.mockapi.io/api/v1/books/article")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  //hook forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookType>();

  const onSubmit = (data: BookType) => {
    setLoading(true);
    try {
      fetch(
        "https://65b37237770d43aba479c9a7.mockapi.io/api/v1/books/article",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setBooks([...books, data]);
          toast.success("Book added successfully");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book");
      setLoading(false);
    } 
  };

  return (
    <>
      {" "}
      <Toaster />
      <div className=" h-full pb-10">
        <Header />

        {/* hero section */}
        <div className="flex flex-row justify-center my-6 ">
          <div className="bg-white rounded-md shadow-md mx-2 p-4 w-full md:w-6/12">
            <p className="font-poppins font-semibold text-lg">Add a Book</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <input
                  placeholder="Book Name"
                  className="indigo-form"
                  {...register("bookName", {
                    required: "Book Name is required",
                  })}
                />
                {errors.bookName && (
                  <p className="text-red-500 text-sm">
                    {(errors.bookName as FieldError).message}
                  </p>
                )}
              </div>

              <div className="my-3">
                <input
                  placeholder="Author"
                  className="indigo-form"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">
                    {(errors.author as FieldError).message}
                  </p>
                )}
              </div>

              <div className="my-3">
                <textarea
                  className="indigo-form"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                 
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {(errors.description as FieldError).message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className={`rounded-full px-5 py-2 text-center drop-shadow-md my-2 text-white ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* hero section */}

        <div className=" my-10 mx-4 grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-4 gap-4">
          {/* card start */}
          {books && books.length > 0 ? (
            books.map((book: BookType, index: number) => {
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-md p-3 shadow-md"
                >
                  <p className=" font-semibold text-lg">{book.bookName}</p>
                  <p className="mb-2">
                    <span className=" font font-semibold">Author:</span>{" "}
                    {book.author}
                  </p>
                  <hr />

                  <p>{book.description}</p>
                </div>
              );
            })
          ) : (
            <div className=" flex justify-center">
              <BeatLoader
                size={10}
                
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
