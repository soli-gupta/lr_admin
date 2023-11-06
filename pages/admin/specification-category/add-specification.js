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


function AddFeatureSpecifications() {

    const router = useRouter();

    const { context, setContext } = useContext(AppContext);
    const [tinyLoader, setTinyLoader] = useState(false);
    const [formData, setFormData] = useState('');

    const manageEventHandler = (e) => {
        // setFormData((prevState) => ({
        //     ...prevState,
        //     [e.target.name]: e.target.value
        // }));
    }

    const addFeatureCategory = async (e) => {
        e.preventDefault();

        var createError = 0;

        if (e.target.name.value.length <= 0) {
            document.getElementById('featureName').innerHTML = 'Please enter name!';
            document.getElementById("featureName").style.display = "block";
            setTimeout(() => {
                document.getElementById('featureName').innerHTML = '';
                document.getElementById("featureName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('featureSlug').innerHTML = 'Please enter slug!';
            document.getElementById("featureSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('featureSlug').innerHTML = '';
                document.getElementById("featureSlug").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }


        const $name = document.getElementById('name').value;
        const $slug = document.getElementById('slug').value;

        const data = {
            name: $name,
            slug: $slug
        }

        setTinyLoader(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/add-specification-category`, data, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.data.name} added successfully!`);
                router.push('/admin/specification-category');
                document.getElementById('feature-specification-form').reset();
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {

            setTinyLoader(false);
            if (err.response.data.status === 2) {
                setTinyLoader(false);
                // alert(err.response.data.message);
                document.getElementById('featureSlug').innerHTML = err.response.data.message;
                document.getElementById("featureSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('featureSlug').innerHTML = '';
                    document.getElementById("featureSlug").style.display = "none";
                }, 3000);
            } else if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const resetFormValues = () => {
        document.getElementById('feature-specification-form').reset();
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);

    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Add Feature & Specification`} />
                <Breadcrumb title="Luxury Ride| Add Feature & Specification" />
                <div className="main-data">

                    <form method="POST" onSubmit={addFeatureCategory} id="feature-specification-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} />
                                        <label htmlFor="Specification Name">Category Name</label>
                                        <small id="featureName" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="slug" name="slug" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Feature Slug">Slug</label>
                                        <small id="featureSlug" className="error"></small>
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

export default AddFeatureSpecifications;