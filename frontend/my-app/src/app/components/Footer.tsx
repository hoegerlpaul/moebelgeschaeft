import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-10">
      <p>© {new Date().getFullYear()} Möbelgeschäft | Individuelle Möbel nach Maß</p>
      <div className="mt-3">
        <Link href="/impressum" className="text-gray-400 hover:text-white mx-4">
          Impressum
        </Link>
        <Link href="/agb" className="text-gray-400 hover:text-white mx-4">
          AGB
        </Link>
        <Link href="/datenschutz" className="text-gray-400 hover:text-white mx-4">
          Datenschutz
        </Link>
        <Link href="/kontakt" className="text-gray-400 hover:text-white mx-4">
          Kontakt
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

  