interface ModalProps {
    closeModal: () => void
    isOpen: boolean
    children: any
}

export default function Modal(props: ModalProps) {
    return props.isOpen ? (
        // modal backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(event) => {
                // only close the modal if the backdrop itself is clicked, not the dialog
                // currentTarget is the element the event listener is attached to (the backdrop)
                // target is the actual clicked element (if clicked on dialog)
                if (event.currentTarget === event.target) {
                    props.closeModal()
                }
            }}>
            {/* modal dialog */}
            <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl border-2 border-black bg-white p-5 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                    {/* modal title */}
                    <h2 className="text-xl font-bold">Thêm URL</h2>
                    {/* close button with onClose handler */}
                    <button type="button" onClick={props.closeModal}>
                        Đóng
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    ) : null
}