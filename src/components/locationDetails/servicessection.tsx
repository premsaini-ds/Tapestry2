import * as React from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";
import nhs from "../../images/nhs-england-logo.png";
import wellimage from "../../images/makewellimage.jpg";
import RtfConverter from "@yext/rtf-converter";

type Services = {
  servicessec: any;
};
const ServicesSections = (props: Services) => {
  const {
    servicessec,
    } = props;
console.log(servicessec);
  return (
    <>
      <>
        {servicessec && (
          <div className="services_section_main">
            <div className="relative container-lg px-12">
                   <ul className="splide__list services_sec">
                      {servicessec?.map((list: any) => {
                        return (
                                 <li>
                                     {list?.image ? (
                                            <div className="w-full">
                                                <a href={list?.imageURL}>
                                                    <img
                                                        className="max-w-full w-full h-full"
                                                        alt=""
                                                        src={list?.image?.url}
                                                    ></img>
                                                </a>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    <p>{list.description}</p>
                                    {list.title.label ? 
                                        <a href={list.title.link}>
                                                <h2>{list.title.label}</h2>
                                        </a>
                                    :""}
                                </li>
                                );
                      })}
                    </ul>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default ServicesSections;
