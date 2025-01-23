import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={handleClose} className="modal-close-button">Close</button>
                </div>
            </section>
        </div>
    );
};

export default Modal;
