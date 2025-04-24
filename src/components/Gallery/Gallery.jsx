import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPins } from '../../services/pin.service'
import GalleryItem from '../GalleryItem/GalleryItem'
import Skeleton from '../Skeleton/Skeleton'
import './Gallery.css'

/**
 * @typedef {Object} GalleryProps
 * @property {string} [search] - Término de búsqueda para filtrar los pines.
 * @property {string} [userId] - ID del usuario para filtrar pines por usuario.
 * @property {string} [boardId] - ID del tablero para filtrar pines por tablero.
 */

/**
 * Componente para mostrar una galería de pines con desplazamiento infinito.
 *
 * @component
 * @param {GalleryProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de galería renderizado con desplazamiento infinito.
 */
const Gallery = ({ search, userId, boardId }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['pins', search, userId, boardId],
    queryFn: ({ pageParam }) => getPins({ pageParam, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  if (status === 'pending') return <Skeleton />
  if (status === 'error') return 'Error loading pins'

  const allPins = data.pages.flatMap((page) => page.pins) ?? []

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins</h4>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Gallery
