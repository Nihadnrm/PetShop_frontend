import React from "react";
import Header from "../components/Header";

function PetcareVideo() {
  const videos = [
    "https://www.youtube.com/embed/P3PWkQjab5I?si=DVHmGI2YbCoq6mCx",
    "https://www.youtube.com/embed/q7hyE0t0Mfw?si=aTIZUNXd3njkWz3D",
    "https://www.youtube.com/embed/jFMA5ggFsXU?si=aYzMWQ0kJy4S6gfx",
    "https://www.youtube.com/embed/odoOvcvBMIo?si=jyc3npn6UW9M_MYG",
    "https://www.youtube.com/embed/DbNNXpeGC7g?si=CGk0k5a05N42EOZ-",
  ];

  return (
    <>
      <Header />
      <div
        className="container-fluid py-5"
        style={{ minHeight: "70vh", backgroundColor: "white" }}
      >
        <h3 className="text-center pb-4 text-primary">
          Learn How to Care for Your Pet Like a Pro
        </h3>

        <div className="container">
          <div className="row g-4" data-aos="fade-up-right">
            {videos.map((url, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <div className="ratio ratio-16x9" style={{ width: "100%" }}>
                  <iframe
                    src={url}
                    title={`Pet care video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PetcareVideo;
