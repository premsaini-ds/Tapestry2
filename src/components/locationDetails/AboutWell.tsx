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




  var buttonText = "Show More";
  const myFunction = (x: any , y: any) => {         // function to hide and show search section after click on search icon on header

    x = document.getElementById("hide-show");
    y = document.getElementById("hide");
  
    if (x.style.height === "140px") {
      x.style.height = "57px";
      buttonText = "Show More";
      x.style.transitionDuration = "0.6s";
    } else {
      x.style.height = "140px";
      buttonText = "Hide";
      x.style.transitionDuration = "0.6s";
    }
    // document.getElementById("hide-show").classList.toggle('open');

    y.innerText = '';
    y.innerHTML += buttonText;
 }



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
                     <p id="hide-show">{storeDescriptionTitle.description}</p>
                      <a href="javascript:;" id="hide" style={{color:"green"}} onClick={myFunction}>Show More</a>
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
