import React from 'react'

interface BannerProps {
  color?: string; // Use '?' to mark it as optional
  children: React.ReactNode;
}

const Banner = ({ color = 'bg-red-400', children }: BannerProps) => { // default value for color
  return (
    <button>
        <h1 className={`font-bold ${color}`}>{children}</h1>
    </button>
  );
};

export default Banner
