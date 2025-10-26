import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-center text-xs text-muted-foreground">
          AANXIEE AI Solutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
