// --- 1. BAZA DANYCH PRODUKTÓW ---
// Klucze muszą pasować do ID używanych w przyciskach/linkach
const produkty = {
    'letnie-harmonie': {
        nazwa: 'Bukiet "Letnie Harmonie"',
        cena: 210
    },
    'dziki-ogrod': {
        nazwa: 'Kompozycja "Dziki Ogród"',
        cena: 180
    },
    'rosina-alokazja': { // Poprawiono klucz, by pasował do HTML
        nazwa: 'Roślina "Alokazja"',
        cena: 110
    }
};

// --- 2. LOGIKA KOSZYKA ---
let cart = JSON.parse(localStorage.getItem('stokrotkaCart')) || [];

function updateCartUI() {
    // Dopasowano ID do tych z Twojego HTML (index.html)
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-items'); // Było cart-items-list
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartCount || !cartList || !cartTotal) return;

    cartCount.innerText = cart.length;
    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<li style="text-align:center; color:#999; padding:10px;">Koszyk jest pusty</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.cssText = "display:flex; justify-content:space-between; margin-bottom:10px;";
            li.innerHTML = `
                <span>${item.nazwa}</span>
                <span>
                    <strong>${item.cena} PLN</strong>
                    <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer; margin-left:10px;">✕</button>
                </span>
            `;
            cartList.appendChild(li);
            total += item.cena;
        });
    }

    cartTotal.innerText = total;
    localStorage.setItem('stokrotkaCart', JSON.stringify(cart));
}

// Funkcja wywoływana bezpośrednio z przycisków w HTML
window.addToCartDirect = function(name, price) {
    cart.push({ nazwa: name, cena: price });
    updateCartUI();
    // Otwórz koszyk, żeby pokazać, że dodano produkt
    document.getElementById('cart').classList.add('active');
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// --- 3. OBSŁUGA GALERII (LIGHTBOX) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

document.querySelectorAll('.gallery-item').forEach(image => {
    image.addEventListener('click', () => {
        if(lightbox) {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
            captionText.innerHTML = image.alt;
        }
    });
});

document.querySelector('.close-lightbox')?.addEventListener('click', () => {
    if(lightbox) lightbox.style.display = 'none';
});

// --- 4. INICJALIZACJA I EVENTY ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart'); // Poprawiono z cart-dropdown na cart
    
    if (cartButton && cartDropdown) {
        cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            cartDropdown.classList.toggle('active'); // Zmieniono z hidden na active
        });

        // Zamykanie koszyka po kliknięciu poza nim
        window.addEventListener('click', () => {
            cartDropdown.classList.remove('active');
        });

        cartDropdown.addEventListener('click', (e) => e.stopPropagation());
    }
});