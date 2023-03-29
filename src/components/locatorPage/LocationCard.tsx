import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from "../commons/hours";
import Address from "..//../components/commons/Address";
import getDirectionUrl from "../commons/GetDirection";
import Service from "../locationDetails/Services";
import { Link } from "@yext/pages/components";
import Modal from "react-modal";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import Phone from "../commons/phone";
import { svgIcons } from "../../svg icons/svgIcon";
import { Data } from "@react-google-maps/api";
import { slugify, defaultTimeZone  } from "../../config/globalConfig";
import Holidayhour from "../locationDetails/holidayHours";

/**
 * 
 * @param meters 
 * @returns Distance in miles
 */
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};


const LocationCard: CardComponent<Location> = ({ result}) => {

  const {
    address,
    id,
    hours,
    mainPhone,
    c_pharmacyServices,
    c_pharmacyServicesTitle,
    c_getDirections,
    c_bookAnAppointment,
    c_facilities,
  } = result.rawData;
  const [time, setTime] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const formattedPhone = formatPhoneNumber(mainPhone);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = React.useState(false);
  React.useEffect(() => {
    setTime(result.rawData);
    setTimeZone(result.rawData.timezone);
    if (!result.rawData) {
      setWithoutHourClass("withoutHours");
    }
    var array: any = [];
    const date = new Date();
    let Day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${Day}`;
    result.rawData?.hours?.holidayHours &&
    result.rawData?.hours?.holidayHours.map((i: any) => {
      let d1 = new Date(`${currentDate}`);
      let d2 = new Date(`${i.date}`);
      if (d2.getTime() >= d1.getTime()) {
        array.push(i);
      }
    });

    if (array.length > 0) {
      setIsShow(true);
    }
    // getCurrentLocationLatLng();
  });


  /**
   * Function to convert Date format in dd-mm-yy
   */
  let a;
  let s;
  let dateNewFormat;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (hours?.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours?.reopenDate), a, " ");
    dateNewFormat = s;
  }

  /**
   * Modal PopUp Custom Styles 
   */
  let subtitle: any;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  };





  /**
   Note-  Url returns Slug
   * If slug is available then url returns Slug otherwise it returns id-name
   */

   var url = "";
  // const { address } = result.rawData;
  // var name: any = result.rawData.name?.toLowerCase();
  var region: any = result.rawData.address.region?.toLowerCase();
  var initialregion: any = region.toString();
  var finalregion: any = initialregion.replaceAll(" ", "-");
  var city: any = result.rawData.address.city?.toLowerCase();
  var country =result.rawData.address.countryCode?.toLowerCase();
  var initialrcity: any = city.toString();
  var finalcity: any = initialrcity.replaceAll(" ", "-");
  // var string: any = name.toString();
  // let result1: any = string.replaceAll(" ", "-");
  // console.log(result.rawData.dm_directoryParents,"sdf")
 

    url = `${country}/${finalregion}/${finalcity}/${result.rawData.slug?.toString()}`


  // var url = "";
  // if (!result.rawData.slug) {
  //   let slugString = result.rawData?.id + " " + result.rawData?.name;
  //   let slug = slugify(slugString);
  //   url = `${slug}.html`;
  // } else {
  //   url = `${result.rawData.slug.toString()}.html`;
  // }
 
  /**
   * LocationCard component which returns the HTML of Locator Page Listing.
   */

  return ( 
   
    <div
      className={`location result-list-inner-${result.index} result onhighLight`}
       //data-id={`result-${result.id || result.index}`}
    >
      <div className="miles-with-title">
        <h3 className="onhighLight">
         <span className="countresultver">{result.index}</span> <Link href={`${url}`}>{result.rawData.name} </Link>
        </h3>
        <p className="miles">{metersToMiles(result.distance ?? 0)} miles</p>
      </div>

      <Address address={address} />
      {mainPhone ? <Phone phone={mainPhone} /> : ""}
      {hours ? (
        <>
          {Object.keys(result.rawData.hours).length > 0 ? (
            <>
              <div className="OpenCloseStatus icon-row">
                <div className="icon">{svgIcons.openclosestatus}</div>
                {hours && hours?.reopenDate ?
                <div>
                  <OpenCloseStatus
                        timezone={timezone ? timezone : defaultTimeZone}
                        hours={hours}
                  />
                    The Store will reopen at {dateNewFormat}
                </div>
                        
                :
                <a
                className={timeStatus + "onhighLight "}
                href="javascript:void(0);"
                onClick={onOpenHide}
              >
                <OpenCloseStatus
                timezone={timezone ? timezone : defaultTimeZone}
                hours={hours}
        />
          </a>}

                <div className={timeStatus + " daylist"}>


                {hours?.holidayHours && isShow && !hours?.reopenDate && (
                              <>
                                <button
                                  className="current-location hide-mob link-line-text holidayHoursButton"
                                  onClick={openModal}
                                >
                                  Holiday Hours
                                </button>
                              </>
                            )}
                            <Modal
                              onRequestClose={handleCloseModal}
                              shouldCloseOnOverlayClick={true}
                              isOpen={modalIsOpen}
                              style={customStyles}
                            >
                              <a
                                onClick={closeModal}
                                type="button"
                                id="closeButton"
                                data-modal-toggle="allergens-pdf"
                                className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
                              >
                                <svg
                                  xmlns="http:www.w3.org/2000/svg"
                                  width="20.953"
                                  height="20.953"
                                  viewBox="0 0 20.953 20.953"
                                >
                                  <path
                                    id="Icon_ionic-md-close"
                                    data-name="Icon ionic-md-close"
                                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                                    transform="translate(-7.523 -7.523)"
                                    fill="#B1B1B1"
                                  />
                                </svg>
                              </a>

                              <h3 className="holiday-title">
                                Holiday Hours Calendar
                              </h3>
                              <div className="pop-up-holyhrs heading">
                                <div>Date</div>

                                <div>Day</div>
                                <div> Opening Hours</div>
                              </div>

                              <Holidayhour hours={hours?.holidayHours} />
                            </Modal>

                  <Hours hours={hours ? hours : {}} 
                   timezone={timezone ? timezone : {}}/>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
     
        </>
      ) : (
        <></>
      )}
      <div className="click-nbx">
        <div>
        {result.rawData.c_facilities ? (
          <div className="click icon-row single-line">
            <div className="icon">{svgIcons.clickAndcollect}</div>
            {result.rawData.c_facilities}
          </div>
        ) : (
          " "
        )}
        </div>
        {c_pharmacyServicesTitle && c_pharmacyServices ? (
          <div className="filterButton">
            <button
              className="current-location hide-mob link-line-text relative onhighLight"
              onClick={openModal}
            >
              Pharmacy Services
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pharmacy-serv onhighLight">
        <a onClick={closeModal}></a>
        {/* <Modal
          onRequestClose={handleCloseModal}
          shouldCloseOnOverlayClick={true}
          isOpen={modalIsOpen}
          style={customStyles}
        >
          <a
            onClick={closeModal}
            type="button"
            id="closeButton"
            data-modal-toggle="allergens-pdf"
            className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
          >
            {svgIcons.Modelpopup}
          </a>

          <Service
            pharmacyServices={c_pharmacyServicesTitle}
            service={c_pharmacyServices}
          />
        </Modal> */}
      </div>

      <div className="buttons">
        <div className="ctaBtn">
          <Link
            data-ya-track="getdirections"
            eventName={`getdirections`}
            className="onhighLight direction button before-icon"
            onClick={() => getDirectionUrl(result.rawData)}
            href="javascript:void(0);"
            rel="noopener noreferrer"
            //conversionDetails={conversionDetails_direction}
          >
            {c_getDirections ? (
              <>
                {svgIcons.GetDirection}
                {c_getDirections}
              </>
            ) : (
              <>{svgIcons.GetDirection} Map & Direction </>
            )}
          </Link>
        </div>
        <div className="ctaBtn">
          <Link className="onhighLight button before-icon" href={`${url}`}>
            {svgIcons.viewdetails}
            View More Info
          </Link>
        </div>

        {c_bookAnAppointment?.link && c_bookAnAppointment?.label && (
          <div className="ctaBtn pt-2.5 mx-auto">
            <Link className="onhighLight button before-icon" href={c_bookAnAppointment.link}>       
                  {svgIcons.BookAnAppointment}
                  {c_bookAnAppointment.label}     
            </Link>
          </div>
        )}
      </div>
    </div>
  );


};

export default LocationCard; 
