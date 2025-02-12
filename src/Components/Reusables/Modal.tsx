
type ModalPropsType = {
    children: JSX.Element,
    borderColor: string,

}

const Modal = ({children, borderColor}: ModalPropsType) => {
  return <div className="modal" >
    <div className="modalScreen" style={{borderColor: borderColor}}>
        {children}
    </div>
  </div>;
};

export default Modal;
