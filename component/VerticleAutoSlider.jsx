import React, { useEffect, useRef, useState } from "react";

function VerticleAutoSlider() {
    const sectionRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // const containerRef = useRef(null);

    const tags = ["0", "1", "2", "3"];
    const SCROLL_INTERVAL = 2000;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % tags.length);
        }, SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [tags.length]);

    return (
        <div className="bg-tahiti flex h-screen w-screen items-center justify-center">
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "200px",
                    height: sectionRefs.current[currentIndex]?.offsetHeight || "25px",
                }}
            >
                <div
                    // ref={containerRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.6s ease-in-out",
                        transform: `translateY(-${currentIndex * (sectionRefs.current[currentIndex]?.offsetHeight || 30)}px)`,
                    }}
                >
                    {tags.map((tag, index) => (
                        <div
                            key={tag}
                            ref={(el) => (sectionRefs.current[index] = el)}
                            style={{
                                height: "auto", // Dynamic height
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: index % 2 === 0 ? "#fce4ec" : "#e3f2fd",
                                borderRadius: "10px",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VerticleAutoSlider;
