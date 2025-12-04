import { useState } from "react";
import BrandTag from "@/components/BrandTag";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

// Import facility images
import examRoom1 from "@/assets/facilities/exam-room-1.jpg";
import ecgMachine from "@/assets/facilities/ecg-machine.jpg";
import ecgBedside from "@/assets/facilities/ecg-bedside.jpg";
import ultrasound from "@/assets/facilities/ultrasound.jpg";
import vitalsMonitor from "@/assets/facilities/vitals-monitor.jpg";
import centrifuge1 from "@/assets/facilities/centrifuge-1.jpg";
import centrifuge2 from "@/assets/facilities/centrifuge-2.jpg";
import ultraLowFreezer from "@/assets/facilities/ultra-low-freezer.jpg";
import sampleRefrigerators from "@/assets/facilities/sample-refrigerators.jpg";
import labRoom from "@/assets/facilities/lab-room.jpg";
import storageShelves from "@/assets/facilities/storage-shelves.jpg";
import patientCare from "@/assets/facilities/patient-care.jpg";

const galleryImages = [
  { src: patientCare, title: "Patient Care", category: "Clinical Care" },
  { src: examRoom1, title: "Examination Room", category: "Patient Rooms" },
  { src: ecgMachine, title: "ECG Machine", category: "Medical Equipment" },
  { src: ultrasound, title: "Ultrasound System", category: "Diagnostic" },
  { src: labRoom, title: "Laboratory", category: "Laboratory" },
  { src: sampleRefrigerators, title: "Sample Storage", category: "Storage" },
  { src: centrifuge1, title: "Centrifuge", category: "Laboratory" },
  { src: vitalsMonitor, title: "Vitals Monitor", category: "Monitoring" },
  { src: ultraLowFreezer, title: "Ultra-Low Freezer", category: "Storage" },
  { src: ecgBedside, title: "Bedside ECG", category: "Medical Equipment" },
  { src: storageShelves, title: "Supplies Storage", category: "Storage" },
  { src: centrifuge2, title: "Centrifuge MPW", category: "Laboratory" },
];

const FacilitiesGallery = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrandTag className="mb-4 md:mb-6">Our Facilities</BrandTag>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            State-of-the-Art <span className="text-primary">Research Facilities</span>
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Explore our clinical-grade infrastructure designed for multi-phase and complex clinical studies
          </p>
        </div>

        {/* Simple Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={image.title}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 50}ms`, transition: 'all 0.7s ease-out' }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square md:aspect-[4/3]">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay - Always visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content - Always visible on mobile */}
                <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-4 md:group-hover:translate-y-0">
                  <span className="text-[10px] md:text-xs text-primary-foreground/80 bg-primary/80 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full w-fit mb-1 md:mb-2">
                    {image.category}
                  </span>
                  <h4 className="text-white font-semibold text-xs md:text-sm lg:text-base">{image.title}</h4>
                </div>

                {/* Zoom Icon - Desktop only */}
                <div className="hidden md:flex absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            {selectedImage && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-3">{selectedImage.title}</h3>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FacilitiesGallery;
