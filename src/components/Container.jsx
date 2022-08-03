/* imported useState hook from react
 */

import { useState } from "react";
import { DownArrowIcon, UserIcon } from "./SVGIcons";

/* Created Container functional component and written html code
 */

export default function Container(props) {
  const { children, className, pageBackgroundUrl = "" } = props;

  const [navItems, setNavItems] = useState([
    {
      label: "Home",
      href: "/",
      hasDropDown: false,
    },

    {
      label: "Doctor",
      href: "/doctor",
      hasDropDown: true,
      isMenuOpen: false,
      dropdownData: [
        { label: "Doctor", href: "/doctor" },
        { label: "Setting", href: "/doctor/setting" },
      ],
    },
    {
      label: "Appointment",
      href: "/appointment",
      hasDropDown: true,
      isMenuOpen: false,
      dropdownData: [
        { label: "Appointment", href: "/appointment" },
        { label: "Setting", href: "/appointment/setting" },
      ],
    },
    {
      label: "Patient",
      href: "/patient",
      hasDropDown: true,
      isMenuOpen: false,
      dropdownData: [
        { label: "Patient", href: "/patient" },
        { label: "Setting", href: "/patient/setting" },
      ],
    },
    {
      label: "Test",
      href: "/test",
      hasDropDown: true,
      isMenuOpen: false,
      dropdownData: [
        { label: "Test", href: "/test" },
        { label: "Setting", href: "/test/setting" },
      ],
    },
    {
      label: "Report",
      href: "/report",
      hasDropDown: true,
      isMenuOpen: false,
      dropdownData: [
        { label: "Report", href: "/report" },
        { label: "Setting", href: "/report/setting" },
      ],
    },
    {
      label: "Admin",
      href: "/admin",
      hasDropDown: false,
    },
    {
      label: "Contact Us",
      href: "/contactus",
      hasDropDown: false,
    },
  ]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${className}`}
      style={{
        backgroundImage: `url("${pageBackgroundUrl}")`,
      }}
    >
      {navItems.filter((a) => a.isMenuOpen === true).length ? (
        <button
          onClick={(event) => {
            event.preventDefault();

            navItems.forEach((nav) => {
              if (nav.hasDropDown && nav.isMenuOpen) {
                nav.isMenuOpen = false;
              }
            });

            setNavItems([...navItems]);
          }}
          className="absolute z-[2] h-screen w-screen bg-transparent"
        />
      ) : null}

      <header className="p-8 flex flex-col">
        <div className="flex justify-between items-center">
          <a href="/">
            <img className="h-28 w-[270px]" src={`/logo.png`} alt="" />
          </a>

          <a
            href="/login"
            className="flex items-center h-10 gap-2 text-white bg-green-500 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-green-600"
          >
            <UserIcon className="w-5 h-5 fill-white" />
            <span className="uppercase font-semibold">Log in</span>
          </a>
        </div>

        <hr className="mt-8 mb-4 border-gray-500 " />

        <nav className="flex flex-wrap items-center justify-center gap-4 ">
          {navItems.map((item, i) => (
            <div key={i} className="relative inline-block">
              <div className="flex items-center gap-1">
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:underline underline-offset-8 text-gray-900 text-lg font-bold cursor-pointer uppercase"
                >
                  {item.label}
                </a>

                {item.hasDropDown ? (
                  <button
                    onClick={(event) => {
                      item.isMenuOpen = !item.isMenuOpen;
                      setNavItems([...navItems]);
                    }}
                  >
                    <DownArrowIcon className="h-5 w-5" />
                  </button>
                ) : null}
              </div>

              {item.isMenuOpen && (
                <div className="absolute z-10 w-48 mt-2 bg-white shadow-x">
                  {item.dropdownData.map((dropitems) => (
                    <a
                      href={dropitems.href}
                      className="flex items-center px-3 py-3 text-base font-semibold text-black capitalize transition-colors duration-200 transform hover:bg-gray-200 fill-gray-600"
                    >
                      <span className="mx-1">{dropitems.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      {children}

      <footer className="mt-44 text-center bg-gray-900 text-white ">
        <div className="flex justify-center mb-6 gap-3 mt-12">
          <a
            href="https://instagram.com/sumeet_jain7?igshid=YmMyMTA2M2Y="
            target={"_blank"}
            rel="noopener noopener noreferrer"
          >
            <img src="/instagram.png" alt="" className="h-10 w-10" />
          </a>

          <a
            href="https://twitter.com/sumeet_jain7?lang=en"
            target={"_blank"}
            rel="noopener noopener noreferrer"
          >
            <img src="/twitter.png" alt="" className="h-10 w-10" />
          </a>

          <a
            href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
            target={"_blank"}
            rel="noopener noopener noreferrer"
          >
            <img src="/gmail.png" alt="" className="h-10 w-10" />
          </a>
        </div>
        <div className="text-center p-4">
          © 2022 Copyright:
          <a className="text-whitehite ml-4" href="/">
            INDIA
          </a>
        </div>
      </footer>
    </div>
  );
}
