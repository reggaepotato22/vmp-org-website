import { Link } from "react-router-dom";

const RecentMissions = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Missions</h2>
          <Link
            to="/missions/mataarba"
            onClick={handleLinkClick}
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            View all 2025 missions <span className="inline-block">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission 1 - Mataarba */}
          <Link
            to="/missions/mataarba/mataarba-2025"
            onClick={handleLinkClick}
            className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-105"
          >
            <img
              src="/src/assets/vmphotos/flock.jpg"
              alt="Mataarba Mission"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6 transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Mataarba Mission
              </h3>
              <p className="text-gray-600 mb-4">
                Provided essential veterinary care and spiritual support to the
                Mataarba community with comprehensive animal health services.
              </p>
              <span className="text-sm text-gray-500">July 15-22, 2025</span>
            </div>
          </Link>

          {/* Mission 2 - Olturot */}
          <Link
            to="/missions/mission-2"
            onClick={handleLinkClick}
            className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-105"
          >
            <img
              src="/src/assets/vmphotos/flock.jpg"
              alt="Mission 2"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6 transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Olturot Mission
              </h3>
              <p className="text-gray-600 mb-4">Brief description</p>
              <span className="text-sm text-gray-500">Date: Feb 2025</span>
            </div>
          </Link>

          {/* Mission 3 - Turbi */}
          <Link
            to="/missions/mission-3"
            onClick={handleLinkClick}
            className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-105"
          >
            <img
              src="/src/assets/vmphotos/flock.jpg"
              alt="Mission 3"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6 transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Turbi Mission
              </h3>
              <p className="text-gray-600 mb-4">Brief description</p>
              <span className="text-sm text-gray-500">Date: Mar 2025</span>
            </div>
          </Link>
        </div>

        {/* Bottom link with "3" clickable */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing{" "}
            <Link
              to="/missions"
              onClick={handleLinkClick}
              className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
            >
              3
            </Link>{" "}
            recent missions
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecentMissions;
