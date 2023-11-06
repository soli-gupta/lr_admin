import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import DatePicker from "react-datepicker";
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'


export default function Index() {
    const { reset, register, handleSubmit, formState: { errors } } = useForm();
    const [tinyloader, setTinyloader] = useState(false)
    const [formData, setFormData] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
    const router = useRouter()
    const [data, setData] = useState('')
    const [logo, setLogo] = useState('')
    const query = router.query.id

    const addNewsMedia = (e) => {
        e.preventDefault();

        var createError = 0;

        if (e.target.title.value.length <= 0) {
            document.getElementById('titleError').innerHTML = 'Please enter title';
            document.getElementById("titleError").style.display = "block";
            setTimeout(() => {
                document.getElementById('titleError').innerHTML = '';
                document.getElementById("titleError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('newsSlugError').innerHTML = 'Please enter slug';
            document.getElementById("newsSlugError").style.display = "block";
            setTimeout(() => {
                document.getElementById('newsSlugError').innerHTML = '';
                document.getElementById("newsSlugError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (query === undefined) {
            if (logo.length <= 0) {
                document.getElementById('newsImageError').innerHTML = 'Please select image';
                document.getElementById("newsImageError").style.display = "block";
                setTimeout(() => {
                    document.getElementById('newsImageError').innerHTML = '';
                    document.getElementById("newsImageError").style.display = "none";
                }, 3000);
                createError++;
            }
        }

        if (e.target.short_description.value.length <= 0) {
            document.getElementById('shortDescriptionError').innerHTML = 'Please enter short description';
            document.getElementById("shortDescriptionError").style.display = "block";
            setTimeout(() => {
                document.getElementById('shortDescriptionError').innerHTML = '';
                document.getElementById("shortDescriptionError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.description.value.length <= 0) {
            document.getElementById('descriptionError').innerHTML = 'Please enter description';
            document.getElementById("descriptionError").style.display = "block";
            setTimeout(() => {
                document.getElementById('descriptionError').innerHTML = '';
                document.getElementById("descriptionError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyloader(false);
            return false;
        }

        setTinyloader(true);
        const formData = new FormData(document.getElementById('newsMediaForm'));
        formData.append("image", logo);

        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/create-news-media`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-news-media/${query}`

        if (query) {
            axios.post(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message);
                    router.push('/admin/news-media')
                }
            }).catch(function (error) {
                console.log(error)

            });
        } else {
            axios.post(addUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    router.push('/admin/news-media')
                }
            }).catch(function (error) {
                console.log(error)

            });
        }
    }


    const viewNewsMedia = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-news-media/${query}`, {
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
        import("react-datepicker/dist/react-datepicker.css");
        if (query) {
            viewNewsMedia()
        }
        setCurrentDate(new Date());
    }, [query])

    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} News Media</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />
                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js"></script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update News Media' : ' Add News Media'} />
                <div className="form-style calender-style">
                    <form id="newsMediaForm" onSubmit={(e) => addNewsMedia(e)} enctype="multipart/form-data">
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <input id="titleName" placeholder=' ' name="title" type="text" defaultValue={data && data.title ? data.title : ''} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} />
                                    <label htmlFor="titleName">Title*</label>
                                    <small className="error" id="titleError"></small>
                                </div>
                                <div className="form-div">
                                    <input id="slug" placeholder=' ' name="slug" type="text" defaultValue={data && data.slug ? data.slug : ''} />
                                    <label htmlFor="slug">Slug*</label>
                                    <small className="error" id="newsSlugError"></small>
                                </div>

                                <div className="form-div">
                                    <input id="news_url" placeholder=' ' name="news_url" type="url" defaultValue={data && data.news_url ? data.news_url : ''} />
                                    <label htmlFor="news_url">News Url*</label>
                                    <small className="error" id="newsUrlError"></small>
                                </div>
                            </div>

                            <div className="form-row two-col">
                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file*</label>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                    <small className='error' id="newsImageError"></small>
                                </div>

                                <div className="form-div">
                                    <DatePicker
                                        className='calender-icon'
                                        name='posted_date'
                                        maxDate={currentDate}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>


                            <div className="form-row one-col">
                                <div className="form-div">
                                    <textarea placeholder=" " name='short_description' id="short_description" defaultValue={data && data.short_description ? data.short_description : ''}></textarea>
                                    <label htmlFor="short_description">Short Description</label>
                                    <small className="error" id="shortDescriptionError"> </small>
                                </div>
                            </div>
                            <div className="form-row one-col">
                                <div className="form-div">
                                    <textarea placeholder=" " id="description" name="description" defaultValue={data && data.description ? data.description : ''}>
                                    </textarea>
                                    <label htmlFor="description">Description</label>
                                    <small className="error" id="descriptionError"> </small>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-div">
                                    <input id="blogslug" placeholder=' ' name="page_title" type="text" defaultValue={data && data.page_title ? data.page_title : ''} />
                                    <label htmlFor="blogslug">Page Title</label>
                                    <small className="error"> </small>
                                </div>


                                <div className="form-div">
                                    <input id="metaKeywords" placeholder=' ' name="meta_keywords" type="text" defaultValue={data && data.meta_keywords ? data.meta_keywords : ''} />
                                    <label htmlFor="metaKeywords">Meta Keywords</label>
                                    <small className="error"> </small>
                                </div>

                                <div className="form-div">
                                    <input id="metaDescription" placeholder=' ' name="meta_description" type="text" defaultValue={data && data.meta_description ? data.meta_description : ''} />
                                    <label htmlFor="metaDescription">Meta Description</label>
                                    <small className="error"> </small>
                                </div>

                            </div>
                            {/* <MyEditor /> */}
                            {/* <Editor /> */}
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

