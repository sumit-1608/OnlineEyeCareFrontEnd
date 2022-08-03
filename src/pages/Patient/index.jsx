import { Routes, Route } from "react-router-dom";
import Container from "../../components/Container";
import Main from "./Main";
import Settings from "./Settings";

export default function Patient() {
  const sidepanal = [
    {
      label: "Patient",
      href: "/patient",
    },
    {
      label: "Settings",
      href: "/Patient/settings",
    },
  ];

  return (
    <Container
      pageBackgroundUrl={
        "https://www.consensusortho.com/wp-content/uploads/2019/10/Blog-Website-Header_Importance-of-Doctor-Patient-Relationship-Blog.png"
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
