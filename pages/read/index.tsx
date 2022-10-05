import { NextPage } from "next";

const Read: NextPage = () => {
  return (
    <div className="container mx-auto flex h-screen w-4/5 flex-col items-center px-4 py-8 lg:w-3/4">
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Read QR</h1>
          </div>
        </div>
      </div>
      {
        // TODO LINK CAMERA CANVAS
      }
      <div className="rounded-box artboard h-96 w-96 shadow-xl">{/* <canvas/> */}</div>
    </div>
  );
};

export default Read;
