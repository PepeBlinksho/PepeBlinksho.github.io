import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="fixed right-6 bottom-6">
        <div>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </div>
    </main>
  );
}
