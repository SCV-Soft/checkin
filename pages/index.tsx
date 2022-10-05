import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={"container mx-auto px-4 py-8"}>
      <h1>Hello SCVSoft!</h1>
      <p>This is just template project</p>
      <h1 className="mt-4">QR코드 Reader 또는 Generator 페이지로 이동합쉬다</h1>
      <div className="flex gap-4">
        <Link href="/reader">
          <a className="hover:text-blue-500 hover:underline">Reader</a>
        </Link>
        <Link href="/generator">
          <a className="hover:text-blue-500 hover:underline">Generator</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
