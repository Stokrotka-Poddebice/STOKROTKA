document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Zatrzymuje przeładowanie strony

        // Pobieranie wartości (możesz je później wysłać do API)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Stylizacja statusu "w trakcie"
        formStatus.style.color = "#6B8E63";
        formStatus.textContent = "Wysyłanie wiadomości...";

        // Symulacja wysyłki (np. do serwera)
        setTimeout(() => {
            formStatus.textContent = `Dziękujemy ${name}! Twoja wiadomość została wysłana pomyślnie.`;
            formStatus.style.color = "green";
            
            // Czyszczenie pól formularza
            contactForm.reset();
        }, 1500);
    });
});
// Znajdź elementy
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-lightbox');

// Obsługa kliknięcia w zdjęcie w galerii
document.querySelectorAll('.gallery-item').forEach(image => {
    image.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = image.src;
        captionText.innerHTML = image.alt;
    });
});

// Zamykanie po kliknięciu w "X"
closeBtn.onclick = () => {
    lightbox.style.display = 'none';
};

// Zamykanie po kliknięciu poza zdjęciem
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
};
let cart = JSON.parse(localStorage.getItem('stokrotka-cart')) || [];

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const count = document.getElementById('cart-count');
    const total = document.getElementById('cart-total');
    
    list.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `${item.name} - ${item.price} PLN <button onclick="removeItem(${index})">❌</button>`;
        list.appendChild(li);
        totalPrice += item.price;
    });

    count.innerText = cart.length;
    total.innerText = totalPrice;
    localStorage.setItem('stokrotka-cart', JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    alert('Dodano do koszyka!');
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Obsługa przycisków na stronie
document.querySelectorAll('.btn-add, .btn-main-large').forEach(btn => {
    btn.addEventListener('click', () => {
        // Pobieramy dane z karty produktu (uproszczone)
        const name = btn.parentElement.querySelector('h1, h3').innerText;
        const priceStr = btn.parentElement.querySelector('.price, .price-big').innerText;
        const price = parseInt(priceStr.replace(/[^\d]/g, ''));
        addToCart(name, price);
    });
});

// Pokazywanie koszyka
document.getElementById('cart-button').onclick = () => {
    document.getElementById('cart-dropdown').classList.toggle('hidden');
};

// Inicjalizacja przy starcie
updateCartUI();