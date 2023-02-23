import * as React from "react";
import { Link } from "@yext/pages/components";
import RtfConverter from "@yext/rtf-converter";
type AboutSection = {
  storeDescriptionTitle: any;
};
const About = (props: AboutSection) => {
  const {
           storeDescriptionTitle,
  } = props;

console.log(storeDescriptionTitle);

  return (
    <>
      {storeDescriptionTitle && (
        <div className="container-lg bg-[#014c6b2e]  md:py-5 md:pt-6">
          <div className="ab-sec">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-1/2 xl:w-[57%] pt-6 lg:pt-0  text-center" >
                <h2 className="sec-title !mb-5 hidden lg:block">
                  {storeDescriptionTitle.title}
                </h2>     
                  <div className="leading-7 text-base text-gray-700 about-content" >
                      {storeDescriptionTitle.description}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
