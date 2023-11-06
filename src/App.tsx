import { useState } from "react";

import HamburguerIcon from "./assets/menu.svg";
import DownloadIcon from "./assets/download.svg";

interface Section {
  name: string;
  selected: boolean;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [sections, setSections] = useState<Section[]>([
    { name: "title", selected: true },
    { name: "table_of_contents", selected: false },
    { name: "functions", selected: false },
    { name: "screenshots", selected: false },
    { name: "link", selected: false },
    { name: "built_with", selected: false },
    { name: "what_I_learned", selected: false },
    { name: "author", selected: false },
  ]);

  function onClickHandleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function lowercaseString(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  function getSections(isSelected: boolean) {
    return sections.map((section, idx) => {
      if (section.selected === isSelected) {
        return (
          <li
            className="list-none bg-offwhite rounded-md p-2 text-black my-1"
            key={`${idx}-${section}`}
            onClick={onClickSetSectionSelected}
          >
            {capitalize(section.name.replace(/_/g, " "))}
          </li>
        );
      }
    });
  }

  function onClickSetSectionSelected(event: React.MouseEvent<HTMLLIElement>) {
    const sectionName = lowercaseString(event.currentTarget.innerHTML.replace(/ /g, "_"));
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName ? { ...section, selected: !section.selected } : section
      )
    );
  }

  return (
    <>
      <header className="bg-gray w-full flex flex-row items-center justify-between p-2">
        <div id="hamburger_menu" className="bg-light_gray p-4 w-fit rounded-md" onClick={onClickHandleMenu}>
          <img src={HamburguerIcon} alt="click to open menu" className="w-7 h-7" />
        </div>
        <div id="download_button" className="bg-primary p-4 w-fit flex flex-row items-center gap-4 rounded-md">
          <img src={DownloadIcon} alt="click to open menu" className="w-5 h-5" />
          <p className="hidden md:inline-block text-white font-bold">Download</p>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <div id="side_bar_overlay" className="absolute top-0 w-full h-full z-[9]" onClick={onClickHandleMenu}></div>
          <section
            id="side_bar"
            className="bg-dark_gray h-screen w-60 absolute top-0 z-10 flex flex-col items-start pt-4 gap-4 px-4"
          >
            <div className="w-full">
              <p className="text-primary w-full">Seções Selecionadas</p>
              <ul className="text-primary w-full">{getSections(true)}</ul>
            </div>
            <div className="w-full">
              <p className="text-primary">Outras Seções</p>
              <ul className="flex flex-col w-full">{getSections(false)}</ul>
            </div>
          </section>
        </>
      )}
      <section id="editor"></section>
      <section id="preview"></section>
    </>
  );
}

export default App;
