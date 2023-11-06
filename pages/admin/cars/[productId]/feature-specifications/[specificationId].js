import AdminHead from "@/components/common/adminHead";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import { ButtonSpinner } from "@/components/Helper";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function EditProductSpecification() {

    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { productId, specificationId } = router.query;
    const [tinyLoader, setTinyLoader] = useState(false);

    const fetchFeatureSpecifications = useSWR(`${Url}admin/get-all-feature-specification`, fetcher);

    const { data, error } = useSWR(`${Url}admin/get-product-feature-detail/${specificationId}`, fetcher);

    const manageEventHandler = () => { }

    const updateSpecification = async (e) => {
        e.preventDefault();

        let createError = 0;
        if (e.target.specification_id.value.length <= 0) {
            document.getElementById('specificationId').innerHTML = 'Please select Feature Specification';
            document.getElementById("specificationId").style.display = "block";
            setTimeout(() => {
                document.getElementById('specificationId').innerHTML = '';
                document.getElementById("specificationId").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.specification_value.value.length <= 0) {
            document.getElementById('specificationValue').innerHTML = 'Please enter Feature & Specification Value';
            document.getElementById("specificationValue").style.display = "block";
            setTimeout(() => {
                document.getElementById('specificationValue').innerHTML = '';
                document.getElementById("specificationValue").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            alert('Please check all details');
            return false;
        }

        const formData = new FormData(document.getElementById("specification-form"));
        formData.append('specification_id', e.target.specification_id.value);
        formData.append('specification_value', e.target.specification_value.value);
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        await axios.patch(`${Url}admin/update-product-specification-detail/${specificationId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                alert(`${res.data.message}`);
                router.push(`/admin/cars/${productId}/feature-specifications/`)
            }
        }).catch((e) => {
            console.log(e.response.data.message)
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })

    }

    const resetFormValues = () => {
        document.getElementById('specification-form').reset();
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    // console.log(fetchFeatureSpecifications.data.feature_specifications);
    // console.log(data.feature_specification);

    return (
        <>
            <AdminHead pageTitle={`Edit Feature`} />
            <Layout>

                <Breadcrumb title="LR | Edit Feature" />
                <div className="main-data">
                    {/* fetchFeatureSpecifications.data.feature_specifications */}
                    <form method="POST" onSubmit={updateSpecification} encType="multipart/form-data" id="specification-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <select className="floating-select" id="specification_id" name='specification_id' onChange={(e) => fetchModelsByBrand(e.target.value)}>
                                            <option value=""></option>
                                            {
                                                fetchFeatureSpecifications.data && fetchFeatureSpecifications.data.feature_specifications.map((feature) => {
                                                    return (
                                                        <option value={`${feature.feature_id}`} key={feature.feature_id} selected={data !== undefined && feature.feature_id === data.feature_specification.fs_id}>{feature.feature_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label htmlFor="Feature Specification">Feature Specification</label>
                                        <small id="specificationId" className="error"></small>
                                    </div>
                                    <div className="form-div">
                                        {/* data.feature_specification */}
                                        <input id="specification_value" name="specification_value" type="text" placeholder=" " defaultValue={data !== undefined && data.feature_specification.fs_value} onChange={manageEventHandler} />
                                        <label htmlFor="Brand Name">Value</label>
                                        <small id="specificationValue" className="error"></small>
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

            </Layout>
        </>
    )
}

export default EditProductSpecification;