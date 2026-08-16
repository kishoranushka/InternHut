import Image from "next/image";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp } from "@/components/public/motion";

const PHOTOS = [
  { src: "/images/hero-students.jpg", caption: "Reviewing a project brief together", aspect: "aspect-[4/5]" },
  { src: "/images/certificate-holder.jpg", caption: "The moment it becomes official", aspect: "aspect-[4/3]" },
  { src: "/images/library-laptop.jpg", caption: "Studying between internship tasks", aspect: "aspect-[4/5]" },
  { src: "/images/coding-closeup.jpg", caption: "Deep in a project task", aspect: "aspect-square" },
  { src: "/images/video-call.jpg", caption: "A mentor call in progress", aspect: "aspect-[4/3]" },
  { src: "/images/mentor-teaching.jpg", caption: "One-on-one mentor guidance", aspect: "aspect-[4/5]" },
  { src: "/images/outdoor-study.jpg", caption: "Catching up on campus", aspect: "aspect-[4/5]" },
  { src: "/images/student-presentation.jpg", caption: "Presenting a final submission", aspect: "aspect-[4/3]" },
  { src: "/images/team-meeting.jpg", caption: "Planning the next cohort", aspect: "aspect-[4/3]" },
  { src: "/images/grads-celebrating.jpg", caption: "Celebrating a completed batch", aspect: "aspect-[3/4]" },
];

export default function GalleryPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.08),transparent_60%)]"
        />
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
            A look inside the program
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Mentor calls, project work, and the certificates it all leads to.
          </p>
        </FadeInUp>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {PHOTOS.map((photo, i) => (
            <FadeInUp
              key={photo.src}
              delay={(i % 3) * 0.05}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-md"
            >
              <div className={`relative w-full overflow-hidden ${photo.aspect}`}>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>
    </main>
  );
}
