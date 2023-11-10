interface Section {
  name: string;
  selected: boolean;
  defaultText: string;
  currentText: string;
}

const sections: Section[] = [
  {
    name: "title",
    selected: true,
    defaultText: `# Título do Projeto
        Uma breve descrição sobre o que esse projeto faz e para quem ele é`,
    currentText: `# Título do Projeto
        Uma breve descrição sobre o que esse projeto faz e para quem ele é`,
  },
  {
    name: "table_of_contents",
    selected: false,
    defaultText: ``,
    currentText: ``,
  },
  {
    name: "functions",
    selected: false,
    defaultText: `## Funcionalidades
        - Temas dark e light
        - Preview em tempo real
        - Modo tela cheia
        - Multiplataforma`,
    currentText: `## Funcionalidades
        - Temas dark e light
        - Preview em tempo real
        - Modo tela cheia
        - Multiplataforma`,
  },
  {
    name: "screenshots",
    selected: false,
    defaultText: `### Screenshot
        <p align="center" >
            <img src="" />
            <img src="" />
            <img src="" />
            <img src="" />
        </p>`,
    currentText: `### Screenshot
        <p align="center" >
            <img src="" />
            <img src="" />
            <img src="" />
            <img src="" />
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
        - [React](https://reactjs.org/): JS library
        - [Tailwindcss](https://tailwindcss.com/): For styles
        - Typescript`,
    currentText: `### Built with
        - [React](https://reactjs.org/): JS library
        - [Tailwindcss](https://tailwindcss.com/): For styles
        - Typescript`,
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
];

export default sections;
