import {
  Matcher,
  SelectableFilter,
  useSearchActions,
  useSearchState,
  useAnswersState,
  CombinedFilter,
  combineFilters,
  FilterCombinator,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  limit,
} from "..//../config/globalConfig";
import LocationCard from "./LocationCard";
import VerticalResults from "../VerticalResults";
import ResultsCount from "./ResultsCount";
import ViewMore from "./ViewMore";
import { GoogleMaps, scrollToRow  } from "./GoogleMaps";
import Geocode from "react-geocode";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import useFetchResults from "../../hooks/useFetchResults";
import $ from "jquery";
import { svgIcons } from "../../svg icons/svgIcon";
import LoadingSpinner from "../commons/LoadingSpinner";
import FilterSearch from "./FilterSearch";
import Alternateviewmore from "./Alternateviewmore";
import TileFacet from "./TileFacet";
import Usemymodel from "./Usemymodel";
import { StandardFacets } from "@yext/search-ui-react";
import CustomRadioButton from "./CustomRadioButton";
import { Wrapper } from "@googlemaps/react-wrapper";
import AlternateResultsCount from "./AlternateResultCount";

var mapzoom = 8;
const SearchLayout = (props:any): JSX.Element => {
  const [isLoading, setIsloading] = React.useState(true);
  const [zoomlevel , setZoomlevel] = React.useState(8);
  const [centerLatitude, setCenterLatitude] = useState(
    googleMapsConfig.centerLatitude
  );
  const [centerLongitude, setCenterLongitude] = useState(
    googleMapsConfig.centerLongitude
  );
  const locationResults = useFetchResults() || [];
  var newArray: any = [];
  const alternateResult = useSearchState(s => s.vertical.noResults?.allResultsForVertical.results) || [];
  const [check, setCheck] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [allowlocation, setallowLocation]=React.useState("");
  const [modelopen, setModelOpen] = useState(false);
  const[userShareLocation,setUserShareLocation]=useState(false);  
  const [showFilter, setShowFilter] = useState(false);
  const searchActions = useSearchActions();
  const [callVerticals, setCallVerticals] = useState(false);
  const [filterValue, setFilterValue] = useState([]);
  const [checkeddata, setcheckeddata] = useState(false);
  const resultCount = useSearchState((state) => state.vertical.resultsCount) || 0;
  const [useLocationTrigger, setUseLocationTrigger] = useState(true);
  const [facetData, setFacetData] = useState("");
  const isLoadingApi = useAnswersState((state) => state.searchStatus.isLoading);
  const inputRef = React.useRef<HTMLInputElement>(null);
  let googleLib = typeof google !== "undefined" ? google : null;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isUserLocation, setIsUserLocation] = React.useState<boolean>(false);
  const [showFilterEmptyMsg, setShowFilterEmptyMsg] = React.useState(false);
  var firstTimeRunners = true;

  const [optiontext, setOptiontext] = useState("");
  const [offset, setOffset] = React.useState(0);
  const [optionclick, setOptionClick] = useState(true);
  var searchKey: any;
  var firstTimeRunners = true;

  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation(props.allowYourLocationMessage);
          setModelOpen(false);
        }
        setUserShareLocation(false);
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setIsUserLocation(true);
          Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                if (inputRef.current) {
                  inputRef.current.value =
                    response.results[0].formatted_address;
                }

                let pacInput: any = document?.getElementById("pac-input");
                if (pacInput) {
                  pacInput.value = response.results[0].formatted_address;
                  pacInput.focus();
                }

                setallowLocation("");
                searchActions.setUserLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }
            },
            (error: any) => {
              console.error(error);
              setCheck(false);
            }
          );
          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          searchActions.setVertical(AnswerExperienceConfig.verticalKey);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        },
        error,
        {                         
          timeout: 10000,
        }
      );
    }
    searchActions.setUserLocation({
      latitude: googleMapsConfig.centerLatitude,
      longitude: googleMapsConfig.centerLongitude,
    });
    searchActions.setVerticalLimit(limit);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();
    mapzoom = 6;
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };



  // const onClick = () => {
  //   setZoomlevel(4);
  //   if (navigator.geolocation) {
  //     const error = (error: any) => {
  //       if (error.code == 1) {
  //         setallowLocation(props.allowYourLocationMessage);
  //         setModelOpen(true);
  //       }
  //       setUserShareLocation(false);
  //     };
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setIsUserLocation(true);
  //         Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
  //         Geocode.fromLatLng(
  //           position.coords.latitude,
  //           position.coords.longitude
  //         ).then(
  //           (response: any) => {
  //             if (response.results[0]) {
  //               if (inputRef.current) {
  //                 inputRef.current.value =
  //                   response.results[0].formatted_address;
  //               }

  //               let pacInput: any = document?.getElementById("pac-input");
  //               if (pacInput) {
  //                 pacInput.value = response.results[0].formatted_address;
  //                 pacInput.focus();
  //               }

  //               setallowLocation("");
  //               searchActions.setUserLocation({
  //                 latitude: position.coords.latitude,
  //                 longitude: position.coords.longitude,
  //               });
  //             }
  //           },
  //           (error: any) => {
  //             console.error(error);
  //             setCheck(false);
  //           }
  //         );
  //         searchActions.setUserLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //         searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //         searchActions.setOffset(0);
  //         searchActions.setVerticalLimit(limit);
  //         searchActions.executeVerticalQuery();
  //       },
  //       error,
  //       {
  //         timeout: 10000,
  //       }
  //     );
  //   }
  // };


  const Findinput = () => {
   
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    let Search = (searchKey[0].value);
    searchActions.setOffset(0);
if(Search?.length)
{
   setInputValue('');
    getCoordinates(Search);
}
  }

  const Findinput2 = () => {
    let Search = inputRef.current?.value || "";
    let locationHub :any =[]
    if (Search?.length == 0) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({
        lat: googleMapsConfig.centerLatitude,
        lng: googleMapsConfig.centerLongitude,
      });
      searchActions.setVertical("locations");
      searchActions.setQuery("");

 if (filterValue?.length > 0) {
      // setShowFilterEmptyMsg(true);
        let location: SelectableFilter = {
          selected: true,
          fieldId: "c_relatedAdvantages.name",
          value: filterValue[0],
          matcher: Matcher.Equals,
        };
        locationHub.push(location);
       
        if(filterValue.length > 1){
          let location2: SelectableFilter = {
            selected: true,
            fieldId: "c_glassdriveAdvantages",
            value: filterValue[1],
            matcher: Matcher.Equals,
          };
          locationHub.push(location2);
        }

      if (facetData != "") {
        let facet_core: SelectableFilter = {
          selected: false,
          fieldId: "c_typesDeVéhicules",
          value: facetData,
          matcher: Matcher.Equals,
        };
        locationHub.push(facet_core);
      }
    }else{
      locationHub = []
    }
     searchActions.setStaticFilters(locationHub);

      searchActions.setOffset(0);
      searchActions.setVerticalLimit(limit);
      searchActions.executeVerticalQuery();
      getCoordinates(Search);
    }
  };


  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
  
    if (isLoading) {
      $('body').addClass("overflow-hidden")
    }

    let params = (new URL(window.location.href)).searchParams;
    let addresssearch = params.get("s");
    setInputValue('');
    getCoordinates(addresssearch); 
    
  }, []);


  useEffect(() => {
    
    let locationHub: any = [];
    if (filterValue.length > 0) {
      // setShowFilterEmptyMsg(true);
        let location: SelectableFilter = {
          selected: true,
          fieldId: "c_relatedAdvantages.name",
          value: filterValue[0],
          matcher: Matcher.Equals,
        };
        locationHub.push(location);
       
        if(filterValue?.length > 1){
          let location2: SelectableFilter = {
            selected: true,
            fieldId: "c_glassdriveAdvantages",
            value: filterValue[1],
            matcher: Matcher.Equals,
          };
          locationHub.push(location2);
        }

      if (facetData != "") {
        let facet_core: SelectableFilter = {
          selected: false,
          fieldId: "c_typesDeVéhicules",
          value: facetData,
          matcher: Matcher.Equals,
        };
        locationHub.push(facet_core);
      }
      searchActions.setStaticFilters(locationHub);
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();
      scrollToRow(0);
    } else {
      setShowFilterEmptyMsg(false);
    }
    if (filterValue?.length == 0) {
      searchActions.setStaticFilters([]);
      setFacetData("");
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();
    }
  }, [checkeddata, filterValue]);



  // function getCoordinates(address: string) {
  //   // var str = address;
  //   // var lastIndex = str.indexOf(",");
  //   // str = str.substring(0, lastIndex)
  //   setActiveIndex(null);
  //   document.querySelectorAll(".scrollbar-container")[0].scrollTop = 0;
  //   fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       address +
  //       "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status == "OK") {
  //         data.results.map((res: any) => {
  //           const userlatitude = res.geometry.location.lat;
  //           const userlongitude = res.geometry.location.lng;
  //           let params = { latitude: userlatitude, longitude: userlongitude };
  //           searchActions.setQuery(address);
  //           searchActions.setUserLocation({
  //             latitude: userlatitude,
  //             longitude: userlongitude,
  //           });
  //           searchActions.executeVerticalQuery();
  //         });
  //       } else {
  //         searchActions.setUserLocation({
  //           latitude: centerLatitude,
  //           longitude: centerLongitude,
  //         });
  //         searchActions.setQuery(address);
  //         searchActions.executeVerticalQuery();
  //       }
  //     });
  // }

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setActive("");
  };

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();

  useEffect(() => {
    if (googleLib && typeof google.maps === "object") {
      let pacInput: any = document?.getElementById("pac-input");
      let options: any = {
        options: {
          types: ["geocode"],
          componentRestrictions: { country: {centerLatitude,centerLongitude} },
          strictBounds: false,
          fields: ["address_components", "geometry", "icon", "name"],
        },
      };
      const autoComplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      if (autoComplete) {
        function pacSelectFirst(input: HTMLInputElement) {
          var _addEventListener = input.addEventListener;

          function addEventListenerWrapper(type: string, listener: any) {
            if (type == "keydown") {
              var orig_listener = listener;

              listener = function (event: { which: number }) {
                var suggestion_selected = $(".pac-item-selected")?.length > 0;

                if (
                  (event.which == 13 || event.which == 9) &&
                  !suggestion_selected
                ) {
                  var simulated_downarrow = $.Event("keydown", {
                    keyCode: 40,
                    which: 40,
                  });
                  orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
              };
            }

            _addEventListener.apply(input, [type, listener]);
          }

          if (input.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        }

        setAutocomplete(autoComplete);
        pacSelectFirst(pacInput);
        $("#search-location-button")
          .off("click")
          .on("click", function () {
            var keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 13;
              },
            });
            Object.defineProperty(keydown, "which", {
              get: function () {
                return 13;
              },
            });
            pacInput.dispatchEvent(keydown);
          });

        google.maps.event.addListener(
          autoComplete,
          "place_changed",
          function () {
            const searchKey: any = pacInput.value;
            if (searchKey) {
              getCoordinates(searchKey);
            }
          }
        );
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);



  

  // let userMyLocationBlockMessage = props.userMyLocationBlockMessage;
  let userMyLocationBlockMessage = "Please Allow Your Location";
  let NoLocationsAvailable= props.NoLocationsAvailable;


  const onClick = () => {
  setZoomlevel(3)
    setInputValue('');
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation(userMyLocationBlockMessage);
        } else {
          setallowLocation(userMyLocationBlockMessage);
        }
        setUserShareLocation(false);
      }
      navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
      Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(
        (response:any) => {
          if (response.results[0]) {           
            setInputValue(response.results[0].formatted_address);      
    document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);            
            setallowLocation('');             
            searchActions.setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }   
        },
        (error: any) => {
          console.error(error);
          setCheck(false);
        }
      );
            setCenterLatitude(position.coords.latitude);
            setCenterLongitude(position.coords.longitude);
      
            searchActions.setUserLocation({latitude: position.coords.latitude,longitude: position.coords.longitude });
            searchActions.setVertical(AnswerExperienceConfig.verticalKey);
           // searchActions.setQuery(response.results[0].formatted_address);
            searchActions.setOffset(0);
            searchActions.setVerticalLimit(limit);
            searchActions.executeVerticalQuery();      
      }, error, {
        timeout: 10000,
      });
    }
  }



  
  const getParents = (elem: any) => {
    while (
      elem.parentNode &&
      elem.parentNode.nodeName.toLowerCase() != 'body'
    ) {
      elem = elem.parentNode;
      if (elem.classList.contains("options")) {
        return true;
      }
    }
    return false;
  };


  const handleInputValue = () => {
    setInputValue('');
  }
  const handleSetUserShareLocation = (value:any, userShareStatus:boolean) => {
    // console.log('handleSetUserShareLocation', value, userShareStatus);
    setInputValue(value);
    if(!userShareStatus){
      setCenterLatitude(googleMapsConfig.centerLatitude);
      setCenterLongitude(googleMapsConfig.centerLongitude);
    }
  }

  


  function getCoordinates(address: String) {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "london &key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          data.results.map((res: any) => {
            const userlatitude = res.geometry.location.lat;
            const userlongitude = res.geometry.location.lng;
            let params = { latitude: userlatitude, longitude: userlongitude };
            setCenterLatitude(userlatitude);
            setCenterLongitude(userlongitude);
         //   searchActions.setUserLocation(params);
            searchActions.setQuery(address);
            searchActions.executeVerticalQuery();
          });
        } else {
          searchActions.setUserLocation({
            latitude: centerLatitude,
            longitude: centerLongitude,
          });
          searchActions.setQuery(address);
          searchActions.executeVerticalQuery();
        }
      });
  }
  const noresult =() =>{
    noresultmessage=("No Location Found")
    searchActions.setQuery('');
    searchActions.executeVerticalQuery();
  }


  const loader = isLoading ? <LoadingSpinner /> : '';
  return (
    <>
 <Wrapper
      apiKey={googleMapsConfig.googleMapsApiKey}
      libraries={["places", "geometry"]}
    >
    {loader}
    <div className="locator-full-width place-content-center" style={{height:"unset"}}>
        
        <div className="locator-container">
                <div className="search-block" style={{width:"100%"}}>
                    {allowlocation?.length > 0 ?
                    <div className="for-allow">{allowlocation}</div>
                    : ''}
                      <div className="location-with-filter">
                        <h3 className="title">Enter a town or postcode</h3>
                        {/* Use My Location button */}
                        <button
                          className="ghost-button before-icon"
                          title="Search using your current location!"
                          id="useLocation"
                          onClick={onClick}
                        >               
                          {svgIcons.useMyLocation}
                          Use My Location
                        </button>
                      </div>
                      {/* Search Input by name,address  */}
                      <div className="search-form">
                        
                        {/* <FilterSearch
                          customCssClasses={{
                            filterSearchContainer: "mb-0",
                            inputElement: "FilterSearchInput",
                            optionsContainer: "options"
                          }}
                          
                          inputvalue = { inputvalue}
                          searchOnSelect={false}
                          searchFields={[]}
                          searchFields={[
                            {
                              entityType: "location",
                              fieldApiName: "name",
                            },
                            {
                              entityType: "location",
                              fieldApiName: "address.line1",
                            },
                            {
                              entityType: "location",
                              fieldApiName: "address.line2",
                            },
                            {
                              entityType: "location",
                              fieldApiName : "address.city",
                            },
                            {
                              entityType: "location",
                              fieldApiName: "address.region",
                            },
                          ]}
                          handleInputValue={handleInputValue}  
                          handleSetUserShareLocation={handleSetUserShareLocation}
                        /> */}
                  <input
                  id="pac-input"
                  type="text"
                  ref={inputRef}
                  placeholder="Inserisci codice postale, città ..."
                  className="text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600 FilterSearchInput"
                  onChange={() => Findinput2()}
                  onKeyDown={(evt) => {
                    if (
                      evt.key === "Backspace" ||
                      evt.key === "x" ||
                      evt.key === "Delete"
                    ) {
                      Findinput2();
                    }
                  }}
                />
                        {/* Covid Filter  */}
                        <StandardFacets
                          customCssClasses={{container: "filter-items" }}
                          defaultExpanded={true}
                        ></StandardFacets> 

                    {/* Search icon Button  */}
                        <button
                          className="button"
                          aria-label="Search bar icon"
                          id="search-location-button"
                          onClick={Findinput}

                        >
                          {svgIcons.Searchbaricon}
                        </button>
                      </div>
                    </div>
        </div>
    </div>
      <div className="locator-full-width place-content-center">
        <div className="locator-container">
           {/* Map view and List View CTA in mobile responsive  */}
          <div className="mobile-btns">
            <a
              className="button before-icon listBtn"
              href="javascript:void(0);"
              onClick={() => {
                document.body.classList.remove("mapView");
              }}
            >
              {svgIcons.listView} Pharmacy List
            </a>
            <a
              className="button before-icon mapBtn"
              href="javascript:void(0);"
              onClick={addClass}
            >
              {svgIcons.mapView} Map View
            </a>
          </div>


          {/* Map Section  */}
          <div className="map-section">
            <GoogleMaps
              apiKey={googleMapsConfig.googleMapsApiKey}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              defaultZoom={8}
              zoomLevel={zoomlevel}
              setZoomLevel= {setZoomlevel}
              showEmptyMap={true}
              check={check}
            />
            <ViewMore
                className={"button view-more before-icon"}
                idName={"mobile-view-more-button"}     
                buttonLabel={"Load More"}
                
              />
          </div>
          {alternateResult && alternateResult?.length > 0 ? (
          <p className="pt-2 pb-3 text-lg text-center no-lc-err-msg">{NoLocationsAvailable}</p>
          ):(
         <></>
          )}

           {/* Result listing Section  */}
          <div className="result-listing">
            <ResultsCount
              //customCssClasses={{ resultsCountContainer: "result-count" }}
            />
            <PerfectScrollbar className="result-list">
              {locationResults && locationResults?.length > 0 ? (
                <div className="scrollbar-custom">
                  <VerticalResults
                    displayAllOnNoResults={false}
                    CardComponent={LocationCard}
                    locationResults={locationResults}
                  />
                  
                </div>
              ) : (
               
                  <div className="scrollbar-custom no-data-list">
                    <VerticalResults
                      displayAllOnNoResults={false}
                      CardComponent={LocationCard}
                      locationResults={alternateResult}      
                    />
                  </div>
               
              )}
                {locationResults && locationResults?.length > 0 ?
            <ViewMore className={"button view-more before-icon"} idName={"listing-view-more-button"} buttonLabel={"Load More"} setZoomLevel={setZoomlevel}/>
            :
            <Alternateviewmore className={"button view-more before-icon"} idName={"alternate-view-more-button"} buttonLabel={"Load More"}/>
            }
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      {/* <script async  src={"https://maps.googleapis.com/maps/api/js?key="+googleMapsConfig.googleMapsApiKey+"&libraries=places&callback=initMap"}></script> */}
      </Wrapper>
    </>
  );
};


export default SearchLayout;
