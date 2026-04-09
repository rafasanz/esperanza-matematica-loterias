export function initTheme(themeButton) {
  function updateThemeButton() {
    themeButton.textContent = document.body.classList.contains("dark") ? "Modo claro" : "Modo oscuro";
  }

  function toggleTheme() {
    const willBeDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", willBeDark);
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
    updateThemeButton();
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    document.body.classList.toggle("dark", savedTheme === "dark");
    updateThemeButton();
  }

  themeButton.addEventListener("click", toggleTheme);
  applySavedTheme();
}
