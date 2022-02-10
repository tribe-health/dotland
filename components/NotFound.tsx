/* Copyright 2022 the Deno authors. All rights reserved. MIT license. */

/** @jsx h */
import { h } from "../deps.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export default function NotFoundPage() {
  return (
    <div className="NotFoundPage">
      <div id="flex-top">
        <Header />
        <header>
          <h1 className="font-extrabold text-5xl leading-10 tracking-tight text-gray-900">
            404
          </h1>
          <h2 className="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
            Couldn't find what you're looking for.
          </h2>
        </header>
      </div>

      <div id="flex-bottom">
        <div id="animation">
          <img src="/images/ferris.gif" alt="Ferris" id="ferris404" />
          <img src="/images/deno404.gif" alt="Deno" id="deno404" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
