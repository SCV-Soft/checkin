import type { GetServerSideProps, NextPage } from "next";

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
    </div>
  );
};

export default Home;
