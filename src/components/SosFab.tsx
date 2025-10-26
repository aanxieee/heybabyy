import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const SosFab: React.FC = () => {
  return (
    <Link
      to="/support#sos"
      className="md:hidden fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-300/40 ring-2 ring-red-200 active:scale-95 transition-transform"
      aria-label="Open SOS"
    >
      <AlertTriangle className="h-5 w-5" />
      <span className="text-sm font-semibold">SOS</span>
    </Link>
  );
};

export default SosFab;
