"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  titleClass?: string;
  dialogClass?: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  closeModal,
  title,
  titleClass = "text-lg font-medium leading-6 text-gray-900",
  dialogClass = "w-1/2",
  children,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal wrapper */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
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
              className={`${dialogClass} max-h-[90vh] p-2 relative overflow-hidden rounded bg-white text-left shadow-xl transition-all transform`}
            >
              {/* Fixed top header with title and close icon */}
              <div className="sticky top-0 left-0 right-0 flex items-center justify-between bg-white z-10 shadow-sm">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className={`${titleClass} flex-grow text-center`}
                  >
                    {title}
                  </Dialog.Title>
                )}
                <IoIosCloseCircleOutline
                  size={30}
                  className="cursor-pointer hover:bg-red-200 transition rounded-full p-1"
                  onClick={closeModal}
                />
              </div>

              {/* Scrollable body content */}
              <div className="overflow-y-auto max-h-[calc(90vh-60px)] mt-4">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
