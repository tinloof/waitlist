import Image from "next/image";

export default async function Index() {
  return (
    <>
      <Image src="/images/icon.png" alt="tinloof" width={50} height={50} />
      <h2 className="font-bold text-4xl">
        <a
          href="https://tinloof.com/blog/how-to-build-a-waitlist-with-supabase-and-next-js"
          target="_blank"
          className="hover:underline"
          rel="noreferrer"
        >
          How to build a waitlist with Supabase and Next.js
        </a>
      </h2>
    </>
  );
}
