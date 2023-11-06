import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner } from '@/components/Helper'
import axios from 'axios'
import { $ } from 'react-jquery-plugin'
import { useRouter } from 'next/router'

export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const router = useRouter()
    const [data, setData] = useState([])
    const [serviceCategory, setServiceCategory] = useState([])
    const query = router.query.id

    const serviceCategoryList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/service-category-list`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data && res.data.status == 1) {
                setServiceCategory(res.data.data)
            }
        }).catch(function (error) {
            if (error.response && error.response.data && error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const addUpdateService = async (e) => {
        e.preventDefault();
        var createError = 0;

        if (e.target.service_category_id.value.length <= 0) {
            document.getElementById('serviceCategoryId').innerHTML = 'Please select category';
            document.getElementById("serviceCategoryId").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCategoryId').innerHTML = '';
                document.getElementById("serviceCategoryId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_sub_category_name.value.length <= 0) {
            document.getElementById('serviceNameError').innerHTML = 'Please enter sub category name';
            document.getElementById("serviceNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceNameError').innerHTML = '';
                document.getElementById("serviceNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_short_description.value.length <= 0) {
            document.getElementById('shortDescriptionError').innerHTML = 'Please enter short description';
            document.getElementById("shortDescriptionError").style.display = "block";
            setTimeout(() => {
                document.getElementById('shortDescriptionError').innerHTML = '';
                document.getElementById("shortDescriptionError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_description.value.length <= 0) {
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


        const formData = new FormData(document.getElementById('addServiceSubCategoryForm'));
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/create-service-sub-category`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-service-sub-category/${query}`

        if (query) {
            await axios.post(updateUrl, formData, {
                headers: {
                    'Content-type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/service/service-sub-category')
                }
            }).catch(function (error) {
                setTinyloader(false)
                console.log(error)

            });
        }
        else {
            formData.delete('id')
            await axios.post(addUrl, formData, {
                headers: {
                    'Content-type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/service/service-sub-category')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }

    const editServiceCategory = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-service-sub-category/${query}`, {
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
    console.log(data)
    useEffect(() => {
        serviceCategoryList()

        if (query) {
            editServiceCategory()
        }
        setTimeout(() => {
            $('.summernote').summernote({
                placeholder: 'Hello stand alone ui',
                tabsize: 2,
                height: 120,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview', 'help']]
                ]
            });
        }, 1000)
    }, [query])

    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Service Sub Category </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="/img/lr-favicon.ico"
                    rel="icon"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    href="/img/lr-favicon-dark.ico"
                    rel="icon"
                    media="(prefers-color-scheme: dark)"
                />
                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js" defer />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer />

                <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" defer></script>
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Service Sub Category' : ' Add Service Sub Category'} />
                <div className="form-style">
                    <form action="" id="addServiceSubCategoryForm" onSubmit={(e) => addUpdateService(e)} method="POST">
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="service_category_id" name="service_category_id" placeholder=' ' >
                                        <option value=""></option>
                                        {
                                            serviceCategory != '' && serviceCategory?.map((service, i) => {
                                                { console.log(data && data.service_category_id && data.service_category_id._id === service._id) }
                                                return (
                                                    <option value={`${service._id}`} key={service._id} selected={data && data.service_category_id && data.service_category_id._id === service._id ? true : false}>{service.name}</option>
                                                )

                                            })
                                        }
                                    </select>
                                    <label htmlFor="Select Category">Select Category</label>
                                    <small id="serviceCategoryId" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <input id="service_sub_category_name" name="service_sub_category_name" type="text" placeholder=" " defaultValue={data && data.service_sub_category_name ? data.service_sub_category_name : ''} />
                                    <label htmlFor="Service Name">Service Sub Category Name</label>
                                    <small id="serviceNameError" className="error"></small>
                                </div>

                                <div className="form-div">
                                    <input id="service_taken_hours" name="service_taken_hours" type="text" placeholder=" " defaultValue={data && data.service_taken_hours ? data.service_taken_hours : ''} />
                                    <label htmlFor="Taken Hours">Taken Hours</label>
                                    <small id="takenHoursError" className="error"></small>
                                </div>
                            </div>

                            <div className='form-row one-col'>
                                <div className="form-div">
                                    <br />
                                    <textarea className="summernote" id="service_short_description" name="service_short_description" defaultValue={data && data.service_short_description ? data.service_short_description : ''}>
                                    </textarea>
                                    <label htmlFor="">Short Description</label>
                                    <small id="shortDescriptionError" className="error"></small>
                                </div>
                            </div>
                            <div className='form-row one-col'>
                                <div className="form-div">
                                    <br />
                                    <textarea className="summernote" id="service_description" name="service_description" defaultValue={data && data.service_description ? data.service_description : ''}>
                                    </textarea>
                                    <label htmlFor="">Description</label>
                                    <small id="descriptionError" className="error"></small>
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="service_recommend" name="service_recommend" placeholder=' ' >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                    <label htmlFor="Select Category">Recommended</label>
                                </div>
                                <div className="form-div">
                                    <input id="service_sorting" name="service_sorting" type="text" placeholder=" " />
                                    <label htmlFor="Sorting">Sorting</label>

                                </div>

                            </div>

                            <div className="common-buttons">
                                <button className="green" disabled={tinyloader} type="submit">
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