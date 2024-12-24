import * as Dialog from "@radix-ui/react-dialog";

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        {/* Overlay with blur effect */}
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm" />
        {/* Centered Dialog Content */}
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
          <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
            {/* Warning Icon */}
            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Message and Actions */}
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <Dialog.Title className="text-lg font-medium text-gray-800">
                Confirm Action
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                {message}
              </Dialog.Description>
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <button
                  onClick={onConfirm}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                >
                  Delete
                </button>
                <button
                  onClick={onCancel}
                  aria-label="Cancel"
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmationDialog;
