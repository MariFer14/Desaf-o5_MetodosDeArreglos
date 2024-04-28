const tareas = [
  { id: 1, descripcion: "Arreglar la habitación", realizada: false },
  { id: 2, descripcion: "Pasear al perro", realizada: false },
  { id: 3, descripcion: "Hacer las compras", realizada: true },
];

let html = "";

const listaTareas = document.querySelector("#lista-tarea");

for (const iterator of tareas) {
  html += `<li data-id="${iterator.id}" ${
    iterator.realizada ? 'class="realizada"' : ""
  }>${iterator.descripcion}<button class="delete">Eliminar</button></li>`;
}

listaTareas.innerHTML = html;

contadores();

document.querySelector("#form-tarea").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaTarea = document.querySelector("#nueva-tarea").value;

  if (nuevaTarea === "") {
    alert("Complete el campo");
    return;
  }

  const li = document.createElement("li");
  const tareaId = Date.now();
  li.setAttribute("data-id", tareaId);
  li.textContent = `${nuevaTarea}`;
  listaTareas.appendChild(li);

  const tarea = { id: tareaId, descripcion: nuevaTarea, realizada: false };
  tareas.push(tarea);

  const deleteButton = createDeleteButton();
  li.appendChild(deleteButton);

  contadores();

  document.querySelector("#nueva-tarea").value = "";
});

listaTareas.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const tareaId = parseInt(e.target.dataset.id);
    const tarea = tareas.find((t) => t.id === tareaId);
    if (tarea) {
      tarea.realizada = !tarea.realizada;
      e.target.classList.toggle("realizada", tarea.realizada);
      contadores();
    }
  } else if (e.target.classList.contains("delete")) {
    const li = e.target.parentNode;
    const tareaId = parseInt(li.getAttribute("data-id"));
    const index = tareas.findIndex((t) => t.id === tareaId);
    if (index !== -1) {
      tareas.splice(index, 1);
      li.remove();
      contadores();
    }
  }
});

function contadores() {
  const totalTareas = tareas.length;
  const totalRealizadas = tareas.filter((t) => t.realizada).length;
  document.querySelector("#total-tareas").textContent = totalTareas;
  document.querySelector("#tareas-realizadas").textContent = totalRealizadas;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete");
  deleteButton.onclick = (e) => {
    const li = e.target.parentNode;
    const tareaId = parseInt(li.getAttribute("data-id"));
    const index = tareas.findIndex((t) => t.id === tareaId);
    if (index !== -1) {
      tareas.splice(index, 1);
      li.remove();
      contadores();
    }
  };
  return deleteButton;
}
