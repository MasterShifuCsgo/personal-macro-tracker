import { useModalState, modalController } from './ModalStore.js'

export default function Modal() {
	const { active, content } = useModalState()

	return (
		<div
			className={`absolute bg-gray-800/50 w-screen min-h-screen z-50 ${
				active ? '' : 'hidden'
			}
    flex justify-center items-center s`}>
			<div className="bg-white p-5 sm:p-7 rounded-3xl w-max h-max flex flex-col gap-4">
				<span
					className="select-none text-2xl cursor-pointer font-medium"
					onClick={() => modalController.close()}>
					← Close
				</span>
				<div>{content}</div>
			</div>
		</div>
	)
}
