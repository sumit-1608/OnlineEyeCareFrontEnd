import { Routes, Route } from "react-router-dom";
import Container from "../../components/Container";
import Main from "./Main";
import Settings from "./Settings";

export default function admin() {
  const sidepanal = [
    {
      label: "Appointment",
      href: "/admin",
    },
    {
      label: "Setting",
      href: "/Admin/settings",
    },
  ];

  return (
    <Container
      pageBackgroundUrl={
        "https://www.telemedinc.com/wp-content/uploads/2020/01/telemed-banner.jpg"
      }
      className="bg-no-repeat  bg-cover bg-center"
    >
      <div className="p-8 flex flex-row gap-3">
        <div className="basis-5/6 px-6 flex flex-col  ">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="basis-1/6 pl-2">
          <div className="flex flex-col  bg-[#597286]">
            {sidepanal.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="py-2 px-6 hover:first-letter hover:border-l-[6px] hover:border-[#364f64]  "
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
