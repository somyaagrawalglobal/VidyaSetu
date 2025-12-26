'use client';

export default function VideoPlayer({ videoId }) {
    if (!videoId) return <div className="bg-black aspect-video text-white flex items-center justify-center">Video unavailable</div>;

    return (
        <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-lg bg-black">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Course Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            {/* Overlay to prevent right-click save if needed, though YouTube iframe handles most security yourself */}
        </div>
    );
}
