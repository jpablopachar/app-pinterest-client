import { IKImage } from 'imagekitio-react'

/**
 * @typedef {Object} ImageProps
 * @property {string} [path] - Ruta de la imagen en el endpoint de ImageKit.
 * @property {string} [src] - Fuente alternativa de la imagen.
 * @property {string} alt - Texto alternativo para la imagen.
 * @property {string} [className] - Clases CSS adicionales para el componente de imagen.
 * @property {number} [w] - Ancho deseado de la imagen.
 * @property {number} [h] - Alto deseado de la imagen.
 */

/**
 * Componente para mostrar una imagen utilizando ImageKit con soporte para transformación de tamaño y carga diferida.
 *
 * @component
 * @param {ImageProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de imagen renderizado.
 */
const Image = ({ path, src, alt, className, w, h }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      path={path}
      src={src}
      transformation={[
        {
          height: h,
          width: w,
        },
      ]}
      alt={alt}
      loading="lazy"
      className={className}
      lqip={{ active: true, quality: 20 }}
    />
  )
}

export default Image
