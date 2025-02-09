"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
interface CustomModalProps {
  toggleVisibility?: Function;
  visibility: boolean;
  children: any;
  callBack?: Function;
  className?: string;
}
const CustomModal = ({
  toggleVisibility,
  visibility,
  children,
  callBack,
  className,
}: CustomModalProps) => {
  const closeModal = () => {
    toggleVisibility && toggleVisibility(false);
    callBack && callBack();
  };
  return (
    <>
      <Transition appear as={Fragment} show={visibility}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-[600px] transform overflow-hidden text-white text-left align-middle shadow-xl transition-all ${className}`}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default CustomModal;
CustomModal.defaultProps = {
  toggleVisibility: () => {},
  callBack: () => {},
  className: "",
};
