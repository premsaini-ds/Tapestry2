// src/components/TileFacet.tsx

import {
    // Matcher and NumberRangeValue will be used in step 3
    Matcher,
    NumberRangeValue,
    useSearchActions,
    useSearchState,
  } from "@yext/search-headless-react";
  import classNames from "classnames";
  import * as React from "react";
  interface TileFacetProps {
    fieldId: string;
    displayName?: string;
  }
  
  const TileFacet = ({ fieldId, displayName }: TileFacetProps) => {
    

    const facet = useSearchState((state) =>
                    state.filters.facets?.find((f) => f.fieldId === fieldId)
             );
             
    const searchActions = useSearchActions();
    const handleFacetClick = (
                    value: string | number | boolean | NumberRangeValue,
                    selected: boolean,
                    matcher = Matcher.Equals
    ) => {
            searchActions.setFacetOption(fieldId, { matcher, value }, selected);
            searchActions.executeVerticalQuery();
    }; 


    const [FacetValue, setFacetValues] = React.useState('off');
    const [FacetValue1, setFacetValues1] = React.useState('transform rotate-180');

    const myFunction = (x: any) => {
      if (FacetValue == "off") {
        setFacetValues("on toggletransition");
      } else {
        setFacetValues("off");
      }

      if (FacetValue1 == "transform rotate-180") {
        setFacetValues1("");
      } else {
        setFacetValues1("transform rotate-180");
      }

    }




console.log("facettest",facet);
  
    // component returns null if the facet isn't found in the search state or has no options for a partiaular set of results
    return facet && facet.options.length > 0 ? (
        <>
        <button className="font-bold "  onClick={myFunction}>{displayName ?? facet.displayName}</button>
      <div className={"mb-4 customfacets "+FacetValue}>
       
        <div key={facet.fieldId} className="w-72 mt-6 flex flex-wrap">
          {facet.options.map((o, i) => (
            <div
              key={`${fieldId}_${i}`}
              className={classNames(
                "mr-3 mb-3 border border-toast-orange md:hover:bg-[#FFB563] ",
                // styling to change the background color of the tile based on if it's selected or not
                {
                  "bg-[#FFB563]": o.selected,
                  "bg-[#FFEEDB]": !o.selected,
                }
              )}
              // handleFacetClick will trigger on click to reverse the selected state of the facet option
              onClick={() => handleFacetClick(o.value, !o.selected)}
            >
              <div className="px-3 text-sm inline-block">
                {/* Each facet option contains a display name and count */}
                <span className="mr-0.5">{o.displayName}</span>
                <span className="text-xs">{`(${o.count})`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    ) : null;
  };
  
  export default TileFacet;