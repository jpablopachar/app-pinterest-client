import { landscapeSizes, portraitSizes } from './data/optionsData'
import useOptions from './hooks/useOptions'

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
		isColorPickerOpen,
		setTextOptions,
		setCanvasOptions,
		toggleColorPicker,
		handleOrientationClick,
		handleSizeClick,
	} = useOptions(previewImg)

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
								onClick={toggleColorPicker}
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
									onClick={toggleColorPicker}
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
