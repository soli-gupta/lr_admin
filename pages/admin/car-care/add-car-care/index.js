import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { $ } from 'react-jquery-plugin'
import { useRouter } from 'next/router'
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const router = useRouter()
    const [data, setData] = useState([])
    const [serviceCategory, setServiceCategory] = useState([])
    const [serviceSubCategory, setServiceSubCategory] = useState([])
    const [excelFile, setExcelFile] = useState('')
    const query = router.query.id


    const serviceCategoryList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/car-care-category-list`, {
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
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-car-care-sub-category-by-catId?id=${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data && res.data.status == 1) {
                setServiceSubCategory(res.data.data)
            }
        }).catch(function (error) {
            if (error.response && error.response.data && error.response.data.status === 0) {
                alert(error.response.data.message);
            }
        });
    }
    const addUpdateCarCarePackage = async (e) => {
        e.preventDefault();
        var createError = 0;
        if (e.target.car_care_category_id.value.length <= 0) {
            document.getElementById('serviceCatError').innerHTML = 'Please select category.';
            document.getElementById("serviceCatError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCatError').innerHTML = '';
                document.getElementById("serviceCatError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.car_care_sub_category_id.value.length <= 0) {
            document.getElementById('serviceSubCatError').innerHTML = 'Please select sub category.';
            document.getElementById("serviceSubCatError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceSubCatError').innerHTML = '';
                document.getElementById("serviceSubCatError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (query === undefined) {
            if (excelFile.length <= 0) {
                document.getElementById('fileError').innerHTML = 'Please select file.';
                document.getElementById("fileError").style.display = "block";
                setTimeout(() => {
                    document.getElementById('fileError').innerHTML = '';
                    document.getElementById("fileError").style.display = "none";
                }, 3000);
                createError++;
            }
        }
        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        // setTinyloader(true);
        const formData = new FormData(document.getElementById('addCarCarePackageForm'));
        formData.append('car-care-file', excelFile);

        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/admin-create-car-care-package`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/admin-car-care-package-update/${query}`

        if (query) {
            formData.delete('car-care-file')
            await axios.post(updateUrl, formData, {
                headers: {
                    'Content-type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/car-care')
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
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/car-care')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }

    const editServiceCategory = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/admin-car-care-package-view/${query}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setData(res.data.data)
                selectSubCategoryByCatId(res.data.data.car_care_category_id._id)
                // selectModelByBrand(res.data.data.brand_id._id)
                // fetchVariantsByModel(res.data.data.model_id._id)
            }
        }).catch(function (error) {
            console.log(error)

        });
    }

    useEffect(() => {
        // brandList()
        serviceCategoryList()


        if (query) {
            editServiceCategory()
        }

    }, [query])

    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Car Care Package </title>
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
                <Breadcrumb title={query ? 'Update Car Care' : ' Add Car Care'} />
                <div className="form-style">
                    <form action="" id="addCarCarePackageForm" onSubmit={(e) => addUpdateCarCarePackage(e)} method="POST">
                        <div className="wrapper">

                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="car_care_category_id" name="car_care_category_id" placeholder=' ' onChange={(e) => selectSubCategoryByCatId(e.target.value)}  >
                                        <option value=""></option>
                                        {
                                            serviceCategory != '' && serviceCategory?.map((service, i) => {

                                                return (
                                                    <option value={`${service._id}`} key={service._id} selected={data && data.car_care_category_id && data.car_care_category_id._id === service._id ? true : false}>{service.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Select Category">Select Category</label>
                                    <small id="serviceCatError" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <select className="floating-select" id="car_care_sub_category_id" name="car_care_sub_category_id" placeholder=' ' >
                                        <option value=""></option>
                                        {
                                            serviceSubCategory != '' && serviceSubCategory.length > 0 ? serviceSubCategory?.map((sub_service, i) => {
                                                return (
                                                    <option value={`${sub_service._id}`} key={sub_service._id} selected={data && data.car_care_sub_category_id && data.car_care_sub_category_id._id === sub_service._id ? true : false}>{sub_service.car_care_sub_category_name}</option>
                                                )
                                            })
                                                : <option value="">Data not available</option>}
                                    </select>
                                    <label htmlFor="Select Category">Select Sub Category</label>
                                    <small id="serviceSubCatError" className="error"></small>
                                </div>

                                <div className="form-div file-upload">
                                    <div className="custom-label">Upload csv/excel File</div>
                                    <input type="file" id="file-upload2" onChange={(e) => setExcelFile(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file*</label>
                                    <small id="fileError" className='error'></small>
                                    {/* <div className="image-des">Image Size : 1920 x 800</div> */}
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-div'>
                                    {query != undefined ?
                                        <div className="form-div">
                                            <input id="car_care_price" name="car_care_price" type="text" placeholder=" " defaultValue={data && data.car_care_price ? data.car_care_price : ''} />
                                            <label htmlFor="Kms Driven">Price</label>
                                            <small id="servicePriceError" className="error"></small>
                                        </div>
                                        : ''}

                                </div>
                            </div>
                            <input type="hidden" name="id" value={data && data._id ? data._id : ''} />
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