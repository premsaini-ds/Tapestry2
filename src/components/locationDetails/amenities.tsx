import * as React from "react";

type props = {
  amenities: any;
  title: any;
};
const Amenities = (data: props) => {
  const { amenities, title } = data;

  return (
      <div className="service-sec light-bg">
        <div className="container-custom ">
          <h2 className="sec-title text-center">{title}</h2>
          <div className="servicesList">
            {amenities.map((am: any) => {
              return (
                  <div className="block">
                    <div className="block-content">
                      <div className="icon">
                        <img src={am?.icon?.url} alt="" title="" />
                      </div>
                      {am.title}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Amenities;
