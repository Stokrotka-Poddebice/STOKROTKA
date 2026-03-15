// --- 1. BAZA DANYCH PRODUKTÓW ---
const produkty = {
    'letnie-harmonie': {
        nazwa: 'Bukiet "Letnie Harmonie"',
        cena: 210,
        opis: 'Romantyczna kompozycja różowych goździków i eukaliptusa. Idealna na każdą okazję.',
        img: 'assets/bukiet1.jpg'
    },
    'dziki-ogrod': {
        nazwa: 'Kompozycja "Dziki Ogród"',
        cena: 180,
        opis: 'Naturalny bukiet z rumiankiem w szklanym wazonie, przywołujący wspomnienie lata.',
        img: 'assets/bukiet2.jpg'
    },
    'alokazja': {
        nazwa: 'Roślina "Alokazja"',
        cena: 110,
        opis: 'Egzotyczna roślina doniczkowa o głębokich zielonych liściach. Wyjątkowa ozdoba wnętrza.',
        img: 'assets/bukiet3.jpg'
    }
};

// --- 2. LOGIKA KOSZYKA ---
let cart = JSON.parse(localStorage.getItem('stokrotkaCart')) || [];

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    // Aktualizacja licznika
    cartCount.innerText = cart.length;
    
    // Czyszczenie listy
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nazwa} - ${item.cena} PLN <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">[x]</button>`;
        cartList.appendChild(li);
        total += item.cena;
    });

    cartTotal.innerText = total;
    localStorage.setItem('stokrotkaCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const produkt = produkty[productId];
    if (produkt) {
        cart.push(produkt);
        updateCartUI();
        // Opcjonalnie: otwórz koszyk po dodaniu
        document.getElementById('cart-dropdown').classList.remove('hidden');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// --- 3. OBSŁUGA GALERII (LIGHTBOX) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

document.querySelectorAll('.gallery-item').forEach(image => {
    image.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = image.src;
        captionText.innerHTML = image.alt;
    });
});

document.querySelector('.close-lightbox')?.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// --- 4. INICJALIZACJA I EVENTY ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Toggle koszyka
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    cartButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDropdown.classList.toggle('hidden');
    });

    // Zamykanie koszyka po kliknięciu poza nim
    window.addEventListener('click', () => {
        cartDropdown.classList.add('hidden');
    });

    cartDropdown.addEventListener('click', (e) => e.stopPropagation());

    // Podpięcie przycisków "Dodaj do koszyka" na stronie głównej
    // Zakładamy, że przyciski są w tej samej kolejności co w HTML
    const addButtons = document.querySelectorAll('.btn-add');
    const productKeys = Object.keys(produkty);

    addButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            addToCart(productKeys[index]);
        });
    });
});