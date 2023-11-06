import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import { $ } from 'react-jquery-plugin'

export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const [formData, setFormData] = useState('')
    const router = useRouter()
    const [data, setData] = useState([])
    const [logo, setLogo] = useState('')
    const query = router.query.id

    const eventChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const addUpdateServiceCategory = async (e) => {
        e.preventDefault();
        var createError = 0;

        if (e.target.service_category_name.value.length <= 0) {
            document.getElementById('serviceCategoryNameError').innerHTML = 'Please enter service category name';
            document.getElementById("serviceCategoryNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCategoryNameError').innerHTML = '';
                document.getElementById("serviceCategoryNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.service_category_slug.value.length <= 0) {
            document.getElementById('serviceCategorySlugError').innerHTML = 'Please enter slug';
            document.getElementById("serviceCategorySlugError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCategorySlugError').innerHTML = '';
                document.getElementById("serviceCategorySlugError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (query === undefined) {
            if (logo.length <= 0) {
                document.getElementById('imageError').innerHTML = 'Please select image';
                document.getElementById("imageError").style.display = "block";
                setTimeout(() => {
                    document.getElementById('imageError').innerHTML = '';
                    document.getElementById("imageError").style.display = "none";
                }, 3000);
                createError++;
            }
        }

        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        setTinyloader(true);
        const formData = new FormData(document.getElementById('serviceCategoryForm'));
        formData.append("image", logo);
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/create-service-category`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-service-category/${query}`

        if (query) {
            await axios.post(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/service/service-category')
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
                    router.push('/admin/service/service-category')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }


    const editServiceCategory = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-service-category/${query}`, {
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
            editServiceCategory()
        }
        setTimeout(() => {
            $('#summernote').summernote({
                placeholder: 'Hello stand alone ui',
                tabsize: 2,
                height: 120,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview', 'help']]
                ]
            });
        }, 1000)
    }, [query])



    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Service Category </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="/img/lr-favicon.ico"
                    rel="icon"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    href="/img/lr-favicon-dark.ico"
                    rel="icon"
                    media="(prefers-color-scheme: dark)"
                />
                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js" defer />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer />

                <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" defer></script>
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Service Category' : ' Add Service Category'} />
                <div className="form-style">
                    <form action="" id="serviceCategoryForm" onSubmit={(e) => addUpdateServiceCategory(e)} method="POST">
                        <div className="wrapper">
                            <div className="form-row">

                                <div className="form-div">
                                    <input type="hidden" name="id" value={data && data._id ? data._id : ''} />
                                    <input id="serviceCategoryName" placeholder=' ' name='service_category_name' type="text" defaultValue={data && data.name ? data.name : ''} onChange={(e) => eventChangeHandler(e)} onKeyUp={(e) => createSlug(e.target.value, 'serviceCategorySlug')} onLoad={(e) => createSlug(e.target.value, 'serviceCategorySlug')} />
                                    <label htmlFor="serviceCategoryName">Service Category Name</label>
                                    <small id="serviceCategoryNameError" className="error"></small>
                                </div>

                                <div className="form-div">
                                    <input id="serviceCategorySlug" placeholder=' ' name="service_category_slug" type="text" defaultValue={data && data.slug ? data.slug : ''} onChange={(e) => eventChangeHandler(e)} />
                                    <label htmlFor="serviceCategorySlug">Slug</label>
                                    <small id="serviceCategorySlugError" className="error"></small>
                                </div>

                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file</label>
                                    <small id="imageError" className="error"></small>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                </div>

                            </div>
                            <div className='form-row'>
                                <textarea id="summernote" name="service_category_description" defaultValue={data && data.name ? data.description : ''}>
                                </textarea>
                            </div>
                            <div className='form-row two-col'>
                                <div className="form-div">
                                    <input id="sort" name="service_category_sorting" type="text" placeholder=" " defaultValue={data && data.name ? data.sorting : ''} />
                                    <label htmlFor="Sorting">Sorting</label>

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