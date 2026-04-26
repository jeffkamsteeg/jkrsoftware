export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="text-center text-xs text-gray-500 sm:text-sm">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
