// ========================================
// CART STORAGE
// ========================================

let cart = [];

// ========================================
// ADD TO CART
// ========================================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    alert(name + " added to cart!");
}

// ========================================
// VIEW CART
// ========================================

function goToCart() {

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;
    }

    let cartItems = "";

    let total = 0;

    cart.forEach((item, index) => {

        cartItems +=
            (index + 1) +
            ". " +
            item.name +
            " - ₹" +
            item.price +
            "\n";

        total += item.price;
    });

    const confirmOrder = confirm(

        "YOUR CART\n\n" +

        cartItems +

        "\nTotal = ₹" +
        total +

        "\n\nDo you want to place the order?"
    );

    if(confirmOrder){

        checkoutOrder(total);
    }
}

// ========================================
// CHECKOUT ORDER
// ========================================

async function checkoutOrder(total){

    try{

        // GET USER

        const userData =
            localStorage.getItem("user");

        if(!userData){

            alert("Please login first!");

            window.location.href =
                "login.html";

            return;
        }

        const user =
            JSON.parse(userData);

        // CREATE ORDER OBJECT

        const orderData = {

            customerName:
                user.name,

            customerEmail:
                user.email,

            customerPhone:
                user.phone || "9999999999",

            deliveryAddress:
                "Swad Ghar Ka Restaurant",

            items:
                JSON.stringify(cart),

            totalAmount:
                total,

            specialInstructions:
                "None"
        };

        console.log(orderData);

        // API CALL

        const response = await fetch(

            "http://localhost:9005/api/orders",

            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(orderData)
            }
        );

        const result =
            await response.json();

        console.log(result);

        // SUCCESS

        if(result.success){

            alert(
                "Order placed successfully!"
            );

            // CLEAR CART

            cart = [];

        } else {

            alert(result.message);
        }

    } catch(error){

        console.error(error);

        alert(
            "Failed to place order"
        );
    }
}