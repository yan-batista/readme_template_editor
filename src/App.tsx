import { useState, useEffect, Fragment } from "react";
import Markdown from "markdown-to-jsx";

import HamburguerIcon from "./assets/menu.svg";
import DownloadIcon from "./assets/download.svg";
import EyeIcon from "./assets/eye.svg";
import EyeOffIcon from "./assets/eye-off.svg";
import TrashIcon from "./assets/trash.svg";
import RefreshIcon from "./assets/refresh-ccw.svg";

import SectionsData from "./data";

import { downloadMarkdownFile, removeIdentationOnMarkdown } from "./helpers";

interface Section {
  name: string;
  selected: boolean;
  defaultText: string;
  currentText: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>(SectionsData);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [editorText, setEditorText] = useState<string>(
    removeIdentationOnMarkdown(sections.filter((section) => section.selected === true)[0]?.currentText || ``)
  );
  const [currentSelectedSectionName, setCurrentSelectedSectionName] = useState("title");

  useEffect(() => {
    const previewText = document.querySelector("#previewText");
    if (previewText) {
      const links = previewText.querySelectorAll("a");
      if (links.length > 0) {
        for (let i = 0; i < links.length; i++) {
          links[i].target = "_blank";
        }
      }
    }
  }, [editorText]);

  function onClickHandleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function getSections(isSelected: boolean) {
    return sections.map((section, idx) => {
      if (section.selected === isSelected) {
        return (
          <li
            className="group list-none bg-offwhite rounded-md p-2 text-black my-1 flex flex-row items-center justify-between cursor-pointer select-none"
            key={`${idx}-${section}`}
            onClick={
              section.selected
                ? () => {
                    configureEditor(section);
                  }
                : onClickSetSectionSelection
            }
            data-name={section.name}
          >
            <p>{capitalize(section.name.replace(/_/g, " "))}</p>
            {section.selected && (
              <div className="flex-row gap-2 hidden group-hover:flex">
                <img
                  src={RefreshIcon}
                  alt="refresh the content for this section"
                  className="w-4 h-4"
                  onClick={onClickRefreshSection}
                  data-name={section.name}
                />
                <img
                  src={TrashIcon}
                  alt="remove this section"
                  className="w-4 h-4"
                  onClick={onClickSetSectionSelection}
                  data-name={section.name}
                />
              </div>
            )}
          </li>
        );
      }
    });
  }

  /* ========== ASIDE MENU FUNCTIONS ========== */
  // Clicking on a section OR trash icon will change "selected" to the opposite of the current value
  // Sets the currentSelectedSectionName state to the clicked section name
  // Sets the editor text to the clicked section
  function onClickSetSectionSelection(event: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLImageElement>) {
    const sectionName = event.currentTarget.dataset.name;
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName ? { ...section, selected: !section.selected } : section
      )
    );

    const currentSelected = sections.filter((section) => section.name === sectionName)[0];
    configureEditor(currentSelected);
  }

  // Clicking on the refresh icon will set the currentText to the defaultText
  function onClickRefreshSection(event: React.MouseEvent<HTMLImageElement>) {
    const sectionName = event.currentTarget.dataset.name;
    const currentSelected = sections.filter((section) => section.name === sectionName);
    currentSelected[0].currentText = currentSelected[0].defaultText;
  }

  /* ========== EDITOR FUNCTIONS ========== */
  // ON MOBILE: Swaps between Editor and Preview
  function onClickChangeEditorAndPreview() {
    setIsEditorOpen((prevState) => !prevState);
    setIsPreviewOpen((prevState) => !prevState);
  }

  // Sets the text in the editor to the value received
  function changeEditorText(value: string) {
    setEditorText(removeIdentationOnMarkdown(value));
  }

  // Calls functions that set the current selected section name
  // and changes the editor text
  function configureEditor(sec: Section) {
    changeEditorText(removeIdentationOnMarkdown(sec.currentText));
    setCurrentSelectedSectionName(sec.name);
  }

  // When typing on the editor, saves the text to the state
  // and also changes the currentText for the current selected section that is being edited
  function onChangeEditor(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditorText(event.currentTarget.value);
    const currentSelected = sections.filter((section) => section.name === currentSelectedSectionName)[0];
    currentSelected.currentText = event.currentTarget.value;
  }

  /* ========== PREVIEW FUNCTIONS ========== */
  // Will check all selected sections and create a string with
  // all sections currentText
  function getPreviewValueFromAllSelected() {
    let resultingText: string = "";
    sections.map((section) => {
      if (section.selected) {
        resultingText += `\n\n${section.currentText}`;
      }
    });

    return removeIdentationOnMarkdown(resultingText);
  }

  return (
    <>
      <header className="bg-gray w-full flex flex-row items-center justify-between p-2">
        <div id="hamburger_menu" className="bg-light_gray p-4 w-fit rounded-md" onClick={onClickHandleMenu}>
          <img src={HamburguerIcon} alt="click to open menu" className="w-7 h-7" />
        </div>
        <button
          id="download_button"
          className="bg-primary p-4 w-fit flex flex-row items-center gap-4 rounded-md"
          onClick={downloadMarkdownFile}
        >
          <img src={DownloadIcon} alt="click to open menu" className="w-5 h-5" />
          <p className="hidden text-white font-bold md:inline">Download</p>
        </button>
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

      <section className="flex flex-row flex-grow overflow-hidden">
        <section id="editor" className={`w-full flex flex-col ${isEditorOpen ? "lg:flex" : "hidden lg:flex"}`}>
          <div id="editor_title" className="bg-very_dark_gray p-2 flex flex-row items-center justify-between">
            <span>Editor</span>
            <img
              src={EyeIcon}
              alt="alternate to preview"
              className="w-5 h-5 lg:hidden"
              onClick={onClickChangeEditorAndPreview}
            />
          </div>
          <textarea
            className="bg-editor w-full flex-grow focus:outline-none focus:ring-0 resize-none p-4 max-h-min overflow-y-scroll"
            id="editor_textarea"
            name="editor_textarea"
            value={editorText}
            onChange={onChangeEditor}
          ></textarea>
        </section>

        <section
          id="preview"
          className={`w-full h-full flex flex-col flex-grow overflow-auto ${
            isPreviewOpen ? "lg:flex" : "hidden lg:flex"
          }`}
        >
          <div id="preview_title" className="bg-very_dark_gray p-2 flex flex-row items-center justify-between">
            <span>Preview</span>
            <img
              src={EyeOffIcon}
              alt="alternate to editor"
              className="w-5 h-5 lg:hidden"
              onClick={onClickChangeEditorAndPreview}
            />
          </div>
          <div className="bg-editor w-full p-4 flex-grow flex-shrink overflow-y-auto text-text" id="previewText">
            <Markdown options={{ wrapper: Fragment }}>{getPreviewValueFromAllSelected()}</Markdown>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
