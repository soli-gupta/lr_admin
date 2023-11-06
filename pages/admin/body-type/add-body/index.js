import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug, onlyNumberKey } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'


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

    const addUpdateBodyType = async (e) => {
        e.preventDefault();

        var createError = 0;
        console.log(e.target.body_slug.value)

        if (e.target.body_name.value.length <= 0) {
            document.getElementById('bodyNameError').innerHTML = 'Please enter name!';
            document.getElementById("bodyNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('bodyNameError').innerHTML = '';
                document.getElementById("bodyNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.body_slug.value.length <= 0) {
            document.getElementById('bodySlugError').innerHTML = 'Please enter slug!';
            document.getElementById("bodySlugError").style.display = "block";
            setTimeout(() => {
                document.getElementById('bodySlugError').innerHTML = '';
                document.getElementById("bodySlugError").style.display = "none";
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
        const formData = new FormData(document.getElementById('bodyTypeForm'));
        formData.append("logo", logo);
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/add-body-type`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-body-type/${query}`
        console.log(formData)
        if (query) {

            await axios.patch(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/body-type')
                }
            }).catch(function (error) {
                console.log(error)

            });
        } else {
            await axios.post(addUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/body-type')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }


    const getbodyList = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-body-type/${query}`, {
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
            getbodyList()
        }

    }, [query])

    console.log(data)

    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} body Type </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update body Type' : ' Add body Type'} />
                <div className="form-style">
                    <form id="bodyTypeForm" method='post' onSubmit={(e) => addUpdateBodyType(e)}>
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <input type="hidden" name="id" value={data && data._id ? data._id : ''} />
                                    <input id="bodyname" placeholder=" " name='body_name' type="text" defaultValue={data && data.body_name ? data.body_name : ''} onKeyUp={(e) => createSlug(e.target.value, 'bodyslug')} onLoad={() => createSlug(e.target.value, 'bodyslug')} />
                                    <label htmlFor="bodyname">Name</label>
                                    <small id="bodyNameError" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <input id="bodyslug" placeholder='' name="body_slug" type="text" defaultValue={data && data.body_slug ? data.body_slug : ''} />
                                    <label htmlFor="bodyslug">Slug</label>
                                    <small id="bodySlugError" className="error"></small>
                                </div>
                                <div className="form-div">
                                    <input id="sorting" name='sorting' type="number" defaultValue={data && data.sorting ? data.sorting : ''} />
                                    <label htmlFor="sorting">Sorting</label>
                                    <small id="sortingError" className="error"></small>
                                </div>
                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" defaultValue={data && data.body_slug ? data.body_slug : ''} onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file</label>
                                    <small id="bodyLogoError" className="error"></small>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                </div>
                            </div>
                            <div className="common-buttons">
                                <button className="green" disabled={tinyloader}>
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

