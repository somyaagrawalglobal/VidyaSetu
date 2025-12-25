import { courses } from "@/data/courses";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function CourseDetailPage({ params }) {
  const { slug } = params;

  // find selected course
  const course = courses.find(
    (course) => course.slug === slug
  );

  // if course not found
  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Image
        src={course.image}
        alt={course.title}
        width={800}
        height={400}
        className="rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {course.title}
      </h1>

      <p className="text-gray-600 mt-4 text-lg">
        {course.description}
      </p>

      <div className="mt-6">
        <span className="font-semibold">Duration:</span>{" "}
        {course.duration}
      </div>

      <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg">
        Enroll Now
      </button>
    </div>
  );
}
