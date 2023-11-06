import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import Select from 'react-select'
import useSWR from 'swr'
import DatePicker from "react-datepicker";
import makeAnimated from 'react-select/animated';
import { $ } from 'react-jquery-plugin'

export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const router = useRouter()
    const [data, setData] = useState('')
    const [logo, setLogo] = useState('')
    const [getCmsPages, setGetCmsPages] = useState([]);
    const query = router.query.id

    const getAllCmsPages = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-cms-pages`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            setGetCmsPages(res.data.cmsPages);
        }).catch((e) => {
            setGetCmsPages([]);
        });
    }

    const addUpdateTestimonial = async (e) => {
        e.preventDefault();
        var createError = 0;

        if (document.getElementById('first_name').value.trim() == '') {
            document.getElementById('firstNameError').innerHTML = 'Please enter first name';
            document.getElementById("firstNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('firstNameError').innerHTML = '';
                document.getElementById("firstNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (document.getElementById('last_name').value.trim() == '') {
            document.getElementById('lastNameError').innerHTML = 'Please enter last name';
            document.getElementById("lastNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('lastNameError').innerHTML = '';
                document.getElementById("lastNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (document.getElementById('product_name').value.trim() == '') {
            document.getElementById('productNameError').innerHTML = 'Please enter product name';
            document.getElementById("productNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('productNameError').innerHTML = '';
                document.getElementById("productNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (document.getElementById('testimonial_type').value.trim() == '') {
            document.getElementById('testimonialTypeError').innerHTML = 'Please select testimonial type';
            document.getElementById("testimonialTypeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('testimonialTypeError').innerHTML = '';
                document.getElementById("testimonialTypeError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (document.getElementById('rating').value.trim() == '') {
            document.getElementById('ratingError').innerHTML = 'Please enter rating';
            document.getElementById("ratingError").style.display = "block";
            setTimeout(() => {
                document.getElementById('ratingError').innerHTML = '';
                document.getElementById("ratingError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (document.getElementById('description').value.trim() == '') {
            document.getElementById('descriptionError').innerHTML = 'Please enter description';
            document.getElementById("descriptionError").style.display = "block";
            setTimeout(() => {
                document.getElementById('descriptionError').innerHTML = '';
                document.getElementById("descriptionError").style.display = "none";
            }, 3000);
            createError++;
        }


        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        setTinyloader(true);
        const formData = new FormData(document.getElementById('testimonialForm'));
        formData.append('user_image', logo)
        formData.delete('files')
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/create-testimonial`

        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-testimonial/${query}`

        if (query) {
            await axios.post(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message)
                    router.push('/admin/testimonial')
                }
            }).catch(function (error) {
                if (error.response.status === 422) {
                    alert(error.response.data.message)
                }
                setTinyloader(false)
            });
        } else {
            await axios.post(addUrl, formData, {
                headers: {
                    // 'Accept': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message)
                    router.push('/admin/testimonial')
                }
            }).catch(function (error) {
                if (error.response && error.response.status === 422) {
                    alert(error.response && error.response.data && error.response.data.message)
                }
                setTinyloader(false)
            });
        }
    }


    const allTestimonialData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-testimonial/${query}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setData(res.data.data)
            }
        }).catch(function (error) {
            console.log(error)
        });
    }


    useEffect(() => {
        getAllCmsPages()
        import("react-datepicker/dist/react-datepicker.css");

        if (query) {
            allTestimonialData()
        }

    }, [query])
    return (
        <>
            <Head>
                <title>LR | {query ? `Update` : `Add`} Testimonial </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />

                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js"></script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Testimonial' : 'Add Testimonial'} />
                <div className="form-style calender-style">
                    <form id="testimonialForm" enctype="multipart/form-data">
                        <div className="wrapper">
                            <div className="form-row">
                                <input type="hidden" name={data && data._id ? 'id' : ''} defaultValue={data && data._id ? data._id : ''} />

                                <div className="form-div">
                                    <input id="first_name" type="text" placeholder=' ' name="first_name" defaultValue={data && data.first_name ? data.first_name : ''} />
                                    <label htmlFor="first_name">First Name*</label>
                                    <small id="firstNameError" className='error'></small>
                                </div>

                                <div className="form-div">
                                    <input id="last_name" placeholder=' ' name='last_name' type="text" defaultValue={data && data.last_name ? data.last_name : ''} />
                                    <label htmlFor="last_name"> Last Name*</label>
                                    <small id="lastNameError" className='error'></small>
                                </div>

                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file*</label>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                </div>

                            </div>

                            <div className="form-row">

                                <div className="form-div">
                                    <select className="floating-select" placeholder=' ' id="testimonial_type" name='testimonial_type'>
                                        <option value=""></option>
                                        {
                                            getCmsPages && getCmsPages.map((cms) => {
                                                return (
                                                    <option value={`${cms.slug}`} key={cms._id} selected={data && data.testimonial_type === cms.slug ? true : false}>{cms.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="testimonial_type">Testimonial Type*</label>
                                    <small id="testimonialTypeError" className='error'></small>
                                </div>

                                <div className="form-div">
                                    <input id="product_name" placeholder=' ' name="product_name" type="text" defaultValue={data && data.product_name ? data.product_name : ''} />
                                    <label htmlFor="product_name">Product Name*</label>
                                    <small id="productNameError" className='error'></small>
                                </div>

                                <div className="form-div">
                                    <input id="serviceName" placeholder=' ' name="service_name" type="text" defaultValue={data && data.service_name ? data.service_name : ''} />
                                    <label htmlFor="serviceName">Service Name</label>
                                    <small id="serviceNameError" className='error'></small>
                                </div>


                            </div>
                            <div className="form-row two-col">
                                <div className="form-div">
                                    <input placeholder=' ' type="text" name="rating" id="rating" defaultValue={data && data.rating ? data.rating : ''} />
                                    <label htmlFor="rating">Rating</label>
                                    <small className="error" id="ratingError"></small>
                                </div>

                                <div className="form-div">
                                    <input placeholder=' ' type="url" name="video_url" id="video_url" defaultValue={data && data.video_url ? data.video_url : ''} />
                                    <label htmlFor="video_url">Video Url</label>
                                    <small className="error" id="VideoError"></small>
                                </div>
                            </div>

                            <div className="form-row one-col">
                                <div className="form-div">
                                    <textarea placeholder=" " name='description' id="description" defaultValue={data && data.description ? data.description : ''}>

                                    </textarea>
                                    <label htmlFor="description">Description</label>
                                    <small className="error" id="descriptionError"></small>
                                </div>
                            </div>
                            <div className='custom-check'>
                                <div className='service-senter'>
                                    <span>Select For Home*</span>
                                </div>
                                <div className='form-div'>
                                    <div className='form-div'>
                                        <input type="checkbox" name="select_home" id="select_home" value='yes' defaultChecked={data && data.select_home ? data.select_home === 'yes' ? true : false : ''} />
                                        <label htmlFor="html">View Home Page</label>
                                    </div>
                                </div>

                            </div>
                            <div className="common-buttons">
                                <button type='button' className="green" onClick={(e) => addUpdateTestimonial(e)} disabled={tinyloader}>
                                    <ButtonSpinner load={tinyloader} btnName="Save" />
                                </button>
                            </div>
                            <div>

                            </div>

                        </div>
                    </form>

                </div>
            </Layout>
        </>
    )
}

