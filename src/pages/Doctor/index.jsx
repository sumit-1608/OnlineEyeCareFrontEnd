import { Routes, Route } from "react-router-dom";
import Container from "../../components/Container";
import Main from "./Main";
import Settings from "./Settings";
import { SettingIcon, ScopeIcon } from "../../components/SVGIcons";

export default function Doctor() {
  const sidepanal = [
    {
      label: "Doctor",
      href: "/doctor",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-300 mr-3" />,
    },

    {
      label: "Setting",
      href: "/doctor/setting",
      icon: <SettingIcon className="h-5 w-5 fill-gray-300 mr-3" />,
    },
  ];

  return (
    <Container
      pageBackgroundUrl={`/doctorbg.jpg`}
      className="bg-no-repeat  bg-cover bg-center"
    >
      <div className="p-8 flex flex-row gap-3">
        <div className="basis-5/6 px-6 flex flex-col  ">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/setting" element={<Settings />} />
          </Routes>
        </div>
        <div className="basis-1/6 pl-2">
          <div className="flex flex-col  bg-green-800 rounded-lg p-2">
            {sidepanal.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="py-2 px-4 hover:bg-green-700 flex items-center rounded-lg text-lg  font-bold text-gray-300 uppercase"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
