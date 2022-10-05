import { NextPage } from "next";

const Ticket: NextPage = () => {
  // TODO GET EVENT INFO FROM URL QUERY
  const title: string = "행사 이름";
  return (
    <div className="container mx-auto flex h-screen w-4/5 flex-col items-center px-4 py-8 lg:w-3/4">
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Ticket</h1>
          </div>
        </div>
      </div>
      {
        // TODO LINK REMOTE QR CODE IMAGE OR BASE64
      }
      <div className="card w-96 bg-white shadow-xl lg:w-1/2">
        <figure className="h-96 bg-primary"></figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>스태프에게 위 입장권을 제시하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
