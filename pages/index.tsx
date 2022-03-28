import React from "react";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Dropfilter</title>
        <meta
          name="description"
          content="Filter expiring domain names easily"
        />
      </Head>
      <div className="container mx-auto px-4 lg:px-0 py-24">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-row justify-start items-center w-full mb-8">
            <div className="flex flex-col">
              <h1 className="block text-black dark:text-white text-5xl font-bold font-heading mb-2">
                Dropfilter
              </h1>
              <p className="block text-block dark:text-white text-base font-light font-body">
                Filter Expiring Domain Names
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
            <h4 className="font-display text-lg mt-0 text-black dark:text-white">
              About Dropfilter
            </h4>
            <p className="leading-6 font-body text-black dark:text-white">
              Dropfilter is the tool every domain name investor needs. You can
              filter lists of hundreds of thousands of domain names expiring
              every single day from all the most popular backorder services.
              Makes it super simple to find what exactly you want the moment you
              need it!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
            <h4 className="font-display text-lg mt-0 text-black dark:text-white">
              What is drop-catching?
            </h4>
            <p className="leading-6 font-body text-black dark:text-white">
              Domain drop catching, also known as domain sniping, is the
              practice of registering a domain name once registration has
              lapsed, immediately after expiry.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
