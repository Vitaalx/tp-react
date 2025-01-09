import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 p-4">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/pokemons" className="hover:underline">
              Pokemons
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
