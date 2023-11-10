import { Section } from "./data";

export function removeIdentationOnMarkdown(value: string) {
  return value
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n");
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function findFirstSelectedSection(sections: Section[]): Section | null {
  const filterResult = sections.filter((section) => section.selected === true);
  if (filterResult.length > 0) {
    return filterResult[0];
  } else {
    return null;
  }
}
