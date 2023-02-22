import * as React from "react";
import favicon from "../images/favicon.png";
import Header from "../components/layouts/header";
import hero from "../images/hero.jpg";
import Footer from "../components/layouts/footer";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";

import "../index.css";
import { JsonLd } from "react-schemaorg";
export const config: TemplateConfig = {
  stream: {
    $id: "404",
    filter: {
      entityIds: ["global-data"] 
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name" 
    ],
    localization: {
      locales: ["en_GB"],
      primary: false
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "/404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "Page Not Found",
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
          name: "robots",
          content: "noindex, nofollow",
        },
      },
    ],
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({
  document,
}) => {
  const { _site } = document;
  return (
    <>
       <JsonLd<FourOhFour>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Well Pharmacy",
          url: "https://www.well.co.uk/",
          logo: "https://images.prismic.io/wellpharmacy-test/ad06d0dc-d97a-4148-a2ab-2570adc639c3_Well.svg?auto=compress,format",
        }}
      />
  {/* <Header
        wellLogo={_site.c_wellLogo}
        headerLinks={_site.c_headerLinks}
        findPharmacy={_site.c_findAPharmacy}
      /> */}

      <div className="hero">
        <img className="heroBanner" src={hero} alt="" />
        <div className="hero-content">
          <h1>
            <strong>404 PAGE NOT FOUND</strong>
          </h1>
        </div>
      </div>

      <div className="content-list text-center">
        <div className="container">
          <p>
            If you entered a web address please check it's correct.
            <br />
            You can also browse from our homepage to find the information you
            need.
          </p>
          <a className="button mt-5 mb-7" href="https://www.well.co.uk/">
            Go to our Homepage
          </a>
        </div>
      </div>

      {/* <Footer
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
      /> */}
    </>
  );
};

export default FourOhFour;
