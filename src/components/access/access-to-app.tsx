"use client";
import React from "react";
import Link from "next/link";

import {Card, CardContent, CardHeader} from "../ui/card";

import SignUpForm from "./sign-up/sign-up";
import SignInForm from "./sign-in/sign-in";

interface IProps {
  type_of_mode: "signup" | "signin";
}

export function AccessToApp({type_of_mode}: IProps) {
  return (
    <main className="m-auto flex h-full w-full flex-[1.5] flex-col items-center justify-center px-8">
      <Card className="w-full max-w-md overflow-hidden border-y sm:rounded-2xl sm:border sm:shadow-sm">
        <CardHeader className="border-b pt-8 pb-6 text-center">
          <h1 className="flex items-center justify-center text-lg leading-[26px] font-medium">
            {type_of_mode === "signup"
              ? "Get started with PaisaBank"
              : "Sign in to your PaisaBank account"}
          </h1>
        </CardHeader>
        <CardContent className="px-4 py-8 sm:px-16">
          {type_of_mode === "signin" ? <SignInForm /> : <SignUpForm />}
          <div className="my-4 flex flex-shrink items-center justify-center gap-4">
            <div className="grow basis-0 border-b" />
            <p className="text-xs leading-none font-normal text-gray-500 uppercase">OR</p>
            <div className="grow basis-0 border-b" />
          </div>
          <p className="text-center text-sm text-gray-400">External providers coming soon...</p>
        </CardContent>
      </Card>
      <div className="my-4 text-center">
        {type_of_mode === "signup" ? (
          <p className="text-dark-muted mt-2 text-sm text-gray-400">
            {"Already have an account? "}
            <Link className="underline transition-colors" href="/signIn">
              Log In
            </Link>
            .
          </p>
        ) : (
          <p className="text-dark-muted mt-2 text-sm text-gray-400">
            {"Don't have an account? "}
            <Link className="underline transition-colors" href="/signUp">
              Create account
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}
