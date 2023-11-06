import { AppContext } from "@/components/AppContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ButtonSpinner, createSlug } from "@/components/Helper";
import AdminHead from "@/components/common/adminHead";



function AddBrand() {

    const router = useRouter();
    // const [formData, setFormData] = useState('');
    const { context, setContext } = useContext(AppContext);
    const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);
    // const [execExcelFile, setExecExcelFile] = useState('');

    const manageEventHandler = (e) => { }

    const addBrand = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;

        if (e.target.make_model_variant_excel.value.length <= 0) {
            document.getElementById('excelFileError').innerHTML = 'Please select file for upload.';
            document.getElementById("excelFileError").style.display = "block";
            setTimeout(() => {
                document.getElementById('excelFileError').innerHTML = '';
                document.getElementById("excelFileError").style.display = "none";
            }, 3000);
            createError++;
        }


        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();
        formData.append('make_model_variant_excel', e.target.make_model_variant_excel.files[0]);
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        // console.log(formValues.logo);
        setTinyLoader(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/upload-make-model-variant`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(`Excel Uploaded successfully.`);
                // router.push('/admin/brands');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }
        }).catch((err) => {
            // if (err.response.data.status === 2) {

            // }
            alert(`File not uploaded.`);
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


    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Upload Brands Excel`} />
                <Breadcrumb title="LR | Uplaod Brands Excel" />
                <div className="main-data">

                    <form method="POST" onSubmit={addBrand} encType="multipart/form-data" id="brand-form">
                        <div className="form-style">
                            <div className="wrapper">

                                <div className="form-row two-col">

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Excel Upload</div>
                                        <input type="file" id="make-model-variant-excel" name="make_model_variant_excel" onChange={manageEventHandler} accept=".xlsx, .csv, .xls" />
                                        {/*  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" */}
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="excelFileError" className="error"></small>
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

            </Layout>
        </>
    )
}

export default AddBrand;