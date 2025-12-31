'use client';

export default function VideoPlayer({ videoId }) {
    if (!videoId) return <div className="bg-black aspect-video text-white flex items-center justify-center">Video unavailable</div>;

    const isUrl = videoId.startsWith('http') || videoId.startsWith('/') || videoId.includes('.');

    return (
        <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-lg bg-black">
            {isUrl ? (
                <video
                    src={videoId}
                    className="absolute top-0 left-0 w-full h-full"
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    playsInline
                />
            ) : (
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
}
