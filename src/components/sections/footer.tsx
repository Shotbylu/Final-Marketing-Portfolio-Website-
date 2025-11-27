export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Lungelo Sibisi. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-2 text-xs uppercase tracking-wider">
            Made in South Africa 🇿🇦
          </span>
        </div>
      </div>
    </footer>
  );
}
