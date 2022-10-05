import { NextPage } from "next";
import { useRouter } from "next/router";

export type EventQuery = {
  imgsrc: string;
  title: string;
  desc: string;
  id: string;
};

const Event: NextPage = () => {
  // TODO GET EVENT ID FROM URL PARAMS??
  const router = useRouter();
  const title = router.query.title ?? "행사 이름";
  return (
    <>
      {" "}
      <div className={"container mx-auto flex h-screen w-4/5 flex-col gap-4 px-4 py-8 lg:w-3/4"}>
        <div className="hero">
          <div className="hero-content flex-col">
            {/* <Image />*/}
            <span>이미지! 이미지! 이미지!</span>
            <div className="text-center">
              <h1 className="text-4xl font-bold">{title}</h1>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">설명 설명</h2>
        <span>설명 설명설명 설명!!! 설명</span>
        <figure className="rounded-box phone-1 artboard flex flex-col items-center justify-center shadow-xl">
          <span>이미지!!!</span>
        </figure>
        <h2 className="text-2xl font-bold">설명설명 설명!</h2>
        <span>설명?? 설명 설명</span>
        <button className="btn btn-primary">신청</button>
      </div>
    </>
  );
};

export default Event;
