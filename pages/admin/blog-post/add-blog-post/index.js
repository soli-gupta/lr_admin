import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import Select from 'react-select'
import useSWR from 'swr'
import DatePicker from "react-datepicker";
import makeAnimated from 'react-select/animated';
import { $ } from 'react-jquery-plugin'
const animatedComponents = makeAnimated();

const fetcher = (url, token) => axios.get(url, { headers: { token: `${localStorage.getItem("lr-admin-token")}` } }).then(res => res.data)


export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const router = useRouter()
    const [blogPost, setBlogPost] = useState('')

    const [logo, setLogo] = useState('')
    const [logoPre, setLogoPre] = useState()
    const query = router.query.id
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/blog-category-list`, fetcher)
    const allTags = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/tag-list`, fetcher)
    const getblog = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/view-blog?id=${query}`, fetcher)
    const res = getblog.data


    if (error) console.log(error);
    let getProdOpt = [];
    if (allTags.data !== undefined) {
        allTags.data.data.map((prod) => {
            getProdOpt.push({
                value: prod._id,
                label: prod.name
            })
        })
    }

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    const handleBanner = (e) => {
        setLogo(e.target.files[0])
        setLogoPre(URL.createObjectURL(e.target.files[0]));
    }

    const addUpdateBlogPost = async (e) => {
        e.preventDefault();
        setTinyloader(true);
        const formData = new FormData(document.getElementById('blogPostForm'));
        formData.append('logo', logo)
        formData.delete('files')
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/add-blog`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-blog/${query}`

        if (query) {

            await axios.patch(updateUrl, formData, {
                headers: {
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message)
                    router.push('/admin/blog-post')
                }
            }).catch(function (error) {
                if (error.response.status === 422) {
                    alert(error.response.data.message)
                }
                setTinyloader(false)
            });
        } else {
            await axios.post(addUrl, formData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
                }
            }).then(function (res) {
                setTinyloader(false)
                if (res.data.status == 1) {
                    alert(res.data.message)
                    router.push('/admin/blog-post')
                }
            }).catch(function (error) {
                if (error.response.status === 422) {
                    alert(error.response.data.message)
                }
                setTinyloader(false)
            });
        }
    }


    const getBlogPost = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/view-blog?id=${query}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setBlogPost(res.data.data)
            }
        }).catch(function (error) {
            console.log(error)
        });
    }
    let getProdOpts = [];
    //if (blogPost) {

    const optionss = blogPost.blog_tag && blogPost.blog_tag.map(prod => {
        return { label: prod.name, value: prod._id }
    })
    // if (blogPost.blog_tag.length > 0) {
    //     blogPost.blog_tag.map((prod) => {
    //         getProdOpts.push({
    //             value: prod._id,
    //             label: prod.name
    //         })

    //     })

    // }

    //console.log(getProdOpts)
    // }

    useEffect(() => {
        import("react-datepicker/dist/react-datepicker.css");
        setCurrentDate(new Date());
        if (query) {
            getBlogPost()
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
    // if (res) console.log(res)



    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Blog POST </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />

                {/* <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js"></script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script> */}

                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js" defer />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer />

                <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" defer></script>
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Blog POST' : 'Add Blog POST'} />
                <div className="form-style calender-style">
                    <form id="blogPostForm" enctype="multipart/form-data">
                        <div className="wrapper">
                            <div className="form-row">
                                <div className="form-div">
                                    <input type="hidden" name={blogPost && blogPost._id ? 'id' : ''} defaultValue={blogPost && blogPost._id ? blogPost._id : ''} />
                                    <select className="floating-select" name="category_id">
                                        <option value="" ></option>
                                        {data && data.data && data.data.map((category, i) => {
                                            return (
                                                <>
                                                    <option value={category._id} key={i} selected={blogPost && blogPost.blog_category_id && blogPost.blog_category_id._id === category._id ? true : false}>
                                                        {category.blog_category_name}
                                                    </option>
                                                </>
                                            )
                                        })}
                                    </select>
                                    <label>Select Category*</label>
                                </div>
                                <div className="form-div">
                                    <input id="blogName" placeholder=' ' name='name' type="text" defaultValue={blogPost && blogPost.blog_name ? blogPost.blog_name : ''} onKeyUp={(e) => createSlug(e.target.value, 'blogslug')} onLoad={() => createSlug(e.target.value, 'blogslug')} />
                                    <label htmlFor="blogName">Name*</label>
                                </div>
                                <div className="form-div">
                                    <input id="blogslug" placeholder=' ' name="slug" type="text" defaultValue={blogPost && blogPost.blog_slug ? blogPost.blog_slug : ''} />
                                    <label htmlFor="blogslug">Slug*</label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-div file-upload">
                                    <div className="custom-label">Image</div>
                                    <input type="file" id="file-upload2" onChange={(e) => handleBanner(e)} />
                                    <label htmlFor="file-upload2">Upload file*</label>
                                    <div id="file-upload-filename"></div>
                                    {logoPre ? <img src={logoPre} height="100" width="100" /> : blogPost && blogPost.blog_image ? <img src={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${blogPost.blog_image}`} height="100" width="100" /> : ''}
                                    {/* <div className="image-des">Image Size : 1920 x 800</div> */}
                                </div>

                                <div className="form-div">
                                    <DatePicker
                                        className='calender-icon'
                                        name='posted_date'
                                        id="datepicker"
                                        maxDate={currentDate}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)} />

                                </div>

                                <div className="form-div">
                                    <input type="hidden" name="posted_by" id="" value="63eb21dff5fcdd6b5cda07a8" />
                                    <input id="postedBy" placeholder=' ' type="text" readOnly value="admin" defaultValue={blogPost && blogPost.blog_posted_by ? blogPost.blog_posted_by : ''} />
                                    <label htmlFor="postedBy">posted_by</label>
                                </div>

                            </div>


                            <div className="form-row one-col">
                                <div className="form-div">
                                    <textarea placeholder=" " name='short_description' id="short_description" defaultValue={blogPost && blogPost.blog_short_description ? blogPost.blog_short_description : ''}></textarea>
                                    <label htmlFor="shortDescription">Short Description</label>
                                </div>
                            </div>

                            <div className='form-row'>
                                <textarea id="summernote" name="description" defaultValue={blogPost && blogPost.blog_description ? blogPost.blog_description : ''}>
                                </textarea>
                            </div>

                            <div className="form-row two-col">
                                <div className="form-div">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isClearable={true}
                                        isSearchable={true}
                                        components={animatedComponents}
                                        isMulti
                                        options={getProdOpt}
                                        onChange={handleSelect}
                                        value={optionss}
                                        // defaultValue={getProdOpt.filter(function (option) {
                                        //     return option.value === selectedOptions;
                                        // })}
                                        name='tags[]'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-div">
                                    <input id="blogslug" placeholder=' ' name="page_title" type="text" defaultValue={blogPost && blogPost.blog_page_title ? blogPost.blog_page_title : ''} />
                                    <label htmlFor="blogslug">Page Title</label>
                                </div>


                                <div className="form-div">
                                    <input id="metaKeywords" placeholder=' ' name="meta_keywords" type="text" defaultValue={blogPost && blogPost.blog_meta_keywords ? blogPost.blog_meta_keywords : ''} />
                                    <label htmlFor="metaKeywords">Meta Keywords</label>
                                </div>

                                <div className="form-div">
                                    <input id="metaDescription" placeholder=' ' name="meta_description" type="text" defaultValue={blogPost && blogPost.blog_meta_description ? blogPost.blog_meta_description : ''} />
                                    <label htmlFor="metaDescription">Meta Description</label>
                                </div>

                            </div>
                            {/* <MyEditor /> */}
                            {/* <Editor /> */}
                            <div className="common-buttons">
                                <button type='button' className="green" onClick={(e) => addUpdateBlogPost(e)} disabled={tinyloader}>
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

