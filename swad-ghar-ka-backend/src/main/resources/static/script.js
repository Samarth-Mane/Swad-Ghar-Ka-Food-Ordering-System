function flipCard(card) {
    card.classList.toggle('flipped');
}

// ======================================
// UPDATE QUANTITY
// ======================================

function updateQuantity(change, event) {

    event.stopPropagation();

    const quantitySpan =
        event.target.parentElement.querySelector(
            '.quantity-value'
        );

    let currentQty =
        parseInt(quantitySpan.innerText);

    let newQty =
        currentQty + change;

    if(newQty < 1){
        newQty = 1;
    }

    quantitySpan.innerText = newQty;
}

// ======================================
// GO TO CART
// ======================================

function goToCart(event) {

    event.stopPropagation();

    window.location.href =
        "orderdet.html";
}

// ======================================
// THALI FUNCTION
// ======================================

function thali() {

    const update =
        document.getElementById("thali-section");

    if(update){

        update.style.display = "block";

        update.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        console.log(
            "Thali section not found"
        );
    }
}