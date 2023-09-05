import React, { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./ErrorModal.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <button className={classes.closeButton} onClick={props.onCloseHandler}>
          X
        </button>
      </header>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

function ErrorModal(props) {
  const OverlayPortals = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDom.createPortal(<BackDrop onCloseHandler={props.onClose} />, OverlayPortals)}
      {ReactDom.createPortal(
        <ModalOverlay onCloseHandler={props.onClose}>{props.children}</ModalOverlay>,
        OverlayPortals
      )}
    </Fragment>
  );
}

export default ErrorModal;
