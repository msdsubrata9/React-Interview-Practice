import React from "react";

function VideoStream() {
  return (
    <div className="videoStreamContainer">
      <iframe
        width="800"
        height="600"
        src="https://www.youtube.com/embed/kAm_0zKAWo4?si=2M9GxX4rggABlaJK"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}

export default VideoStream;
