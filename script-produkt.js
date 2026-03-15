// 1. Pobierz ID z adresu (np. z ?id=letnie-harmonie)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// 2. Znajdź dane produktu w naszej bazie
const produkt = produkty[productId];

if (produkt) {
    // 3. Wstaw dane do HTML
    document.getElementById('dynamic-name').innerText = produkt.nazwa;
    document.getElementById('dynamic-price').innerText = produkt.cena;
    document.getElementById('dynamic-desc').innerText = produkt.opis;
    document.getElementById('dynamic-img').src = produkt.img;
} else {
    // Jeśli produkt nie istnieje (np. błąd w URL)
    document.querySelector('.product-container').innerHTML = "<h1>Produkt nie odnaleziony</h1>";
}