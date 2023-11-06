import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import { ButtonSpinner, createSlug } from '@/components/Helper';
import axios from 'axios';

import { useEffect, useState } from 'react';
import Select from 'react-select'
import useSWR from 'swr';

import DatePicker from "react-datepicker";
import { useRouter } from 'next/router';

// import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AdminHead from '@/components/common/adminHead';
const animatedComponents = makeAnimated();


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

export default function Index() {
    const router = useRouter()
    const { productId } = router.query;
    const Url = process.env.NEXT_PUBLIC_URL;

    const [featureSpec, setFeatureSpec] = useState([]);
    const fetchFeaturesByCate = async (_id) => {
        // const fetchFeatures = useSWR(`${Url}admin/test-feature-category-data/${_id}`, {
        //     headers: {
        //         token: localStorage.getItem('lr-admin-token')
        //     }
        // });
        const fetchFeatures = await axios.get(`${Url}admin/test-feature-category-data/${_id}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        });
        // setFeatureSpecification(fetchFeatures);
        // console.log(fetchFeatures.data.featureCategories);
        // return fetchFeatures;
        setFeatureSpec(fetchFeatures);
    }
    // console.log(featureSpec.data)
    // console.log(productId);
    const [fetchModelsName, setFetchModelsName] = useState('');
    const [variantsByModel, setVariantsByModel] = useState('');
    const [featureSpecification, setFeatureSpecification] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [tinyLoader, setTinyLoader] = useState(false);


    const fetchBrandName = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-brands`, fetcher);
    const fetchFuelType = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-fule-type`, fetcher);
    const fetchBodyType = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-body-type`, fetcher);
    const fetchExperienceCenter = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-experience-center`, fetcher);
    const fetchFeatureCategory = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-sepecification-category`, fetcher)
    const fetchAllProductsForLink = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-active-product-froLink`, fetcher);
    // const fetchFeatureCategory = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-feature-by-category`, fetcher)
    // console.log(featureWithCategory.data)
    // console.log(fetchBrandName.data)
    // console.log(fetchFuelType.data)


    const [fetchYear, setFetchYear] = useState([]);


    const { data, error } = useSWR(`${Url}admin/view-product/${productId}`, fetcher);



    // console.log('Feature : ', fetchFeatureCategory.data);
    // console.log('Feature : ', featureSpecification);



    const getAllYears = async () => {
        const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
        const yearData = await years.json();
        setFetchYear(yearData.year)
    }

    useEffect(() => {
        getAllYears();
        import("react-datepicker/dist/react-datepicker.css");
    }, [])


    const fetchModelsByBrand = async (brandId) => {

        const getModels = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-brand-model-by-brand?id=${brandId}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                setFetchModelsName([]);
                alert(`${err.response.data.message}`);
            }
        })
        if (getModels && getModels.data.status === 1) {
            setFetchModelsName(getModels);
        } else
            if (getModels && getModels.data.status === 0) {
                alert(`${getModels.data.message}`);

            }
    }
    const fetchVariantsByModel = async (modelId) => {
        const getVariants = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-variants-by-model?id=${modelId}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                setVariantsByModel([]);
                alert(`${err.response.data.message}`);
            }
        });


        if (getVariants && getVariants.data.status === 1) {
            setVariantsByModel(getVariants);
        } else if (getVariants && getVariants.data.status === 0) {
            alert(`${getVariants.data.message}`);
        }
    }

    const fetchFeatureByCategory = async (categoryId) => {
        const getFeatures = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/fetch-feature-by-category?id=${categoryId}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).catch((err) => {
            // console.log(err.response);
            if (err.response && err.response.data.status === 0) {
                setFeatureSpecification([]);
                alert(`${err.response.data.message}`);
            }
        });


        if (getFeatures && getFeatures.data.status === 1) {
            setFeatureSpecification(getFeatures);
        } else if (getFeatures && getFeatures.data.status === 0) {
            alert(`${getFeatures.data.message}`);
        }
    }

    // useEffect(() => {
    //     // fetchFeatureByCategory(categoryId);
    //     // const fetchFeatureByCategory = async (categoryId) => {
    //     //     const getFeatures = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/fetch-feature-by-category?id=${categoryId}`, {
    //     //         headers: {
    //     //             token: localStorage.getItem('lr-admin-token')
    //     //         }
    //     //     }).catch((err) => {
    //     //         console.log(err.response);
    //     //         if (err.response && err.response.data.status === 0) {
    //     //             setFeatureSpecification([]);
    //     //             alert(`${err.response.data.message}`);
    //     //         }
    //     //     });


    //     //     if (getFeatures && getFeatures.data.status === 1) {
    //     //         setFeatureSpecification(getFeatures);
    //     //     } else if (getFeatures && getFeatures.data.status === 0) {
    //     //         alert(`${getFeatures.data.message}`);
    //     //     }
    //     // }
    // }, [])

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [carDetail, setCarDetail] = useState(true);
    const [carSummery, setCarSummery] = useState(false);
    const [carSeo, setCarSeo] = useState(false);
    const [carSpecification, setCarSpecification] = useState(false);


    const carDetailBtnClick = () => {
        setCarDetail(true);
        setCarSummery(false);
        setCarSeo(false);
        setCarSpecification(false);
    }

    const carSummeryBtnClick = () => {
        setCarDetail(false);
        // document.getElementById('car-detail-btn').setAttribute('disabled', true);
        document.getElementById('car-detail-btn').disabled = true
        const cardetailBtn = document.getElementById('car-detail-btn');
        cardetailBtn.setAttribute('disabled', true)
        setCarSummery(true);
        setCarSeo(false);
        setCarSpecification(false);
    }

    const carSeoBtnClick = () => {
        setCarDetail(false);
        setCarSummery(false);
        setCarSeo(true);
        const $carSummeryTab = document.getElementById('car-summery-btn');
        // $carSummeryTab.removeEventListener('onClick', carSummeryBtnClick, true);
        $carSummeryTab.removeEventListener('onClick', carSummeryBtnClick);

        setCarSpecification(false);
    }

    const carSpecificationBtnClick = () => {
        setCarDetail(false);
        setCarSummery(false);
        setCarSeo(false);
        setCarSpecification(true);
    }


    const manageEventHandler = () => {
        // setFormData((prevState) => ({
        //     ...prevState,
        //     [e.target.name]: e.target.value
        // }));
    }



    const createCustomSlug = () => {

        const $brand = document.getElementById('brand_id');
        const $brandName = $brand.options[$brand.selectedIndex].text;

        const $model = document.getElementById('model_id');
        const $modelName = $model.options[$model.selectedIndex].text;

        const $variant = document.getElementById('variant_id');
        const $variantName = $variant.options[$variant.selectedIndex].text;

        const $slugName = $brandName + ' ' + $modelName + ' ' + $variantName;
        createSlug($slugName, 'slug')
        document.getElementById('name').value = $slugName;
    }


    const saveCardetails = async (e) => {
        e.preventDefault();
        let createError = 0;

        if (e.target.brand_id.value.length <= 0) {
            document.getElementById('brandId').innerHTML = 'Please select brand';
            document.getElementById("brandId").style.display = "block";
            setTimeout(() => {
                document.getElementById('brandId').innerHTML = '';
                document.getElementById("brandId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.model_id.value.length <= 0) {
            document.getElementById('modelId').innerHTML = 'Please select model!';
            document.getElementById("modelId").style.display = "block";
            setTimeout(() => {
                document.getElementById('modelId').innerHTML = '';
                document.getElementById("modelId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.variant_id.value.length <= 0) {
            document.getElementById('variantId').innerHTML = 'Please select variant';
            document.getElementById("variantId").style.display = "block";
            setTimeout(() => {
                document.getElementById('variantId').innerHTML = '';
                document.getElementById("variantId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.name.value.length <= 0) {
            document.getElementById('nameError').innerHTML = 'Please enter product name';
            document.getElementById("nameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('nameError').innerHTML = '';
                document.getElementById("nameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('slugError').innerHTML = 'Please enter product slug';
            document.getElementById("slugError").style.display = "block";
            setTimeout(() => {
                document.getElementById('slugError').innerHTML = '';
                document.getElementById("slugError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.registration_year.value.length <= 0) {
            document.getElementById('registrationYear').innerHTML = 'Please select registration year';
            document.getElementById("registrationYear").style.display = "block";
            setTimeout(() => {
                document.getElementById('registrationYear').innerHTML = '';
                document.getElementById("registrationYear").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.registration_state.value.length <= 0) {
            document.getElementById('registrationState').innerHTML = 'Please enter registration state';
            document.getElementById("registrationState").style.display = "block";
            setTimeout(() => {
                document.getElementById('registrationState').innerHTML = '';
                document.getElementById("registrationState").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.kms_driven.value.length <= 0) {
            document.getElementById('kmsDriven').innerHTML = 'Please enter kms driven';
            document.getElementById("kmsDriven").style.display = "block";
            setTimeout(() => {
                document.getElementById('kmsDriven').innerHTML = '';
                document.getElementById("kmsDriven").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.product_ownership.value.length <= 0) {
            document.getElementById('productOwnership').innerHTML = 'Please enter ownership';
            document.getElementById("productOwnership").style.display = "block";
            setTimeout(() => {
                document.getElementById('productOwnership').innerHTML = '';
                document.getElementById("productOwnership").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.fuel_type.value.length <= 0) {
            document.getElementById('fuelType').innerHTML = 'Please select fuel type';
            document.getElementById("fuelType").style.display = "block";
            setTimeout(() => {
                document.getElementById('fuelType').innerHTML = '';
                document.getElementById("fuelType").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.price.value.length <= 0) {
            document.getElementById('priceError').innerHTML = 'Please enter product price';
            document.getElementById("priceError").style.display = "block";
            setTimeout(() => {
                document.getElementById('priceError').innerHTML = '';
                document.getElementById("priceError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.booking_amount.value.length <= 0) {
            document.getElementById('bookingAmount').innerHTML = 'Please enter product amount';
            document.getElementById("bookingAmount").style.display = "block";
            setTimeout(() => {
                document.getElementById('bookingAmount').innerHTML = '';
                document.getElementById("bookingAmount").style.display = "none";
            }, 3000);
            createError++;
        }


        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        // console.log(e.target.linked_from.value.length)

        const formData = new FormData(document.getElementById('car-detail-form'));

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }


        // formData.append('brand_id', e.target.brand_id.value);
        // formData.append('model_id', e.target.model_id.value);
        // formData.append('variant_id', e.target.variant_id.value);
        // formData.append('registration_year', e.target.registration_year.value);
        // formData.append('registration_state', e.target.registration_state.value);
        // formData.append('kms_driven', e.target.kms_driven.value);
        // formData.append('product_ownership', e.target.product_ownership.value);
        // formData.append('fuel_type', e.target.fuel_type.value);
        // formData.append('name', e.target.name.value);
        // formData.append('slug', e.target.slug.value);
        // formData.append('price', e.target.price.value);
        // formData.append('image', e.target.image.files[0]);
        // formData.append('linked_from', e.target.linked_from.value);
        // formData.append('color', e.target.color.value);
        // formData.append('product_banner', e.target.product_banner.value);
        // formData.append('linked_from[]', e.target.linked_from.value);
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        setTinyLoader(true);

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-product/${productId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // console.log(response.data.status);
                setTinyLoader(false);
                alert(`${response.data.message}`);
                document.getElementById('product_id').value = response.data.products._id;
                return carSummeryBtnClick();
            }
        }).catch((err) => {
            setTinyLoader(false);
            if (err.response && err.response.data.status === 2) {
                document.getElementById('slugError').innerHTML = err.response.data.message;
                document.getElementById("slugError").style.display = "block";
                setTimeout(() => {
                    document.getElementById('slugError').innerHTML = '';
                    document.getElementById("slugError").style.display = "none";
                }, 4000);
            } else if (err.response && err.response.data.status === 0) {
                alert(`${err.response.data.message}`);
                setTinyLoader(false);
            }
        })
    }

    const resetCardDetailForm = () => {
        document.getElementById('car-detail-form').reset();
    }


    const updateCarSummery = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('manufacturing_year', e.target.manufacturing_year.value);
        formData.append('engine_cc', e.target.engine_cc.value);
        formData.append('body_type', e.target.body_type.value);
        formData.append('insurance_type', e.target.insurance_type.value);
        formData.append('insurance_valid', e.target.insurance_valid.value);
        formData.append('product_location', e.target.product_location.value);
        formData.append('product_status', e.target.product_status.value);
        formData.append('short_description', e.target.short_description.value);

        formData.append('registration_number', e.target.registration_number.value);
        formData.append('image_360', e.target.image_360.value);

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-product/${productId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // console.log(response.data.status);
                setTinyLoader(false);
                alert(`Car summery added for ${response.data.products.name} successfully!`);
                document.getElementById('product_id').value = response.data.products._id;
                return carSeoBtnClick();
            }
        }).catch((err) => {
            setTinyLoader(false);
            if (err.response && err.response.data.status === 0) {
                alert(`${err.response.data.message}`);
                setTinyLoader(false);
            }
        })
    }



    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    const resetCarSummeryForm = () => {
        document.getElementById('car-summery-form').reset();
    }

    const updateCarSeoDetails = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('page_title', e.target.page_title.value);
        formData.append('meta_keywords', e.target.meta_keywords.value);
        formData.append('meta_other', e.target.meta_other.value);
        formData.append('meta_description', e.target.meta_description.value);

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-product/${productId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // console.log(response.data.status);
                setTinyLoader(false);
                alert(`Car Seo details added for ${response.data.products.name} successfully!`);
                document.getElementById('product_id').value = response.data.products._id;
                return carSpecificationBtnClick();
            }
        }).catch((err) => {
            setTinyLoader(false);
            if (err.response && err.response.data.status === 0) {
                alert(`${err.response.data.message}`);
                setTinyLoader(false);
            }
        })
    }


    const resetCarSeoDetail = () => {
        document.getElementById('car-seo-details-form').reset();
    }

    const updateCarFeatureSpecification = async (e) => {
        e.preventDefault();

        setTinyLoader(true);
        const formData = new FormData(document.getElementById('car-specification-details-form'));

        const convertToJSon = JSON.stringify(formData);
        // formData.append('category_id', e.target.category_id.value);
        // formData.append('specification_id', JSON.stringify(e.target.specification_id.value));
        // formData.append('specification_value', JSON.stringify(e.target.specification_value.value));
        // console.log(convertToJSon);
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        // const $specId = document.getElementsByName('specification_id[]');
        // const getData = $specId.values().next();

        // for (const letter of $specId) {
        //     console.log(letter);
        // }
        // console.log(getData);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/add-product-specification`, formData, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // console.log(response.data.status);
                setTinyLoader(false);
                alert(`All Feature and Specification Addedd Successfully!`);
                // document.getElementById('product_id').value = response.data.products._id;
                // return carSummeryBtnClick();
                // router.push('/admin/cars');
            }
        }).catch((err) => {
            setTinyLoader(false);
            // if (err.response && err.response.data.status === 2) {
            //     document.getElementById('slugError').innerHTML = err.response.data.message;
            //     document.getElementById("slugError").style.display = "block";
            //     setTimeout(() => {
            //         document.getElementById('slugError').innerHTML = '';
            //         document.getElementById("slugError").style.display = "none";
            //     }, 4000);
            // } else
            if (err.response && err.response.data.status === 0) {
                alert(`${err.response.data.message}`);
                setTinyLoader(false);
            }
        })
    }

    const resetCarFeatureSpecification = () => {
        document.getElementById('car-seo-details-form').reset();
    }


    const [formvalues, setFormValues] = useState([
        {
            label: "Specification Value",
            type: "text",
        }
    ]);

    // const appendRow = (e, index) => {
    //     // alert(index)
    //     setFormValues([
    //         {
    //             label: "Specification Value",
    //             type: "text",
    //         }
    //     ])
    // }

    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
    };

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    let getProdOpt = [];
    if (data !== undefined && fetchAllProductsForLink.data !== undefined) {
        fetchAllProductsForLink.data.products.map((prod) => {
            console.log(prod)
            getProdOpt.push({
                value: prod._id,
                label: prod.name + ' / ' + prod.price + ' / ' + prod.color
            })
        })
    }



    return (
        <>
            <AdminHead pageTitle={`${data.products.name}`} />
            <Layout>

                <Breadcrumb title="Luxury Ride| Edit Car" />
                <div className="main-data">
                    <div className="tabers">
                        <div className="wrapper">
                            <ul>
                                {/* onClick={carDetailBtnClick}  */}
                                <li className={carDetail === true ? 'edit activeTab' : ''} onClick={carDetailBtnClick} value="1" id="car-detail-btn">
                                    Car Details
                                </li>
                                {/* onClick={carSummeryBtnClick} */}
                                <li className={carSummery === true ? 'edit activeTab' : ''} onClick={carSummeryBtnClick} id="car-summery-btn" value="2">
                                    Car Summary
                                    {/* 63ff8dbf9b291064b4745218 */}
                                </li>
                                {/*  */}
                                <li className={carSeo === true ? 'edit activeTab' : ''} onClick={carSeoBtnClick} id="car-seo-btn" value="3">
                                    SEO
                                </li>
                                <li className={carSpecification === true ? 'edit activeTab' : ''} onClick={carSpecificationBtnClick} >
                                    Specification
                                </li>
                                {/* onClick={carSpecificationBtnClick} */}

                            </ul>
                        </div>
                    </div>

                    <div id="car-details" style={{ display: carDetail == true ? 'block' : 'none' }}>
                        <div className="form-style  calender-style">
                            <div className="wrapper">
                                <form method="POST" onSubmit={saveCardetails} id="car-detail-form">

                                    <div className="form-row">
                                        <div className="form-div">
                                            <select className="floating-select" id="brand_id" name='brand_id' onChange={(e) => fetchModelsByBrand(e.target.value)}>
                                                <option value=""></option>

                                                {

                                                    data !== undefined && fetchBrandName !== undefined && fetchBrandName.data && fetchBrandName.data.brands.map((brand) => {
                                                        return (
                                                            <option key={brand._id} value={`${brand._id}`} selected={brand._id === data.products.brand_id._id ? true : false}>{brand.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="Brands">Brands</label>
                                            <small id="brandId" className="error"></small>
                                        </div>


                                        <div className="form-div">
                                            <select className="floating-select" id="model_id" name="model_id" onChange={(e) => fetchVariantsByModel(e.target.value)}>
                                                <option value=""></option>
                                                {
                                                    data !== undefined && fetchModelsName.data && fetchModelsName.data.brand_model.map((model) => {
                                                        return (
                                                            <option value={`${model._id}`} key={model._id}>{model.name}</option>
                                                        )
                                                    })
                                                }


                                                {
                                                    data !== undefined && fetchModelsName.data == undefined && data.brand_model.map((model) => {
                                                        return (
                                                            <option value={`${model._id}`} key={`${model._id}`} selected={model._id === data.products.model_id._id ? true : false}>{model.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                            <label htmlFor="Models">Models</label>
                                            <small id="modelId" className="error"></small>
                                        </div>


                                        <div className="form-div">
                                            <select className="floating-select" id="variant_id" onChange={createCustomSlug} name="variant_id" >
                                                <option value=""></option>
                                                {
                                                    data !== undefined && variantsByModel.data && variantsByModel.data.model_variant.map((variant) => {
                                                        return (
                                                            <option value={`${variant._id}`} key={variant._id}>{variant.name}</option>
                                                        )
                                                    })
                                                }


                                                {
                                                    data !== undefined && variantsByModel.data === undefined && data.model_variants.map((variant) => {
                                                        return (
                                                            <option value={`${variant._id}`} key={variant._id} selected={variant._id === data.products.variant_id._id ? true : false} >{variant.name}</option>
                                                        )
                                                    })
                                                }


                                            </select>
                                            <label htmlFor="Models">Variant</label>
                                            <small id="variantId" className="error"></small>
                                        </div>
                                    </div>


                                    <div className="form-row two-col">
                                        <div className="form-div">
                                            <input id="name" name="name" type="text" onChange={manageEventHandler} placeholder=" " onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} defaultValue={data !== undefined ? data.products.name : ''} />
                                            <label htmlFor="Name">Name</label>
                                            <small id="nameError" className="error"></small>
                                        </div>



                                        <div className="form-div">

                                            <input id="slug" name="slug" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.slug : ''} type="text" placeholder=" " />
                                            <label htmlFor="Slug">Slug</label>
                                            <small id="slugError" className="error"></small>
                                        </div>

                                    </div>

                                    {/* data !== undefined && data.products !== undefined ? data.products.registration_year :  */}
                                    {/* {console.log(startDate)} */}
                                    {console.log(data !== undefined && data.products !== undefined ? new Date(data.products.registration_year).getFullYear() : startDate.getFullYear())}
                                    <div className="form-row">
                                        <div className="form-div">
                                            {/* {console.log(data.products)} */}
                                            {/* <DatePicker id="registration_year" name="registration_year"
                                                className='calender-icon'
                                                selected={data !== undefined && data.products !== undefined ? new Date(data.products.registration_year).getFullYear() : startDate}
                                                onChange={(date) => setStartDate(date)}
                                                showYearPicker
                                                dateFormat="yyyy"
                                                yearItemNumber={20}
                                            // defaultValue={data !== undefined && data.products !== undefined ? data.products.registration_date : ''} 
                                            /> */}
                                            <select className="floating-select" onChange={manageEventHandler} id="registration_year" name="registration_year">
                                                <option value=""></option>
                                                {console.log(data.products.registration_year)}
                                                {
                                                    fetchYear !== undefined && fetchYear.map((year, i) => {
                                                        return (
                                                            <>
                                                                <option value={year} selected={data !== undefined && data.products !== undefined ? `${year}` === `${data.products.registration_year}` ? true : false : ''}>{year}</option>
                                                            </>
                                                        )

                                                    })
                                                }
                                            </select>
                                            <label className='statick-label'>Registration Year</label>
                                            <small id="registrationYear" className="error"></small>
                                        </div>

                                        <div className="form-div">
                                            <input id="registration_state" name="registration_state" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.registration_state : ''} type="text" placeholder=" " />
                                            <label htmlFor="Registration State">Registration State</label>
                                            <small id="registrationState" className="error"></small>
                                        </div>

                                        <div className="form-div">
                                            <input id="kms_driven" name="kms_driven" type="text" defaultValue={data !== undefined ? data.products.kms_driven : ''} onChange={manageEventHandler} placeholder=" " />
                                            <label htmlFor="Kms Driven">Kms Driven</label>
                                            <small id="kmsDriven" className="error"></small>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-div">
                                            <input id="product_ownership" name="product_ownership" type="text" defaultValue={data !== undefined ? data.products.product_ownership : ''} onChange={manageEventHandler} placeholder=" " />
                                            <label htmlFor="Ownership">Ownership</label>
                                            <small id="productOwnership" className="error"></small>
                                        </div>

                                        <div className="form-div">
                                            <select className="floating-select" onChange={manageEventHandler} id="fuel_type" name="fuel_type">
                                                <option value=""></option>
                                                {
                                                    data !== undefined && fetchFuelType.data && fetchFuelType.data.fuel_type.map((fuel) => {
                                                        return (
                                                            <option value={`${fuel._id}`} key={fuel._id} selected={fuel._id === data.products.fuel_type._id} >{fuel.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="Fuel Type">Fuel Type</label>
                                            <small id="fuelType" className="error"></small>
                                        </div>

                                        <div className="form-div">
                                            <input id="price" name="price" type="text" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.price : ''} placeholder=" " />
                                            <label htmlFor="Price">Price</label>
                                            <small id="priceError" className="error"></small>
                                        </div>

                                    </div>

                                    <div className="form-row two-col">
                                        <div className="form-div file-upload">
                                            <div className="custom-label">Car Image</div>
                                            <input type="file" id="image" name="image" onChange={manageEventHandler} />
                                            <label htmlFor="file-upload2">Upload file</label>
                                            <div id="file-upload-filename"></div>
                                            {/* <div className="image-des">Image Size : 1920 x 800</div> */}
                                            <small id="productImage" className="error"></small>
                                        </div>


                                        <div className="form-div">
                                            <input id="color" name="color" type="text" onChange={manageEventHandler} placeholder=" " defaultValue={data !== undefined ? data.products.color : ''} />
                                            <label htmlFor="Price">Car Color</label>
                                            <small id="productColor" className="error"></small>
                                        </div>

                                    </div>

                                    <div className="form-row two-col">
                                        <div className="form-div">
                                            {/* const animatedComponents = makeAnimated();
                                             <select className="floating-select" id="linked_from" name='linked_from' onChange={manageEventHandler}>
                                                <option value=""></option>
                                                {
                                                    data !== undefined && fetchAllProductsForLink.data && fetchAllProductsForLink.data.products.map((product) => {
                                                        return (
                                                            <option value={`${product._id}`} key={product._id} selected={data.products.linked_from === product._id ? true : false} >{product.name}</option>
                                                        )
                                                    })
                                                }
                                            </select> 
                                            data !== undefined && fetchAllProductsForLink.data !== undefined ? fetchAllProductsForLink.data.products._id : ''
                                            
                                            */}
                                            {/* <Select isMulti options={data !== undefined && fetchAllProductsForLink.data !== undefined ? fetchAllProductsForLink.data.products : ''}>
                                                {
                                                    data !== undefined && fetchAllProductsForLink.data && fetchAllProductsForLink.data.products.map((product) => {
                                                        return (
                                                            <option value={`${product._id}`} key={product._id} selected={data.products.linked_from === product._id ? true : false} >{product.name}</option>
                                                        )
                                                    })
                                                }

                                            </Select>   components={animatedComponents}
                                                defaultValue={''}*/}
                                            {/* {console.log(data.products.linked_from.length)} */}
                                            <Select
                                                closeMenuOnSelect={false}
                                                isClearable={true}
                                                isSearchable={true}
                                                // closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={getProdOpt}
                                                defaultValue={data !== undefined && data.products.linked_from !== undefined && data.products.linked_from.length > 0 && data.products.linked_from
                                                    //     .filter((check, i) => {
                                                    //     if (check !== undefined && getProdOpt !== undefined && getProdOpt.length > 0) {
                                                    //         if (check === getProdOpt[i].value) {

                                                    //             console.log(check)
                                                    //             console.log(i)
                                                    //         }
                                                    //     }
                                                    // })

                                                    //     products.linked_from.map((linked, i) => {
                                                    //     // console.log(linked)
                                                    //     if (linked !== undefined && getProdOpt !== undefined && getProdOpt.length > 0) {

                                                    //         console.log('Linked  : ', linked);
                                                    //         console.log('GetProdOpt : ', getProdOpt[i].value);

                                                    //         console.log(linked === getProdOpt[i].value)
                                                    //         if (linked === getProdOpt[i].value) {
                                                    //             return getProdOpt[i].value;
                                                    //         }
                                                    //     }
                                                    // })
                                                }
                                                // defaultValue={data !== undefined && data.products.linked_from !== undefined && data.products.linked_from.map((linked, i) => {
                                                //     let skdjfb = '';
                                                //     getProdOpt.map((matchId) => {
                                                //         // console.log('matchId : ', matchId.value)
                                                //         if (matchId.value === linked) {
                                                //             skdjfb = matchId.value;
                                                //         }
                                                //         return skdjfb;
                                                //     })
                                                //     console.log(linked === skdjfb)
                                                //     // console.log('skdjfb : ', skdjfb)
                                                //     return skdjfb;
                                                // })}
                                                name="linked_from[]" onChange={manageEventHandler}
                                            />
                                            {/* <label htmlFor="Brands">Product Link From</label> */}
                                            <small id="brandId" className="error"></small>
                                        </div>



                                        <div className="form-div">
                                            <input id="booking_amount" name="booking_amount" type="text" defaultValue={data !== undefined
                                                && data.products.booking_amount !== '' ? data.products.booking_amount : ''} onChange={manageEventHandler} placeholder=" " />
                                            <label htmlFor="booking_amount">Booking Amount</label>
                                            <small id="bookingAmount" className="error"></small>
                                        </div>

                                    </div>


                                    <div className='custom-check'>
                                        <div className='form-div'>
                                            <input type="checkbox" name="product_banner" id="html" defaultValue={data !== undefined && data.products.product_banner === 1 ? 2 : 1} defaultChecked={data !== undefined && data.products.product_banner !== null && data.products.product_banner === 1 ? true : false} />
                                            <label htmlFor="html">Product Banner</label>
                                        </div>

                                    </div>

                                    <div className="common-buttons">
                                        <button className="green arrow-style" disabled={tinyLoader}>
                                            <ButtonSpinner load={tinyLoader} btnName="Update & Continue" />
                                        </button>

                                        <button className="border-style" onClick={resetCardDetailForm}>Reset</button>

                                    </div>


                                </form>
                            </div>

                        </div>
                    </div>





                    <div id="car-summery" style={{ display: carSummery === true ? 'block' : 'none' }}>

                        <div className="form-style">
                            <div className="wrapper">
                                <form method="POST" onSubmit={updateCarSummery} id="car-summery-form">
                                    <input type="hidden" name="product_id" id="product_id" />
                                    <div className="form-row">
                                        <div className="form-div">
                                            <input id="manufacturing_year" name="manufacturing_year" type="text" placeholder=" " defaultValue={data !== undefined ? data.products.manufacturing_year : ''} onChange={manageEventHandler} />
                                            <label htmlFor="Manufacturing Year">Manufacturing Year</label>
                                            <small className="error"></small>
                                        </div>



                                        <div className="form-div">
                                            <input id="engine_cc" name="engine_cc" type="text" placeholder=" " defaultValue={data !== undefined ? data.products.engine_cc : ''} onChange={manageEventHandler} />
                                            <label htmlFor="Engine">Engine</label>
                                            <small className="error"></small>
                                        </div>

                                        <div className="form-div">
                                            <select className="floating-select" id="body_type" name="body_type" onChange={manageEventHandler} >
                                                <option value=""></option>
                                                {
                                                    data !== undefined && fetchBodyType.data && fetchBodyType.data.body_type.map((body) => {
                                                        return (
                                                            <option value={`${body._id}`} key={body._id} selected={data.products.body_type !== undefined && body._id === data.products.body_type._id ? true : false} >{body.body_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="Models">Body Type</label>
                                            <small className="error"></small>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-div">
                                            <input id="insurance_type" name="insurance_type" type="text" placeholder=" " defaultValue={data !== undefined ? data.products.insurance_type : ''} onChange={manageEventHandler} />
                                            <label htmlFor="Insurance Type">Insurance Type</label>
                                        </div>

                                        <div className="form-div">
                                            <input id="insurance_valid" name="insurance_valid" type="text" defaultValue={data !== undefined ? data.products.insurance_valid : ''} placeholder=" " onChange={manageEventHandler} />
                                            <label htmlFor="Insurance Valid">Insurance Valid</label>
                                        </div>

                                        <div className="form-div">
                                            <select className="floating-select" id="product_location" name="product_location" onChange={manageEventHandler} >
                                                <option value=""></option>
                                                {
                                                    fetchExperienceCenter.data && fetchExperienceCenter.data.experience_center.map((showroom) => {
                                                        return (
                                                            <option value={`${showroom._id}`} key={showroom._id} selected={data.products.product_location !== undefined && showroom._id === data.products.product_location._id} >{`${showroom.name} (${showroom.city})`}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="Kms Driven">Product Location</label>
                                        </div>
                                    </div>

                                    <div className="form-row">

                                        <div className="form-div">
                                            <input id="registration_number" name="registration_number" type="text" defaultValue={data !== undefined ? data.products.registration_number : ''} placeholder=" " onChange={manageEventHandler} />
                                            <label htmlFor="Registration Number">Registration Number</label>
                                        </div>

                                        <div className="form-div">
                                            <select className="floating-select" id="product_status" name="product_status" onChange={manageEventHandler} >
                                                <option value=""></option>
                                                <option value="live" selected={data !== undefined && data.products.sell_status === "live" ? true : false} >Live</option>
                                                <option value="booked" selected={data !== undefined && data.products.sell_status === "booked" ? true : false}>Booked</option>
                                                <option value="sold" selected={data !== undefined && data.products.sell_status === "sold" ? true : false}>Sold</option>
                                            </select>
                                            <label htmlFor="Product Status">Product Status</label>
                                        </div>

                                        <div className="form-div">
                                            <select className="floating-select" id="image_360" name="image_360" onChange={manageEventHandler} >
                                                <option value=""></option>
                                                <option value="1" selected={data !== undefined && data.products.image_360 === "1" ? true : false} >Yes</option>
                                                <option value="2" selected={data !== undefined && data.products.image_360 === "2" ? true : false}>No</option>
                                            </select>
                                            <label htmlFor="Product 360">Product 360</label>
                                        </div>
                                    </div>

                                    <div className="form-row one-col">
                                        <div className="form-div">
                                            <textarea placeholder=" " name="short_description" id="short_description" defaultValue={data !== undefined ? data.products.short_description : ''} onChange={manageEventHandler}></textarea>
                                            <label htmlFor="Short Description">Short Description</label>
                                        </div>

                                    </div>



                                    <div className="common-buttons">
                                        <button className="green arrow-style" disabled={tinyLoader}>
                                            <ButtonSpinner load={tinyLoader} btnName="Update & Continue" />
                                        </button>
                                        <button onClick={resetCarSummeryForm} className="border-style">Reset</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                    <div id="car-seo" style={{ display: carSeo === true ? 'block' : 'none' }}>

                        <div className="form-style">
                            <div className="wrapper">

                                <form method="POST" onSubmit={updateCarSeoDetails} id="car-seo-details-form">
                                    <div className="form-row">
                                        <div className="form-div">
                                            <input id="page_title" name="page_title" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.page_title : ''} type="text" placeholder=" " />
                                            <label htmlFor="Page Title">Page Title</label>
                                            <small className="error"></small>
                                        </div>



                                        <div className="form-div">
                                            <input id="meta_keywords" name="meta_keywords" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.meta_keywords : ''} type="text" placeholder=" " />
                                            <label htmlFor="Meta Keywords">Meta Keywords</label>
                                            <small className="error"></small>
                                        </div>


                                        <div className="form-div">
                                            <input id="meta_other" name="meta_other" defaultValue={data !== undefined ? data.products.meta_other : ''} onChange={manageEventHandler} type="text" placeholder=" " />
                                            <label htmlFor="Meta Other">Meta Other</label>
                                            <small className="error"></small>
                                        </div>

                                    </div>


                                    <div className="form-row one-col">
                                        <div className="form-div">
                                            <textarea placeholder=" " name="meta_description" onChange={manageEventHandler} defaultValue={data !== undefined ? data.products.meta_description : ''} id="meta_description"></textarea>
                                            <label htmlFor="Short Description">Meta Description</label>
                                        </div>

                                    </div>

                                    <div className="common-buttons">
                                        <button className="green arrow-style" disabled={tinyLoader}>
                                            <ButtonSpinner load={tinyLoader} btnName="Update & Continue" />
                                        </button>
                                        <button onClick={resetCarSeoDetail} className="border-style">Reset</button>

                                    </div>
                                </form>


                            </div>

                        </div>
                    </div>



                    <div id="car-seo" style={{ display: carSpecification === true ? 'block' : 'none' }}>

                        <div className="form-style">
                            <div className="wrapper">

                                <form method="POST" onSubmit={updateCarFeatureSpecification} id="car-specification-details-form">
                                    <input type="hidden" value={productId} name="product_id" />
                                    <div className="form-row" >

                                        {/* {

                                            featureWithCategory = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/test-feature-category-data`, fetcher)
                                            console.log(featureWithCategory)
                                        } */}


                                        {
                                            fetchFeatureCategory.data && fetchFeatureCategory.data.categories.map((category) => {
                                                let getFetchdata = [];

                                                // const getFetu = FetchFeaturesByCate(category._id);
                                                // const fetchSpecData = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/fetch-feature-by-category?id=${category._id}`, {
                                                //     headers: {
                                                //         token: localStorage.getItem('lr-admin-token')
                                                //     }
                                                // }).catch((err) => {
                                                //     console.log(err);
                                                // });
                                                // .then((response) => {
                                                //     // console.log(response.data)
                                                //     // setFeatureSpecification(response.data);
                                                //     getFetchdata = response.data;
                                                // })
                                                // console.log('After fetch category : ', fetchSpecData.data);
                                                // .then((response) => {
                                                //     return response.data;
                                                // })
                                                // const convData = await fetchSpecData.json();
                                                // if (fetchSpecData.data && fetchSpecData.data.status === 1) {

                                                //     console.log(fetchSpecData.data);
                                                // }
                                                // console.log(fetchSpecData/);
                                                // console.log(fetchSpecData.then((ress) => {
                                                //     console.log(ress);
                                                // }))
                                                // console.log(getFetu);
                                                return (
                                                    <>
                                                        {/* <div className="bread-action" key={category._id}>
                                                            <div className="wrapper">
                                                                <div className="left-part" onClick={(e) => fetchFeaturesByCate(category._id)} >
                                                                    <h2>{category.name}</h2>
                                                                </div>
                                                                <div className="right-part">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {

                                                            featureSpec.data && featureSpec.data.featureCategories.map((feature) => {
                                                                return (
                                                                    <>
                                                                        <div className="form-div" key={feature._id} >
                                                                            <input id="specification_value" name="specification_value[]" type="text" placeholder=" " onChange={manageEventHandler} />
                                                                            <label htmlFor="Specification Value">Enter {feature.feature_name}</label>
                                                                            <input type="hidden" name="specification_id[]" defaultValue={feature._id} />
                                                                            <small id="specificationValue" className="error"></small>
                                                                        </div>
                                                                    </>
                                                                )

                                                            })
                                                        } */}
                                                    </>
                                                )
                                            })
                                        }
                                        {/* </div> */}
                                        {/* key={category._id} */}

                                        {/* onChange={e => handleInputChange(e, i)} */}
                                        <div className="form-div">
                                            <select className="floating-select" id={`category_id_`} name="category_id[]" onChange={(e) => fetchFeatureByCategory(e.target.value)}>
                                                <option value=""></option>
                                                {
                                                    fetchFeatureCategory.data && fetchFeatureCategory.data.categories.map((category) => {
                                                        return (
                                                            <option value={`${category._id}`} key={category._id}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="Feature & Specification Category">Feature & Specification Category</label>
                                            <small id="categoryId" className="error"></small>
                                        </div>

                                    </div>

                                    <div className="form-row">
                                        {/* {
                                            featureSpecification.data && featureSpecification.data.features.map((feature) => {
                                                return (
                                                    // <div className="form-div">
                                                    //     <input id="" name="" type="text" readOnly value={feature.name} placeholder=" " />
                                                    //     <label htmlFor="Specification Value">{feature.name}</label>
                                                    //     <small id="specificationValue" className="error"></small>
                                                    //     <input type="hidden" name="specification_id[]" defaultValue={feature._id} />
                                                    // </div>
                                                    <>
                                                        <div className="form-div" key={feature._id} >
                                                            <input id="specification_value" name="specification_value[]" type="text" placeholder=" " onChange={manageEventHandler} />
                                                            <label htmlFor="Specification Value">Enter {feature.name}</label>
                                                            <input type="hidden" name="specification_id[]" defaultValue={feature._id} />
                                                            <small id="specificationValue" className="error"></small>
                                                        </div>


                                                    </>

                                                )
                                            })
                                        } */}
                                    </div>


                                    <div className="form-row two-col">
                                        {
                                            featureSpecification.data && featureSpecification.data.features.map((feature) => {
                                                return (
                                                    <div className="form-div" key={feature._id} >
                                                        <input id="specification_value" name="specification_value[]" type="text" placeholder=" " onChange={manageEventHandler} />
                                                        <input type="hidden" name="specification_id[]" value={feature._id} />
                                                        <label htmlFor="Specification Value">Enter {feature.name}</label>
                                                        {/* <small id="specificationValue" className="error"></small> */}
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    {/* <div className="form-div">
                                                        <input id="" name="" type="text" readOnly value={feature.name} placeholder=" " />
                                                        <label htmlFor="Specification Value">{feature.name}</label>
                                                        <small id="specificationValue" className="error"></small>
                                                        <input type="hidden" name="specification_id[]" defaultValue={feature._id} />
                                                    </div> */}

                                    {/* <div className="form-div">
                                                        <input id="" name="" type="text" readOnly value={feature.name} placeholder=" " />
                                                        <label htmlFor="Specification Value">{feature.name}</label>
                                                        <small id="specificationValue" className="error"></small>
                                                        <input type="hidden" name="specification_id[]" value={feature._id} />
                                                    </div> */}
                                    {/* <div className="form-div" key={feature._id}>
                                                        <input id="" name="" type="text" readOnly value={feature.name} placeholder=" " />
                                                        <label htmlFor="Specification Value">{feature.name}</label>
                                                        <small id="specificationValue" className="error"></small>
                                                        <input type="hidden" name="specification_id[]" value={feature._id} />
                                                    </div> */}
                                    <div className="common-buttons">
                                        <button className="green arrow-style" disabled={tinyLoader}>
                                            <ButtonSpinner load={tinyLoader} btnName="Update & Continue" />
                                        </button>
                                        <button onClick={resetCarFeatureSpecification} className="border-style">Reset</button>

                                    </div>

                                </form>


                            </div>

                        </div>
                    </div>





                </div >

            </Layout >
        </>
    )
}
