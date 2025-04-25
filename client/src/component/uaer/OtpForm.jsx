import React from 'react'
import SubmitButton from './UserSubmitButton'
import UserStore from '../../store/UsserStore'
import ValidationHelper from '../../utility/ValidationHelper'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const OtpForm = () => {
    const{OTPFormData,OTPFormOnChange,VerifyLoginRequest}=UserStore()

    const navigate = useNavigate(); 

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
            toast.error("Valid Pin Daw");
        } else {
            let res = await VerifyLoginRequest(OTPFormData.otp);
            res ? navigate("/") : toast.error("Something Went Wrong !");
        }
    };

  return (
    <div>
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                <div className="card p-5">
                            <h4>Enter Verification Code</h4>
                            <p>A verification code has been sent to the email address you provide</p>
                            <input value={OTPFormData.otp} onChange={(e)=>{OTPFormOnChange("otp",e.target.value)}}  placeholder="Verification" type="text" className="form-control"/>
                            <SubmitButton onClick={onFormSubmit}  className="btn mt-3 btn-success" text="Submit"/>
                        </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default OtpForm