import Image from "next/image";

export type EventCardProps = {
  imgsrc: string;
  title: string;
  desc: string;
  href: string;
};
const EventCardPropsDefault: EventCardProps = {
  imgsrc: "",
  title: "행사",
  desc: "행사 설명",
  href: "/",
};
function EventCard(props: Partial<EventCardProps>) {
  const { imgsrc, title, desc, href } = { ...EventCardPropsDefault, ...props };
  return (
    <div className="carousel-item flex flex-col items-center">
      <div className="card w-3/4 bg-white shadow-xl lg:w-1/2">
        <figure className="h-48 bg-primary">
          <Image src={imgsrc} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{desc}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => open(href, "_self")}>
              신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
