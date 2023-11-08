import { useState, useEffect, Fragment } from "react";
import Markdown from "markdown-to-jsx";

import HamburguerIcon from "./assets/menu.svg";
import DownloadIcon from "./assets/download.svg";
import EyeIcon from "./assets/eye.svg";
import EyeOffIcon from "./assets/eye-off.svg";

interface Section {
  name: string;
  selected: boolean;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const editorDefaultValue = `# Welcome to Markdown

  Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
  
  ## How to use this?
  
  1. Write markdown in the markdown editor window
  2. See the rendered markdown in the preview window
  
  ### Features
  
  - Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
  - Name and save the document to access again later
  - Choose between Light or Dark mode depending on your preference
  
  > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).
  
  #### Headings
  
  To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.
  
  ##### Lists
  
  You can see examples of ordered and unordered lists above.
  
  ###### Code Blocks

  This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

  \`\`\`html
  <main>
    <h1>This is a larger code block</h1>
  </main>
  \`\`\`
  `;
  const [editorText, setEditorText] = useState<string>(
    editorDefaultValue
      .split("\n")
      .map((line) => line.trimStart())
      .join("\n")
  );

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

  function downloadMarkdownFile() {
    const input: HTMLTextAreaElement | null = document.querySelector("#editor_textarea");
    if (input) {
      const blob = new Blob([input.value], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "README.md";
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  function onClickSetSectionSelected(event: React.MouseEvent<HTMLLIElement>) {
    const sectionName = lowercaseString(event.currentTarget.innerHTML.replace(/ /g, "_"));
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName ? { ...section, selected: !section.selected } : section
      )
    );
  }

  function onClickChangeEditorAndPreview() {
    setIsEditorOpen((prevState) => !prevState);
    setIsPreviewOpen((prevState) => !prevState);
  }

  function onChangeEditor(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditorText(event.currentTarget.value);
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
            <Markdown options={{ wrapper: Fragment }}>{editorText}</Markdown>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
