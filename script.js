function formatRupiah(angka, prefix) {
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
        split    = number_string.split(','),
        sisa     = split[0].length % 3,
        rupiah   = split[0].substr(0, sisa),
        ribuan   = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang diinput sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}

function hitungInvestasi() {
    const modalAwal = parseFloat(document.getElementById('modalAwal').value);
    const bunga = parseFloat(document.getElementById('bunga').value) / 100; // Ubah ke desimal
    const periode = parseFloat(document.getElementById('periode').value);

    // Validasi input
    if (isNaN(modalAwal) || isNaN(bunga) || isNaN(periode) || modalAwal < 0 || periode <= 0) {
        alert("Mohon masukkan angka yang valid untuk semua kolom.");
        return;
    }

    // Rumus Bunga Majemuk Sederhana Tahunan: A = P * (1 + r)^t
    // A = Nilai akhir
    // P = Modal awal
    // r = Tingkat bunga tahunan (desimal)
    // t = Jangka waktu (tahun)

    const nilaiAkhir = modalAwal * Math.pow((1 + bunga), periode);
    const keuntungan = nilaiAkhir - modalAwal;

    // Tampilkan hasil
    document.getElementById('hasilAkhir').textContent = formatRupiah(Math.round(nilaiAkhir), 'Rp ');
    document.getElementById('keuntungan').textContent = formatRupiah(Math.round(keuntungan), 'Rp ');
}
