import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';
import { countdown } from './Helper';

export default function LoginForm(props) {
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [mobileNumber, setMobileNumber] = useState('')
    const [counter, setCounter] = useState(59);

    const router = useRouter()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validateMobileNumber = Yup.object().shape({
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(phoneRegExp, 'Mobile number is not valid'),

    });
    const formOptions = { resolver: yupResolver(validateMobileNumber) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);

    const { errors } = formState;

    const userLogin = async (data) => {
        // countdown('otp-timer', 1, 0)
        setMobileNumber(data.mobile)
        setStep1(false)
        setStep2(true)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user-login`, data)
            .then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

    const OtpVerify = async (data) => {
        await axios.post(`${process.env.NEXT_PUBLIC_URL}otp-verify`, data)
            .then(function (res) {

                if (res.data.status == 1) {
                    localStorage.setItem('lr-user-token', res.data.token)
                    // router.reload();
                    router.push(props.redirectRoute);
                    props.closePop();
                }

            }).catch(function (error) {
                console.log(error);
                if (error && error.response.data.status === 0) {
                    alert(error.response.data.message);
                    // if (error.response.data.status == 0) {
                    //     alert(error.response.data.message)
                    // }
                    console.log(error)
                }
            });

    }

    const resendOTP = async () => {
        // countdown('otp-timer', 1, 0)
        setCounter(59)
        setMobileNumber(mobileNumber)
        setStep1(false)
        setStep2(true)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user-login`, { mobile: mobileNumber })
            .then(function (res) {
                if (res.data.status == 1) {
                    // alert(res.data.message);
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter])

    return (
        <>
            <div className={`${props.Login ? "open-popup" : ""} common-popup login`}>

                <div className='popup-inner'>

                    <div className='popup-close' onClick={props.closePop}></div>

                    <div className='before-otp' style={{ display: `${step1 ? 'block' : 'none'}` }}>
                        <img src="/img/login-icon.svg" />

                        <h3>{props.logInHeading}</h3>

                        <form method='POST' onSubmit={handleSubmit(userLogin)}>

                            <div className='from-row'>

                                <div className='form-div'>

                                    <label>Email / Mobile Number</label>
                                    <input type="text" {...register('mobile')} name="mobile" maxLength={10} />
                                    <div className="invalid-feedback error">{errors.mobile?.message}</div>

                                </div>
                            </div>
                            <div className='from-row'>
                                <div className='form-div checkbox'>
                                    <input id='whatsappUpdate' type="checkbox" />
                                    <label for="whatsappUpdate">Get updates on <span>WhatsApp</span></label>
                                    <div className='clr'></div>
                                    <div className='links'>By logging in, I agree to <a href='#'>terms</a> and <a href='#'> privacy policy</a></div>

                                </div>
                            </div>
                            <button type='submit' className='btn'>Request OTP</button>
                        </form>

                    </div>

                    <div className='after-otp' style={{ display: `${step2 ? 'block' : 'none'}` }}>
                        <img src="/img/otp-icon.svg" />

                        <h3>Enter OTP</h3>
                        <form method='POST' onSubmit={handleSubmit(OtpVerify)}>
                            <div className='from-row'>

                                <div className='form-div'>
                                    <p>Please enter the OTP sent to <i>{mobileNumber}</i> <span>Change</span></p>
                                    <input type="hidden" name="mobile" id="mobileNumber" defaultValue={mobileNumber} />
                                    <input type="text" {...register('otp')} maxLength={4} name="otp" />
                                    <div className="invalid-feedback error">{errors.otp?.message}</div>

                                </div>
                            </div>
                            <button type='submit' className='btn'>Verify & Proceed</button>
                            <div className='resend-otp'>Didn’t received your OTP?
                                {counter === 0
                                    ? <span id="resendOtp" onClick={() => resendOTP()}>Resend OTP</span>
                                    : <span className='otp-timer'>0:{counter}</span>
                                }
                                {/* <span id="resendOtp" style={{ display: 'none' }} onClick={() => resendOTP()}>Resend OTP</span>
                                <span className='otp-timer' id="otp-timer"></span> */}
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}
