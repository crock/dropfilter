import { useContext, useEffect, useState } from "react";
import { DFContext, FilterActionTypes } from "@/store/";
import DomainFilter from "domainfilter";
import { debounce } from "lodash";
import CopyToClipboard from "@/components/CopyToClipboard";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";

const DFResults = () => {
  const { state, dispatch } = useContext(DFContext);
  const [clipboard, setClipboard] = useState<string>("");

  useEffect(() => {
    const doRealtimeFilter = () => {
      const df = new DomainFilter(state.config);
      const filteredDomains = df.filter(state.unfilteredDomains);
      dispatch({
        type: FilterActionTypes.addFilteredDomains,
        payload: filteredDomains,
      });
	  setClipboard(filteredDomains.join("\n"));
    };

    const debouncedFilter = debounce(doRealtimeFilter, 250);
    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [
    state.config.domainLength,
    state.config.hyphens,
    state.config.numbers,
    state.config.domainHacks,
    state.config.keywords,
    state.config.extensions,
    state.config,
    state.unfilteredDomains,
    dispatch,
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-black/10 dark:border-gray-600 border-solid rounded w-full h-auto flex p-4 transition-colors duration-200 relative">
      <div className="flex flex-col w-full">
        <label className="text-gray-900 dark:text-gray-100 text-xl font-bold mb-2 flex flex-row flex-nowrap items-center">
          Results
          <div className="font-light text-base text-black dark:text-white ml-2">
            <span className="text-primary font-bold">
              {state.filteredDomains.length}
            </span>{" "}
            filtered results out of{" "}
            <span className="text-primary font-bold">
              {state.unfilteredDomains.length}
            </span>{" "}
            total domains
          </div>
        </label>
        <small className="block text-gray-600 dark:text-gray-400 text-xs font-light mb-2">
          These are your personalized results.
        </small>
        <div
          style={{ maxHeight: 400, overflowY: "scroll" }}
          className="flex flex-row flex-wrap items-start scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
        >
          {state.filteredDomains.map((d, index) => (
            <span
              key={index}
              className="m-1 bg-gray-300 dark:bg-gray-500 text-black dark:text-white bg-none border-none p-2"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <CopyToClipboard text={clipboard} className="absolute top-5 right-5 bg-primary text-white rounded-sm shadow-sm cursor-pointer p-2 inline-flex items-center gap-2">
	  	<ClipboardDocumentIcon className="w-4 h-4" />
	  	Copy
      </CopyToClipboard>
    </div>
  );
};

export default DFResults;
