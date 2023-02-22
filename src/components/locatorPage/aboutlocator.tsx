import * as React from "react";
import hero from "../../images/LocatorBanner.png";

type props = {
    aboutlocatorcontent: any;
};
const AboutLocator = (props: any) => {
  const {aboutlocatorcontent} = props;

  console.log(aboutlocatorcontent);
  return (
    <>
      <div className="container-lg  ">
        <div className="locator_about">
          <h2>
               {aboutlocatorcontent?.heading}
          </h2>
          <p> {aboutlocatorcontent?.description}</p>
          <a className="button " href={aboutlocatorcontent?.button?.link}>{aboutlocatorcontent?.button?.label}</a>
        </div>
      </div>
    </>
  );
};
export default AboutLocator;
