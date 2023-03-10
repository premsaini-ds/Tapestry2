import * as React from "react";
import { BaseUrl } from "../../config/globalConfig";
import logo from "../../images/Logo.png";
import { svgIcons } from "../../svg icons/svgIcon";

type props = {
  wellLogo: any;
  headerLinks: any;
  findPharmacy: any;
  _sitedata:any;
};

const Header = (props: any) => {
  const { wellLogo, headerLinks, findPharmacy,_sitedata } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });

  const toggle = () => {
    document.getElementById("body").classList.toggle("menu-opened");
  };


  const myFunction = (x: any) => {               // function to hide and show search section after click on search icon on header
    x = document.getElementById("sp-search");
    if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
     
    } else {
       x.style.visibility = "visible";
     
    }
  }

  


  return (
      <header className="site-header">
        <div className="container-lg">
          <div className="navbar">
            <div className="mobile-menu-btn lg:hidden">
              <button type="button" onClick={toggle} name="toggle-button">
                <span></span>
                <span></span>
              </button>
            </div>
            <div className="logo">
              <a href="#" className="">
                <img
                  src={wellLogo?.url ? wellLogo?.url : logo}
                  alt="Coach Logo"
                  title="Coach"
                />
              </a>
            </div>
            <div className="mid-nav">
              {headerLinks?.map((e: any) => {
                return (
                  <>
                    <div className="menu-item">
                      <a href={e.link} className="">
                        {e.label}
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="sitenav">
              <ul className="menu">
            <li className="header-right-link menu-item-34 search-site menu-item-has-children">

              {/* <a href={findPharmacy?.link} className="">
                {svgIcons.searchicon}
                <span>{findPharmacy?.label}</span>
              </a> */}

              <a href="javascript:;" className="" onClick={myFunction} >
                {svgIcons.searchicon}
                <span>{findPharmacy?.label}</span>
              </a>
              
              <div className="search-menu sub-menu" id="sp-search">
                <ul className="wrap sub-mega-menu">
                  <li>
                    <h5>Search</h5>
                      <form role="search" method="get" className="search-form" action={BaseUrl}>
                        <label className="screen-reader-text">Search for:</label>
                        <input type="search" id="search-form-1" className="search-field" placeholder="Enter keywords"  name="s"/>
                        <input type="submit" className="search-submit" value="Go"/>
                      </form>
                  </li>
                </ul>
              </div>


            </li>
            </ul>
          </div>
          </div>
        </div>
      </header>
  );
};
export default Header;
