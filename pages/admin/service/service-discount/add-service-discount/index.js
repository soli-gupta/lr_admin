import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { $ } from 'react-jquery-plugin'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import DatePicker from "react-datepicker";

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const router = useRouter()
    const [data, setData] = useState([])
    const [serviceCategory, setServiceCategory] = useState([])
    const [serviceSubCategory, setServiceSubCategory] = useState([])

    const id = router.query.id

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('')
    const [discountType, setDiscountType] = useState('');

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

    const selectSubCategoryByCatId = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-sub-category-by-catId?id=${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data && res.data.status == 1) {
                setServiceSubCategory(res.data.data)
            }
        }).catch(function (error) {
            if (error.response && error.response.data && error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }

    const discountAmount = (value) => {
        if (value === 1) {

        } else {

        }
    }

    const addUpdateServiceDiscount = async (e) => {
        e.preventDefault();
        var createError = 0;
        if (e.target.service_category_id.value.length <= 0) {
            document.getElementById('serviceCatId').innerHTML = 'Please select category';
            document.getElementById("serviceCatId").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCatId').innerHTML = '';
                document.getElementById("serviceCatId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_discount_price.value.length <= 0) {
            document.getElementById('servicePriceError').innerHTML = 'Please enter price';
            document.getElementById("servicePriceError").style.display = "block";
            setTimeout(() => {
                document.getElementById('servicePriceError').innerHTML = '';
                document.getElementById("servicePriceError").style.display = "none";
            }, 3000);
            createError++;
        }


        if (createError > 0) {
            setTinyloader(false);
            return false;
        }
        // setTinyloader(true);
        const formData = new FormData(document.getElementById('addServiceDiscountForm'));

        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/create-service-discount`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-service-discount/${id}`

        if (id) {
            await axios.post(updateUrl, formData, {
                headers: {
                    'Content-type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/service/service-discount')
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
                    router.push('/admin/service/service-discount')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }

    const editServiceCategory = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-service-discount/${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setData(res.data.data)
                selectSubCategoryByCatId(res.data.data.service_category_id._id)
                fetchVariantsByModel(res.data.data.model_id._id)
            }
        }).catch(function (error) {
            console.log(error)

        });
    }

    useEffect(() => {
        import("react-datepicker/dist/react-datepicker.css");
        // setCurrentDate(new Date());
        serviceCategoryList()

        if (id) {
            editServiceCategory()
        }

    }, [id])
    console.log(data)
    return (
        <>
            <Head>
                <title>LR | {id ? 'Update' : 'Add'} Service Discount </title>
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
                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js"></script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
            </Head>
            <Layout>
                <Breadcrumb title={id ? 'Update Service Discount' : ' Add Service Discount'} />
                <div className="form-style calender-style">
                    <form action="" id="addServiceDiscountForm" onSubmit={(e) => addUpdateServiceDiscount(e)} method="POST">
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="service_category_id" name="service_category_id" placeholder=' ' onChange={(e) => selectSubCategoryByCatId(e.target.value)} >
                                        <option value=""></option>
                                        {
                                            serviceCategory != '' && serviceCategory?.map((service, i) => {
                                                return (
                                                    <option value={`${service._id}`} key={service._id} selected={data && data.service_category_id && data.service_category_id._id === service._id ? true : false}>{service.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Select Category">Select Service Category</label>
                                    <small id="serviceCatId" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <select className="floating-select" id="service_sub_category_id" name="service_sub_category_id" placeholder=' ' >
                                        <option value=""></option>
                                        {
                                            serviceSubCategory != '' && serviceSubCategory.length > 0 ? serviceSubCategory?.map((sub_service, i) => {
                                                return (
                                                    <option value={`${sub_service._id}`} key={sub_service._id} selected={data && data.service_sub_category_id && data.service_sub_category_id._id === sub_service._id ? true : false}>{sub_service.service_sub_category_name}</option>
                                                )
                                            })
                                                : <option value="">Data not available</option>}
                                    </select>
                                    <label htmlFor="Select Category">Select Service Sub Category</label>
                                    <small id="serviceCatId" className="error"></small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="discount_type" name="discount_type" placeholder=' ' onChange={(e) => setDiscountType(e.target.value)}>
                                        <option value=""></option>
                                        <option value="1" selected={data && data.discount_type === '1' ? true : false}>Amount</option>
                                        <option value="2" selected={data && data.discount_type === '2' ? true : false}>Percentange</option>

                                    </select>
                                    <label htmlFor="Select Discount Type">Select discount type</label>
                                    <small id="serviceCatId" className="error"></small>
                                </div>

                                <div className="form-div">
                                    <input id="service_discount_price" name="service_discount_price" type="text" placeholder=" " defaultValue={data && data.service_discount_price ? data.service_discount_price : ''} />
                                    <label htmlFor="Kms Driven">Discount Price</label>
                                    <small id="servicePriceError" className="error"></small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-div">
                                    <br /> <br />
                                    <DatePicker
                                        className='calender-icon'
                                        name='start_discount_date'
                                        minDate={new Date()}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)} />
                                    <label htmlFor="">Discount Start Date</label>
                                </div>

                                <div className="form-div">
                                    <br /> <br />
                                    <DatePicker
                                        className='calender-icon'
                                        name='end_discount_date'
                                        minDate={startDate}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)} />
                                    <label htmlFor="">Discount End Date</label>
                                </div>
                            </div>
                            <div className='form-row'>
                                <input type="hidden" name="id" value={data && data._id ? data._id : ''} />
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