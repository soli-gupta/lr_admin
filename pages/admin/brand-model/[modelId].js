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


const modelFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

const brandFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function EditBrandModel() {

    const router = useRouter();
    const { modelId } = router.query;
    // console.log(modelId);
    // const [formData, setFormData] = useState('');
    const { context, setContext } = useContext(AppContext);
    const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);

    const manageEventHandler = (e) => { }

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/view-brand-model/${modelId}`, modelFetcher);
    // console.log(fetchBrandName);
    // const { data, error } = fetchBrandName;

    const fetchBrandName = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-brands`, brandFetcher);
    // console.log(fetchBrandName.data);

    const updateBrandModel = async (e) => {
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

        if (e.target.name.value.length <= 0) {
            document.getElementById('modelName').innerHTML = 'Please enter name!';
            document.getElementById("modelName").style.display = "block";
            setTimeout(() => {
                document.getElementById('modelName').innerHTML = '';
                document.getElementById("modelName").style.display = "none";
            }, 3000);
            createError++;
        }

        // if (e.target.image.value.length <= 0) {
        //     document.getElementById('modelImage').innerHTML = 'Please select Image!';
        //     document.getElementById("modelImage").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('modelImage').innerHTML = '';
        //         document.getElementById("modelImage").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('modelSlug').innerHTML = 'Please enter slug!';
            document.getElementById("modelSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('modelSlug').innerHTML = '';
                document.getElementById("modelSlug").style.display = "none";
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
        formData.append('name', e.target.name.value);
        formData.append('slug', e.target.slug.value);
        formData.append('page_title', e.target.page_title.value);
        formData.append('h1_tag', e.target.h1_tag.value);
        formData.append('meta_description', e.target.meta_description.value);

        setTinyLoader(true);

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-brand-model/${modelId}`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.brand_model.name} updated successfully!`);
                router.push('/admin/brand-model');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {
            if (err.response.data.status === 2) {
                setTinyLoader(false);
                // alert(err.response.data.message);
                document.getElementById('modelSlug').innerHTML = err.response.data.message;
                document.getElementById("modelSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('modelSlug').innerHTML = '';
                    document.getElementById("modelSlug").style.display = "none";
                }, 3000);
            }
        });

    }


    const resetFormValues = () => {
        document.getElementById('brand-model-form').reset();
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    if (error) return 'Something went wrong.'
    if (!data) return 'Loading...'

    return (
        <>
            <Layout>
                <AdminHead pageTitle={`${data.brand_model.name}`} />
                <Breadcrumb title={`LR | Edit ${data.brand_model.name}`} />
                <div className="main-data">

                    <form method="POST" onSubmit={updateBrandModel} encType="multipart/form-data" id="brand-model-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">


                                    <div className="form-div">
                                        <select className="floating-select" name="brand_id">
                                            <option defaultValue={''}></option>
                                            {
                                                data !== undefined && fetchBrandName.data && fetchBrandName.data.brands.map((brand) => {
                                                    console.log(data.brand_model.brand_id._id);
                                                    return (
                                                        <option value={`${brand._id}`} key={brand._id} selected={brand._id === data.brand_model.brand_id._id ? true : false} > {brand.name}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                        <label>Select Brand</label>
                                        <small id="brandId" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} defaultValue={data !== undefined ? data.brand_model.name : ''} />
                                        <label htmlFor="Model Name">Model Name</label>
                                        <small id="modelName" className="error"></small>
                                    </div>

                                </div>


                                <div className="form-row two-col">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Image</div>
                                        <input type="file" id="image" name="image" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <div className="image-des">Image Size : 1920 x 800</div>
                                        <small id="modelImage" className="error"></small>
                                    </div>


                                    <div className="form-div">
                                        <input id="slug" name="slug" type="text" placeholder=" " onChange={manageEventHandler} defaultValue={data !== undefined ? data.brand_model.slug : ''} />
                                        <label htmlFor="Model Slug">Slug</label>
                                        <small id="modelSlug" className="error"></small>
                                    </div>
                                </div>


                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <input id="page_title" name="page_title" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand_model.page_title : ''} onChange={manageEventHandler} />
                                        <label htmlFor="Page Title">Page Title</label>
                                        <small id="pageTitle" className="error"></small>
                                    </div>


                                    <div className="form-div">
                                        <input id="h1_tag" name="h1_tag" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand_model.h1_tag : ''} onChange={manageEventHandler} />
                                        <label htmlFor="H1 Tag">H1 Tag</label>
                                    </div>
                                </div>


                                <div className="form-row one-col">
                                    <div className="form-div">
                                        <textarea placeholder=" " name="meta_description" id="meta_description" onChange={manageEventHandler} defaultValue={data !== undefined ? data.brand_model.meta_description : ''} ></textarea>
                                        <label htmlFor="Meta Description">Meta Description</label>
                                    </div>
                                </div>




                                <div className="common-buttons">
                                    <button className="green arrow-style" disabled={tinyLoader}>
                                        <ButtonSpinner load={tinyLoader} btnName="Update" />
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

export default EditBrandModel;