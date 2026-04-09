export function setupModal({ infoButton, closeModalButton, modal }) {
  infoButton.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalButton.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
