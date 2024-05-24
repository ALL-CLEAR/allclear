import { useState, useCallback } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_API_URL;
const OPENVIDU_SERVER_SECRET = "ssafy";

export const useOpenVidu = () => {
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [sessionId, setSessionId] = useState("");

  const joinSession = useCallback(() => {
    if (!OV) {
      const ov = new OpenVidu();
      setOV(ov);
      setSession(ov.initSession());
    }
  }, [OV]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  const createSession = async (sessionId) => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        JSON.stringify({ customSessionId: sessionId }),
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.id;
    } catch (error) {
      if (error.response?.status === 409) {
        return sessionId;
      }
      console.error("Error creating session:", error.message);
      return null;
    }
  };

  const createToken = async (sessionId) => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.token;
    } catch (error) {
      console.error("Error creating token:", error.message);
      return null;
    }
  };

  const getToken = async () => {
    const sessionIdValue = await createSession(sessionId || "defaultSessionId");
    if (sessionIdValue) {
      return createToken(sessionIdValue);
    }
    throw new Error("Failed to create session or token.");
  };

  return {
    OV,
    session,
    setSession,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    sessionId,
    setSessionId,
    joinSession,
    leaveSession,
    getToken,
  };
};
