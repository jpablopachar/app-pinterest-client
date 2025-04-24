import Editor from '../../components/Editor/Editor'
import Image from '../../components/Image/Image'
import BoardForm from './components/BoardForm/BoardForm'
import './CreatePage.css'
import useCreatePage from './hooks/useCreatePage'

/**
 * Componente CreatePage
 *
 * Página para crear un nuevo Pin, permitiendo al usuario subir una imagen o video,
 * editarlo, agregar título, descripción, enlace, seleccionar o crear un tablero,
 * y añadir etiquetas. Utiliza formularios controlados y maneja la previsualización
 * de archivos, así como la navegación tras la creación exitosa del Pin.
 *
 * @component
 * @returns {JSX.Element} El componente CreatePage.
 */
const CreatePage = () => {
	const {
		formRef,
		previewImg,
		isEditing,
		newBoard,
		isNewBoardOpen,
		boardsData,
		isBoardsLoading,
		boardsError,
		handleSubmit,
		handleNewBoard,
		setFile,
		setIsEditing,
		setNewBoard,
		setIsNewBoardOpen,
	} = useCreatePage()

	return (
		<div className="createPage">
			<div className="createTop">
				<h1>{isEditing ? 'Design your Pin' : 'Create Pin'}</h1>
				<button onClick={handleSubmit}>{isEditing ? 'Done' : 'Publish'}</button>
			</div>
			{isEditing ? (
				<Editor previewImg={previewImg} />
			) : (
				<div className="createBottom">
					{previewImg.url ? (
						<div className="preview">
							<img src={previewImg.url} alt="" />
							<div className="editIcon" onClick={() => setIsEditing(true)}>
								<Image path="/general/edit.svg" alt="" />
							</div>
						</div>
					) : (
						<>
							<label htmlFor="file" className="upload">
								<div className="uploadTitle">
									<Image path="/general/upload.svg" alt="" />
									<span>Choose a file</span>
								</div>
								<div className="uploadInfo">
									We recommend using high quality .jpg files less than 20 MB or
									.mp4 files less than 200 MB.
								</div>
							</label>
							<input
								type="file"
								id="file"
								hidden
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</>
					)}
					<form className="createForm" ref={formRef}>
						<div className="createFormItem">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								placeholder="Add a title"
								name="title"
								id="title"
							/>
						</div>
						<div className="createFormItem">
							<label htmlFor="description">Description</label>
							<textarea
								rows={6}
								type="text"
								placeholder="Add a detailed description"
								name="description"
								id="description"
							/>
						</div>
						<div className="createFormItem">
							<label htmlFor="link">Link</label>
							<input
								type="text"
								placeholder="Add a link"
								name="link"
								id="link"
							/>
						</div>
						{(!isBoardsLoading || !boardsError) && (
							<div className="createFormItem">
								<label htmlFor="board">Board</label>
								<select name="board" id="board">
									<option value="">Choose a board</option>
									{boardsData?.map((board) => (
										<option value={board._id} key={board._id}>
											{board.title}
										</option>
									))}
								</select>
								<div className="newBoard">
									{newBoard && (
										<div className="newBoardContainer">
											<div className="newBoardItem">{newBoard}</div>
										</div>
									)}
									<div className="createBoardButton" onClick={handleNewBoard}>
										Create new board
									</div>
								</div>
							</div>
						)}
						<div className="createFormItem">
							<label htmlFor="tags">Tagged topics</label>
							<input type="text" placeholder="Add tags" name="tags" id="tags" />
							<small>Don&apos;t worry, people won&apos;t see your tags</small>
						</div>
					</form>
					{isNewBoardOpen && (
						<BoardForm
							setIsNewBoardOpen={setIsNewBoardOpen}
							setNewBoard={setNewBoard}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default CreatePage
