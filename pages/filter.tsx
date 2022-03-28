import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { DFContext, FilterActionTypes } from "../store";
import {
  Results,
  Extensions,
  Keywords,
  DomainHacks,
  LengthSlider,
  HyphenToggle,
  NumberToggle,
  BackorderService,
  DropDate,
} from "../components/app/";

const FilterPage = () => {
  const { state, dispatch } = useContext(DFContext);

  useEffect(() => {
    const data = window.localStorage.getItem("df_data");
    if (data) {
      const json = JSON.parse(data);
      dispatch({ type: FilterActionTypes.restoreConfiguration, payload: json });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Expired Domain Filters | Dropfilter</title>
        <meta
          name="description"
          content="Filter expiring domain names easily"
        />
      </Head>
      <div className="container mx-auto px-4 lg:px-0 py-24">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="block text-black dark:text-white text-5xl font-bold font-heading mb-2">
              Filter
            </h1>
            <p className="block text-block dark:text-white text-base font-light font-body">
                Try our custom filters to help you find the results you want.
            </p>
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded shadow py-2 px-3"
            onClick={() =>
              dispatch({
                type: FilterActionTypes.addPreset,
                payload: { config: state.config },
              })
            }
          >
            Save Preset
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Keywords />
                    <Extensions />
                </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col">
                <DomainHacks />
                <HyphenToggle />
                <NumberToggle />
            </div>
            <div className="col-span-12 md:col-span-6">
                <LengthSlider />
            </div>
            <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BackorderService />
                    <DropDate />
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
