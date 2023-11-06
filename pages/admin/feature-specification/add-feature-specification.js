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

function AddFeatureSpecifications() {

    const router = useRouter();

    const { context, setContext } = useContext(AppContext);
    const [tinyLoader, setTinyLoader] = useState(false);
    const [formData, setFormData] = useState('');

    const fetchFeatureCategory = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-sepecification-category`, fetcher);
    // console.log(fetchFeatureCategory.data.categories)

    const manageEventHandler = (e) => {

    }

    const addFeatureCategory = async (e) => {
        e.preventDefault();

        var createError = 0;

        if (e.target.name.value.length <= 0) {
            document.getElementById('featureName').innerHTML = 'Please enter feature & specifiction name!';
            document.getElementById("featureName").style.display = "block";
            setTimeout(() => {
                document.getElementById('featureName').innerHTML = '';
                document.getElementById("featureName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.feature_id.value.length <= 0) {
            document.getElementById('featureId').innerHTML = 'Please select specification category!';
            document.getElementById("featureId").style.display = "block";
            setTimeout(() => {
                document.getElementById('featureId').innerHTML = '';
                document.getElementById("featureId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData(document.getElementById('feature-specification-form'));

        // formData.append('icon', e.target.icon.files[0]);
        // formData.append('name', e.target.name.value);
        // formData.append('feature_id', e.target.feature_id.value);

        setTinyLoader(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/create-feature`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.message}`);
                router.push('/admin/feature-specification');
                document.getElementById('feature-specification-form').reset();
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {

            setTinyLoader(false);
            if (err.response && err.response.data.status === 2) {
                setTinyLoader(false);
                alert(err.response.data.message);
                document.getElementById('featureSlug').innerHTML = err.response.data.message;
                document.getElementById("featureSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('featureSlug').innerHTML = '';
                    document.getElementById("featureSlug").style.display = "none";
                }, 3000);
            } else if (err.response && err.response.data.status === 0) {
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

                    <form method="POST" encType="multipart/form-data" onSubmit={addFeatureCategory} id="feature-specification-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row">
                                    {/* fetchFeatureCategory.data.categories */}
                                    <div className="form-div">
                                        <select className="floating-select" name="feature_id" id="feature_id">
                                            <option value=""></option>
                                            {
                                                fetchFeatureCategory.data && fetchFeatureCategory.data.categories.map((category) => {
                                                    return (

                                                        <option value={`${category._id}`} key={`${category._id}`}>{category.name}</option>

                                                    )
                                                })
                                            }
                                        </select>

                                        <label>Feature & Specification Category</label>
                                        <small id="featureId" className="error"></small>
                                    </div>
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Specification Name">Feature & Specification Name</label>
                                        <small id="featureName" className="error"></small>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">icon</div>
                                        <input type="file" id="icon" name="icon" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        {/* <div className="image-des">Image Size : 1920 x 800</div> */}
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

export default AddFeatureSpecifications;