const Header = () => {
  return (
    <header className="bg-gray-800 text-white text-center py-4">
      <div className="flex justify-center items-center header-logo">
        <a href="/">
          <img 
            src="/Logo.png"
            alt="Möbelgeschäft Logo"
            className="h-24 mr-3"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
  