import MissionCard, { MissionProps } from "./MissionCard";
import flockImage from "@/assets/vmphotos/flock.jpg";
import calfImage from "@/assets/vmphotos/calf.jpg";
import cow2Image from "@/assets/vmphotos/cow2.jpg";

// Mock Data - In a real app, this would come from an API or Context
const missionsData: MissionProps[] = [
  {
    id: "mataarba-2025",
    title: "Mataarba Mission",
    description: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
    location: "Mataarba, Kenya",
    date: "July 15-22, 2025",
    imageUrl: flockImage,
    category: "Veterinary Camp"
  },
  {
    id: "olturot-2025",
    title: "Olturot Outreach",
    description: "A successful mission focused on vaccination drives and community education regarding sustainable livestock management.",
    location: "Olturot, Kenya",
    date: "Feb 10-15, 2025",
    imageUrl: calfImage,
    category: "Vaccination Drive"
  },
  {
    id: "turbi-2025",
    title: "Turbi Community Support",
    description: "Partnered with local churches to deliver veterinary supplies and training to pastoralists in the Turbi region.",
    location: "Turbi, Kenya",
    date: "March 5-10, 2025",
    imageUrl: cow2Image,
    category: "Training"
  },
  // Adding older missions for grid demonstration
  {
    id: "lodwar-2024",
    title: "Lodwar Emergency Response",
    description: "Emergency drought response providing water and feed supplements to starving livestock in Turkana County.",
    location: "Lodwar, Kenya",
    date: "Nov 2024",
    imageUrl: flockImage,
    category: "Emergency Relief"
  }
];

const MissionsGrid = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
            Our Impact in Action
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our recent missions where we combine professional veterinary care with the message of God's love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionsData.map((mission) => (
            <MissionCard key={mission.id} {...mission} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionsGrid;
