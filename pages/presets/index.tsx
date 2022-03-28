import React, { useContext } from "react";
import Head from "next/head";
import { DFContext, FilterActionTypes } from "../../store";
import { IPreset } from "../../store/context/DFContext";

const PresetsPage = () => {
  const { state, dispatch } = useContext(DFContext);

  const getListString = (list: any) => {
    if (list && list.length) {
      return list
        .map((l) => {
          if (l.selected) {
            return l.value;
          }
        })
        .filter(Boolean)
        .join(", ");
    }
  };

  return (
    <>
      <Head>
        <title>Filter Presets | Dropfilter</title>
        <meta
          name="description"
          content="Filter expiring domain names easily"
        />
      </Head>
      <div className="container mx-auto px-4 lg:px-0 py-24">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-col">
            <h1 className="block text-black dark:text-white text-5xl font-bold font-heading mb-2">
              Filter Presets
            </h1>
            <p className="block text-block dark:text-white text-base font-light font-body">
              Your custom filter presets and a selection of curated
              community-created presets for Dropfilter
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full my-4">
            {state.presets.length
              ? state.presets.map((pre: IPreset, index: number) => (
                  <div
                    key={index}
                    className="block bg-white dark:bg-gray-800 p-2 shadow rounded relative my-1 w-full"
                  >
                    <div>
                      <div>
                        <strong>Backorder Service:</strong>{" "}
                        {pre.config?.backorderService}
                      </div>
                      <div>
                        <strong>Drop Date:</strong> {pre.config?.dropDate}
                      </div>
                      <div>
                        <strong>Include Hacks:</strong>{" "}
                        {pre.config?.includeHacks?.toString()}
                      </div>
                      <div>
                        <strong>Exlude Hyphens:</strong>{" "}
                        {pre.config?.excludeHyphens?.toString()}
                      </div>
                      <div>
                        <strong>Exlude Numbers:</strong>{" "}
                        {pre.config?.excludeNumbers?.toString()}
                      </div>
                      <div>
                        <strong>Min. Domain Length:</strong>{" "}
                        {pre.config?.domainLength[0]}
                      </div>
                      <div>
                        <strong>Max. Domain Length:</strong>{" "}
                        {pre.config?.domainLength[1]}
                      </div>
                      <div>
                        <strong>Extensions:</strong>{" "}
                        {getListString(pre.config?.extensions)}
                      </div>
                      <div>
                        <strong>Keywords:</strong>{" "}
                        {getListString(pre.config?.keywords)}
                      </div>
                    </div>
                    <button
                      onClick={(e) =>
                        dispatch({
                          type: FilterActionTypes.loadPreset,
                          payload: pre,
                        })
                      }
                      title="Activate and run this preset now"
                      className="block mt-3 py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded"
                    >
                      Load Preset
                    </button>
                    <button
                      onClick={(e) =>
                        dispatch({
                          type: FilterActionTypes.removePreset,
                          payload: pre,
                        })
                      }
                      title="Delete preset"
                      className="absolute top-4 right-4 text-red-500"
                    >
                      <svg
                        style={{
                          width: 24,
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
