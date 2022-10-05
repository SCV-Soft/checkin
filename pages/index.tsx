import type { GetServerSideProps, NextPage } from "next";
import QRCode from "react-qr-code";

const Home: NextPage = () => {
  const value = "Hello SCVSoft!";
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-xl">QR Generator</h1>
      <h2>
        Next QR code has text - <span className="text-blue-500">"{value}"</span>
      </h2>
      <div className="p-4 bg-white">
        <QRCode value={value} />
      </div>
      <p>
        reference :{" "}
        <a href="https://www.npmjs.com/package/react-qr-code" className="hover:text-blue-500 hover:underline">
          https://www.npmjs.com/package/react-qr-code
        </a>
      </p>
    </div>
  );
};

export default Home;
