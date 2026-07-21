import React from "react";

const Test = () => {
  if ("geolocation" in navigator) {
    console.log("Location Available");
  } else {
    console.log("Location Not Avaibale");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  return (
    <>
      <div className="h-screen">Test</div>
    </>
  );
};

export default Test;
