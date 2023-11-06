import { AppContext } from "@/components/AppContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ButtonSpinner, createSlug } from "@/components/Helper";
// import JoditEditor from 'jodit-react';
import dynamic from "next/dynamic";
import { $ } from 'react-jquery-plugin'
// import ReactRichEditor from 'react-rich-text-editor'


// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU';

function AddCmsPage() {


    const router = useRouter();
    // const [formData, setFormData] = useState('');
    const { context, setContext } = useContext(AppContext);
    const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);
    const [contentOne, setContentOne] = useState('');
    const [contentTwo, setContentTwo] = useState('');

    const manageEventHandler = (e) => { }

    // const [editorState, setEditorState] = useState(
    //     () => EditorState.createEmpty(),
    // );

    // const joditRender = dynamic({
    //     render: () => {
    //         return <>{JoditEditor}</>
    //     }
    // }, {
    //     ssr: false
    // })


    const saveCmsPage = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;


        if (e.target.name.value.length <= 0) {
            document.getElementById('pageName').innerHTML = 'Please enter name!';
            document.getElementById("pageName").style.display = "block";
            setTimeout(() => {
                document.getElementById('pageName').innerHTML = '';
                document.getElementById("pageName").style.display = "none";
            }, 3000);
            createError++;
        }

        // if (e.target.logo.value.length <= 0) {
        //     document.getElementById('pageBanner').innerHTML = 'Please select logo!';
        //     document.getElementById("pageBanner").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('pageBanner').innerHTML = '';
        //         document.getElementById("pageBanner").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (e.target.slug.value.length <= 0) {
            document.getElementById('pageSlug').innerHTML = 'Please enter slug!';
            document.getElementById("pageSlug").style.display = "block";
            setTimeout(() => {
                document.getElementById('pageSlug').innerHTML = '';
                document.getElementById("pageSlug").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.page_title.value.length <= 0) {
            document.getElementById('pageTitle').innerHTML = 'Please enter page title!';
            document.getElementById("pageTitle").style.display = "block";
            setTimeout(() => {
                document.getElementById('pageTitle').innerHTML = '';
                document.getElementById("pageTitle").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        // document.getElementById('cms-page-form')
        const formData = new FormData();
        // formData.append('banner', e.target.banner.files[0]);
        // // formData.append('why_choose_luxury', e.target.why_choose_luxury.files[0]);
        // // formData.append('selling_your_car', e.target.selling_your_car.files[0]);
        // formData.append('name', e.target.name.value);
        // formData.append('slug', e.target.slug.value);
        // formData.append('sub_text', e.target.sub_text.value);
        // formData.append('banner_image_alt', e.target.banner_image_alt.value);
        // formData.append('content_one', contentOne);
        // formData.append('content_two', contentTwo);
        // formData.append('page_title', e.target.page_title.value);
        // formData.append('meta_keywords', e.target.meta_keywords.value);
        // formData.append('meta_other', e.target.meta_other.value);
        // formData.append('meta_description', e.target.meta_description.value);
        // formData.append('short_description', e.target.short_description.value);


        formData.append('banner', e.target.banner.files[0]);
        formData.append('why_choose_luxury', e.target.why_choose_luxury.files[0]);
        formData.append('selling_your_car', e.target.selling_your_car.files[0]);
        formData.append('our_service_centers', e.target.our_service_centers.files[0]);
        formData.append('mobile_banner', e.target.mobile_banner.files[0]);
        formData.append('logo', e.target.logo.files[0]);
        formData.append('sell_selling_your_car', e.target.sell_selling_your_car.files[0]);
        formData.append('sell_book_car_inspaction', e.target.sell_book_car_inspaction.files[0]);
        formData.append('ew_on_the_safe_side', e.target.ew_on_the_safe_side.files[0]);

        formData.append('benefits_like', e.target.benefits_like.files[0]);
        formData.append('bb_assurance', e.target.bb_assurance.files[0]);


        formData.append('name', e.target.name.value);
        formData.append('slug', e.target.slug.value);
        formData.append('sub_text', e.target.sub_text.value);
        formData.append('banner_image_alt', e.target.banner_image_alt.value);
        formData.append('content_one', e.target.content_one.value);
        formData.append('content_two', e.target.content_two.value);
        formData.append('content_three', e.target.content_three.value);
        formData.append('content_four', e.target.content_four.value);
        formData.append('page_title', e.target.page_title.value);
        formData.append('meta_keywords', e.target.meta_keywords.value);
        formData.append('meta_other', e.target.meta_other.value);
        formData.append('meta_description', e.target.meta_description.value);
        formData.append('short_description', e.target.short_description.value);
        formData.append('page_sorting', e.target.page_sorting.value);


        // Mobile Images
        formData.append('why_choose_luxury_mobile', e.target.why_choose_luxury_mobile.files[0]);




        const $getNewlyLaunched = document.querySelector(['input[name=newly_launched]:checked']);

        let newly_launched = 2;
        if ($getNewlyLaunched !== null && $getNewlyLaunched !== undefined) {
            newly_launched = $getNewlyLaunched.value;
        }
        formData.append('newly_launched', newly_launched);

        // setTinyLoader(true);


        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/create-page`, formData, {
            headers: {
                'Content-Type': 'multipart/formdata,',
                // // maxBodyLength: Infinity,
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            console.log(response.data.status)
            if (response && response.data.status === 1) {
                alert(`${response.data.message}`);
                router.push('/admin/cms-page');
                setTinyLoader(false);
            }

        }).catch((err) => {

            if (err && err.response && err.response.data.status === 2) {
                setTinyLoader(false);
                alert(err.response.data.message);
                document.getElementById('pageSlug').innerHTML = err.response.data.message;
                document.getElementById("pageSlug").style.display = "block";
                setTimeout(() => {
                    document.getElementById('pageSlug').innerHTML = '';
                    document.getElementById("pageSlug").style.display = "none";
                }, 3000);
            } else if (err && err.response && err.response.data.status === 0) {
                setTinyLoader(false);
                alert(err.response.data.message);
            }
        });

    }


    const resetFormValues = () => {
        document.getElementById('cms-page-form').reset();
    }
    useEffect(() => {
        setTimeout(() => {
            $('.summernote').summernote({
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
        }, 1000);



        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }

    }, []);

    const manageNewlyLaunched = () => {
        // setNewLanCheck
        const $getNewlyLaunched = document.querySelector(['input[name=newly_launched]']);

        if ($getNewlyLaunched === true) {
            console.log('sdfhg')
            setNewLanCheck(1);
        } else {
            setNewLanCheck(2);
        }
    }

    return (
        <>
            <Layout>



                <Head>
                    <title>Add Cms Page | LR</title>
                    <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js" defer />
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                    <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer />
                    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet" />
                    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" defer></script>
                </Head>




                <Breadcrumb title="Luxury Ride| Add Cms Page" />
                <div className="main-data">


                    <form method="POST" onSubmit={saveCmsPage} encType="multipart/form-data" id="cms-page-form">
                        <div className="form-style">
                            <div className="wrapper">

                                <div className="form-row">
                                    <div className="form-div">
                                        <input id="name" name="name" type="text" placeholder=" " onChange={manageEventHandler} onKeyUp={(e) => createSlug(e.target.value, 'slug')} onLoad={() => createSlug(e.target.value, 'slug')} />
                                        <label htmlFor="Cms Page Name">Name</label>
                                        <small id="pageName" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="slug" name="slug" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Page Slug">Slug</label>
                                        <small id="pageSlug" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="sub_text" name="sub_text" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Page Slug">Sub Text</label>
                                        <small id="subText" className="error"></small>
                                    </div>

                                </div>

                                <div className="form-row">



                                    <div className="form-div file-upload">
                                        <div className="custom-label">Banner</div>
                                        <input type="file" id="banner" name="banner" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        {/* <div className="image-des">Image Size : 1920 x 800</div> */}
                                        <small id="pageBanner" className="error"></small>
                                    </div>


                                    <div className="form-div">
                                        <input id="banner_image_alt" name="banner_image_alt" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Page Slug">Banner Image Alt </label>
                                        <small id="ImageAlt" className="error"></small>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Mobile Banner</div>
                                        <input type="file" id="mobile_banner" name="mobile_banner" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>


                                </div>

                                <div className="form-row">


                                    <div className="form-div file-upload">
                                        <div className="custom-label">Page Logo</div>
                                        <input type="file" id="logo" name="logo" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="page_sorting" name="page_sorting" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Page Slug">Page Sorting</label>
                                        <small id="pageSortingError" className="error"></small>
                                    </div>


                                </div>

                                <div className="form-row one-col">
                                    <textarea className="summernote" onChange={setContentOne} name="content_one" style={{ height: '250px' }}></textarea>

                                    <div className="form-div"></div>
                                    <textarea className="summernote" onChange={setContentOne} name="content_two"></textarea>

                                    <textarea className="summernote" onChange={setContentOne} name="content_three"></textarea>

                                    <textarea className="summernote" onChange={setContentOne} name="content_four"></textarea>

                                </div>
                                {/* <div className="form-row"> */}
                                {/* <JoditEditor onChange={setContentOne} name="content_one" id="content_one" /> */}
                                {/* </div> */}
                                {/* (e) => setContentOne(e.target.value) defaultValue={data !== undefined ? data.cms_page.content_one : ''}  */}



                                {/* <div className="form-row"> */}
                                {/* <JoditEditor onChange={setContentTwo} id="content_two" name="content_two" defaultValue={data !== undefined ? data.cms_page.content_two : ''} /> */}
                                {/* </div> */}
                                {/* (e) => setContentTwo(e.target.value) */}

                                <p>Home Page</p>
                                <div className="form-row">

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Why Choose?</div>
                                        <input type="file" id="why_choose_luxury" name="why_choose_luxury" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Selling Your Car</div>
                                        <input type="file" id="selling_your_car" name="selling_your_car" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Our Service Centre’s</div>
                                        <input type="file" id="our_service_centers" name="our_service_centers" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>
                                </div>


                                <div className="form-row">

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Why Choose?(Mobile)</div>
                                        <input type="file" id="why_choose_luxury_mobile" name="why_choose_luxury_mobile" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>

                                </div>




                                <p>Sell</p>
                                <div className="form-row">




                                    <div className="form-div file-upload">
                                        <div className="custom-label">Selling your car</div>
                                        <input type="file" id="sell_selling_your_car" name="sell_selling_your_car" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>


                                    <div className="form-div file-upload">
                                        <div className="custom-label">Book car Inspection</div>
                                        <input type="file" id="sell_book_car_inspaction" name="sell_book_car_inspaction" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>
                                </div>

                                <p>Service Package</p>
                                <div className="form-row">




                                    <div className="form-div file-upload">
                                        <div className="custom-label">Benefits Like</div>
                                        <input type="file" id="benefits_like" name="benefits_like" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        {/* <small id="whyChooseLuxury" className="error"></small> */}
                                    </div>

                                </div>

                                <p>Extended Warranty</p>
                                <div className="form-row">




                                    <div className="form-div file-upload">
                                        <div className="custom-label">On The Safe Side</div>
                                        <input type="file" id="ew_on_the_safe_side" name="ew_on_the_safe_side" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>


                                </div>

                                <p>Buy Back</p>
                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Luxury Ride Assurance</div>
                                        <input type="file" id="bb_assurance" name="bb_assurance" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        {/* <small id="whyChooseLuxury" className="error"></small> */}
                                    </div>
                                </div>




                                <div className="form-row one-col">
                                    <div className="form-div">
                                        <textarea placeholder=" " name="short_description" id="short_description" onChange={manageEventHandler}></textarea>
                                        <label htmlFor="Short Description">Short Description</label>
                                    </div>

                                </div>

                                {/* <p>Sell</p>
                                <div className="form-row">




                                    <div className="form-div file-upload">
                                        <div className="custom-label">Selling your car</div>
                                        <input type="file" id="sell_selling_your_car" name="sell_selling_your_car" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>


                                    <div className="form-div file-upload">
                                        <div className="custom-label">Book car Inspection</div>
                                        <input type="file" id="sell_book_car_inspaction" name="sell_book_car_inspaction" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>
                                </div> */}


                                {/* <p>Service</p>
                                <div className="form-row">




                                    <div className="form-div file-upload">
                                        <div className="custom-label">How Luxury Ride Works</div>
                                        <input type="file" id="how_luxury_ride_works" name="how_luxury_ride_works" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>


                                    <div className="form-div file-upload">
                                        <div className="custom-label">Book car Inspection</div>
                                        <input type="file" id="sell_book_car_inspaction" name="sell_book_car_inspaction" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                        <small id="whyChooseLuxury" className="error"></small>
                                    </div>
                                </div> */}



                                {/* <div className="image-des">Image Size : 1920 x 800</div>  defaultValue={data !== undefined ? data.cms_page.why_choose_luxury : ''} */}
                                {/* <div className="image-des">Image Size : 1920 x 800</div> defaultValue={data !== undefined ? data.cms_page.selling_your_car : ''}  */}
                                {/* <div className="image-des">Image Size : 1920 x 800</div> defaultValue={data !== undefined ? data.cms_page.selling_your_car : ''}  */}

                                <div className="form-row">
                                    <div className="form-div">
                                        <input id="page_title" name="page_title" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Page Title">Page Title</label>
                                        <small id="pageTitle" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="meta_keywords" name="meta_keywords" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Meta Keywords">Meta Keywords</label>
                                        {/* <small id="pageTitle" className="error"></small> */}
                                    </div>

                                    <div className="form-div">
                                        <input id="meta_other" name="meta_other" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="Meta Other">Meta Other</label>
                                        {/* <small id="pageTitle" className="error"></small> */}
                                    </div>
                                </div>


                                <div className="form-row one-col">
                                    <div className="form-div">
                                        <textarea placeholder=" " name="meta_description" id="meta_description" onChange={manageEventHandler}  ></textarea>
                                        <label htmlFor="Meta Description">Meta Description</label>
                                    </div>

                                </div>


                                <div className='custom-check'>
                                    <div className='form-div'>
                                        <input type="checkbox" name="newly_launched" id="html"
                                            onClick={manageNewlyLaunched} />
                                        <label htmlFor="html">Newly Launched</label>
                                    </div>

                                </div>

                                <div className="common-buttons">
                                    <button className="green arrow-style" disabled={tinyLoader}>
                                        <ButtonSpinner load={tinyLoader} btnName="Save" />
                                    </button>

                                    <button type="button" className="border-style" onClick={resetFormValues}>Reset</button>
                                </div>



                                {/* cms_page_title: body.page_title,

                                page_meta_keyword: body.meta_keywords ?? '',
                                page_meta_description: body.meta_description ?? '',
                                page_meta_other: body.meta_other ?? '', */}

                                {/* <ReactRichEditor height={200} /> */}
                            </div>
                        </div>
                    </form>
                </div>

            </Layout>
        </>
    )
}

export default AddCmsPage;