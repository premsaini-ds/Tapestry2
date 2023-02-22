import * as React from "react";
import hero from "../../images/LocatorBanner.png";

type props = {
  locatorBannerImage: any;
  locatorTitleH1: any;
};
const Banner = (props: any) => {
  const { locatorBannerImage, locatorTitleH1 } = props;
  return (
    <>
      <div className="hero mx-auto">
        <img
          className="heroBanner"
          src={
            locatorBannerImage?.url
              ? locatorBannerImage?.url
              : hero
          }
          alt="locator Banner"
        />
        <div className="hero-content">
          <h1>
            {locatorTitleH1 ? locatorTitleH1 : " Your Nearest"}
          </h1>
        </div>
      </div>
    </>
  );
};
export default Banner;
