import React from "react";

function EmptyWarning({text}) {
  return (
    <div className="w-[90%] border-dashed border-4 md:w-2/4 m-auto p-4">
      <p className="text-center text-gray-600">
        {text}
      </p>
    </div>
  );
}

export default EmptyWarning;