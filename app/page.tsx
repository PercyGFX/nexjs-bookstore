"use client";
import React from "react";
import Header from "@/app/components/Header";
import { useForm, FieldError } from "react-hook-form";
import { BookType } from "./types/types";

export default function Home() {
  const [books, setBooks] = React.useState<BookType[]>([]);

  React.useEffect(() => {
    fetch("https://65b37237770d43aba479c9a7.mockapi.io/api/v1/books/article")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <input
                placeholder="Book Name"
                className="indigo-form"
                {...register("bookName", { required: "Book Name is required" })}
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
                required
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {(errors.description as FieldError).message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button type="submit" className="indigo-button">
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
              <div key={book.id} className="bg-white rounded-md p-3 shadow-md">
                <p className=" font-semibold text-lg">{book.bookName}</p>
                <p className="mb-2">{book.author}</p>
                <hr />

                <p>{book.description}</p>
              </div>
            );
          })
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}
