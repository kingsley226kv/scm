
import React from 'react';
import { MapPin } from 'lucide-react';

interface MallMapProps {
  location: string;
}

const MallMap: React.FC<MallMapProps> = ({ location }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold mb-3">Task Location</h3>
      <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <MapPin size={32} className="text-primary animate-bounce" />
            </div>
            <div className="font-bold">Go to: {location}</div>
            <div className="text-sm text-gray-600 mt-1">
              Find staff member for password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallMap;
