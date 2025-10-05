import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { X } from 'lucide-react';
import apiService from '../utils/api';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiService.gallery.getAllPublic();
        setGalleryItems(response.data || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Set sample data for demo
        setGalleryItems([
          { id: 1, title: 'Interior Cozy', image: null, description: 'Suasana interior yang nyaman' },
          { id: 2, title: 'Latte Art', image: null, description: 'Karya seni dalam secangkir kopi' },
          { id: 3, title: 'Coffee Beans', image: null, description: 'Biji kopi premium pilihan' },
          { id: 4, title: 'Outdoor Seating', image: null, description: 'Tempat duduk outdoor yang asri' },
          { id: 5, title: 'Barista Action', image: null, description: 'Barista sedang beraksi' },
          { id: 6, title: 'Morning Light', image: null, description: 'Suasana pagi yang hangat' },
          { id: 7, title: 'Coffee Culture', image: null, description: 'Budaya kopi Indonesia' },
          { id: 8, title: 'Friends Gathering', image: null, description: 'Berkumpul bersama teman' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const sampleImages = [
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg',
    'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg',
    'https://images.pexels.com/photos/977876/pexels-photo-977876.jpeg',
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  ];

  const openLightbox = (item, index) => {
    setSelectedImage({
      ...item,
      image: item.image ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${item.image}` : sampleImages[index % sampleImages.length]
    });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Function to create zigzag layout
  const createMasonryLayout = (items) => {
    const sections = [];
    
    for (let i = 0; i < items.length; i += 3) {
      const sectionItems = items.slice(i, i + 3);
      const sectionIndex = Math.floor(i / 3);
      const isEvenSection = sectionIndex % 2 === 0;
      
      if (isEvenSection) {
        // Section 1: 1 gambar di kiri (besar), 2 gambar di kanan (kecil)
        sections.push(
          <div key={`section-${sectionIndex}`} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Gambar besar di kiri */}
            {sectionItems[0] && (
              <div 
                className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                data-aos="fade-right"
                data-aos-delay={50}
                onClick={() => openLightbox(sectionItems[0], i)}
              >
                <div className="relative h-full">
                  <div 
                    className="h-full min-h-[400px] lg:min-h-[500px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${sectionItems[0].image 
                        ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[0].image}`
                        : sampleImages[i % sampleImages.length]
                      })`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="text-xl font-semibold mb-2">{sectionItems[0].title}</h3>
                      {sectionItems[0].description && (
                        <p className="text-sm text-gray-200">{sectionItems[0].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 2 gambar kecil di kanan */}
            <div className="grid grid-cols-1 gap-6">
              {sectionItems[1] && (
                <div 
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  data-aos="fade-left"
                  data-aos-delay={100}
                  onClick={() => openLightbox(sectionItems[1], i + 1)}
                >
                  <div className="relative">
                    <div 
                      className="h-[240px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${sectionItems[1].image 
                          ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[1].image}`
                          : sampleImages[(i + 1) % sampleImages.length]
                        })`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <h3 className="text-lg font-semibold mb-1">{sectionItems[1].title}</h3>
                        {sectionItems[1].description && (
                          <p className="text-sm text-gray-200">{sectionItems[1].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {sectionItems[2] && (
                <div 
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  data-aos="fade-left"
                  data-aos-delay={150}
                  onClick={() => openLightbox(sectionItems[2], i + 2)}
                >
                  <div className="relative">
                    <div 
                      className="h-[240px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${sectionItems[2].image 
                          ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[2].image}`
                          : sampleImages[(i + 2) % sampleImages.length]
                        })`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <h3 className="text-lg font-semibold mb-1">{sectionItems[2].title}</h3>
                        {sectionItems[2].description && (
                          <p className="text-sm text-gray-200">{sectionItems[2].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        // Section 2: 2 gambar di kiri (kecil), 1 gambar di kanan (besar)
        sections.push(
          <div key={`section-${sectionIndex}`} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 2 gambar kecil di kiri */}
            <div className="grid grid-cols-1 gap-6">
              {sectionItems[0] && (
                <div 
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  data-aos="fade-right"
                  data-aos-delay={50}
                  onClick={() => openLightbox(sectionItems[0], i)}
                >
                  <div className="relative">
                    <div 
                      className="h-[240px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${sectionItems[0].image 
                          ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[0].image}`
                          : sampleImages[i % sampleImages.length]
                        })`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <h3 className="text-lg font-semibold mb-1">{sectionItems[0].title}</h3>
                        {sectionItems[0].description && (
                          <p className="text-sm text-gray-200">{sectionItems[0].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {sectionItems[1] && (
                <div 
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  data-aos="fade-right"
                  data-aos-delay={100}
                  onClick={() => openLightbox(sectionItems[1], i + 1)}
                >
                  <div className="relative">
                    <div 
                      className="h-[240px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${sectionItems[1].image 
                          ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[1].image}`
                          : sampleImages[(i + 1) % sampleImages.length]
                        })`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <h3 className="text-lg font-semibold mb-1">{sectionItems[1].title}</h3>
                        {sectionItems[1].description && (
                          <p className="text-sm text-gray-200">{sectionItems[1].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Gambar besar di kanan */}
            {sectionItems[2] && (
              <div 
                className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                data-aos="fade-left"
                data-aos-delay={150}
                onClick={() => openLightbox(sectionItems[2], i + 2)}
              >
                <div className="relative h-full">
                  <div 
                    className="h-full min-h-[400px] lg:min-h-[500px] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${sectionItems[2].image 
                        ? `https://api-inventory.isavralabel.com/bhumi-coffee/uploads/${sectionItems[2].image}`
                        : sampleImages[(i + 2) % sampleImages.length]
                      })`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="text-xl font-semibold mb-2">{sectionItems[2].title}</h3>
                      {sectionItems[2].description && (
                        <p className="text-sm text-gray-200">{sectionItems[2].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    
    return sections;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Memuat galeri...</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Galeri Bhumi Samarinda</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Galeri foto Bhumi Coffee menghadirkan potret suasana hangat dan momen berkesan yang tercipta di setiap sudut kafe.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {createMasonryLayout(galleryItems)}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-200">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;