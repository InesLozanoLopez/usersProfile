import React from "react";

interface addHouseConfirmationMessageProps {
    message: string;
    handleAddHouse: () => void;
}


const AddHouseConfirmationMessage: React.FC<addHouseConfirmationMessageProps> = ({
    message,
    handleAddHouse,
}) => {


    return (
        <div className="confirmationMessage">
            <div className="confirmationMessage">

                <button
                    type="button"
                    className="button"
                    onClick={handleAddHouse}
                    aria-label="To add a new house profile">{message}</button>
            </div>
        </div>
    )
}

export default AddHouseConfirmationMessage;
