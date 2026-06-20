import { useState } from "react";
import axios from "axios";
import "./Kyc.css";

function Kyc() {
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/kyc/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "KYC Submission Failed");
    }
  };

  return (
    <div className="kyc-container">
      <form className="kyc-form" onSubmit={handleSubmit}>
        <h2>KYC Verification</h2>

        <input
          type="text"
          name="aadhaar"
          placeholder="Enter Aadhaar Number"
          value={formData.aadhaar}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pan"
          placeholder="Enter PAN Number"
          value={formData.pan}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit KYC</button>
      </form>
    </div>
  );
}

export default Kyc;