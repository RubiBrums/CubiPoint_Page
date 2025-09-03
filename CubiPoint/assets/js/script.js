valor = 3500
valor2 = 2500
valor3 = 4500


precioSpan = document.querySelector(".precioInicial")
precioSpan.innerHTML = valor 

function sumarPrecio(){
    veces = document.querySelector('.cantidad')
    sumar = Number(veces.innerHTML)
    sumar = sumar + 1
    veces.innerHTML = sumar
    document.querySelector('.valorTotal').innerHTML = sumar * valor
}


function restarPrecio(){
    veces = document.querySelector('.cantidad')
    restar = Number(veces.innerHTML)
    if(restar > 0){
        restar = restar - 1
        veces.innerHTML = restar
        document.querySelector('.valorTotal').innerHTML = restar * valor
    }
    
}

