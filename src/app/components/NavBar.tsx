import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "hooks";
import { getSupportedLanguagesAsString } from "../state/i18nSlice";

import { i18nSlice } from "../state/i18nSlice";

import Cookies from "js-cookie";

// TODO: theme switching

export function Navbar() {
  return (
    <div className="col-span-12 !py-0 px-3 navbar h-20">
      <div className="flex-none">
        <Link
          href="/"
          className="btn btn-ghost hover:bg-transparent no-underline hover:!no-underline text-xl join-item px-3"
        >
          <Image
            src="/logo_icon.svg"
            alt="Dexter Logo"
            width={40}
            height={40}
            className="!my-0"
            priority={true}
          />
          <span className="ml-6 pt-1 xs:invisible sm:visible hover:text-accent uppercase">
            DeXter
          </span>
        </Link>
      </div>
      <div className="flex-1 px-2 mx-2">
        {/* <div className="items-stretch hidden lg:flex">
          <Link
            className="btn btn-lg h-20 btn-ghost hover:!no-underline pt-2 border-t-0 border-x-0 border-b-4 border-transparent hover:border-accent hover:text-accent uppercase"
            href="/"
          >
            Trade
          </Link>
        </div> */}
      </div>
      <div className="navbar-end">
        <LanguageSelection />
        <radix-connect-button></radix-connect-button>
      </div>
    </div>
  );
}

function LanguageSelection() {
  const dispatch = useAppDispatch();
  const supportedLanguagesStr = useSelector(getSupportedLanguagesAsString);
  const supportedLanguages = supportedLanguagesStr.split(",");
  let { language } = useAppSelector((state) => state.i18n);

  const handleLanguageChange = (lang: string) => {
    dispatch(i18nSlice.actions.changeLanguage(lang.toLowerCase()));
    Cookies.set("userLanguage", lang, { expires: 365, partitioned: true }); // Set a cookie for 1 year
  };

  return (
    <div className="mr-4 flex">
      {supportedLanguages.map((lang) => (
        <button
          className={`uppercase text-sm px-1 ${
            language === lang ? "font-extrabold" : "font-extralight"
          }`}
          key={lang}
          onClick={() => handleLanguageChange(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
