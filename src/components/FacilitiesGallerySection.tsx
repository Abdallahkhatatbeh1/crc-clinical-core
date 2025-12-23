import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSectionImages } from "@/hooks/useSectionImages";

// Import fallback facility images
import patientRooms from "@/assets/facilities/patient-rooms.jpg";
import labEquipment from "@/assets/facilities/lab-equipment.jpg";
import ipPharmacyStorage from "@/assets/facilities/ip-pharmacy-storage.jpg";
import examinationRoom from "@/assets/facilities/examination-room.jpg";
import vitalSigns from "@/assets/facilities/vital-signs.jpg";
import coordinatorsOffices from "@/assets/facilities/coordinators-offices.jpg";

const fallbackImages = [
  patientRooms,
  labEquipment,
  ipPharmacyStorage,
  examinationRoom,
  vitalSigns,
  coordinatorsOffices
];

const FacilitiesGallerySection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { content } = useSiteContent("home", "facilities");
  const { images, getImageUrl } = useSectionImages("home", "facilities");

  const facilities = [
    {
      image: getImageUrl("facility1_image", fallbackImages[0]),
      title: content.facility1_title || "Patient Rooms",
      description: content.facility1_description || "Dedicated patient care and procedure rooms"
    },
    {
      image: getImageUrl("facility2_image", fallbackImages[1]),
      title: content.facility2_title || "Lab Equipment",
      description: content.facility2_description || "Calibrated laboratory instruments"
    },
    {
      image: getImageUrl("facility3_image", fallbackImages[2]),
      title: content.facility3_title || "IP & Pharmacy Storage",
      description: content.facility3_description || "Secure investigational product storage"
    },
    {
      image: getImageUrl("facility4_image", fallbackImages[3]),
      title: content.facility4_title || "Examination Room",
      description: content.facility4_description || "Modern patient assessment areas"
    },
    {
      image: getImageUrl("facility5_image", fallbackImages[4]),
      title: content.facility5_title || "Vital Signs Monitor",
      description: content.facility5_description || "Advanced patient monitoring systems"
    },
    {
      image: getImageUrl("facility6_image", fallbackImages[5]),
      title: content.facility6_title || "Coordinators Offices",
      description: content.facility6_description || "Dedicated workspace for research coordinators"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">{content.tag || "Our Facilities"}</BrandTag>
          </div>
          <h2 
            className={`text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.title || "Our Research Environment"}
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.subtitle || "State-of-the-art facilities designed to support high-quality clinical research"}
          </p>
        </div>

        {/* Gallery Grid - 6 images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((facility, index) => (
            <div
              key={facility.title}
              className={`group relative overflow-hidden rounded-xl aspect-square transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 75}ms` }}
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">{facility.title}</h4>
                  <p className="text-white/70 text-xs">{facility.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesGallerySection;
