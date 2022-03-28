import React, { useContext } from "react";
import Head from "next/head";
import { DFContext, FilterActionTypes } from "../store";
import { IFavorite } from "../store/context/DFContext";

const PresetsPage = () => {
  const { state, dispatch } = useContext(DFContext);

  return (
    <>
      <Head>
        <title>Favorite Expired Domains | Dropfilter</title>
        <meta
          name="description"
          content="Filter expiring domain names easily"
        />
      </Head>
      <div className="container mx-auto px-4 lg:px-0 py-24">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-col">
            <h1 className="block text-black dark:text-white text-5xl font-bold font-heading mb-2">
              Favorites
            </h1>
            <p className="block text-block dark:text-white text-base font-light font-body">
              Your hand-selected favorite picks from our drop lists.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full my-4">
            {state.favorites.length
              ? state.favorites.map((fav: IFavorite, index: number) => (
                  <div
                    key={index}
                    className="block bg-white dark:bg-gray-800 p-1 shadow-sm rounded-sm relative my-1 w-full"
                  >
                    <strong className="font-mono">{fav.fqdn}</strong>
                    <div className="text-xs block">
                      <span className="mr-2">{fav.drop_date_str}</span>
                      <a
                        href={`https://domainr.com/${fav.fqdn}`}
                        target={`_blank`}
                      >
                        Check Availability
                      </a>
                    </div>
                    <button
                      onClick={(e) =>
                        dispatch({
                          type: FilterActionTypes.removeFavorite,
                          payload: fav,
                        })
                      }
                      title="Remove from favorites"
                      className="absolute top-4 right-4 text-red-500"
                    >
                      <svg
                        style={{
                          width: 16,
                          height: "auto",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PresetsPage;
