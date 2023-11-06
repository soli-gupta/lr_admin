import { AppContext } from "@/components/AppContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ButtonSpinner } from "@/components/Helper";
import AdminHead from "@/components/common/adminHead";
import { $ } from 'react-jquery-plugin'



function AddFAQ() {

    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;

    const { context, setContext } = useContext(AppContext);
    const [file, setFile] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);
    const [getCmsPages, setGetCmsPages] = useState([]);

    const manageEventHandler = (e) => { }

    const getAllCmsPages = async () => {

        axios.get(`${Url}admin/fetch-all-cms-pages`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            setGetCmsPages(res.data.cmsPages);
        }).catch((e) => {
            setGetCmsPages([]);
        })
    }


    const addFAQ = async (e) => {
        e.preventDefault();
        // e.target
        var createError = 0;


        if (e.target.faq_type.value.length <= 0) {
            document.getElementById('faqType').innerHTML = 'Please select FAQ Type';
            document.getElementById("faqType").style.display = "block";
            setTimeout(() => {
                document.getElementById('faqType').innerHTML = '';
                document.getElementById("faqType").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.faq_question.value.length <= 0) {
            document.getElementById('faqQuestion').innerHTML = 'Please enter FAQ Question.';
            document.getElementById("faqQuestion").style.display = "block";
            setTimeout(() => {
                document.getElementById('faqQuestion').innerHTML = '';
                document.getElementById("faqQuestion").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.faq_description.value.length <= 0) {
            document.getElementById('faqDescription').innerHTML = 'Please enter FAQ Description.';
            document.getElementById("faqDescription").style.display = "block";
            setTimeout(() => {
                document.getElementById('faqDescription').innerHTML = '';
                document.getElementById("faqDescription").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();
        formData.append('faq_type', e.target.faq_type.value);
        formData.append('faq_question', e.target.faq_question.value);
        formData.append('faq_description', e.target.faq_description.value);

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        setTinyLoader(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL}admin/add-faq`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                setTinyLoader(false);
                alert(response.data.message);
                router.push('/admin/faqs');
            } else if (response.data.status === 0) {
                alert(response.data.message);
            }

        }).catch((err) => {
            setTinyLoader(false);
        });

    }


    const resetFormValues = () => {
        document.getElementById('faq-form').reset();
    }

    useEffect(() => {
        getAllCmsPages();
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


    return (
        <>
            <AdminHead pageTitle={`Add FAQ`} />
            <Head>
                <script type="text/javascript" src="//code.jquery.com/jquery-3.6.0.min.js" defer />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
                <script type="text/javascript" src="cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer />
                <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" defer></script>
            </Head>
            <Layout>
                <Breadcrumb title="LR | Add FAQ" />
                <div className="main-data">

                    <form method="POST" onSubmit={addFAQ} encType="multipart/form-data" id="faq-form">
                        <div className="form-style">
                            <div className="wrapper">
                                <div className="form-row two-col">
                                    <div className="form-div">


                                        <select className="floating-select" id="faq_type" name='faq_type' onChange={manageEventHandler}>
                                            <option value=""></option>
                                            {
                                                getCmsPages && getCmsPages.map((cms) => {
                                                    return (
                                                        <option value={`${cms.slug}`} key={cms._id} >{cms.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label htmlFor="FAQ Name">FAQ Type</label>
                                        <small id="faqType" className="error"></small>
                                    </div>

                                    <div className="form-div">
                                        <input id="faq_question" name="faq_question" type="text" placeholder=" " onChange={manageEventHandler} />
                                        <label htmlFor="FAQ Question">FAQ Question</label>
                                        <small id="faqQuestion" className="error"></small>
                                    </div>

                                </div>

                                <div className="form-row one-col">



                                    <div className="form-div">
                                        <textarea className="summernote" onChange={manageEventHandler} name="faq_description" id="faq_description"></textarea>
                                        <label htmlFor="Brand Name">FAQ Description</label>
                                        <small id="faqDescription" className="error"></small>
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

export default AddFAQ;