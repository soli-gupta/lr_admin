import AdminHead from "@/components/common/adminHead";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/common/Layout";
import Paginationn from "@/components/common/Pagination";
import { ButtonSpinner, dateFormat } from "@/components/Helper";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from 'swr';



const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);




function CarTrade() {

    const router = useRouter();

    const { page, productId } = router.query;
    const Url = process.env.NEXT_PUBLIC_URL;

    const [tinyLoader, setTinyLoader] = useState(false);
    const [exteriorImages, setExteriorImages] = useState(true);
    const [interiorImages, setInteriorImage] = useState(false);

    const { data, error } = useSWR(`${Url}admin/view-product/${productId}`, fetcher);

    const manageEventHandler = () => { }


    const resetFormValues = () => {
        document.getElementById('exterior-image-form').reset();
    }

    const exteriorImageBtnClick = () => {
        setExteriorImages(true);
        setInteriorImage(false);
    }

    const interiorImageBtnClick = () => {
        setExteriorImages(false);
        setInteriorImage(true);
    }

    const uploadExteriorImages = async (e) => {
        e.preventDefault();

        setTinyLoader(true);
        const formData = new FormData();
        //document.getElementById("exterior-image-form")
        formData.append('product_id', productId);
        formData.append('ext_img_1', e.target.ext_img_1.files[0]);
        formData.append('ext_img_2', e.target.ext_img_2.files[0]);
        formData.append('ext_img_3', e.target.ext_img_3.files[0]);
        formData.append('ext_img_4', e.target.ext_img_4.files[0]);
        formData.append('ext_img_5', e.target.ext_img_5.files[0]);
        formData.append('ext_img_6', e.target.ext_img_6.files[0]);
        formData.append('ext_img_7', e.target.ext_img_7.files[0]);
        formData.append('ext_img_8', e.target.ext_img_8.files[0]);


        formData.append('int_img_1', e.target.int_img_1.files[0]);
        formData.append('int_img_2', e.target.int_img_2.files[0]);
        formData.append('int_img_3', e.target.int_img_3.files[0]);
        formData.append('int_img_4', e.target.int_img_4.files[0]);
        formData.append('int_img_5', e.target.int_img_5.files[0]);
        formData.append('int_img_6', e.target.int_img_6.files[0]);
        formData.append('int_img_7', e.target.int_img_7.files[0]);

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        await axios.post(`${Url}admin/upload-product-car-trade-image`, formData, {
            headers: {
                'Content-Type': 'image/png',
                token: localStorage.getItem('lr-admin-token'),
            }
        }).then((res) => {
            setTinyLoader(false);
            if (res && res.data) {
                alert(`${res.data.message}`);
            }
        }).catch((e) => {
            setTinyLoader(false);
            if (e && e.response && e.response.data) {
                alert(`${e.response.data.message}`);
            }
        });

        setTinyLoader(false);
    }

    const uploadInteriorImages = async (e) => {
        e.preventDefault();
    }

    const deleteBtnForCarTrade = async (e) => {
        e.preventDefault();

        const poductData = {
            product_id: productId
        }
        setTinyLoader(true);
        await axios.post(`${Url}admin/delete-car-trade-product`, poductData, {
            headers: {
                token: localStorage.getItem('lr-admin-token'),
            }
        }).then((res) => {
            if (res && res.data && res.data.status === 1) {
                alert(res.data.message);
                setTinyLoader(false);
            }
        }).catch((e) => {
            console.log(e && e.response);
            setTinyLoader(false);
            if (e && e.response && e.response.data && e.response.data.status === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        });
    }



    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;


    return (
        <>
            <AdminHead pageTitle={`${data && data.products && data.products.name} | Car Trade`} />
            <Layout>
                <Breadcrumb title={`${data && data.products && data.products.name}`} />




                <div className="main-data">
                    {/* <div id="exterior-images" style={{ display: exteriorImages == true ? 'block' : 'none' }}>
                        <div className="form-style  calender-style">
                            <div className="wrapper"> */}
                    <form method="POST" onSubmit={uploadExteriorImages} encType="multipart/form-data" id="exterior-image-form">

                        <div className="form-style">
                            <div className="wrapper">

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 1</div>
                                        <input type="file" id="ext-img-1" name="ext_img_1" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 2</div>
                                        <input type="file" id="ext-img-2" name="ext_img_2" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 3</div>
                                        <input type="file" id="ext-img-3" name="ext_img_3" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload3">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 4</div>
                                        <input type="file" id="ext-img-4" name="ext_img_4" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 5</div>
                                        <input type="file" id="ext-img-5" name="ext_img_5" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 6</div>
                                        <input type="file" id="ext-img-6" name="ext_img_6" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload3">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 7</div>
                                        <input type="file" id="ext-img-7" name="ext_img_7" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Exterior Image 8</div>
                                        <input type="file" id="ext-img-8" name="ext_img_8" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>
                                </div>

                                <br />

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 1</div>
                                        <input type="file" id="int-img-1" name="int_img_1" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 2</div>
                                        <input type="file" id="int-img-2" name="int_img_2" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 3</div>
                                        <input type="file" id="int-img-3" name="int_img_3" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload3">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 4</div>
                                        <input type="file" id="int-img-4" name="int_img_4" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 5</div>
                                        <input type="file" id="int-img-5" name="int_img_5" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload2">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 6</div>
                                        <input type="file" id="int-img-6" name="int_img_6" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload3">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-div file-upload">
                                        <div className="custom-label">Interior Image 7</div>
                                        <input type="file" id="int-img-7" name="int_img_7" onChange={manageEventHandler} />
                                        <label htmlFor="file-upload1">Upload file</label>
                                        <div id="file-upload-filename"></div>
                                    </div>

                                </div>

                                <div className="common-buttons">
                                    <button className="green arrow-style" disabled={tinyLoader}>
                                        <ButtonSpinner load={tinyLoader} btnName="Add Images" />
                                    </button>

                                    <button type="button" className="border-style" onClick={resetFormValues}>Reset</button>

                                    {
                                        data && data.carTradeImg ?
                                            <button className="red arrow-style" disabled={tinyLoader} onClick={(e) => deleteBtnForCarTrade(e)}>
                                                <ButtonSpinner load={tinyLoader} btnName="Delete Car" />
                                            </button>
                                            : ''
                                    }

                                </div>
                            </div>
                        </div>
                    </form>
                    {/* </div>
                        </div>
                    </div> */}


                    {/* <div id="exterior-images" style={{ display: interiorImages == true ? 'block' : 'none' }}>
                        <div className="form-style  calender-style">
                            <div className="wrapper">
                                <form method="POST" onSubmit={uploadInteriorImages} encType="multipart/form-data" id="exterior-image-form">

                                    <div className="form-style">
                                        <div className="wrapper">

                                            <div className="form-row">
                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 1</div>
                                                    <input type="file" id="int-img-1" name="int_img_1" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload1">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>

                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 2</div>
                                                    <input type="file" id="int-img-2" name="int_img_2" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload2">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>

                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 3</div>
                                                    <input type="file" id="int-img-3" name="int_img_3" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload3">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 4</div>
                                                    <input type="file" id="int-img-4" name="int_img_4" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload1">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>

                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 5</div>
                                                    <input type="file" id="int-img-5" name="int_img_5" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload2">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>

                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 6</div>
                                                    <input type="file" id="int-img-6" name="int_img_6" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload3">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-div file-upload">
                                                    <div className="custom-label">Interior Image 7</div>
                                                    <input type="file" id="int-img-7" name="int_img_7" onChange={manageEventHandler} />
                                                    <label htmlFor="file-upload1">Upload file</label>
                                                    <div id="file-upload-filename"></div>
                                                </div>

                                            </div>

                                            <div className="common-buttons">
                                                <button className="green arrow-style" disabled={tinyLoader}>
                                                    <ButtonSpinner load={tinyLoader} btnName="Add Interior  " />
                                                </button>

                                                <button type="button" className="border-style" onClick={resetFormValues}>Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> */}


                </div>


            </Layout>
        </>
    )
}

export default CarTrade