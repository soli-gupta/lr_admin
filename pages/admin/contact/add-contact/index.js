import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Index() {
    const router = useRouter()
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        mobile: Yup.string()
            .required('Mobile is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        query_type: Yup.string().required('Please select query type'),
        // query_type: Yup.string()
        //     .required('Please select query type'),
        description: Yup.string()
            .required('Message is required'),
        // file: Yup.mixed().test("file", "You need to provide a file", (value) => {
        //     if (value.length > 0) {
        //         return true;
        //     }
        //     return false;
        // }),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/contact`, data, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {

            if (res.data.status == 1) {
                alert(res.data.message);
                router.push('/admin/contact')
            }
        }).catch(function (error) {
            console.log(error)

        });
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        // return false;
    }
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <div className="form-style">
                <form id="contactForm" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="wrapper">
                        {/* <div className="form-row"> */}
                        <div className="form-row two-col">
                            <div className="form-div">
                                <input id="name" name='name' placeholder=' ' {...register('name')} type="text" />
                                <label htmlFor="name">Name</label>
                                <div className="invalid-feedback error">{errors.name?.message}</div>
                            </div>
                            <div class="form-div">
                                <input id="mobile" placeholder=' '  {...register('mobile')} name="mobile" type="text" />
                                <label htmlFor="mobile">Mobile</label>
                                <div className="invalid-feedback error">{errors.mobile?.message}</div>
                            </div>
                        </div>
                        <div className="form-row two-col">
                            <div className="form-div">
                                <input id="email" name='email' placeholder=' ' {...register('email')} type="text" />
                                <label htmlFor="name">Email</label>
                                <div className="invalid-feedback error">{errors.email?.message}</div>
                            </div>
                            <div className="form-div">
                                {/* <input type="text" name="query_type" id="" placeholder=' '   {...register('query_type')}  /> */}
                                <select className="floating-select" name='query_type'  {...register('query_type')}>
                                    <option value=""></option>
                                    <option value="buy a car">Buy a car</option>
                                    <option value="sell a car">Sell a car</option>
                                    <option value="service">Service</option>
                                    <option value="car care">Car care</option>
                                </select>
                                <label htmlFor="mobile">Query Type</label>
                                <div className="invalid-feedback error">{errors.query_type?.message}</div>
                            </div>
                        </div>
                        <div className='form-row one-col'>
                            <div className='form-div'>
                                <textarea name="description" placeholder=' ' {...register('description')}></textarea>
                                <label htmlFor="message">Message</label>
                                <div className="invalid-feedback error">{errors.description?.message}</div>
                            </div>
                        </div>
                        {/* <div className='form-row two-col'>
                            <div className="form-div file-upload">
                                <div className="custom-label">Image</div>
                                <input type="file" id="file-upload2" />
                                <label htmlFor="file-upload2">Upload file</label>
                                <small id="bodyLogoError" className="error"></small>
                                <div id="file-upload-filename"></div>
                                <div className="image-des">Image Size : 1920 x 800</div>
                            </div>
                        </div> */}
                        {/* </div> */}

                        <div className="common-buttons">
                            <button className="green" type="submit" >save</button>
                            <button className="" onClick={() => reset()} >save</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
