export default function Footer() {
  return (
    <footer className="w-full bg-black py-6 flex flex-col items-center gap-1  border-t border-yellow-300 mt-10">
      <h2 className="text-yellow-300 text-lg font-semibold">
        Neomag
      </h2>
      <p className="text-white text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
