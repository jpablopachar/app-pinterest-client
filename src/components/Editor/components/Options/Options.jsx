import { useState } from 'react'
import useEditorStore from '../../../../store/editorStore'
import { landscapeSizes, portraitSizes } from './data/optionsData'

/**
 * @typedef {Object} OptionsProps
 * @property {Object} previewImg - Objeto que contiene la URL y las dimensiones de la imagen previa.
 * @property {string} previewImg.url - URL de la imagen previa.
 * @property {number} previewImg.height - Altura de la imagen previa.
 * @property {number} previewImg.width - Ancho de la imagen previa.
 */

/**
 * Componente de opciones para el editor de imágenes.
 *
 * Este componente permite modificar las opciones de texto (cuando la capa seleccionada es 'text')
 * o las opciones del lienzo (cuando la capa seleccionada no es 'text'). Entre las opciones disponibles
 * se incluyen el tamaño y color de fuente, la orientación y tamaño del lienzo, y el color de fondo.
 *
 * @component
 * @param {OptionsProps} props - Propiedades del componente.
 * @param {{ width: number, height: number }} props.previewImg - Objeto que representa la imagen de previsualización, utilizado para calcular la orientación y proporciones.
 *
 * @returns {JSX.Element} Elemento JSX que representa las opciones de edición del editor.
 */
const Options = ({ previewImg }) => {
	const {
		selectedLayer,
		textOptions,
		canvasOptions,
		setTextOptions,
		setCanvasOptions,
	} = useEditorStore()

	/**
	 * Estado que indica si el selector de color (Color Picker) está abierto o cerrado.
	 * @type {boolean}
	 * @default false
	 */
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

	/**
	 * Determina la orientación original de la imagen de vista previa.
	 * Si el ancho de la imagen es menor que su altura, la orientación será 'portrait' (vertical),
	 * de lo contrario será 'landscape' (horizontal).
	 *
	 * @type {'portrait' | 'landscape'}
	 */
	const originalOrientation =
		previewImg.width < previewImg.height ? 'portrait' : 'landscape'

	/**
	 * Maneja el cambio de orientación de la imagen en el editor.
	 *
	 * Calcula la nueva altura del lienzo según la orientación seleccionada y la relación de aspecto de la imagen de previsualización.
	 * Si la orientación seleccionada es igual a la original, mantiene la relación de aspecto; de lo contrario, la invierte.
	 * Actualiza las opciones del lienzo con la nueva orientación, tamaño original y altura calculada.
	 *
	 * @param {string} orientation - La nueva orientación seleccionada para la imagen (por ejemplo, 'horizontal' o 'vertical').
	 */
	const handleOrientationClick = (orientation) => {
		let newHeight

		if (originalOrientation === orientation) {
			newHeight = (375 * previewImg.height) / previewImg.width
		} else {
			newHeight = (375 * previewImg.width) / previewImg.height
		}

		setCanvasOptions({
			...canvasOptions,
			orientation,
			size: 'original',
			height: newHeight,
		})
	}

	/**
	 * Maneja el evento de selección de tamaño para el lienzo.
	 *
	 * Calcula la nueva altura del lienzo en función del tamaño seleccionado y la orientación de la imagen original.
	 * Si se selecciona el tamaño 'original', ajusta la altura según la orientación de la imagen y el lienzo.
	 * Si se selecciona un tamaño personalizado, calcula la altura proporcionalmente.
	 * Actualiza las opciones del lienzo con el nuevo tamaño y altura.
	 *
	 * @param {('original'|{name: string, width: number, height: number})} size - El tamaño seleccionado, puede ser 'original' o un objeto con nombre, ancho y alto.
	 */
	const handleSizeClick = (size) => {
		let newHeight

		if (size === 'original') {
			if (originalOrientation === canvasOptions.orientation) {
				newHeight = (375 * previewImg.height) / previewImg.width
			} else {
				newHeight = (375 * previewImg.width) / previewImg.height
			}
		} else {
			newHeight = (375 * size.height) / size.width
		}

		setCanvasOptions({
			...canvasOptions,
			size: size === 'original' ? 'original' : size.name,
			height: newHeight,
		})
	}

	return (
		<div className="options">
			{selectedLayer === 'text' ? (
				<div className="">
					<div className="editingOption">
						<span>Font Size</span>
						<input
							type="number"
							value={textOptions.fontSize}
							onChange={(e) =>
								setTextOptions({ ...textOptions, fontSize: e.target.value })
							}
						/>
					</div>
					<div className="editingOption">
						<span>Color</span>
						<div className="textColor">
							<div
								className="colorPreview"
								style={{ backgroundColor: textOptions.color }}
								onClick={() => setIsColorPickerOpen((prev) => !prev)}
							/>
							{isColorPickerOpen && (
								<div className="colorPicker">
									<HexColorPicker
										color={textOptions.color}
										onChange={(color) =>
											setTextOptions({ ...textOptions, color })
										}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="">
					<div className="editingOption">
						<span>Orientation</span>
						<div className="orientations">
							<div
								className={`orientation ${
									canvasOptions.orientation === 'portrait' ? 'selected' : ''
								}`}
								onClick={() => handleOrientationClick('portrait')}
							>
								P
							</div>
							<div
								className={`orientation ${
									canvasOptions.orientation === 'landscape' ? 'selected' : ''
								}`}
								onClick={() => handleOrientationClick('landscape')}
							>
								L
							</div>
						</div>
					</div>
					<div className="editingOption">
						<span>Size</span>
						<div className="sizes">
							<div
								className={`size ${
									canvasOptions.size === 'original' ? 'selected' : ''
								}`}
								onClick={() => handleSizeClick('original')}
							>
								Original
							</div>
							{canvasOptions.orientation === 'portrait' ? (
								<>
									{portraitSizes.map((size) => (
										<div
											className={`size ${
												canvasOptions.size === size.name ? 'selected' : ''
											}`}
											key={size.name}
											onClick={() => handleSizeClick(size)}
										>
											{size.name}
										</div>
									))}
								</>
							) : (
								<>
									{landscapeSizes.map((size) => (
										<div
											className={`size ${
												canvasOptions.size === size.name ? 'selected' : ''
											}`}
											key={size.name}
											onClick={() => handleSizeClick(size)}
										>
											{size.name}
										</div>
									))}
								</>
							)}
						</div>
					</div>
					<div className="editingOption">
						<span>Background Color</span>
						<div className="bgColor">
							<div className="textColor">
								<div
									className="colorPreview"
									style={{ backgroundColor: canvasOptions.backgroundColor }}
									onClick={() => setIsColorPickerOpen((prev) => !prev)}
								/>
								{isColorPickerOpen && (
									<div className="colorPicker">
										<HexColorPicker
											color={canvasOptions.backgroundColor}
											onChange={(color) =>
												setCanvasOptions({
													...canvasOptions,
													backgroundColor: color,
												})
											}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Options
