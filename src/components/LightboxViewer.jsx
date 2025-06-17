import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const LightboxViewer = ({ src, alt = "이미지 미리보기", className = "" }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-2 w-full">
            <img
                src={src}
                alt={alt}
                onClick={() => setOpen(true)}
                loading="lazy"
                className={`cursor-pointer rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition ${className}`}
            />

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src }]}
                // 🔽 화살표 제거
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
                // 🔽 배경 클릭 시 닫히게 설정
                controller={{
                    closeOnBackdropClick: true,
                }}
                // 🔽 배경 반투명하게 설정
                styles={{
                    container: {
                        backgroundColor: "rgba(0, 0, 0, 0.9)", // 90% 어둡게
                    },
                }}
            />
        </div>
    );
};

export default LightboxViewer;
