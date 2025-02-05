import classes from "../css-modules/Modal.module.css"
import ReactPortal from "./ReactPortal";


interface ModalProps extends React.PropsWithChildren {
    isOpen: boolean,
    handleClose: () => void,
}


export default function Modal({ children, isOpen, handleClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="container">
            <div className={classes.modalContainer}>
                <div className={classes.modalContent}>
                    {children}
                    <button onClick={handleClose} className="sm-button orange-button" >
                        Close
                    </button>
                </div>
            </div>
        </ReactPortal>
    );

}