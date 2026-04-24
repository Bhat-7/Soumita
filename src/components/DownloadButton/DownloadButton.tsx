import React from "react";

const DownloadButton = ({ className = "" }: { className: string }) => {
  return (
    <a
      className={className}
      href="/debayansen.pdf"
      download="Debayan_Sen_Resume.pdf"
    >
      Download Resume
    </a>
  );
};

export default DownloadButton;
