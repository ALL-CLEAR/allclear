import { useEffect, useRef } from "react";
import { useOpenVidu } from "../modules/useOpenVidu";

function OpenVidu() {
  const videoContainerRef = useRef(null); // DOM에 접근하기 위한 ref

  const {
    OV,
    session,
    setSession,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    sessionId,
    setSessionId,
    leaveSession,
    getToken,
    joinSession,
  } = useOpenVidu();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
      // 언로드를 방지하는 메시지를 추가할 수 있습니다 (브라우저에 따라 다를 수 있음)
      // event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (session) {
      session.on("streamCreated", (event) => {
        const subscriber = session.subscribe(event.stream, `my-video`);
        subscriber.on("videoElementCreated", (event) => {
          videoContainerRef.current.appendChild(event.element);
        });
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      session.on("streamDestroyed", (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter(
            (sub) => sub.stream.streamId !== event.stream.streamId
          )
        );
      });
    }
  }, [session]);

  useEffect(() => {
    if (session && OV) {
      const fetchData = async () => {
        try {
          const token = await getToken();
          await session.connect(token);
          const publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: "screen",
            publishAudio: false,
            publishVideo: true,
            mirror: true,
          });
          session.publish(publisher);
          setPublisher(publisher);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [session, OV]);

  useEffect(() => {
    joinSession();
  }, []);

  return (
    <div id="my-video" ref={videoContainerRef}>
      <div>스마트팜 실시간 CCTV 화면</div>
      {subscribers.map((sub, index) => (
        <div key={index}>CCTV 화면 {index + 1}</div>
      ))}
    </div>
  );
}

export default OpenVidu;
