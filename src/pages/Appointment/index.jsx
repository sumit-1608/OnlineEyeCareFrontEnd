import { Routes, Route } from "react-router-dom";
import Container from "../../components/Container";
import Main from "./Main";
import Settings from "./Settings";

export default function appointment() {
  const sidepanal = [
    {
      label: "Appointment",
      href: "/appointment",
    },
    {
      label: "Setting",
      href: "/Appointment/setting",
    },
  ];

  return (
    <Container>
      <div className="p-8 flex flex-row gap-3">
        <div className="basis-5/6 px-6 flex flex-col  ">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/setting" element={<Settings />} />
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
