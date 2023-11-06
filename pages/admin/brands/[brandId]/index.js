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


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function EditBrand() {

    const router = useRouter();
    const { brandId } = router.query;


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/view-brand/${brandId}`, fetcher);

    // console.log(data);
    // const [formData, setFormData] = useState('');
    // const { context, setContext } = useContext(AppContext);
    // const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);

    const manageEventHandler = (e) => { }

    const updateBrand = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;


        if (e.target.name.value.length <= 0) {
            document.getElementById('brandName').innerHTML = 'Please enter name!';
            document.getElementById("brandName").style.display = "block";
            setTimeout(() => {
                document.getElementById('brandName').innerHTML = '';
                document.getElementById("brandName").style.display = "none";
            }, 3000);
            createError++;
        }

        // if (e.target.logo.value.length <= 0) {
        //     document.getElementById('brandLogo').innerHTML = 'Please select logo!';
        //     document.getElementById("brandLogo").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('brandLogo').innerHTML = '';
        //         document.getElementById("brandLogo").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('brandSlug').innerHTML = 'Please enter slug!';
            document.getElementById("brandSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('brandSlug').innerHTML = '';
                document.getElementById("brandSlug").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.sort.value.length <= 0) {
            document.getElementById('brandSlug').innerHTML = 'Please enter slug!';
            document.getElementById("brandSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('brandSlug').innerHTML = '';
                document.getElementById("brandSlug").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();
        formData.append('logo', e.target.logo.files[0]);
        formData.append('name', e.target.name.value);
        formData.append('slug', e.target.slug.value);
        formData.append('sort', e.target.sort.value);
        formData.append('page_title', e.target.page_title.value);
        formData.append('h1_tag', e.target.h1_tag.value);
        formData.append('meta_description', e.target.meta_description.value);
        // formData.getAll('name');
        // const formValues = Object.fromEntries(formData);
        // console.log(formData);
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        // console.log(formValues.logo);
        setTinyLoader(true);

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-brand/${brandId}`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.brand.name} updated successfully!`);
                router.push('/admin/brands');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {
            if (err.response.data.status === 2) {
                setTinyLoader(false);
                // alert(err.response.data.message);
                document.getElementById('brandSlug').innerHTML = err.response.data.message;
                document.getElementById("brandSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('brandSlug').innerHTML = '';
                    document.getElementById("brandSlug").style.display = "none";
                }, 3000);
            }
        });

    }


    const resetFormValues = () => {
        document.getElementById('brand-form').reset();
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
                <AdminHead pageTitle={data.brand.name} />
                <Breadcrumb title={`LR | Edit ${data.brand.name}`} />
                <div className="main-data">

                    <form method="POST" onSubmit={updateBrand} encType="multipart/form-data" id="brand-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} defaultValue={data !== undefined ? data.brand.name : ''} />
                                        <label htmlFor="Brand Name">Brand Name</label>
                                        <small id="brandName" className="error"></small>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Logo</div>
                                        <input type="file" id="logo" name="logo" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        {/* <div className="image-des">Image Size : 1920 x 800</div> */}
                                        <small id="brandLogo" className="error"></small>
                                    </div>

                                </div>

                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <input id="slug" name="slug" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand.slug : ''} onChange={manageEventHandler} />
                                        <label htmlFor="Brand Name">Slug</label>
                                        <small id="brandSlug" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="sort" name="sort" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand.sort : ''} onChange={manageEventHandler} />
                                        <label htmlFor="Brand Name">Logo Sorting</label>
                                        <small id="brandSlug" className="error"></small>
                                    </div>


                                    <div className="form-row two-col">
                                        <div className="form-div">
                                            <input id="page_title" name="page_title" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand.page_title : ''} onChange={manageEventHandler} />
                                            <label htmlFor="Page Title">Page Title</label>
                                            <small id="pageTitle" className="error"></small>
                                        </div>


                                        <div className="form-div">
                                            <input id="h1_tag" name="h1_tag" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand.h1_tag : ''} onChange={manageEventHandler} />
                                            <label htmlFor="H1 Tag">H1 Tag</label>
                                        </div>
                                    </div>


                                    <div className="form-row one-col">
                                        <div className="form-div">
                                            <textarea placeholder=" " name="meta_description" id="meta_description" onChange={manageEventHandler} defaultValue={data !== undefined ? data.brand.meta_description : ''} ></textarea>
                                            <label htmlFor="Meta Description">Meta Description</label>
                                        </div>
                                    </div>



                                    {/* <div className="form-div"> */}
                                    {/* <input id="slug" name="slug" type="text" placeholder=" " defaultValue={data !== undefined ? data.brand.slug : ''} onChange={manageEventHandler} />
                                        <label htmlFor="Brand Name">Slug</label>
                                        <small id="brandSlug" className="error"></small> */}
                                    {/*  onClick="this.setAttribute('value', this.value);" */}
                                    {/* <div className="form-div">
                                            <select className="floating-select">
                                                <option value=""></option>
                                                <option value="1" >Active</option>
                                                <option value="2">In-active</option>
                                            </select>

                                            <label>Select Status</label>
                                        </div>
                                    </div> */}


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

            </Layout>
        </>
    )
}

export default EditBrand;