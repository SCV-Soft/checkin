import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";

function useTicketReaderCamera() {
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const [deviceIdx, setDeviceIdx] = useState<number>(0);
  const [supportsFacingMode, setSupportsFacingMode] = useState<boolean>(false);
  useEffect(() => {
    setSupportsFacingMode(navigator.mediaDevices.getSupportedConstraints().facingMode || false);
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const deviceIds = devices.filter((device) => device.kind === "videoinput").map((device) => device.deviceId);
      if (deviceIds.length > 0) {
        setDeviceIds(deviceIds);
      }
    });
  }, []);
  const [facingUser, setFacingUser] = useState<boolean>(false);
  const constraints = useMemo<MediaTrackConstraints>(
    () => ({
      aspectRatio: 1,
    }),
    [],
  );
  return { deviceIds, deviceIdx, setDeviceIdx, supportsFacingMode, setFacingUser, constraints };
}

const constraintFaceUser: MediaTrackConstraints = {
  aspectRatio: 1,
  facingMode: "user",
};
const constraintFaceEnvironment: MediaTrackConstraints = {
  aspectRatio: 1,
  facingMode: "environment",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof context.query.eventId !== "string") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      eventId: context.query.eventId,
    },
  };
};

const stringConstants = {
  pending: "티켓을 촬영해 주세요.",
  confirmed: "입장이 확인되었습니다!",
  rejected: "올바른 티켓이 아닙니다.",
};

const Read: NextPage<{ eventId: string }> = ({ eventId }) => {
  const { deviceIds, setDeviceIdx, deviceIdx, supportsFacingMode, setFacingUser, constraints } =
    useTicketReaderCamera();

  const [ticketStatus, setTicketStatus] = useState<"pending" | "confirmed" | "rejected">("pending");

  const onResult: OnResultFunction = useCallback(
    (result, error) => {
      if (!!error) {
      } else {
        if (!!result) {
          if (result.getText() === eventId) {
            setTicketStatus("confirmed");
          } else {
            setTicketStatus("rejected");
          }
        } else {
          console.error("TicketReader ERROR: QR Reader invoked result callback but error and result are both null.");
        }
      }
    },
    [eventId],
  );

  return (
    <div className="container mx-auto flex h-screen w-4/5 flex-col items-center px-4 py-8 lg:w-3/4">
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold">입장권 확인하기</h1>
          </div>
        </div>
      </div>
      <div className="rounded-box artboard h-96 w-96 overflow-hidden shadow-xl">
        {deviceIds.map((id) => {
          return (
            id === deviceIds[deviceIdx] && (
              <QrReader
                key={`device-${id}`}
                onResult={onResult}
                constraints={{ ...constraints, deviceId: deviceIds[deviceIdx] }}
              />
            )
          );
        })}
      </div>
      <h1
        className={`my-4 text-center text-2xl font-bold ${ticketStatus === "rejected" ? "text-error" : ""} ${
          ticketStatus === "confirmed" ? "text-success" : ""
        } ${ticketStatus === "pending" ? "text-info" : ""}`}
      >
        {stringConstants[ticketStatus]}
      </h1>
      <div className="rounded-box artboard-horizontal flex w-96 flex-row items-center justify-end gap-2 bg-neutral-content p-4 shadow-xl">
        <button
          disabled={deviceIds.length < 2}
          className="rounded-box btn border-none bg-secondary-content text-secondary shadow-xl"
          onClick={() => {
            setDeviceIdx((val) => (val + 1) % deviceIds.length);
          }}
        >
          <label>카메라 전환</label>
        </button>
        <button
          disabled={ticketStatus === "pending"}
          className="rounded-box btn border-none bg-primary-content text-primary shadow-xl"
          onClick={() => {
            setTicketStatus("pending");
          }}
        >
          <label>다시 촬영</label>
        </button>
      </div>
    </div>
  );
};

export default Read;
