import React, { useState } from 'react';
import { IUserInfo } from '../../../interfaces';
import { FormikProps } from 'formik';
import AddHouseConfirmationMessage from './addHouseConfirmationMessage';
import DeleteHouseConfirmationMessage from './deleteHouseConfirmationMessage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileForm: React.FC<{ formik: FormikProps<IUserInfo> }> = ({
  formik,
}) => {
  const navigate = useNavigate();
  const [showConfirmationMessage, setShowConfirmationMessage] =
    useState<boolean>(false);

  const confirmDeleteHouse = () => {
    formik.setValues({
      ...formik.values,
      house: 'Not added yet',
    });
    setShowConfirmationMessage(!showConfirmationMessage);
  };

  const handleAddHouse = async () => {
    try {
      await formik.submitForm();
      navigate('/house-profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="userDetailsContainer">
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="formInput"
          aria-label="Your Name"
        />
        <input
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="formInput"
          aria-label="Your Email"
        />
      </div>

      <div className="houseContainer">
        House:
        <input
          type="text"
          id="house"
          name="house"
          value={formik.values.house}
          className="formInput"
          aria-label="House name"
          readOnly
        />
        <button
          type="submit"
          className="button"
          aria-label="To delete your profile on that house"
          onClick={() => setShowConfirmationMessage(true)}
        >
          I live somewhere else
        </button>
      </div>

      {showConfirmationMessage && (
        <DeleteHouseConfirmationMessage
          message="Are you sure you want to delete this house?"
          confirmDeleteHouse={confirmDeleteHouse}
          setShowConfirmationMessage={setShowConfirmationMessage}
        />
      )}

      <div className="adminContainer">
        <div>
          Are you the lead tenant of a house?
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={formik.values.admin}
            onChange={(e) => {
              formik.setValues({
                ...formik.values,
                admin: e.target.checked,
              });
            }}
          />
        </div>

        {formik.values.admin && formik.values.house === 'Not added yet' && (
          <AddHouseConfirmationMessage
            message="Click to add a new house"
            handleAddHouse={handleAddHouse}
          />
        )}
      </div>

      <div className="submitButton">
        <button type="submit" className="button" aria-label="To submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
