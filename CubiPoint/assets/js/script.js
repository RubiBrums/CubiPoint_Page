const carritoItems = document.querySelector(".ItemsCarrito");
const total = document.getElementById("ValorTotal");
const agregar = document.querySelectorAll(".BotonAgregar");
const pagar = document.getElementById("BotonPagar");
const carrito = new Map();

function anadir(item) {
    carrito.has(item.name) ?
        carrito.get(item.name).cantidad++
        :
        carrito.set(item.name, {...item, price: +item.price, cantidad: 1 });
    render();
}

function cantidad(numero, item) {
    if (!carrito.has(numero)) return;
    carrito.get(numero).cantidad += item;
    if (carrito.get(numero).cantidad <= 0) carrito.delete(numero);
    render();
}

function render() {
    carritoItems.innerHTML = "";
    carrito.forEach(item2 => {
        carritoItems.innerHTML += `
      <article class="ItemCarrito" data-name="${item2.name}">
        <img src="${item2.img}" width="80">
        <section>
          <span>${item2.name}</span>
          <section class="Controles">
            <button class="restar">-</button>
            <span>${item2.cantidad}</span>
            <button class="sumar">+</button>
          </section>
          <p>${item2.price} CLP</p>
          <button class="eliminar">Eliminar</button>
        </section>
      </article>`;
    });
    total.textContent = [...carrito.values()].reduce((cantidad, item2) => cantidad + item2.price * item2.cantidad, 0) + " CLP";
}

agregar.forEach(clic =>
    clic.onclick = () => anadir({ name: clic.dataset.name, price: clic.dataset.price, img: clic.dataset.img })
);

carritoItems.onclick = operacion => {
    const item = operacion.target.closest(".ItemCarrito");
    if (!item) return;
    const numero = item.dataset.name;
    if (operacion.target.classList.contains("sumar")) cantidad(numero, 1);
    if (operacion.target.classList.contains("restar")) cantidad(numero, -1);
    if (operacion.target.classList.contains("eliminar")) {
        carrito.delete(numero);
        render();
    }
};

pagar.onclick = () => alert(carrito.size ? "¡Muchas gracias por su compra!" : "Tu carrito está vacío.");

render();