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
  const drop_zone = ev.target;
  if (
    drop_zone.id.substring(0, 2) === row_of_square
    && !drop_zone.id.includes("box")
  ) {
    drop_zone.style.background = "#d4d4d4";
  }
}

const dragleave_handler = function(ev) {
  ev.target.style.background = "";
}

const drop_handler = function (ev) {
  ev.preventDefault();
  const drop_zone = ev.target;
  const data = ev.dataTransfer.getData("text/plain");
  const r_square = document.getElementById(data);
  const reward_num = r_square.id.substring(0, 2);
  const drop_zone_row = drop_zone.id.substring(0, 2);
  if (reward_num === drop_zone_row && !drop_zone.hasChildNodes()) {
    drop_zone.style.background = "";
    const new_id = drop_zone.id + "box";
    let dropped_square = r_square;
    if (r_square.id.includes("original")) {
      const nodeCopy = r_square.cloneNode(true);
      nodeCopy.addEventListener("dragstart", dragstart_handler);
      nodeCopy.addEventListener("dragend", dragend_handler);
      nodeCopy.children[0].removeAttribute("hidden");
      dropped_square = nodeCopy;
    }
    dropped_square.id = new_id;
    drop_zone.appendChild(dropped_square);
    dropped_square.style.opacity = "";
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const reward_squares = document.getElementsByClassName("reward_square");
  const drop_zones = document.getElementsByClassName("drop_zone");
  Array.from(reward_squares).forEach((square) => {
    square.addEventListener("dragstart", dragstart_handler);
    square.addEventListener("dragend", dragend_handler);
  });
  Array.from(drop_zones).forEach((zone) => {
    zone.addEventListener("drop", drop_handler);
    zone.addEventListener("dragover", dragover_handler);
    zone.addEventListener("dragenter", dragenter_handler);
    zone.addEventListener("dragleave", dragleave_handler);
  });
});
