import React from "react";
const ChangePassword = () => {
  return (
    <form className="changeUsername">
      <label htmlFor="">Change your password: </label>
      <input type="text" placeholder="Old password" />
      <input type="text" placeholder="New password" />
      <input type="text" placeholder="Confirm password" />
      <button type="submit">change password</button>
    </form>
  );
};

export default ChangePassword;
