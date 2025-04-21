import './Skeleton.css'

/**
 * Componente que muestra un esqueleto de carga en forma de cuadrícula masónica.
 * Genera una serie de elementos con diferentes tamaños para simular el contenido
 * mientras se cargan los datos reales.
 *
 * @component
 * @returns {JSX.Element} Componente de esqueleto de carga renderizado.
 */
const Skeleton = () => {
  return (
    <div className="skeleton-masonry">
      {Array.from({ length: 21 }).map((_, index) => (
        <div key={index} className={`skeleton-item size-${(index % 5) + 1}`} />
      ))}
    </div>
  )
}

export default Skeleton
