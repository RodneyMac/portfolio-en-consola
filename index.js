const promptInput = document.getElementById("promptInput");
const terminal = document.getElementById("terminal");
const terminalWindow = document.getElementById("terminalWindow");
const date = document.getElementById("date");

promptInput.focus();
date.innerText = new Date().toDateString();
terminalWindow.addEventListener("click", () => promptInput.focus());

promptInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterCommand(e);
  }

  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
});

promptInput.addEventListener("click", (e) => {
  e.preventDefault();
});

const enterCommand = (e) => {
  const promptElement = document.getElementById("promptClone").cloneNode(true);
  promptElement.classList.remove("hidden");
  promptElement.getElementsByClassName("promptCloneInput")[0].innerHTML =
    e.target.value;
  promptElement.setAttribute("id", null);
  promptElement
    .getElementsByClassName("promptCloneContent")[0]
    .appendChild(selectCommandBlock(e.target.value));
  terminal.appendChild(promptElement);
  promptInput.value = "";
  promptInput.scrollIntoView({ block: "start" });
};

const selectCommandBlock = (command) => {
  const lowerCommand = command.toLowerCase();
  switch (lowerCommand) {
    case "start":
    case "education":
    case "skills":
    case "experience":
    case "projects":
    case "contact":
      return getCommandTemplate(lowerCommand);
    case "clear":
      return clearCommand();
    default:
      return notFoundCommand(command);
  }
};

const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove("hidden");
  element.setAttribute("id", null);
  return element;
};

const clearCommand = () => {
  terminal.innerHTML = "";
  const element = document.createElement("span");
  return element;
};

const notFoundCommand = (command) => {
  const element = document.createElement("span");
  element.innerText = `+ ${command}: Command Not Found`;
  element.classList.add("error");
  return element;
};
