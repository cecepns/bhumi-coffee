import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle, Phone, MapPin, Clock, Users, Award, Heart } from 'lucide-react';
import apiService from '../utils/api';
import AboutUs from '../assets/AboutUs.jpg';

const ReservationPage = () => {
  const [settings, setSettings] = useState({
    phone: '+62 XXX-XXXX-XXXX',
    address: 'Jl. Pemuda 2 No.84, Temindung Permai, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75119'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await apiService.settings.get();
      setSettings({
        phone: response.data.phone || '+62 XXX-XXXX-XXXX',
        address: response.data.address || 'Jl. Pemuda 2 No.84, Temindung Permai, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75119'
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const createWhatsAppUrl = (phoneNumber) => {
    if (!phoneNumber) return '#';
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const whatsappNumber = cleanedNumber.startsWith('62') ? cleanedNumber : `62${cleanedNumber}`;
    return `https://wa.me/${whatsappNumber}`;
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = createWhatsAppUrl(settings.phone);
    if (whatsappUrl !== '#') {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-44 pb-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Bhumi Samarinda</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Dedikasi Bhumi Samarinda adalah menghadirkan kopi berkualitas premium dengan suasana alami dan nyaman bagi setiap pecinta kopi
            </p>
          </div>
        </div>
      </section>

      {/* Owner Profile Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div 
                className="rounded-2xl w-full h-96 bg-cover bg-no-repeat bg-center shadow-lg"
                style={{
                  backgroundImage: `url(https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg)`
                }}
              ></div>
            </div>
            
            <div data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Profil Owner
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Sebagai pendiri Bhumi Samarinda, passion saya terhadap kopi dimulai dari kecintaan terhadap 
                  cita rasa autentik kopi Indonesia yang kaya akan karakter dan aroma yang unik.
                </p>
                <p>
                  Dengan pengalaman bertahun-tahun dalam dunia kopi, saya berkomitmen untuk menghadirkan 
                  pengalaman ngopi yang tak terlupakan bagi setiap pelanggan yang mengunjungi Bhumi Samarinda.
                </p>
                <p>
                  Visi saya adalah menjadikan Bhumi Samarinda sebagai tempat di mana setiap pecinta kopi 
                  dapat menikmati kualitas premium dalam suasana yang hangat dan nyaman, layaknya berada di rumah sendiri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tentang Kami
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Bhumi Samarinda lahir dari kecintaan terhadap kopi Indonesia dan keinginan untuk menciptakan ruang yang nyaman bagi para pecinta kopi. Berlokasi di jantung kota Samarinda, kami hadir dengan konsep yang menggabungkan kualitas premium dengan suasana alami.
                </p>
                <p>
                  Kami percaya bahwa kopi bukan hanya sekadar minuman, tetapi juga pengalaman yang dapat menghubungkan orang-orang dari berbagai latar belakang. Setiap cangkir kopi yang kami sajikan adalah hasil dari seleksi biji kopi terbaik dan proses penyeduhan yang teliti.
                </p>
                <p>
                  Dengan suasana yang hangat dan ramah, Bhumi Samarinda menjadi tempat yang sempurna untuk berkumpul dengan teman, bekerja, atau sekadar menikmati momen tenang sambil menyeruput kopi favorit Anda.
                </p>
              </div>
            </div>
            
            <div 
              className="rounded-2xl w-full h-96 bg-cover bg-no-repeat bg-center shadow-lg"
              style={{
                backgroundImage: `url(${AboutUs})`
              }}
              data-aos="fade-left"
            ></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prinsip dan nilai yang menjadi fondasi dalam setiap pelayanan dan produk yang kami tawarkan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Keunggulan Rasa</h3>
              <p className="text-gray-600">
                Kami tidak pernah berkompromi dengan kualitas rasa. Setiap biji kopi dipilih dengan standar terbaik, diolah secara hati-hati, dan disajikan dengan penuh ketelitian untuk menghadirkan pengalaman ngopi yang otentik.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Pelayanan Tulus</h3>
              <p className="text-gray-600">
                Kami percaya bahwa setiap pelanggan adalah bagian dari keluarga Bhumi Coffee. Karena itu, kami selalu berusaha memberikan pelayanan yang ramah, hangat, dan penuh perhatian, sehingga setiap kunjungan meninggalkan kesan mendalam.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Keaslian & Transparansi</h3>
              <p className="text-gray-600">
                Setiap sajian kopi yang kami berikan adalah cerminan keaslian. Mulai dari biji kopi pilihan hingga cara penyajiannya, kami menjunjung tinggi kejujuran dan keterbukaan untuk menjaga kepercayaan pelanggan.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Kenyamanan Suasana</h3>
              <p className="text-gray-600">
                Bhumi Coffee bukan hanya tentang kopi, tetapi juga ruang yang tenang, alami, dan nyaman. Kami ingin setiap pengunjung merasa betah, seolah sedang berada di ruang yang menyatu dengan alam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hubungi Kami
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Ingin melakukan reservasi atau memiliki pertanyaan? Hubungi kami melalui WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <div className="flex items-start">
                <MapPin size={24} className="mt-1 mr-4 text-green-300 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                  <p className="text-green-100">{settings.address}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={24} className="mr-4 text-green-300 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Telepon</h3>
                  <p className="text-green-100">{settings.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={24} className="mr-4 text-green-300 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Jam Operasional</h3>
                  <div className="text-green-100 space-y-1">
                    <p>Sesi Pagi (Slow Bar): 05:00 - 09:00</p>
                    <p>Senin - Jumat: 16:00 - 00:00</p>
                    <p>Sabtu - Minggu: 16:00 - 01:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <MessageCircle size={64} className="mx-auto mb-6 text-green-300" />
                <h3 className="text-2xl font-bold mb-4">Reservasi via WhatsApp</h3>
                <p className="text-green-100 mb-6">
                  Untuk melakukan reservasi atau mendapatkan informasi lebih lanjut, 
                  silakan hubungi kami langsung melalui WhatsApp
                </p>
                <button
                  onClick={handleWhatsAppContact}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-200 flex items-center mx-auto"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReservationPage;