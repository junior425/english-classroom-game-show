// Optional illustration for a question card. Renders nothing when the card has no image.
export default function CardImage({ src, alt = '', size = 'md' }) {
  if (!src) return null
  const dims = size === 'xl' ? 'h-64 w-64 md:h-96 md:w-96' : 'h-32 w-32 md:h-44 md:w-44'
  return (
    <div className={`mx-auto mb-3 flex ${dims} items-center justify-center rounded-3xl bg-white/95 p-3 shadow-2xl animate-pop`}>
      <img src={src} alt={alt} draggable={false} className="h-full w-full object-contain" />
    </div>
  )
}
