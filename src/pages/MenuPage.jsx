import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apiService from '../utils/api';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await apiService.menu.getAllPublic(200);
        setMenuItems(response.data || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
        // Set sample data for demo
        setMenuItems([
          { id: 1, name: 'Espresso', price: 25000, image: null, description: 'Single shot espresso dengan crema yang sempurna', category: 'coffee' },
          { id: 2, name: 'Cappuccino', price: 35000, image: null, description: 'Espresso dengan steamed milk dan milk foam', category: 'coffee' },
          { id: 3, name: 'Latte', price: 40000, image: null, description: 'Espresso dengan steamed milk yang lembut', category: 'coffee' },
          { id: 4, name: 'Americano', price: 30000, image: null, description: 'Espresso dengan air panas, rasa kopi murni', category: 'coffee' },
          { id: 5, name: 'Mocha', price: 45000, image: null, description: 'Perpaduan espresso, chocolate, dan steamed milk', category: 'coffee' },
          { id: 6, name: 'Macchiato', price: 38000, image: null, description: 'Espresso dengan sedikit steamed milk', category: 'coffee' },
          { id: 7, name: 'Ice Matcha Latte', price: 42000, image: null, description: 'Matcha latte dingin dengan es batu', category: 'non-coffee' },
          { id: 8, name: 'Fresh Orange Juice', price: 25000, image: null, description: 'Jus jeruk segar tanpa gula tambahan', category: 'non-coffee' },
          { id: 9, name: 'Green Tea', price: 20000, image: null, description: 'Teh hijau segar tanpa gula', category: 'non-coffee' },
          { id: 10, name: 'French Fries', price: 25000, image: null, description: 'Kentang goreng renyah dengan bumbu special', category: 'snack' },
          { id: 11, name: 'Nuggets', price: 35000, image: null, description: 'Chicken nuggets crispy dengan saus pilihan', category: 'snack' },
          { id: 12, name: 'Onion Rings', price: 30000, image: null, description: 'Bawang bombay goreng tepung yang renyah', category: 'snack' },
          { id: 13, name: 'Chocolate Cake', price: 35000, image: null, description: 'Kue coklat lembut dengan frosting krim', category: 'dessert' },
          { id: 14, name: 'Tiramisu', price: 40000, image: null, description: 'Dessert klasik Italia dengan rasa kopi', category: 'dessert' },
          { id: 15, name: 'Cheesecake', price: 38000, image: null, description: 'Kue keju lembut dengan topping buah segar', category: 'dessert' },
          { id: 16, name: 'Nasi Goreng Special', price: 55000, image: null, description: 'Nasi goreng dengan daging sapi dan telur', category: 'makanan-berat' },
          { id: 17, name: 'Mie Ayam', price: 45000, image: null, description: 'Mie ayam dengan pangsit dan bakso', category: 'makanan-berat' },
          { id: 18, name: 'Gado-gado', price: 40000, image: null, description: 'Sayuran segar dengan bumbu kacang khas', category: 'makanan-berat' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Menu' },
    { id: 'filter-coffee', name: 'Filter Coffee' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'signature', name: 'Signature' },
    { id: 'flavour', name: 'Flavour' },
    { id: 'snack', name: 'Snack' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'makanan-berat', name: 'Makanan Berat' },
  ];

  const filteredMenu = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMenuItems = filteredMenu.slice(startIndex, endIndex);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg',
    'https://images.pexels.com/photos/977876/pexels-photo-977876.jpeg',
    'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg',
    'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg',
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Memuat menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-44 pb-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Menu Bhumi Samarinda</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Hanya menyediakan kopi Full Arabica
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center" data-aos="fade-up">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {currentMenuItems.map((item, index) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/3 lg:w-1/4">
                    <div 
                      className="h-48 md:h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${item.image 
                          ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${item.image}`
                          : sampleImages[index % sampleImages.length]
                        })`
                      }}
                    ></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-2/3 lg:w-3/4 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{item.name}</h3>
                      
                      <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-2xl md:text-3xl font-bold text-primary">
                        Rp {item.price ? Math.floor(item.price).toLocaleString('id-ID').replace(/,/g, '.') : '0'}
                      </span>
                      {/* <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                        Pesan
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada menu dalam kategori ini.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2" data-aos="fade-up">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Sebelumnya
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current page
                  const shouldShow = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!shouldShow) {
                    // Show ellipsis for gaps
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
                }`}
              >
                Selanjutnya
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {filteredMenu.length > 0 && (
            <div className="text-center mt-6" data-aos="fade-up">
              <p className="text-gray-600">
                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredMenu.length)} dari {filteredMenu.length} menu
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Order Info */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-2xl p-8" data-aos="fade-up">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cara Memesan
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Kunjungi langsung toko kami atau hubungi untuk pemesanan takeaway. 
                Nikmati cita rasa kopi premium Bhumi Samarinda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/reservasi"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  Reservasi Meja
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default MenuPage;