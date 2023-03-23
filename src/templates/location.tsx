/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */
import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumb";
import NearByLocation from "../components/locationDetails/NearByLocation";
import { nearByLocation } from "../types/nearByLocation";
import { fetch } from "@yext/pages/util";
import hero1 from "../images/LocationBanner.png";
import favicon from "../images/favicon1.png";
import { JsonLd } from "react-schemaorg";
import LocationInformation from "../components/locationDetails/LocationInformation";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import Faq from "../components/locationDetails/faq";
import About from "../components/locationDetails/AboutWell";
import Hours from "../components/commons/hours";
import Amenities from "../components/locationDetails/amenities";
import MakeWellPharmacy from "../components/locationDetails/MakeWellYourPharmacy";

import {
  AnswerExperienceConfig,
  defaultTimeZone,
  googleMapsConfig,
  WellSocialMediaUrls,
} from "../config/globalConfig";
import {
  radius,
  baseApiUrl,
  liveAPIKey,
  // savedFilterId,
  entityTypes,
  limit,
} from "../config/globalConfig";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { BaseUrl, slugify,AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie, } from "../config/globalConfig";
import Service from "../components/locationDetails/Services";
import { svgIcons } from "../svg icons/svgIcon";
import ServicesSections from "../components/locationDetails/servicessection";
import AboutGuide from "../components/locationDetails/aboutguide";
import OpenCloseStatus from "../components/commons/OpenCloseStatus";

/**
 * Required when Knowledge Graph data is used for a template.
 */

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "hours",
      // "c_hoursHeading",
      "mainPhone",
      "description",
      "c_bannerImage",
      // "c_bookAnAppointment",
      // "c_pageHeadingH1",
      "photoGallery",
      // "c_facilities",
      // "c_getDirections",
      "yextDisplayCoordinate",
      // "c_storeNo",
      // "c_regionNo",
      "slug",
      "geocodedCoordinate",
      // "c_tellUsIfTheseDetailsAreWrong",
      "additionalHoursText",
      // "c_storeInformationHeading",
      "c_nearBySectionTitle",

      /*make well your pharmacy section*/
      // "c_makeWellYourPharmacyTitle",
      // "c_makeWellYourPharmacyDescription",
      // "c_makeWellYourPharmacySpecialities",
      // "c_makeWellYourPharmacyCTA",
      // "c_makeWellYourPharmacyImage",
      // "c_nHSLogo",

      /*About Pharmacy Section*/
      // "c_storeDescriptionTitle",
      // "c_storeDescriptionImage",
      // "c_storeDescriptionText",
      // "c_storeDescriptionCTA",

      /*Services Section*/
      // "c_pharmacyServicesTitle",
      // "c_pharmacyServices",
      // "c_cTAForPharmacyServices", 

      /*FAQ's Section*/
      // "c_frequentlyAskedQuestionsTitle",
      // "c_fAQsDescription",
      // "c_relatedFAQs.question",
      // "c_relatedFAQs.answer",
      
      /*Amenities Section*/
      // "c_amenities",
      // "c_amenitiesTitle",
       
      /*seo*/
      // "c_canonicalURL",
      // "c_metaDescription",
      // "c_metaTitle",
      // "c_robotsTag",

      /*Directory Manager*/
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryChildrenCount",
      // "dm_directoryParents.c_addressRegionDisplayName",
      "c_servicesSection",
      "c_aboutGuide",
      "c_aboutSection",
    ],

    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes:["location"]
      // savedFilterIds: [savedFilterId],
    },
    
    // The entity language profiles that documents will be generated for.
    localization: {
      // locales: [AnswerExperienceConfig.locale],
      locales: ["en", "fr"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  
  // let url = "";
  // if (!document?.slug) {
  //   let slugString = document?.id + " " + document?.name;
  //   let slug = slugify(slugString);
  //   url = `${slug}.html`;
  // } else {
  //   url = `${document?.slug.toString()}.html`;
  // }
  // return url;

  var url: any = ""
  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == 'Tapestry_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'Tapestry_region') {
      url = `${url}/${i.slug}`
    }
    else if (i.meta.entityType.id == "Tapestry_city"){
      url = `${url}/${i.slug}/${document?.slug?.toString()}`
    }
  })
  return url;



};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document?.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
 document,
}): HeadConfig => {
  let url = "";
  if (!document?.slug) {
    let slugString = document?.id + " " + document?.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document?.slug?.toString()}.html`;
  }

  let metaDescription =  document.c_metaDescription
  ? document.c_metaDescription
  : `${document.name} | Get best health services, free prescription deliveries, consultations in ${document.address.city} at Well Pharmacy.`;
let metaTitle = document.c_metaTitle
? document.c_metaTitle
: `${document.name} | Online pharmacy, prescriptions and local chemists UK - Well Pharmacy`;


  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          // content: `${metaDescription}`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Well Pharma",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          // content: `${
          //   document.c_robotsTag
          //     ? document.c_robotsTag
          //     : "noindex, nofollow"
          // }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          // href: `${
          //   document.c_canonical
          //     ? document.c_canonical
          //     // : BaseUrl + "/" + url
          // }`,
        },
      },

      //og tag
      {
        type: "meta",
        attributes: {
          property: "og:title",
          // content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          // content: `${metaDescription}`,
        },
      },
      {
        
        type: "meta",
        attributes: {
          property: "og:url",
          content: BaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          // content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
        },
      },
      //twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          // content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          // content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: BaseUrl + "/" + url,
        },
        
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          // content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
        },
      },
    ],
  };
};

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  let latitude = data?.document?.yextDisplayCoordinate?.latitude;
  let longitude = data?.document?.yextDisplayCoordinate?.longitude;

  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${latitude},${longitude}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=10&retrieveFacets=true&skipSpellCheck=false&session_id=12727528-aa0b-4558-9d58-12a815eb3761&sessionTrackingEnabled=true&source=STANDARD`;
  //console.log(url,"url")

  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;

  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};
const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  externalApiData,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    slug,
    // c_amenities,
    // c_amenitiesTitle,
    mainPhone,
    // c_facilities,
    // c_storeDescriptionTitle,
    // c_storeDescriptionImage,
    // c_storeDescriptionText,
    // c_storeDescriptionCTA,
    // c_ctabutton,
    c_bannerImage,
    // c_bookAnAppointment,
    // c_pageHeadingH1,
    // c_storeNo,
    // c_regionNo,
    // c_frequentlyAskedQuestionsTitle,
    // c_fAQsDescription,
    // c_makeWellYourPharmacyTitle,
    // c_makeWellYourPharmacyDescription,
    // c_makeWellYourPharmacySpecialities,
    // c_makeWellYourPharmacyCTA,
    // c_makeWellYourPharmacyImage,
    // c_nHSLogo,
    // c_hoursHeading,
    // c_getDirections,
    // c_tellUsIfTheseDetailsAreWrong,
    // c_storeInformationHeading,
    additionalHoursText,
    __meta,
    c_nearBySectionTitle,
    // c_pharmacyServices,
    // c_pharmacyServicesTitle,
    // c_cTAForPharmacyServices,
    // c_relatedFAQs,
    dm_directoryParents,
    yextDisplayCoordinate,
    timezone,
    geocodedCoordinate,
    c_servicesSection,
    c_aboutGuide,
    c_aboutSection,
  } = document;
  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];
  if (hours) {
    for (var key in hours) {
      if (hours.hasOwnProperty(key)) {
        let openIntervalsSchema: any = "";
        if (key !== "holidayHours") {
          if (hours[key].isClosed) {
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
          } else {
            let end = "";
            let start = "";
            if (typeof hours[key].openIntervals != "undefined") {
              let openIntervals = hours[key].openIntervals;
              for (var o in openIntervals) {
                if (openIntervals.hasOwnProperty(o)) {
                  end = openIntervals[o].end;
                  start = openIntervals[o].start;
                }
              }
            }
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              closes: end,
              dayOfWeek: key,
              opens: start,
            };
          }
        } else {
        }

        hoursSchema.push(openIntervalsSchema);
      }
    }
  }
  dm_directoryParents &&
    dm_directoryParents.map((i: any, index: any) => {
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${BaseUrl}/${i.slug}`,
            name: i.name,
          },
        });
      }
    });
  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document?.slug?.toString()}.html`;
  }
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": `${BaseUrl}/${url}`,
      name: document.name,
    },
  });
console.log("translate",document.locale);
  return (
    <>
      <JsonLd<Location>
        item={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: document?.name,
          image: `${document?.c_wellLogo ? document?.c_wellLogo?.url : favicon}`,
          "@id": "",
          url: "https://www.well.co.uk/",
          telephone: mainPhone,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          "geo": {
            "@type": "GeoCoordinates",
            latitude: document?.yextDisplayCoordinate?.latitude,
            longitude: document?.yextDisplayCoordinate?.longitude,
          },  
          openingHoursSpecification: hoursSchema,

          sameAs: [
            WellSocialMediaUrls.facebook,
            WellSocialMediaUrls.twitter,
            WellSocialMediaUrls.instagram,
            WellSocialMediaUrls.linkedin,
            WellSocialMediaUrls.tiktok
            ]
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
        }}
      />

       {/* {c_relatedFAQs ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
                c_relatedFAQs &&
                c_relatedFAQs.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.answer}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )} */}

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <Header
          wellLogo={_site?.c_wellLogo}
          headerLinks={_site?.c_headerLinks}
          findPharmacy={_site?.c_findAPharmacy}
          _sitedata={_site}
          languagetr={document.locale}
        />

         <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          BaseUrl={relativePrefixToRoot}
          address={address}
        ></BreadCrumbs>

        <div className="hero">
                    <div className="banner_image_h">
                      <img
                        className="heroBanner"
                        src={c_bannerImage?.image?.url ? c_bannerImage?.image?.url : hero1}
                        alt="Banner Image"
                      />
                  </div>
                  <div className="open_hours" style={{backgroundImage:"initial"}}>
                   <h2>{name}</h2>
                   {hours ? (
                              <>
                                  <>
                                    <div className="icon-row single-line">
                                      <div className="icon" style={{width:"100%"}}>
                                        {svgIcons.openclosestatus}
                                        <OpenCloseStatus
                                        timezone={timezone ? timezone : defaultTimeZone}
                                        hours={hours}
                                      ></OpenCloseStatus>
                                        </div>
                                     
                                    </div>
                                  </>
                              </>
                            ) : (
                              <></>
                       )}
              </div>
          {/*<div className="hero-content location-dtl">
            <h1>{c_pageHeadingH1 ? c_pageHeadingH1 :name}</h1>
            <div className="ctaBtn">
            {c_bookAnAppointment?.link && c_bookAnAppointment?.label && (
                <Link className="button before-icon" href={c_bookAnAppointment.link}>
              {svgIcons.BookAnAppointment} {c_bookAnAppointment.label}
                </Link>
              )}
            </div>
          </div>*/}
        </div> 

       <LocationInformation
          prop={hours}
          coords={yextDisplayCoordinate}
          address={address}
          phone={mainPhone}
          timezone={timezone}
          hours={hours}
          // tellUsIfTheseDetailsAreWrong={c_tellUsIfTheseDetailsAreWrong}
          // c_storeNo={c_storeNo}
          // c_regionNo={c_regionNo}
          // storeInformationHeading={c_storeInformationHeading}
          // hoursHeading={c_hoursHeading}
          // getDirection={c_getDirections}
          additionalHoursText={additionalHoursText}
          // clickAndCollect={c_facilities}
        />
        <ServicesSections servicessec={c_servicesSection}/>
          <AboutGuide aboutguide={c_aboutGuide}/>

 {/* 
        <div className="mt-10">
          {c_pharmacyServicesTitle ? (
            <Service
              pharmacyServices={c_pharmacyServicesTitle}
              service={c_pharmacyServices}
              ctaforpharmacyservices={c_cTAForPharmacyServices}
            />
          ) : (
            <></>
          )}
        </div> */}

      
        {/* <div className="mt-10">
          {c_amenitiesTitle && c_amenities ? (
            <Amenities title={c_amenitiesTitle} amenities={c_amenities} />
          ) : (
            <></>
          )}
        </div> */}
        {/* <div className="mt-10">
          <MakeWellPharmacy
            makeWellYourPharmacyTitle={c_makeWellYourPharmacyTitle}
            makeWellYourPharmacyDescription={c_makeWellYourPharmacyDescription}
            makeWellYourPharmacySpecialities={
              c_makeWellYourPharmacySpecialities
            }
            makeWellYourPharmacyCTA={c_makeWellYourPharmacyCTA}
            makeWellYourPharmacyImage={c_makeWellYourPharmacyImage}
            NHSLogo={c_nHSLogo}
          />
        </div> */}
        {/* {c_frequentlyAskedQuestionsTitle &&
        c_fAQsDescription &&
        c_relatedFAQs ? (
          <div className="mt-5 md:mt-10">
            <Faq
              prop={c_relatedFAQs}
              faq_title={c_frequentlyAskedQuestionsTitle}
              faq_description={c_fAQsDescription}
            />
          </div>
        ) : (
          <></>
        )} */}

        <div className="mt-8 md:mt-10">
                  {c_aboutSection ? (
                  <About
                      storeDescriptionTitle={c_aboutSection}
                    />
                  ) : (
                    <></>
                  )}
                </div>

        <NearByLocation
          prop={externalApiData}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
          coords={yextDisplayCoordinate}
          slug={slug}
          timezone={timezone}
          nearByWellPharmaciesTitle={c_nearBySectionTitle}
          // directionlabel={c_getDirections}
          // c_service_title={c_pharmacyServicesTitle}
          // c_wellPharmacyServices={c_pharmacyServices}
        />

        <div className="find-more more-location">
          <a className="button" href="/index.html">
            View More Locations {svgIcons.ViewMoreLocation}
          </a>
        </div>
        <Footer
          footerLogo={_site?.c_footerLogo}
          footerLinks={_site?.c_footerLinks}
          footerDescription={_site?.c_footerDescription}
          facebookPageUrl={_site?.facebookPageUrl}
          twitterHandle={_site?.twitterHandle}
          instagramHandle={_site?.instagramHandle}
          linkedInUrl={_site?.linkedInUrl}
          copyrightText={_site?.c_copyrightText}
          footerLogos={_site?.c_footerLogos}
          socialicon={_site?.c_socialIcons}
          cookieHeading={_site?.c_cookieHeading}
          cookiePolicyDescription={_site?.c_cookiePolicyDescription}
        />
      </AnalyticsProvider>
    </>
  );
};
export default Location;
