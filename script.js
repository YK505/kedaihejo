// Ganti dengan nomor WA asli, format internasional tanpa + atau spasi
const WA_NUMBER = '628xxxxxxxx';

const menuItems = [
  { nama: 'Nasi Ayam Geprek', kategori: 'Makanan', harga: 18000, best: true, desc: 'Ayam crispy geprek sambal bawang, nasi hangat, lalapan.', img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Nasi Goreng Teras', kategori: 'Makanan', harga: 20000, best: false, desc: 'Nasi goreng bumbu rumahan dengan telur dan kerupuk.', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Mie Goreng Spesial', kategori: 'Makanan', harga: 17000, best: false, desc: 'Mie goreng pedas gurih dengan sayur dan telur.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Es Kopi Susu Hejo', kategori: 'Minuman', harga: 15000, best: true, desc: 'Kopi susu gula aren, segar dan tidak terlalu manis.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Matcha Latte', kategori: 'Minuman', harga: 20000, best: false, desc: 'Matcha creamy dengan susu segar, disajikan dingin.', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Es Teh Lemon', kategori: 'Minuman', harga: 10000, best: false, desc: 'Teh dingin dengan perasan lemon segar.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Kentang Goreng', kategori: 'Makanan Ringan', harga: 14000, best: true, desc: 'Kentang goreng renyah dengan saus sambal dan mayones.', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Pisang Goreng Keju', kategori: 'Makanan Ringan', harga: 13000, best: false, desc: 'Pisang goreng hangat dengan taburan keju dan coklat.', img: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=600&q=80' },
  { nama: 'Roti Bakar Coklat', kategori: 'Makanan Ringan', harga: 12000, best: false, desc: 'Roti bakar tebal dengan isi coklat dan keju.', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80' }
];

const grid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

function buatLinkWA(pesan) {
  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(pesan);
}

function tampilkanMenu(kategori) {
  const data = kategori === 'Semua'
    ? menuItems
    : menuItems.filter(item => item.kategori === kategori);

  grid.innerHTML = data.map(item => {
    const pesan = `Halo Kedai Teras Hejo, saya mau pesan ${item.nama} (${formatRupiah(item.harga)}).`;
    const badge = item.best
      ? '<span class="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full">Best Seller</span>'
      : '';

    return `
      <div class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
        <div class="relative">
          <img src="${item.img}" alt="${item.nama}" class="w-full h-48 object-cover" loading="lazy">
          ${badge}
        </div>
        <div class="p-5 flex flex-col flex-1">
          <span class="text-xs text-emerald-600 font-medium">${item.kategori}</span>
          <h3 class="text-lg font-semibold mt-1">${item.nama}</h3>
          <p class="text-sm text-gray-500 mt-1 flex-1">${item.desc}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="font-bold text-emerald-700">${formatRupiah(item.harga)}</span>
            <a href="${buatLinkWA(pesan)}" target="_blank" rel="noopener" class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-full">Pesan via WA</a>
          </div>
        </div>
      </div>`;
  }).join('');
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tampilkanMenu(btn.dataset.cat);
  });
});

// Semua tombol/link umum diarahkan ke WA dengan pesan sapaan
document.querySelectorAll('[data-wa]').forEach(el => {
  el.href = buatLinkWA('Halo Kedai Teras Hejo, saya mau tanya-tanya dulu.');
  el.target = '_blank';
  el.rel = 'noopener';
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

document.getElementById('year').textContent = new Date().getFullYear();

tampilkanMenu('Semua');
