import * as React from "react";
import { BaseUrl } from "../../config/globalConfig";
import logo from "../../images/Logo.png";
import { svgIcons } from "../../svg icons/svgIcon";
import { useRef, useState, useEffect } from "react";

type props = {
  wellLogo: any;
  headerLinks: any;
  findPharmacy: any;
  _sitedata: any;
};

const Header = (props: any) => {
  const { wellLogo, headerLinks, findPharmacy, _sitedata } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });

  const toggle = () => {
    document.getElementById("body").classList.toggle("menu-opened");
  };

  // const inputRef = useRef(null);
  // const [updated, setUpdated] = useState("");
  // const handleClick = () => {
  //   // setUpdated(inputRef.current.value);

  //   localStorage.setItem("headersearch", inputRef.current.value);

  // };

  // c_headerMenus

  const myFunction = (x: any) => {
    // function to hide and show search section after click on search icon on header
    x = document.getElementById("sp-search");
    if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
    } else {
      x.style.visibility = "visible";
    }
  };

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
          <div className="mid-nav sitenav">
            {_sitedata?.c_headerMenus?.map((e: any) => {
              return (
                <>
                
                  <div className="menu-item headerMenumain">
                    <a href={e.mainMenu.link} className="headerMenu">
                      {e.mainMenu.label}
                    </a>
                    {e?.subMenu ?
                    <div className="sub-menu">
                      <ul id="mega-menu-0" className="wrap sub-mega-menu">
                        {e.description ? (
                          <li id="text-0" className="widget widget_text">
                            <div className="textwidget">
                              <a className="hover:underline" href="#">
                                {e.title}
                              </a>
                              <p>{e.description}</p>
                            </div>
                          </li>
                        ) : (
                          ""
                        )}
                        
                        <li id="nav_menu-0" className="widget widget_nav_menu">
                          <div className="menu-mm-about-submenu-left-container">
                            <ul
                              id="menu-mm-about-submenu-left0"
                              className="menu"
                            >
                              {e?.subMenu?.map((h: any, index: number) => {
                                if (index < 4) {
                                  return (
                                    <>
                                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3954">
                                        <a
                                          className="hover:underline"
                                          href={h.link}
                                        >
                                          {h.label}
                                        </a>
                                      </li>
                                    </>
                                  );
                                }
                              })}
                            </ul>
                          </div>
                        </li>
                          <li className="widget widget_nav_menu">
                                            <div className="menu-mm-about-submenu-right-container">
                                              <ul
                                                id="menu-mm-about-submenu-right0"
                                                className="menu"
                                              >
                                                {e?.subMenu?.map((h: any, index: number) => {
                                                  if (index == 4 || (index > 4 && index < 8)) {
                                                    return (
                                                      <>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3954">
                                                          <a
                                                            className="hover:underline"
                                                            href={h.link}
                                                          >
                                                            {h.label}
                                                          </a>
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                })}
                                              </ul>
                                            </div>
                                          </li>

                                          <li className="widget widget_nav_menu">
                                            <div className="menu-mm-about-submenu-right-container">
                                              <ul
                                                id="menu-mm-about-submenu-right0"
                                                className="menu"
                                              >
                                                {e?.subMenu?.map((h: any, index: number) => {
                                                  if (index == 8 || (index > 8 && index < 12)) {
                                                    return (
                                                      <>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3954">
                                                          <a
                                                            className="hover:underline"
                                                            href={h.link}
                                                          >
                                                            {h.label}
                                                          </a>
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                })}
                                              </ul>
                                            </div>
                                          </li>
                                          <li className="widget widget_nav_menu">
                                            <div className="menu-mm-about-submenu-right-container">
                                              <ul
                                                id="menu-mm-about-submenu-right0"
                                                className="menu"
                                              >
                                                {e?.subMenu?.map((h: any, index: number) => {
                                                  if (index == 12 || (index > 12 && index < 16)) {
                                                    return (
                                                      <>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3954">
                                                          <a
                                                            className="hover:underline"
                                                            href={h.link}
                                                          >
                                                            {h.label}
                                                          </a>
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                })}
                                              </ul>
                                            </div>
                                          </li>
                      </ul>
                    </div>
                      :""}
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

                <a href="javascript:;" className="" onClick={myFunction}>
                  {svgIcons.searchicon}
                  <span>{findPharmacy?.label}</span>
                </a>

                <div className="search-menu sub-menu" id="sp-search">
                  <ul className="wrap sub-mega-menu">
                    <li>
                      <h5>Search</h5>
                      <form
                        role="search"
                        method="get"
                        className="search-form"
                        action={BaseUrl}
                      >
                        <label className="screen-reader-text">
                          Search for:
                        </label>
                        <input
                          // ref={inputRef}
                          type="search"
                          id="search-form-1"
                          className="search-field"
                          placeholder="Enter keywords"
                          name="s"
                        />
                        <input
                          type="submit"
                          className="search-submit"
                          value="Go"
                        />
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
