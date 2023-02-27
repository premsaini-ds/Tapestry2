import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumb";
import favicon from "../images/favicon.png";
import hero from "../images/hero.jpg";
import OpenCloseStatus from "../components/commons/OpenCloseStatus";
import Address from "../components/commons/Address";
import getDirectionUrl from "../components/commons/GetDirection";
// import Phone from "../components/commons/Phone";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { BaseUrl, slugify } from "../config/globalConfig";
import { Link } from "@yext/pages/components";
var currentUrl = "";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { svgIcons } from "../svg icons/svgIcon";
import Phone from "../components/commons/phone";

export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      // savedFilterIds: ["dm_wellpharmacy-directory_address_city"],
      entityTypes:["Tapestry_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.yextDisplayCoordinate",
      "dm_directoryChildren.id",
      "dm_directoryChildren.meta.entityType",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url: any = ""
  document?.dm_directoryParents?.map((i: any) => {
    if (i?.meta?.entityType?.id == 'Tapestry_country') {
      url = `${i.slug}`
    }
    else if (i?.meta?.entityType?.id == 'Tapestry_region') {
      url = `${url}/${i?.slug}/${document?.slug?.toString()}`
    }
  })
  return url+".html";
};


// var url = "";
// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   let url = "";
//   let slugString = document.id + " " + document.name;
//   let slug = slugify(slugString);

//   if (typeof document.slug == "undefined") {
//     let slugStrings: any = [];

//     if (typeof document.dm_directoryParents != "undefined") {
//       document.dm_directoryParents?.map((e: any) => {
//         if (e.meta.entityType.id != "ce_root") {
//           if (typeof e.slug == "undefined") {
//             slugStrings.push(slugify(e.name));
//           } else {
//             slugStrings.push(e.slug);
//           }
//         }
//       });
//     }

//     if (slugStrings.length > 0) {
//       url = `${slugStrings.join("/")}/${slug}.html`;
//     } else {
//       url = `${slug}.html`;
//     }
//   } else {
//     let slugStrings: any = [];

//     if (typeof document.dm_directoryParents != "undefined") {
//       document.dm_directoryParents?.map((e: any) => {
//         if (e.meta.entityType.id != "ce_root") {
//           if (typeof e.slug == "undefined") {
//             slugStrings.push(slugify(e.name));
//           } else {
//             slugStrings.push(e.slug);
//           }
//         }
//       });
//     }

//     if (slugStrings.length > 0) {
//       url = `${slugStrings.join("/")}/${document.slug.toString()}.html`;
//     } else {
//       url = `${document.slug.toString()}.html`;
//     }
//   }

//   return url;
// };

const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.62137119;
  return miles.toFixed(2);
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }

  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `Get the best health services, free prescription deliveries, and consultations in ${document.name}.`;
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `Find all Tapestry Stores in ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
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
          name: "description",
          content: `${metaDescription}`,
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
          content: `${
            document.c_robotsTag ? document.c_robotsTag : "noindex, nofollow"
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical ? document.c_canonical : BaseUrl + "/" + url
          }`,
        },
      },

      //og tag
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
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
          content: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        },
      },
      //twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
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
          content: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    description,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
    yextDisplayCoordinate,
    // c_globalData,
  } = document;
  var address;

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const childrenDivs = dm_directoryChildren.map((entity: any) => {
    if (entity.meta.entityType.id == "location") {


      // let url = "";
      // if (!entity.slug) {
      //   let slugString = entity.id + " " + entity.name;
      //   let slug = slugify(slugString);
      //   url = `${slug}.html`;
      // } else {
      //   url = `${entity.slug.toString()}.html`;
      // }

      var origin: any = null;
      if (entity?.address?.city) {
        origin = entity?.address?.city;
      } else if (entity?.address?.region) {
        origin = entity?.address?.region;
      } else {
        origin = entity?.address?.country;
      }

      let key: any = Object.keys(entity?.hours)[0];
      let url = '';
      let countrycode ='';
      let statecode ='';
      var name: any = entity?.name?.toLowerCase();
      var string: any = name?.toString();
      let removeSpecialCharacters = string?.replace(
        /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
        "");
      let result: any = removeSpecialCharacters?.replaceAll(" ", "-");
      if(!entity?.slug || entity?.slug == "undefined"){
        url = `${entity?.id}-${result}`
       
      }
      else{
            countrycode = `${entity?.address?.countryCode.toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')}`;
              statecode = `${entity?.address?.region.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')}`;
              url = `${countrycode+"/"+statecode+"/"+document?.slug+"/"+entity?.slug.toString()}`;
            // console.log(url);
      }




      return (
        <li className="city-location">
          <div className="location">
            <div className="miles-with-title">
              <h3 className="">
                <a key={entity.slug} href={`${BaseUrl + "/" + url}`}>
                  {entity.name}
                </a>
              </h3>
            </div>
            <Address address={entity.address} />
            <Phone phone={entity.mainPhone} />
            {svgIcons.openclosestatus && entity.hours ? (
              <div className="OpenCloseStatus icon-row">
                <div className="icon">{svgIcons.openclosestatus}</div>
                <OpenCloseStatus
                  timezone={"Europe/London"}
                  hours={entity.hours}
                ></OpenCloseStatus>
              </div>
            ) : (
              " "
            )}

            <div className="buttons">
              <div className="ctaBtn">
                <Link
                  data-ya-track="directions"
                  className="direction button before-icon"
                  onClick={() => {
                    getDirectionUrl(entity);
                  }}
                  href="javascript:void(0);"
                  rel="noopener noreferrer"
                  eventName={`getdirections"`}
                  //conversionDetails={conversionDetailsDirection}
                >
                  {svgIcons.GetDirection} Map and Direction
                </Link>
              </div>
              <div className="ctaBtn">
                <a
                  className="button before-icon"
                  href={`${BaseUrl + "/" + url}`}
                >
                  {svgIcons.viewdetails}
                  View Details
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    }
  });

  return (
    <>
      <Header
        wellLogo={_site.c_wellLogo}
        headerLinks={_site.c_headerLinks}
        findPharmacy={_site.c_findAPharmacy}
      />
       <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          BaseUrl={relativePrefixToRoot}
          address={address}
        ></BreadCrumbs>

      <div className="hero">
        <img className="heroBanner" src={hero} alt="" />
        <div className="hero-content">
          <h1 className="small-heading">
            <strong>
              {" "}
              Available Pharmacies in {name}
              {/* , {" "}
              {document?.dm_directoryParents[2]?.name
          ? document?.dm_directoryParents[2]?.name
          : " "}, {document?.dm_directoryParents[1]?.name}{" "} */}
            </strong>
          </h1>
        </div>
      </div>
      <div className="content-list sec-padd-60">
        <div className="container">
          <ul className="city-list region-list">{childrenDivs}</ul>
        </div>
      </div>

      <Footer
        footerLogo={_site.c_footerLogo}
        footerLinks={_site.c_footerLinks}
        footerDescription={_site.c_footerDescription}
        facebookPageUrl={_site.facebookPageUrl}
        twitterHandle={_site.twitterHandle}
        instagramHandle={_site.instagramHandle}
        linkedInUrl={_site.linkedInUrl}
        copyrightText={_site.c_copyrightText}
        footerLogos={_site.c_footerLogos}
        socialicon={_site.c_socialIcons}
      />
    </>
  );
};
export default City;
