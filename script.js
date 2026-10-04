(() => {
  const buttons = Array.from(document.querySelectorAll(".nav-btn"))
    .map((button) => ({
      button,
      panel: document.getElementById(button.dataset.target),
    }))
    .filter(({ panel }) => panel && panel.classList.contains("panel"));

  if (buttons.length === 0) return;

  const nav = buttons[0].button.closest(".nav");
  if (nav) nav.setAttribute("role", "tablist");

  buttons.forEach(({ button, panel }, index) => {
    if (!button.id) button.id = `nav-tab-${panel.id}`;

    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);

    button.addEventListener("click", () => activate(index));
    button.addEventListener("keydown", (event) => {
      let nextIndex;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = buttons.length - 1;
      else return;

      event.preventDefault();
      buttons[nextIndex].button.focus();
      activate(nextIndex);
    });
  });

  function activate(activeIndex) {
    buttons.forEach(({ button, panel }, index) => {
      const isActive = index === activeIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
      panel.classList.toggle("active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  }

  const initialIndex = Math.max(
    0,
    buttons.findIndex(({ button, panel }) =>
      button.classList.contains("active") && panel.classList.contains("active"),
    ),
  );
  activate(initialIndex);
})();
