import { useState } from "react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Building2, Microscope, Thermometer, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSectionImages } from "@/hooks/useSectionImages";

// Import fallback facility images
import patientRooms from "@/assets/facilities/patient-rooms.jpg";
import procedureRoom from "@/assets/facilities/procedure-room.jpg";
import patientExamination from "@/assets/facilities/patient-examination.jpg";
import labEquipment from "@/assets/facilities/lab-equipment.jpg";
import labEquipment2 from "@/assets/facilities/lab-equipment-2.jpg";
import labEquipment3 from "@/assets/facilities/lab-equipment-3.jpg";
import ipPharmacyStorage from "@/assets/facilities/ip-pharmacy-storage.jpg";
import freezer70 from "@/assets/facilities/freezer-70.jpg";
import labKitsStorage from "@/assets/facilities/lab-kits-storage.jpg";
import vitalSigns from "@/assets/facilities/vital-signs.jpg";
import ecgEquipment from "@/assets/facilities/ecg-equipment.jpg";
import examinationEquipment from "@/assets/facilities/examination-equipment.jpg";

const FacilitiesShowcase = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { content } = useSiteContent("whyus", "facilities_showcase");
  const { getImageUrl } = useSectionImages("whyus", "facilities_showcase");

  const facilityCategories = [
    {
      id: "clinical",
      icon: Building2,
      title: "Clinical Rooms",
      description: "Dedicated examination and patient care rooms",
      images: [
        getImageUrl("showcase_image1", patientRooms),
        getImageUrl("showcase_image2", procedureRoom),
        getImageUrl("showcase_image3", patientExamination),
      ],
    },
    {
      id: "laboratory",
      icon: Microscope,
      title: "Laboratory",
      description: "Fully equipped research laboratory",
      images: [
        getImageUrl("showcase_image4", labEquipment),
        getImageUrl("showcase_image5", labEquipment2),
        getImageUrl("showcase_image6", labEquipment3),
      ],
    },
    {
      id: "storage",
      icon: Thermometer,
      title: "Storage Systems",
      description: "Temperature-controlled storage systems",
      images: [
        getImageUrl("showcase_image7", ipPharmacyStorage),
        getImageUrl("showcase_image8", freezer70),
        getImageUrl("showcase_image9", labKitsStorage),
      ],
    },
    {
      id: "equipment",
      icon: Shield,
      title: "Medical Equipment",
      description: "State-of-the-art diagnostic equipment",
      images: [
        getImageUrl("showcase_image10", vitalSigns),
        getImageUrl("showcase_image11", ecgEquipment),
        getImageUrl("showcase_image12", examinationEquipment),
      ],
    },
  ];

  const currentCategory = facilityCategories[activeCategory];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentCategory.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentCategory.images.length - 1 : prev - 1
    );
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setCurrentImageIndex(0);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-crc-light-bg relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-4 md:mb-6">{content.tag || "Infrastructure"}</BrandTag>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.title || "World-Class"} <span className="text-primary">{content.title_highlight || "Research Facilities"}</span>
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {content.description || "Our clinical-grade infrastructure supports all phases of clinical research"}
          </p>
        </div>

        {/* Main Content */}
        <div className={`flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Category Selection - Mobile First */}
          <div className="order-2 lg:order-2 flex flex-col gap-3 lg:gap-4">
            {facilityCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                className={`flex items-center gap-3 lg:gap-4 p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left transition-all duration-300 ${
                  index === activeCategory 
                    ? 'bg-white shadow-lg border-2 border-primary/20' 
                    : 'bg-white/50 hover:bg-white border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  index === activeCategory ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <category.icon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm lg:text-lg mb-0.5 lg:mb-1">{category.title}</h4>
                  <p className="text-muted-foreground text-xs lg:text-sm line-clamp-1">{category.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Image Showcase */}
          <div className="order-1 lg:order-1 relative group">
            <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-muted">
              <img
                src={currentCategory.images[currentImageIndex]}
                alt={currentCategory.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Navigation Arrows - Always visible on mobile */}
              <button
                onClick={prevImage}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {currentCategory.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesShowcase;
