import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import EventCard, { EventCardProps } from "components/EventCard";

const Home: NextPage = () => {
  const events: Partial<EventCardProps>[] = [
    { title: "asdfasdf", href: "/events?title=asdfasdf" },
    { title: "Event 1", href: "/events?title=Event%201" },
    { title: "Event 2", href: "/events?title=Event%202" },
  ];
  return (
    <div className={"container mx-auto flex h-screen w-4/5 flex-col px-4 py-8 lg:w-3/4"}>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Checkin</h1>
          </div>
        </div>
      </div>
      <div className="max-w carousel-vertical carousel-center carousel rounded-box space-y-4 bg-neutral p-4 py-32">
        {events.map((v, i) => {
          // TODO event UUID is required
          return <EventCard {...v} key={`event-${i}`} />;
        })}
      </div>
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
