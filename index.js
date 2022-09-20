
/** 1. Buscar 5 elementos por id. El script debe estar debajo de todos estos elementos en el html. */
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

/** Creas un arreglo para los items del carrito */
let carrito = []

/** Cuando la pagina se cargue */
document.addEventListener('DOMContentLoaded', () => {
    /** Buscas si hay items guardados en el navegador */
    if (localStorage.getItem('carrito')) {
        /** Y agregas los items guardados al carrito */
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

/** Cuando se hace click en botonVaciar, borras el carrito */
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

/** Para cada producto de la lista
 * Nota: los productos se crean en stock.js
*/
stockProductos.forEach((producto) => {

    /** Borras de nuevo el carrito al apretar el boton borrar.
     * Esto no sirve para nada, con hacerlo una vez arriba alcanza...
     */
    botonVaciar.addEventListener('click', () => {
        carrito.length = 0
        actualizarCarrito()
    })

    /** Agregas el item al html,
     * va a ser un div con clase 'producto', con imagen, titulo, descripcion,
     * talle, precio y un boton para agregarlo al carrito */
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `

    /** Los productos se agregan como hijos del elemento con id 'contenedor-producto' en el html */
    contenedorProductos.appendChild(div)

    /** Buscas el boton de este producto */
    const boton = document.getElementById(`agregar${producto.id}`)

    /** Agregas el producto al carrito cuando se aprieta el boton */
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else { }
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
            <p>${prod.nombre}</p>
            <p>Precio:$${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
actualizarCarrito() 