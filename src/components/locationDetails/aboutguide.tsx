import * as React from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";
import nhs from "../../images/nhs-england-logo.png";
import wellimage from "../../images/makewellimage.jpg";
import RtfConverter from "@yext/rtf-converter";

type Services = {
  aboutguide: any;
};
const AboutGuide = (props: Services) => {
  const {
    aboutguide,
    } = props;
console.log(aboutguide);
  return (
    <>
      <>
        {aboutguide && (
          <div className="guide_section_main">
            <div className="relative container-lg px-12">
                   <ul className="splide__list guide_sec">
                                    <div className="w-full guide_left">
                                        {aboutguide?.image ? (
                                                        <img
                                                            className="max-w-full w-full h-full"
                                                            alt=""
                                                            src={aboutguide?.image?.url}
                                                        ></img>
                                            ) : (
                                                ""
                                            )}
                                    </div>
                                    <div className="w-full guide_right">
                                        <h2>{aboutguide?.title}</h2>
                                        <p>{aboutguide?.description}</p>
                                        {aboutguide?.title?.label ? 
                                                    <h2>{aboutguide?.title?.label}</h2>
                                        :""}
                                        <a className="button " href={aboutguide?.button?.link}> {aboutguide?.button?.label}</a>
                                    </div>
                    </ul>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default AboutGuide;
