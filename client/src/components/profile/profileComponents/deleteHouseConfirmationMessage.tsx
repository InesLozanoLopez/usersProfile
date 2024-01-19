import React from 'react';

interface DeleteHouseConfirmationMessageProps {
  message: string;
  confirmDeleteHouse: () => void;
  setShowConfirmationMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteHouseConfirmationMessage: React.FC<
  DeleteHouseConfirmationMessageProps
> = ({ message, confirmDeleteHouse, setShowConfirmationMessage }) => {
  const handleDeleteHouse = () => {
    setShowConfirmationMessage(false);
  };

  return (
    <div className="confirmationMessage">
      <p>{message}</p>

      <div className="confimationMessageButtons">
        <button
          type="button"
          className="button"
          aria-label="To delete your proffile on that house"
          onClick={confirmDeleteHouse}
        >
          Yes
        </button>

        <button
          type="button"
          className="button"
          aria-label="To delete your proffile on that house"
          onClick={handleDeleteHouse}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteHouseConfirmationMessage;
