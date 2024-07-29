
type ModalPropsType = {
    children: JSX.Element
}

const Modal = ({children}: ModalPropsType) => {
  return <div className="modal">
    <div className="modalScreen">
        {children}
    </div>
  </div>;
};

export default Modal;
