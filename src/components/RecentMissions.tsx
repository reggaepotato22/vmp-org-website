import { Link } from "react-router-dom";

const RecentMissions = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Missions</h2>
          <Link 
            to="/missions/2025"
            onClick={handleLinkClick}
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            View all 2025 missions <span className="inline-block">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission 1 - Mataarba */}
          <Link 
            to="/missions/2025/mataarba-2025"
            onClick={handleLinkClick}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src="/api/placeholder/400/250" 
              alt="Mataarba Mission"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mission Title 1</h3>
              <p className="text-gray-600 mb-4">Brief description of the mission...</p>
              <span className="text-sm text-gray-500">Date: Jan 2025</span>
            </div>
          </Link>

          {/* Mission 2 */}
          <Link 
            to="/missions/mission-2"
            onClick={handleLinkClick}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src="/api/placeholder/400/250" 
              alt="Mission 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mission Title 2</h3>
              <p className="text-gray-600 mb-4">Brief description of the mission...</p>
              <span className="text-sm text-gray-500">Date: Feb 2025</span>
            </div>
          </Link>

          {/* Mission 3 */}
          <Link 
            to="/missions/mission-3"
            onClick={handleLinkClick}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src="/api/placeholder/400/250" 
              alt="Mission 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mission Title 3</h3>
              <p className="text-gray-600 mb-4">Brief description of the mission...</p>
              <span className="text-sm text-gray-500">Date: Mar 2025</span>
            </div>
          </Link>
        </div>

        {/* Bottom link with "3" clickable */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <Link 
              to="/missions"
              onClick={handleLinkClick}
              className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
            >
              3
            </Link> recent missions
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecentMissions;