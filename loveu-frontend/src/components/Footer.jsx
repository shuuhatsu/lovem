function Footer() {
  return (
    <footer className="bg-pink-500 text-white text-center py-4 mt-auto">
      <p className="text-sm">
        © {new Date().getFullYear()} LoveU 💌 — Made with ❤️ | Developed by{" "}
        <a
          href="https://joshuaa-portfolio.vercel.app/"
          className="font-bold hover:text-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shuahuaa
        </a>
      </p>
    </footer>
  );
}

export default Footer;