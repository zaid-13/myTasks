// import React from "react";
// import ReactDOM from "react-dom/client";

// import "./Modal.css";
// const modalRoot = ReactDOM.createRoot(document.getElementById('modal'));

// const ModalOpen = ({component}) => {
//     const uniqueModal = new Modal();
//     return uniqueModal.open({component});
// }

// const ModalClose = () => {
//     const uniqueModal = new Modal();
//     return uniqueModal.close();
// }

// const MultiModal = {
//     open: ModalOpen,
//     close: ModalClose
// }

// export default MultiModal;

// function Modal() {}
// Modal.prototype.open = function({component}) {
//     this.component = component;
//     // const callback = () => {

//     // }
//     modalRoot.render(<ModalWrapper that={this} />)
// }

// Modal.prototype.close = function() {
//     modalRoot.render();
// }

// const ModalWrapper = ({that}) => {
//     return (
//         <div className="modal" onClick={MultiModal.close} >
//             <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//                 {React.cloneElement(that.component)}
//             </div>
//         </div>
//     )
// }







// Testing my own functionality

import React from 'react';
import ReactDOM from 'react-dom/client';
import './Modal.css';

const modalRoot = ReactDOM.createRoot(document.getElementById('modal'));

function Modal() {}

Modal.prototype.open = function(component) {
    this.component = component;

    modalRoot.render(<ModalWrapper that={this} />)
}

Modal.prototype.close = function() {
    return modalRoot.render();
}

function ModalWrapper({that}) {
    return (
        <div className="modal" onClick={modalClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {that.component}
            </div>
        </div>
    )
}

const modalOpen = (component) => {
    const modal = new Modal();
    return modal.open(component);
}

const modalClose = () => {
    const modal = new Modal();
    return modal.close();
}

const modalObj = {
    open: modalOpen,
    close: modalClose
}

export default modalObj;