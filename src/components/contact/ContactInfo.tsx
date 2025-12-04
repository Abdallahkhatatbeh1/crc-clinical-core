import { Mail, Phone, MapPin, Clock, Globe, Building } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "support@crcjo.com",
    href: "mailto:support@crcjo.com",
    color: "primary"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+962 123 456 789",
    href: "tel:+962123456789",
    color: "accent"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Irbid, Jordan",
    href: "#",
    color: "primary"
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sun-Thu: 8AM-5PM",
    href: "#",
    color: "accent"
  }
];

const ContactInfo = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-crc-light-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {contactDetails.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className={`group bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:border-${item.color}/30 transition-all duration-500 text-center ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <item.icon className={`w-6 h-6 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
