import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="shadow">
      <div className="container mx-auto px-2 flex justify-between h-16 items-center">
        <Link href="/">
          <Image width={40} height={40} src="/quill.png" alt="quote" />
        </Link>
      </div>
    </nav>
  );
}
