import Layout from '@/components/common/Layout'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ButtonSpinner, createSlug } from '@/components/Helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
// import 'jodit/build/jodit.min.css';
import DatePicker from "react-datepicker";
// import { MyEditor } from '@/components/MyEditor'
// import Editor from '@/components/Editor'


const fetcher = (url, token) => axios.get(url, { headers: { token: `${localStorage.getItem("lr-admin-token")}` } }).then(res => res.data)


export default function Index() {

    const [tinyloader, setTinyloader] = useState(false)
    const [formData, setFormData] = useState('')
    const router = useRouter()
    const [blogPost, setBlogPost] = useState('')
    const [logo, setLogo] = useState('')
    const query = router.query.id
    const [startDate, setStartDate] = useState(new Date());

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/blog-category-list`, fetcher)

    const getblog = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/view-blog?id=${query}`, fetcher)
    const res = getblog.data
    console.log('swr', res)

    if (error) console.log(error);
    // if (data) console.log(data);


    const eventChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const addUpdateBlogPost = async (e) => {
        e.preventDefault();
        setTinyloader(true);
        const formData = new FormData(document.getElementById('blogPostForm'));
        formData.append("logo", logo);
        const addUrl = `${process.env.NEXT_PUBLIC_URL}admin/add-blog`
        const updateUrl = `${process.env.NEXT_PUBLIC_URL}admin/update-blog/${query}`
        console.log(formData)
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

    useEffect(() => {
        import("react-datepicker/dist/react-datepicker.css");
        // const initTerminal = async () => {
        //     // const { Jodit } = await import('Jodit')
        //     // var editor = Jodit.make('#editor', {
        //     //     filebrowser: {
        //     //         buttons: [
        //     //             'filebrowser.upload',
        //     //             'filebrowser.remove',
        //     //             'filebrowser.update',
        //     //             {
        //     //                 name: 'deleteall',
        //     //                 icon: 'remove',
        //     //                 exec: function (fb) {
        //     //                     fb.state.elements().forEach(function () {
        //     //                         editor.filebrowser.remove(
        //     //                             editor.filebrowser.currentPath,
        //     //                             $(this).data('name')
        //     //                         );
        //     //                     });

        //     //                     editor.filebrowser.loadTree();
        //     //                 }
        //     //             }
        //     //         ]
        //     //     }
        //     // });

        //     if (query) {
        //         getBlogPost()
        //     }
        //     var editor = Jodit.make('#editor', {
        //         width: 'auto',
        //         height: 'auto',
        //         minHeight: 375,
        //         sizeLG: 900,
        //         sizeMD: 700,
        //         sizeSM: 400,
        //         buttons: [
        //             'source', '|',
        //             'bold',
        //             'strikethrough',
        //             'underline',
        //             'italic', '|',
        //             'ul',
        //             'ol', '|',
        //             'outdent', 'indent', '|',
        //             'font',
        //             'fontsize',
        //             'brush',
        //             'paragraph', '|',
        //             'image',
        //             'video',
        //             'table',
        //             'link', '|',
        //             'align', 'undo', 'redo', '|',
        //             'hr',
        //             'eraser',
        //             'copyformat', '|',
        //             'symbol',
        //             'fullsize',
        //             'print',
        //             'about'
        //         ],
        //         buttonsXS: [
        //             'superscript',
        //             'subscript', '|',
        //             'bold',
        //             'strikethrough',
        //             'underline',
        //             'italic', '|',
        //             'ul',
        //             'ol', '|',
        //             'outdent', 'indent', '|',
        //             'font',
        //             'fontsize',
        //             'brush',
        //             'paragraph', '|',
        //             'image',
        //             'video',
        //             'table',
        //             'link', '|',
        //             'align', 'undo', 'redo', '|',
        //             'hr',
        //             'eraser',
        //             'copyformat', '|',
        //             'symbol',
        //             'fullsize',
        //             'print',
        //             'about', '|',
        //             'source'
        //         ],
        //         events: {},
        //         textIcons: false,
        //         uploader: {
        //             insertImageAsBase64URI: true
        //         },

        //     });
        //     const editor1 = Jodit.make("#editor");
        //     editor1.value = res && res.data && res.data.blog_description !== undefined ? res.data.blog_description : ''
        // }
        // initTerminal()

    }, [query])
    if (res) console.log(res)
    console.log(res && res.data && res.data.blog_description)
    return (
        <>
            <Head>
                <title>LR | {query ? 'Update' : 'Add'} Blog POST </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="img/favicon.ico" />
            </Head>
            <Layout>
                <Breadcrumb title={query ? 'Update Blog POST' : 'Add Blog POST'} />
                <div className="form-style calender-style">
                    <form id="blogPostForm">
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
                                    <input type="file" id="file-upload2" onChange={(e) => setLogo(e.target.files[0])} />
                                    <label htmlFor="file-upload2">Upload file*</label>
                                    <div id="file-upload-filename"></div>
                                    <div className="image-des">Image Size : 1920 x 800</div>
                                </div>

                                <div className="form-div">
                                    <DatePicker
                                        className='calender-icon'
                                        name='posted_date'
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
                                    <textarea placeholder=" " name='short_description' id="short_description" defaultValue={blogPost && blogPost.short_description ? blogPost.short_description : ''}></textarea>
                                    <label htmlFor="shortDescription">Short Description</label>
                                </div>
                            </div>

                            <div className="form-row one-col">
                                <div className="form-div">
                                    <textarea id="editor" name="description"></textarea>
                                    <label htmlFor="shortDescription">Description</label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-div">
                                    <input id="blogslug" placeholder=' ' name="page_title" type="text" defaultValue={blogPost && blogPost.blog_slug ? blogPost.blog_slug : ''} />
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

