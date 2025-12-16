import BrandTag from "./BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Import new facility images
import labEquipment1 from "@/assets/facilities/lab-equipment-1.jpg";
import examinationEquipment1 from "@/assets/facilities/examination-equipment-1.jpg";
import patientCareNew from "@/assets/facilities/patient-care-new.jpg";
import emergencyTrolley from "@/assets/facilities/emergency-trolley.jpg";
import patientRooms from "@/assets/facilities/patient-rooms.jpg";
import ipPharmacyStorage from "@/assets/facilities/ip-pharmacy-storage.jpg";
import freezer70 from "@/assets/facilities/freezer-70.jpg";
import labKitsStorage from "@/assets/facilities/lab-kits-storage.jpg";
import labEquipment2 from "@/assets/facilities/lab-equipment-2.jpg";
import vitalSigns from "@/assets/facilities/vital-signs.jpg";
import labEquipment3 from "@/assets/facilities/lab-equipment-3.jpg";
import patientProcedureRoom from "@/assets/facilities/patient-procedure-room.jpg";
import coordinatorsOffices from "@/assets/facilities/coordinators-offices.jpg";
import ecgEquipment from "@/assets/facilities/ecg-equipment.jpg";
import examinationRoom from "@/assets/facilities/examination-room.jpg";

const facilities = [
  {
    image: patientProcedureRoom,
    title: "Patient Procedure Room",
    description: "Modern examination and procedure rooms"
  },
  {
    image: patientRooms,
    title: "Patient Rooms",
    description: "Comfortable patient care areas"
  },
  {
    image: examinationRoom,
    title: "Examination Room",
    description: "Dedicated patient assessment areas"
  },
  {
    image: labEquipment1,
    title: "Laboratory Equipment",
    description: "Advanced centrifuge systems"
  },
  {
    image: labEquipment2,
    title: "Lab Processing",
    description: "Sample processing equipment"
  },
  {
    image: labEquipment3,
    title: "Centrifuge Systems",
    description: "Calibrated laboratory instruments"
  },
  {
    image: ipPharmacyStorage,
    title: "IP & Pharmacy Storage",
    description: "Temperature-controlled medication storage"
  },
  {
    image: freezer70,
    title: "-70°C Freezer",
    description: "Ultra-low temperature sample storage"
  },
  {
    image: vitalSigns,
    title: "Vital Signs Monitor",
    description: "Patient monitoring equipment"
  },
  {
    image: ecgEquipment,
    title: "ECG Equipment",
    description: "Cardiac monitoring devices"
  },
  {
    image: coordinatorsOffices,
    title: "Coordinators Office",
    description: "Study coordination workspace"
  },
  {
    image: labKitsStorage,
    title: "Lab Kits Storage",
    description: "Organized clinical supplies"
  }
];

const FacilitiesGallerySection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-6">Our Facilities</BrandTag>
          </div>
          <h2 
            className={`text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Research Environment
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            State-of-the-art facilities designed to support high-quality clinical research
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                loading="lazy"
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
