"use client";
import { Modal } from "antd";

interface ModalProps {
  onCancel: () => void;
  onOk: () => void;
  open: any;
  children: React.ReactNode;
}

const ModalPart = ({ onCancel, onOk, open, children }: ModalProps) => {
  return (
    <>
      <Modal onCancel={onCancel} open={open} onOk={onOk}>
        {children}
      </Modal>
    </>
  );
};

export default ModalPart;
