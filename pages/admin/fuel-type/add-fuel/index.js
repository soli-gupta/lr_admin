import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const [formData, setFormData] = useState('')
    const router = useRouter()
    const [data, setData] = useState('')
    const [logo, setLogo] = useState('')
    const query = router.query.id

    const eventChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const addUpdateFuelType = async (e) => {
        e.preventDefault();
        // console.log(e.target.name.value.length)
        var createError = 0;

        if (e.target.name.value.length <= 0) {
            document.getElementById('fuelNameError').innerHTML = 'Please enter name!';
            document.getElementById("fuelNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('fuelNameError').innerHTML = '';
                document.getElementById("fuelNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('fuelSlugError').innerHTML = 'Please enter slug!';
            document.getElementById("fuelSlugError").style.display = "block";
            setTimeout(() => {
                document.getElementById('fuelSlugError').innerHTML = '';
                document.getElementById("fuelSlugError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.sorting.value.length <= 0) {
            document.getElementById('sortingError').innerHTML = 'Please enter sorting!';
            document.getElementById("sortingError").style.display = "block";
            setTimeout(() => {
                document.getElementById('sortingError').innerHTML = '';
                document.getElementById("sortingError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (query === undefined) {
            if (logo.length <= 0) {
                document.getElementById('bodyLogoError').innerHTML = 'Please select logo!';
                document.getElementById("bodyLogoError").style.display = "block";
                setTimeout(() => {
                    document.getElementById('bodyLogoError').innerHTML = '';
                    document.getElementById("bodyLogoError").style.display = "none";
                }, 3000);
                createError++;
            }
        }

        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        setTinyloader(true);
        const formData = new FormData(document.getElementById('fuelTypeForm'));
        formData.append("logo", logo);
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/add-fuel`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-fuel/${query}`

        if (query) {
            await axios.patch(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/fuel-type')
                }
            }).catch(function (error) {
                setTinyloader(false)
                console.log(error)

            });
        } else {
            formData.delete('id')
            await axios.post(addUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/fuel-type')
                }
            }).catch(function (error) {
                // console.log(error)

            });
        }
    }


    const getFuelList = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-fuel/${query}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setData(res.data.data)
            }
        }).catch(function (error) {
            console.log(error)

        });
    }
    useEffect(() => {
        if (query) {
            getFuelList()
        }
    }, [query])



    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Fuel Type </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Fuel Type' : ' Add Fuel Type'} />
                <div className="form-style">
                    <form action="" id="fuelTypeForm" onSubmit={(e) => addUpdateFuelType(e)} method="POST">
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <input type="hidden" name="id" value={data && data._id ? data._id : ''} />
                                    <input id="fuelname" name='name' placeholder=' ' type="text" defaultValue={data && data.fuel_name ? data.fuel_name : ''} onChange={(e) => eventChangeHandler(e)} onKeyUp={(e) => createSlug(e.target.value, 'fuelslug')} onLoad={() => createSlug(e.target.value, 'fuelslug')} />
                                    <label htmlFor="fuelname">Name</label>
                                    <small id="fuelNameError" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <input id="fuelslug" placeholder=' ' name="slug" type="text" defaultValue={data && data.fuel_slug ? data.fuel_slug : ''} onChange={(e) => eventChangeHandler(e)} />
                                    <label htmlFor="fuelslug">Slug</label>
                                    <small id="fuelSlugError" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <input id="sorting" name='sorting' type="number" defaultValue={data && data.sorting ? data.sorting : ''} />
                                    <label htmlFor="sorting">Sorting</label>
                                    <small id="sortingError" className="error"></small>
                                </div>
                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file</label>
                                    <small id="bodyLogoError" className="error"></small>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                </div>
                            </div>
                            <div className="common-buttons">
                                <button className="green" disabled={tinyloader} type="submit">
                                    <ButtonSpinner load={tinyloader} btnName="Save" />
                                </button>
                            </div>
                            <div>

                            </div>

                        </div>

                    </form>
                </div>
            </Layout>
        </>
    )
}