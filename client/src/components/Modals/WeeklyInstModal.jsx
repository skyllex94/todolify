import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../assets/instructions/video.mp4";
import video_mobile from "../../assets/instructions/video-mobile.mp4";
import loader from "../../assets/instructions/video_loader.gif";
import { RiCloseFill } from "react-icons/ri";

export default function WeeklyInstModal({ setShowInstModal }) {
  const user_id = useSelector((state) => state.auth.user_id);
  const closeModalRef = useRef();

  // Page Checks
  const navigate = useNavigate();
  if (!user_id) navigate("/");

  // Trigger removing modal on outside click or escape key pressed
  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowInstModal(false);
      if (!closeModalRef?.current.contains(e.target)) setShowInstModal(false);
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("mousedown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("mousedown", closeModal);
    };
  }, [setShowInstModal]);

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
        >
          <div ref={closeModalRef}>
            <div className="flex items-center justify-between rounded-t border bg-white p-3">
              <h3 className="font-sans text-2xl font-semibold">Instructions</h3>
              <button
                className="text-bold float-right ml-auto p-1 text-3xl text-black"
                onClick={() => setShowInstModal(false)}
              >
                <RiCloseFill />
              </button>
            </div>
            <div className="mb-4 flex w-full items-center">
              <Video
                autoPlay
                loop
                muted
                poster={loader}
                controls={["PlayPause", "Fullscreen"]}
              >
                <source
                  src={window.screen.width < 450 ? video_mobile : video}
                  type="video/webm"
                />
                <track
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src={video}
                  default
                />
              </Video>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed inset-0 bg-black opacity-25"></div>
    </div>
  );
}
