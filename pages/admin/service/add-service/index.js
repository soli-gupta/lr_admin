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
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [variant, setVariant] = useState('')
    const [brandName, setBrandName] = useState('')
    const [modelName, setModelName] = useState('')
    const [variantName, setVariantName] = useState('')
    const [serviceCategory, setServiceCategory] = useState([])
    const [serviceSubCategory, setServiceSubCategory] = useState([])
    const [excelFile, setExcelFile] = useState('')
    const query = router.query.id

    // const Fuel = useSWR(`${process.env.NEXT_PUBLIC_URL}get-all-fuels`, fetcher);
    // const fetchBodyTypes = useSWR(`${process.env.NEXT_PUBLIC_URL}fetch-all-body-type`, fetcher);


    // const brandList = async () => {
    //     await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/fetch-brands`, {
    //         headers: {
    //             token: localStorage.getItem('lr-admin-token')
    //         }
    //     })
    //         .then(function (res) {
    //             if (res.data.status == 1) {
    //                 setBrand(res.data.brands)
    //             } else if (res.data.status == 0) {
    //                 alert(res.data.message);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             if (error.response && error.response.data && error.response.data.status === 0) {
    //                 alert(error.response.data.message);
    //             }
    //         });
    // }

    // const selectModelByBrand = async (brandId) => {
    //     setBrandName()
    //     setModel('')
    //     setVariant('')
    //     var e = document.getElementById("brand_id");
    //     var brand_name = e.options[e.selectedIndex].text;
    //     setBrandName(brand_name)
    //     await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-brand-model-by-brand?id=${brandId}`, {
    //         headers: {
    //             token: localStorage.getItem('lr-admin-token')
    //         }
    //     })
    //         .then(function (res) {
    //             if (res.data.status == 1) {
    //                 setModel(res.data.brand_model)
    //             } else if (res.data.status == 0) {
    //                 alert(res.data.message);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             if (error.response && error.response.data && error.response.data.status === 0) {
    //                 alert(error.response.data.message);
    //             }
    //         });

    // }
    // const fetchVariantsByModel = async (modelId) => {
    //     var e = document.getElementById("model_id");
    //     var model_name = e.options[e.selectedIndex].text;
    //     setModelName(model_name)
    //     const getVariants = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-variants-by-model?id=${modelId}`, {
    //         headers: {
    //             token: localStorage.getItem('lr-admin-token')
    //         }
    //     }).catch((err) => {
    //         if (err.response.data.status === 0) {
    //             setVariant([]);
    //             alert(`${err.response.data.message}`);
    //         }
    //     });
    //     if (getVariants && getVariants.data.status === 1) {
    //         setVariant(getVariants);
    //     } else if (getVariants && getVariants.data.status === 0) {
    //         alert(`${getVariants.data.message}`);
    //     }
    // }

    // const fetchVariant = () => {
    //     var e = document.getElementById("variant_id");
    //     var variant_name = e.options[e.selectedIndex].text;
    //     setVariantName(variant_name)
    // }

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
                alert(error.response.data.message);
            }
        });
    }
    const addUpdateService = async (e) => {
        e.preventDefault();
        var createError = 0;

        // if (e.target.brand_id.value.length <= 0) {
        //     document.getElementById('brandId').innerHTML = 'Please select brand';
        //     document.getElementById("brandId").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('brandId').innerHTML = '';
        //         document.getElementById("brandId").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        // if (e.target.model_id.value.length <= 0) {
        //     document.getElementById('modelId').innerHTML = 'Please select model';
        //     document.getElementById("modelId").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('modelId').innerHTML = '';
        //         document.getElementById("modelId").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        // if (e.target.variant_id.value.length <= 0) {
        //     document.getElementById('variantId').innerHTML = 'Please select variant';
        //     document.getElementById("variantId").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('variantId').innerHTML = '';
        //         document.getElementById("variantId").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        // if (e.target.fuel_type.value.length <= 0) {
        //     document.getElementById('fuelTypeError').innerHTML = 'Please select fuel type';
        //     document.getElementById("fuelTypeError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('fuelTypeError').innerHTML = '';
        //         document.getElementById("fuelTypeError").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (e.target.service_category_id.value.length <= 0) {
            document.getElementById('serviceCatError').innerHTML = 'Please select category.';
            document.getElementById("serviceCatError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCatError').innerHTML = '';
                document.getElementById("serviceCatError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_sub_category_id.value.length <= 0) {
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

        // if (e.target.service_price.value.length <= 0) {
        //     document.getElementById('servicePriceError').innerHTML = 'Please enter slug';
        //     document.getElementById("servicePriceError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('servicePriceError').innerHTML = '';
        //         document.getElementById("servicePriceError").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        // setTinyloader(true);
        const formData = new FormData(document.getElementById('addServiceForm'));
        formData.append('service-file', excelFile);
        // formData.append("brand_name", brandName)
        // formData.append("model_name", modelName)
        // formData.append("variant_name", variantName)
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        // return false
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/admin-create-service`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/admin-service-update/${query}`

        if (query) {
            formData.delete('service-file')
            await axios.post(updateUrl, formData, {
                headers: {
                    'Content-type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/service')
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
                    router.push('/admin/service')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }

    const editServiceCategory = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/admin-service-view/${query}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setData(res.data.data)
                selectSubCategoryByCatId(res.data.data.service_category_id._id)
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
        // setTimeout(() => {
        //     $('.summernote').summernote({
        //         placeholder: 'Hello stand alone ui',
        //         tabsize: 2,
        //         height: 120,
        //         toolbar: [
        //             ['style', ['style']],
        //             ['font', ['bold', 'underline', 'clear']],
        //             ['color', ['color']],
        //             ['para', ['ul', 'ol', 'paragraph']],
        //             ['table', ['table']],
        //             ['insert', ['link', 'picture', 'video']],
        //             ['view', ['fullscreen', 'codeview', 'help']]
        //         ]
        //     });
        // }, 1000)
    }, [query])

    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Service </title>
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
                <Breadcrumb title={query ? 'Update Service' : ' Add Service'} />
                <div className="form-style">
                    <form action="" id="addServiceForm" onSubmit={(e) => addUpdateService(e)} method="POST">
                        <div className="wrapper">
                            {/* <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="brand_id" name='brand_id' onChange={(e) => selectModelByBrand(e.target.value)}  >
                                        <option value=""></option>
                                        {
                                            brand && brand.map((brands, i) => {
                                                return (
                                                    <option value={`${brands._id}`} key={brands._id} selected={data.brand_id && data.brand_id._id === brands._id ? true : false}>{brands.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Brands">Brands</label>
                                    <small id="brandId" className="error"></small>
                                </div>

                                <div className="form-div">
                                    <select className="floating-select" id="model_id" name='model_id' onChange={(e) => fetchVariantsByModel(e.target.value)} >
                                        <option value=""></option>
                                        {
                                            model && model.map((models, i) => {
                                                return (
                                                    <option value={`${models._id}`} key={models._id} selected={data.model_id && data.model_id._id === models._id ? true : false}>{models.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Models">Models</label>
                                    <small id="modelId" className="error"></small>
                                </div>

                                <div className="form-div">
                                    <select className="floating-select" id="variant_id" name="variant_id" onChange={() => fetchVariant()} >
                                        <option value=""></option>
                                        {
                                            variant.data && variant.data.model_variant.map((variants) => {
                                                return (
                                                    <option value={`${variants._id}`} key={variants._id} selected={data.variant_id && data.variant_id._id === variants._id ? true : false}>{variants.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Variant">Variant</label>
                                    <small id="variantId" className="error"></small>
                                </div>
                            </div> */}

                            <div className="form-row">
                                {/* <div className="form-div">
                                    <select className="floating-select" id="fuel_type" name="fuel_type" placeholder=' ' >
                                        <option value=""></option>
                                        {
                                            Fuel && Fuel.data !== undefined && Fuel.data.fuels.map((fuels, i) => {
                                                return (
                                                    <option value={fuels.fuel_name} key={fuels._id} selected={data && data.fuel_type === fuels.fuel_name ? true : false}>{fuels.fuel_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Fuel Type">Select Fuel Type</label>
                                    <small id="fuelTypeError" className="error"></small>
                                </div> */}
                                {/* <div className="form-div">
                                    <select className="floating-select" id="body_type" name="body_type" placeholder=' ' >
                                        <option value=""></option>
                                        {
                                            fetchBodyTypes.data && fetchBodyTypes.data.body_type.map((bodyType) => {
                                                return (
                                                    <option value={`${bodyType.body_name}`} key={bodyType._id} selected={data && data.body_type === bodyType.body_name ? true : false}>{bodyType.body_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Body Type">Body Type</label>
                                    <small id="bodyTypeError" className="error"></small>
                                </div> */}

                            </div>
                            <div className="form-row">
                                <div className="form-div">
                                    <select className="floating-select" id="service_category_id" name="service_category_id" placeholder=' ' onChange={(e) => selectSubCategoryByCatId(e.target.value)}  >
                                        <option value=""></option>
                                        {
                                            serviceCategory != '' && serviceCategory?.map((service, i) => {

                                                return (
                                                    <option value={`${service._id}`} key={service._id} selected={data && data.service_category_id && data.service_category_id._id === service._id ? true : false}>{service.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="Select Category">Select Category</label>
                                    <small id="serviceCatError" className="error"></small>
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
                                            <input id="service_price" name="service_price" type="text" placeholder=" " defaultValue={data && data.service_price ? data.service_price : ''} />
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