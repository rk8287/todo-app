import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
      <div className="flex gap-x-2">
        <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
