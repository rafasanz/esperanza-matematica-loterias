export function setupModal({ infoButton, closeModalButton, modal }) {
  const main = document.querySelector("main");
  function setOpen(open) {
    modal.classList.toggle("hidden", !open);
    modal.setAttribute("aria-hidden", String(!open));
    main.inert = open;
    document.body.classList.toggle("modal-open", open);
    (open ? closeModalButton : infoButton).focus();
  }
  infoButton.addEventListener("click", () => setOpen(true));
  closeModalButton.addEventListener("click", () => setOpen(false));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      setOpen(false);
    }
  });
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
    if (event.key === "Tab") {
      const focusable = [
        ...modal.querySelectorAll('button, a[href], input, [tabindex="0"]'),
      ];
      const first = focusable[0] || modal;
      const last = focusable.at(-1) || modal;
      if (
        (event.shiftKey && document.activeElement === first) ||
        (!event.shiftKey && document.activeElement === last)
      ) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    }
  });
}
