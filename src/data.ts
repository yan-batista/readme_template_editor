export interface Section {
  name: string;
  selected: boolean;
  defaultText: string;
  currentText: string;
}

const sections: Section[] = [
  {
    name: "title",
    selected: true,
    defaultText: `<div align="center">
  # Project Title
  
  A brief description of what this project does
</div>`,
    currentText: `<div align="center">
  # Project Title

  A brief description of what this project does
</div>`,
  },
  {
    name: "badges",
    selected: false,
    defaultText: `<div align="center" style="display: flex; flex-direction: row; justify-content: center; gap: 4px;">
  ![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
  ![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)
  ![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)
</div>`,
    currentText: `<div align="center" style="display: flex; flex-direction: row; justify-content: center; gap: 4px;">
  ![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
  ![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)
  ![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)
</div>`,
  },
  {
    name: "table_of_contents",
    selected: false,
    defaultText: ``,
    currentText: ``,
  },
  {
    name: "features",
    selected: false,
    defaultText: `## Features

- This application features`,
    currentText: `## Features

- This application features`,
  },
  {
    name: "screenshots",
    selected: false,
    defaultText: `### Screenshots

<p align="center" >
    <img src="" alt=""/>
</p>`,
    currentText: `### Screenshots

<p align="center" >
  <img src="" alt=""/>
</p>`,
  },
  {
    name: "link",
    selected: false,
    defaultText: `### Links

- [Live Site](https://your-site.com)`,
    currentText: `### Links

- [Live Site](https://your-site.com)`,
  },
  {
    name: "built_with",
    selected: false,
    defaultText: `### Built with

- Add other tools used to build this application`,
    currentText: `### Built with

- Add other tools used to build this application`,
  },
  {
    name: "what_I_learned",
    selected: false,
    defaultText: `### What I learned

Here you will write things that you learned while developing this application

\`\`\`
const hello: string = "Hello World";
\`\`\`

You can also put some code to exemplify things.`,
    currentText: `### What I learned

Here you will write things that you learned while developing this application

\`\`\`
const hello: string = "Hello World";
\`\`\`

You can also put some code to exemplify things.`,
  },
  {
    name: "author",
    selected: false,
    defaultText: `## Autores

- Github - [@yan-batista](https://github.com/yan-batista)`,
    currentText: `## Autores

- Github - [@yan-batista](https://github.com/yan-batista)`,
  },
  {
    name: "acknowledgments",
    selected: false,
    defaultText: `## Acknowledgments

- Add libraries, people or projects that were helpful`,
    currentText: `## Acknowledgments

- Add libraries, people or projects that were helpful`,
  },
  {
    name: "To do",
    selected: true,
    defaultText: ``,
    currentText: `# To do
- [ ] Allow changing the order of the sections
- [ ] Generate table of contents
- [ ] Local link
- [ ] On refresh, warn user that they will lose any changes`,
  },
];

export default sections;
