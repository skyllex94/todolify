import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import instruction_gif from "../../assets/instructions/weekly2.gif";

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
          className="justify-center items-center flex fixed inset-0 z-50 outline-none"
        >
          <div ref={closeModalRef}>
            <div className="flex w-full items-center mb-4">
              <img
                src={instruction_gif}
                className="w-full"
                alt="Instructions for weekly list"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="opacity-25 bg-black fixed inset-0"></div>
    </div>
  );
}
