import { runFireworks } from "@/lib/utils";
import React, { useEffect } from "react";

function Sucsses() {
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh]">
      <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
        شكراً لاختيارك لنا
      </h2>
      <p className="text-center text-lg">سوف نتواصل معك في أقرب وقت ممكن</p>
    </div>
  );
}

export default Sucsses;
