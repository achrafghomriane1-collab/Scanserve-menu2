const MenuDatabase = {
    "ENTRÉES FROIDES": [
        { id: "ef1", name: "Salade César", price: 700 }, { id: "ef2", name: "Salade Variée", price: 600 },
        { id: "ef3", name: "Salade au Thon", price: 700 }, { id: "ef4", name: "Calamars Frits", price: 1500 },
        { id: "ef5", name: "Scampi De Crevettes", price: 1100 }
    ],
    "POULETS": [
        { id: "p1", name: "Escalope à La Créme", price: 1200, bestSeller: true },
        { id: "p2", name: "Vol Au Vent Sauce Pêcheur", price: 1400 }
    ],
    "GRILLADES": [
        { id: "g6", name: "Mixte Grillade", price: 4500, bestSeller: true }
    ],
    "PIZZAS": [
        { id: "pz11", name: "Pizza 4 Fromages", price: 1200 },
        { id: "pz12", name: "Pizza Fruits De Mer", price: 1400 }
    ],
    "DESSERTS & BOISSONS": [
        { id: "d1", name: "Tiramisu", price: 400 }, { id: "d8", name: "Café / Thé", price: 150 }
    ]
};

const AppState = {
    cart: JSON.parse(localStorage.getItem('cart')) || {},
    save() { localStorage.setItem('cart', JSON.stringify(this.cart)); },
    calculateTotal() { return Object.values(this.cart).reduce((s, i) => s + (i.price * i.qty), 0); }
};

function updateCart(name, price, change) {
    if (!AppState.cart[name]) AppState.cart[name] = { qty: 0, price: price };
    AppState.cart[name].qty += change;
    if (AppState.cart[name].qty <= 0) delete AppState.cart[name];
    AppState.save();
    renderUI();
}

function renderUI() {
    const app = document.getElementById('app');
    let html = "<h1>Istirahat El Kalitoussa</h1>";
    for (let cat in MenuDatabase) {
        html += `<h2>${cat}</h2>`;
        MenuDatabase[cat].forEach(i => {
            html += `<div class="menu-item"><span>${i.name} ${i.bestSeller?'<span class="best-seller">TOP</span>':''}</span>
            <button onclick="updateCart('${i.name}', ${i.price}, 1)">+</button></div>`;
        });
    }
    app.innerHTML = html;
    document.getElementById('total-price').innerText = AppState.calculateTotal();
    document.getElementById('cart-footer').classList.toggle('hidden', AppState.calculateTotal() === 0);
}

function showCartModal() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = "<h3>Votre Panier</h3>" + Object.entries(AppState.cart).map(([n, i]) => `
        <div style="margin-bottom:10px;">${n} (x${i.qty}) - ${i.price * i.qty} da</div>
    `).join('');
    document.getElementById('modal-footer').innerText = "Total: " + AppState.calculateTotal() + " da";
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCartModal() { document.getElementById('cart-modal').classList.add('hidden'); }

function sendOrder() {
    alert("Commande envoyée avec succès !");
    AppState.cart = {};
    AppState.save();
    closeCartModal();
    renderUI();
}

window.onload = renderUI;
