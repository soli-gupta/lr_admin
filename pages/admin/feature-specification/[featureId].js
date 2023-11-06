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


function EditFeatureSpecifications() {

    const router = useRouter();
    const { specificationId } = router.query;
    const { context, setContext } = useContext(AppContext);
    const [tinyLoader, setTinyLoader] = useState(false);
    const [formData, setFormData] = useState('');

    const { featureId } = router.query;

    const fetchFeatureCategory = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-sepecification-category`, fetcher);

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/view-feature-specification/${featureId}`, fetcher)
    const manageEventHandler = (e) => {

    }
    // console.log(featureId);
    const updateFeatureCategory = async (e) => {
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

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/update-feature-specification/${featureId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`${response.data.message}`);
                router.push('/admin/feature-specification');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {

            setTinyLoader(false);
            if (err.response.data.status === 2) {
                setTinyLoader(false);
                // alert(err.response.data.message);
                document.getElementById('featureName').innerHTML = err.response.data.message;
                document.getElementById("featureName").style.display = "block";
                setTimeout(() => {
                    document.getElementById('featureName').innerHTML = '';
                    document.getElementById("featureName").style.display = "none";
                }, 3000);
            } else if (err.response.data.status === 0) {
                // alert(err.response.data.message);
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

    if (error) return 'Something went wrong.'
    if (!data) return 'Loading...'

    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Edit Feature & Specification`} />
                <Breadcrumb title="Luxury Ride| Edit Feature & Specification" />
                <div className="main-data">

                    <form method="POST" onSubmit={updateFeatureCategory} id="feature-specification-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row">
                                    {/* fetchFeatureCategory.data.categories */}
                                    <div className="form-div">
                                        <select className="floating-select" name="feature_id" id="feature_id">
                                            <option value=""></option>
                                            {
                                                data !== undefined && fetchFeatureCategory.data && fetchFeatureCategory.data.categories.map((category) => {
                                                    return (

                                                        <option value={`${category._id}`} key={`${category._id}`} selected={category._id === data.features.feature_id._id ? true : false}>{category.name}</option>

                                                    )
                                                })
                                            }
                                        </select>

                                        <label>Feature & Specification Category</label>
                                        <small id="featureId" className="error"></small>
                                    </div>
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} defaultValue={data !== undefined ? data.features.name : ''} />
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

export default EditFeatureSpecifications;