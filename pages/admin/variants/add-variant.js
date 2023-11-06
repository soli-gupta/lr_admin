import { AppContext } from "@/components/AppContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ButtonSpinner, createSlug } from "@/components/Helper";
import useSWR from 'swr';
import AdminHead from "@/components/common/adminHead";


const brandFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

const modelFetcher = (url) => axios.get(url, {
    headers: {
        // 'Content-Type': 'application/json',
        // maxBodyLength: Infinity,
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function AddModelVariant() {

    const router = useRouter();
    // const [formData, setFormData] = useState('');
    const { context, setContext } = useContext(AppContext);
    const [brandName, setBrandName] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);


    const manageEventHandler = (e) => { }

    const [brandModels, setBrandModels] = useState();

    const fetchBrandName = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-brands`, brandFetcher);
    // const fetchBrandModels = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/get-brand-model?id=${}`, modelFetcher);

    const fetchModelName = async (brandId) => {
        // get-brand-model
        const getBrandModels = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/get-brand-model-by-brand?id=${brandId}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        });

        // console.log(getBrandModels.data.brand_model)
        setBrandModels(getBrandModels)
    }


    // console.log(brandModels);
    const addModelVariant = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;


        if (e.target.brand_id.value.length <= 0) {
            document.getElementById('brandId').innerHTML = 'Please select brand!';
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

        if (e.target.name.value.length <= 0) {
            document.getElementById('variantName').innerHTML = 'Please enter name!';
            document.getElementById("variantName").style.display = "block";
            setTimeout(() => {
                document.getElementById('variantName').innerHTML = '';
                document.getElementById("variantName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('variantSlug').innerHTML = 'Please enter slug!';
            document.getElementById("variantSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('variantSlug').innerHTML = '';
                document.getElementById("variantSlug").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();
        formData.append('image', e.target.image.files[0]);
        formData.append('brand_id', e.target.brand_id.value);
        formData.append('model_id', e.target.model_id.value);
        formData.append('name', e.target.name.value);
        formData.append('slug', e.target.slug.value);

        setTinyLoader(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/create-model-variant`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.model_variant.name} added successfully!`);
                router.push('/admin/variants');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {
            setTinyLoader(false);
            if (err.response.data.status === 2) {
                // alert(err.response.data.message);
                document.getElementById('variantSlug').innerHTML = err.response.data.message;
                document.getElementById("variantSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('variantSlug').innerHTML = '';
                    document.getElementById("variantSlug").style.display = "none";
                }, 3000);
            }
        });

    }


    const resetFormValues = () => {
        document.getElementById('model-variant-form').reset();
    }

    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Add Variant`} />
                <Breadcrumb title="LR | Add Variant" />
                <div className="main-data">

                    <form method="POST" onSubmit={addModelVariant} encType="multipart/form-data" id="model-variant-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">


                                    <div className="form-div">
                                        <select className="floating-select" name="brand_id" onChange={(e) => fetchModelName(e.target.value)}>
                                            <option value=""></option>
                                            {
                                                fetchBrandName.data && fetchBrandName.data.brands.map((brand) => {
                                                    return (

                                                        <option value={`${brand._id}`} key={`${brand._id}`}>{brand.name}</option>

                                                    )
                                                })
                                            }
                                        </select>

                                        <label>Select Brand</label>
                                        <small id="brandId" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <select className="floating-select" name="model_id">
                                            <option value=""></option>
                                            {
                                                brandModels && brandModels.data.brand_model.map((model) => {
                                                    return (

                                                        <option value={`${model._id}`} key={`${model._id}`}>{model.name}</option>

                                                    )
                                                })
                                            }
                                        </select>

                                        <label>Select Model</label>
                                        <small id="modelId" className="error"></small>
                                    </div>



                                </div>


                                <div className="form-row two-col">

                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} />
                                        <label htmlFor="Variant Name">Variant Name</label>
                                        <small id="variantName" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="slug" name="slug" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Variant Slug">Slug</label>
                                        <small id="variantSlug" className="error"></small>
                                    </div>
                                </div>


                                <div className="form-row two-col">

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Image</div>
                                        <input type="file" id="image" name="image" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <div className="image-des">Image Size : 1920 x 800</div>
                                        <small id="variantImage" className="error"></small>
                                    </div>
                                </div>

                                <div className="common-buttons">
                                    <button className="green arrow-style" disabled={tinyLoader}>
                                        <ButtonSpinner load={tinyLoader} btnName="Save" />
                                    </button>

                                    <button type="button" className="border-style" onClick={resetFormValues}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </Layout >
        </>
    )
}

export default AddModelVariant;