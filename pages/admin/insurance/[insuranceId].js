import { AppContext } from "@/components/AppContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { ButtonSpinner, createSlug } from "@/components/Helper";
import AdminHead from "@/components/common/adminHead";



const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);


function EditInsurance() {

    const router = useRouter();
    const { insuranceId } = router.query;
    // const [formData, setFormData] = useState('');
    const { context, setContext } = useContext(AppContext);
    const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/get-insurance-detail?id=${insuranceId}`, fetcher);

    const manageEventHandler = (e) => { }

    const updateInsurance = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;


        if (e.target.name.value.length <= 0) {
            document.getElementById('insuranceName').innerHTML = 'Please enter name.';
            document.getElementById("insuranceName").style.display = "block";
            setTimeout(() => {
                document.getElementById('insuranceName').innerHTML = '';
                document.getElementById("insuranceName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.image.value.length <= 0) {
            document.getElementById('insuranceLogo').innerHTML = 'Please select image.';
            document.getElementById("insuranceLogo").style.display = "block";
            setTimeout(() => {
                document.getElementById('insuranceLogo').innerHTML = '';
                document.getElementById("insuranceLogo").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();
        formData.append('image', e.target.image.files[0]);
        formData.append('name', e.target.name.value);
        setTinyLoader(true);

        await axios.patch(`${process.env.NEXT_PUBLIC_URL}admin/udpate-insurance/${insuranceId}`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // setTinyLoader(false);
                alert(`${response.data.message}`);
                router.push('/admin/insurance');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {
            if (err && err.message) {
                setTinyLoader(false);
                alert(err.message);
            }
            if (err && err.response.data.status === 0) {
                setTinyLoader(false);
                alert(err.response.data.message);
            }
            //  else if (err && err.response.data.status === 2) {
            //     setTinyLoader(false);
            //     // alert(err.response.data.message);
            //     document.getElementById('brandSlug').innerHTML = err.response.data.message;
            //     document.getElementById("brandSlug").style.display = "block";
            //     setTimeout(() => {
            //         document.getElementById('brandSlug').innerHTML = '';
            //         document.getElementById("brandSlug").style.display = "none";
            //     }, 3000);
            // }
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


    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Edit ${data !== undefined && data.insurance !== undefined ? data.insurance.name : ''}`} />
                <Breadcrumb title="LR | Edit Insurance" />
                <div className="main-data">

                    <form method="POST" onSubmit={updateInsurance} encType="multipart/form-data" id="brand-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} defaultValue={data !== undefined && data.insurance !== undefined ? data.insurance.name : ''} />
                                        <label htmlFor="Insurance Name">Insurance Name</label>
                                        <small id="insuranceName" className="error"></small>
                                    </div>
                                    {/* onLoad={() => createSlug(e.target.value, 'slug')}  onKeyUp={(e) => createSlug(e.target.value, 'slug')} */}
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Insurance Logo</div>
                                        <input type="file" id="image" name="iamge" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <div className="image-des">Image Size : 1920 x 800</div>
                                        <small id="insuranceLogo" className="error"></small>
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

export default EditInsurance;