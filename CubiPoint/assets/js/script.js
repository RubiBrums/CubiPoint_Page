const contenedorCarrito = document.querySelector(".ItemsCarrito");
const valorTotal = document.getElementById("ValorTotal");
const botonesAgregar = document.querySelectorAll(".BotonAgregar");
const botonPagar = document.getElementById("BotonPagar");

const cart = new Map();

function addToCart(d) {
    if (cart.has(d.name)) cart.get(d.name).qty++;
    else cart.set(d.name, {...d, price: +d.price, qty: 1 });
    renderCart();
}

function changeQty(name, d) {
    if (!cart.has(name)) return;
    cart.get(name).qty += d;
    if (cart.get(name).qty <= 0) cart.delete(name);
    renderCart();
}

function getTotal() {
    let t = 0;
    cart.forEach(i => t += i.price * i.qty);
    return t;
}

function renderCart() {
    contenedorCarrito.innerHTML = "";
    cart.forEach(i => {
        contenedorCarrito.innerHTML += `
      <div class="ItemCarrito" data-name="${i.name}">
        <img src="${i.img}" width="80">
        <div>
          <span>${i.name}</span>
          <div>
            <button class="restar">-</button>
            <span>${i.qty}</span>
            <button class="sumar">+</button>
          </div>
          <p>${i.price * i.qty} CLP</p>
          <button class="eliminar">Eliminar</button>
        </div>
      </div>`;
    });
    valorTotal.textContent = `${getTotal()} CLP`;
}

botonesAgregar.forEach(b =>
    b.onclick = () => addToCart({ name: b.dataset.name, price: b.dataset.price, img: b.dataset.img })
);

contenedorCarrito.onclick = e => {
    const div = e.target.closest(".ItemCarrito");
    if (!div) return;
    const name = div.dataset.name;
    if (e.target.classList.contains("sumar")) changeQty(name, 1);
    if (e.target.classList.contains("restar")) changeQty(name, -1);
    if (e.target.classList.contains("eliminar")) {
        cart.delete(name);
        renderCart();
    }
};

botonPagar.onclick = () => {
    if (!cart.size) alert("Tu carrito está vacío.");
    else alert("Muchas gracias por su compra!");
};

renderCart();