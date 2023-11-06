import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/components/AppContext';
import axios from 'axios';
import useSWR from 'swr';
import { dateFormat } from '@/components/Helper';
import { useRouter } from 'next/router';
import AdminHead from '@/components/common/adminHead';
import Paginationn from '@/components/common/Pagination';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function Index() {

    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);

    const router = useRouter();
    const { page } = router.query

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-brand-models?page=${page}`, fetcher);




    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/block-unblock-model?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                alert(`${response.data.brand_model.name} updated successfully!`);
            }
        }).catch((err) => {
            console.log(err.response)
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewBrandModelDetails = (id) => {
        router.push('/admin/brand-model/' + id);
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <AdminHead pageTitle={`Brand Model`} />
            <Layout>
                <Breadcrumb title="Model" addBtn="Add Model" url="/admin/brand-model/add-model" />
                <div className="main-data">

                    <div className="filters">

                        <div className="wrapper">

                            <div className="search common-div">

                                <input type="text" placeholder="Search here" />
                                <button></button>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Model</option>
                                    <option>Model</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Type</option>
                                    <option>Model</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Status</option>
                                    <option>Model</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <input className="calender-style" type="text" placeholder="dd/mm/yyyy" />

                            </div>

                            <div className="custom-select common-div">

                                <input className="calender-style" type="text" placeholder="dd/mm/yyyy" />

                            </div>

                            <div className="custom-select button-style common-div">

                                <button>Apply Filters</button>

                            </div>

                            <div className="custom-select button-style common-div">

                                <button className="border-style">Clear Filters</button>

                            </div>

                        </div>

                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '100px', textAlign: 'center' }}>ID</th>
                                <th style={{ width: '150px' }}>Image</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Brand Name</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.brand_model.map((model, i) => {

                                    return (
                                        <tr key={model._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td><img src={`${process.env.NEXT_PUBLIC_URL}${model.image}`} height={40} width={40} alt={model.name} /></td>

                                            <td>{model.name}</td>
                                            <td> <a href="#"> {model.slug}</a></td>
                                            <td>{model.brand_id !== null && model.brand_id !== '' && model.brand_id !== undefined ? model.brand_id.brand_name : ''}</td>
                                            <td><button className={`small-btn ${model.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(model.status == 1 ? 2 : 1, model._id)}   >{model.status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(model.createdAt)}</td>
                                            <td>{dateFormat(model.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewBrandModelDetails(model._id)}>Edit</button>
                                                    {/* <button className="serive">Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
                <Paginationn rowCount={data !== undefined && data.brand_model !== undefined ? data.brand_model.length : ''} />
            </Layout>
        </>
    )
}

export default Index;