import { ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8">
      {/* Announcement Header */}
      <div className="mb-6 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
          Pengumuman Penerimaan Mahasiswa Baru 2025
        </h1>
        <a 
          href="#" 
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline md:text-base"
        >
          Daftar Sekarang
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Article Content */}
      <article className="space-y-6">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
            Selamat Datang di Portal SPMB UNSOED
          </h2>
          <p className="leading-relaxed text-foreground">
            Universitas Jenderal Soedirman (UNSOED) membuka kesempatan bagi calon mahasiswa baru 
            untuk bergabung di tahun akademik 2025/2026. Kami menyediakan berbagai program studi 
            berkualitas dengan fasilitas pembelajaran yang modern dan tenaga pengajar yang berpengalaman.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">
            Jalur Penerimaan
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h4 className="mb-2 font-semibold text-foreground">SNBP (Seleksi Nasional Berdasarkan Prestasi)</h4>
              <p className="text-sm text-muted-foreground">
                Jalur seleksi berdasarkan prestasi akademik siswa selama di sekolah menengah atas.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h4 className="mb-2 font-semibold text-foreground">SNBT (Seleksi Nasional Berdasarkan Tes)</h4>
              <p className="text-sm text-muted-foreground">
                Jalur seleksi melalui tes tertulis berbasis komputer yang diselenggarakan secara nasional.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h4 className="mb-2 font-semibold text-foreground">Mandiri</h4>
              <p className="text-sm text-muted-foreground">
                Jalur seleksi yang diselenggarakan secara mandiri oleh UNSOED dengan berbagai pilihan program studi.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">
            Informasi Penting
          </h3>
          <ul className="list-inside list-disc space-y-2 text-foreground">
            <li>Pendaftaran dibuka mulai tanggal 1 Februari 2025</li>
            <li>Pastikan dokumen persyaratan telah disiapkan dengan lengkap</li>
            <li>Informasi biaya pendidikan dapat dilihat pada menu Biaya Pendidikan</li>
            <li>Untuk pertanyaan lebih lanjut, silakan hubungi tim Bantuan kami</li>
          </ul>
        </section>

        <section className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
          <p className="text-sm font-medium text-foreground">
            <strong>Catatan:</strong> Semua informasi yang tercantum dalam portal ini dapat berubah 
            sewaktu-waktu. Silakan pantau portal ini secara berkala untuk mendapatkan informasi terbaru.
          </p>
        </section>
      </article>
    </div>
  );
};

export default Index;
