import type { GetServerSideProps, NextPage } from "next";
import QRCode from "react-qr-code";

const Generator: NextPage = () => {
  const value = "Hello SCVSoft!";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl">QR Generator</h1>
      <h2>
        Next QR code has text - <span className="text-blue-500">&quot;{value}&quot;</span>
      </h2>
      <div className="bg-white p-4">
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

export default Generator;
