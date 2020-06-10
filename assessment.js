let row_of_square = "";

const dragstart_handler = function(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.target.style.opacity = .5;
  row_of_square = ev.target.id.substring(0, 2);
}

const dragend_handler = function(ev) {
  ev.target.style.opacity = "";
  ev.target.parentNode.style.background = "";
}

const dragover_handler = function(ev) {
  ev.preventDefault();
}

const dragenter_handler = function(ev) {
  if (ev.target.id.substring(0, 2) === row_of_square && !ev.target.id.includes("box")) {
    ev.target.style.background = "#d4d4d4";
  }

}

const dragleave_handler = function(ev) {
  ev.target.style.background = "";
}

const drop_handler = function (ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  const square = document.getElementById(data);
  const square_reward_num = square.id.substring(0, 2);
  const col_reward_num = ev.target.id.substring(0, 2);
  if (square_reward_num === col_reward_num && !ev.target.hasChildNodes()) {
    ev.target.style.background = "";
    if (square.id.includes("square")) {
      const nodeCopy = square.cloneNode(true);
      nodeCopy.addEventListener("dragstart", dragstart_handler);
      nodeCopy.addEventListener("dragend", dragend_handler);
      nodeCopy.id = ev.target.id + "box";
      nodeCopy.children[0].removeAttribute("hidden");
      ev.target.appendChild(nodeCopy);
      nodeCopy.style.opacity = "";
    } else {
      square.id = ev.target.id + "box";
      ev.target.appendChild(square);
      square.style.opacity = "";
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const reward_squares = document.getElementsByClassName("reward_square");
  const r_drops = document.getElementsByClassName("r_drop");
  Array.from(reward_squares).forEach((square) => {
    square.addEventListener("dragstart", dragstart_handler);
    square.addEventListener("dragend", dragend_handler);
  });
  Array.from(r_drops).forEach((drop) => {
    drop.addEventListener("drop", drop_handler);
    drop.addEventListener("dragover", dragover_handler);
    drop.addEventListener("dragenter", dragenter_handler);
    drop.addEventListener("dragleave", dragleave_handler);
  });
});
