import React from 'react';
import Image from 'next/image';
const logo = require('../../public/Ddsgnr Library.png');

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center pl-6">
        <Image src={logo} alt="Logo" height={100} width={100} />
      </div>
    </header>
  );
};

export default Header;
