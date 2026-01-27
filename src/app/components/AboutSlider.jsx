"use client"
import { useState, useRef } from "react"

export default function AboutSlider() {
  const images = [
    "/images/about_magondo1.jpg",
    "/images/about_magondo2.jpg",
    "/images/about_magondo3.jpg",
    "/images/about_magondo4.jpg",
    "/images/about_magondo5.jpg",
    "/images/about_magondo6.jpg",
    "/images/about_magondo7.jpg",
    "/images/about_magondo8.jpg",
    "/images/about_magondo9.jpg",
  ]

  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)

  const next = () => {
    const newIndex = (index + 1) % images.length
    setIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const prev = () => {
    const newIndex = (index - 1 + images.length) % images.length
    setIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const scrollToIndex = (i) => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    containerRef.current.scrollTo({ left: i * width, behavior: "smooth" })
  }

  return (
    <div className="md:pl-4 -ml-10 py-1 relative">
      <div className="mt-5 mr-auto w-full md:w-[50vw] max-w-[1100px] overflow-hidden rounded-none shadow-lg relative">
        
        {/* スライド領域 */}
        <div
          ref={containerRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        >
          {images.map((src, i) => (
            <div key={i} className="shrink-0 w-full aspect-video snap-center">
              <img
                src={src}
                alt={`スライド ${i + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* 左右ボタン */}
        <button
          onClick={prev}
          aria-label="前へ"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-2 shadow-md backdrop-blur"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="次へ"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-2 shadow-md backdrop-blur"
        >
          ›
        </button>

        {/* ドット */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); scrollToIndex(i) }}
              aria-label={`スライド ${i + 1}`}
              className={`h-2 w-2 rounded-full border border-white/80 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

