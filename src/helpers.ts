export function downloadMarkdownFile() {
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

export function removeIdentationOnMarkdown(value: string) {
  return value
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n");
}
