import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

const Reader: NextPage = () => {
  const [data, setData] = useState("No result");

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-xl">QR Reader</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p className="text-xl text-blue-500">Data is ...</p>
      <br />
      <p className="p-2 border">{data}</p>
    </div>
  );
};

export default Reader;
