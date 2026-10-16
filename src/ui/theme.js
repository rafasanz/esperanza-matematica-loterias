import { readStored, writeStored } from "../utils/storage.js";

export function initTheme(themeButton) {
  function updateThemeButton() {
    const dark = document.body.classList.contains("dark");
    const label = dark ? "Activar modo claro" : "Activar modo oscuro";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.dataset.tooltip = label;
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }

  function toggleTheme() {
    const willBeDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", willBeDark);
    writeStored("theme", willBeDark ? "dark" : "light");
    updateThemeButton();
  }

  function applySavedTheme() {
    const savedTheme = readStored("theme");
    document.body.classList.toggle(
      "dark",
      savedTheme === "dark" ||
        (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches),
    );
    updateThemeButton();
  }

  themeButton.addEventListener("click", toggleTheme);
  applySavedTheme();
}
