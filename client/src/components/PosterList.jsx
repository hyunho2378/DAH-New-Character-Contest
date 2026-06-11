import PosterSection from './PosterSection.jsx'

export default function PosterList({ posters }) {
  return (
    <div>
      {posters.map((poster, index) => (
        <PosterSection
          key={poster.id}
          poster={poster}
          isLast={index === posters.length - 1}
        />
      ))}
    </div>
  )
}
