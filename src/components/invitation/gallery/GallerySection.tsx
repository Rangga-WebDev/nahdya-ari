/** @format */

"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";
import { EASE, blurIn, drift, lineRise } from "@/lib/reveal";

import { GalleryLightbox } from "./GalleryLightbox";

import styles from "./GallerySection.module.css";

export function GallerySection() {
  const scope = useRef<HTMLElement>(null);

  const [active, setActive] = useState<number | null>(null);

  const items = invitation.gallery.items;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: EASE },
            scrollTrigger: { trigger: scope.current, start: "top 76%" },
          })
          .from("[data-gallery-script]", blurIn({ duration: 1.1 }))
          .from("[data-gallery-word]", lineRise(), 0.12)
          .from("[data-gallery-copy]", { ...drift(), stagger: 0.1 }, 0.4);

        /* Each plate uncrops while its picture eases out of over-scale. No
           element ever travels vertically into place. */
        gsap.utils
          .toArray<HTMLElement>("[data-gallery-plate]")
          .forEach((plate) => {
            const frame = plate.querySelector("[data-gallery-frame]");

            const media = plate.querySelector("[data-gallery-media]");

            gsap
              .timeline({
                defaults: { ease: EASE },
                scrollTrigger: { trigger: plate, start: "top 88%" },
              })
              .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25 })
              .to(media, { scale: 1, duration: 1.5 }, 0)
              .from(
                plate.querySelector("[data-gallery-meta]"),
                { opacity: 0, duration: 0.9 },
                0.5,
              );
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="memories"
      className={styles.gallery}
      data-gallery-section
    >
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <p className={styles.script} data-gallery-script>
            Serpihan Kenangan
          </p>

          <h2 className={styles.mask}>
            <span className={styles.heading} data-gallery-word>
              Gallery
            </span>
          </h2>
        </div>

        <div className={styles.headRight}>
          <p className={styles.subtitle} data-gallery-copy>
            {invitation.gallery.subtitle}
          </p>

          <p className={styles.count} data-gallery-copy>
            {String(items.length).padStart(2, "0")} Frames
          </p>
        </div>
      </div>

      <div className={styles.plates}>
        {items.map((item, index) => (
          <figure key={item.id} className={styles.plate} data-gallery-plate>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setActive(index)}
              aria-label={`Buka foto ${index + 1} dari ${items.length}`}
            >
              <span className={styles.frame} data-gallery-frame>
                <span className={styles.media} data-gallery-media>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      quality={78}
                      sizes="(max-width: 900px) 92vw, 44vw"
                      className={styles.image}
                      style={{
                        objectPosition: item.objectPosition ?? "50% 28%",
                      }}
                    />
                  ) : null}
                </span>
              </span>
            </button>

            <figcaption className={styles.plateMeta} data-gallery-meta>
              <span className={styles.plateIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{invitation.gallery.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {active !== null ? (
        <GalleryLightbox
          items={items}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      ) : null}
    </section>
  );
}
