import { useEffect } from "react";

// MAYBE: Make the useEffect from here so it's clean in the component
export function EscapeModal(setShowModal) {
  // Trigger removing modal on escape key pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowModal]);
}
