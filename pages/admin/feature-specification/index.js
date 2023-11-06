import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useContext, useState } from 'react'

import { AppContext } from '@/components/AppContext';
import axios from 'axios';
import useSWR from 'swr';
import { dateFormat } from '@/components/Helper';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AdminHead from '@/components/common/adminHead';
import Paginationn from '@/components/common/Pagination';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function Index() {
    // const { context, setContext } = useContext(AppContext);
    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);

    const router = useRouter();
    const { page } = router.query ? router.query : 1;

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-feature-specifications?page=${page}`, fetcher);

    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/block-unblock-feature?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.status === 1) {
                alert(`${response.data.message}`);
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewSpecificationDetails = (id) => {
        router.push('/admin/feature-specification/' + id);
    }

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <AdminHead pageTitle={`Features & Specifications`} />
            <Layout>
                <Breadcrumb title="Feature & Specifications" addBtn="Add Feature & Specification" url="/admin/feature-specification/add-feature-specification" />
                <div className="main-data">

                    <div className="filters">

                        <div className="wrapper">

                            <div className="search common-div">

                                <input type="text" placeholder="Search here" />
                                <button></button>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Features</option>
                                    <option>Features</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Type</option>
                                    <option>Features</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Status</option>
                                    <option>Features</option>

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
                                <th>Category</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.features.map((feature, i) => {
                                    return (
                                        <tr key={feature._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src={`${process.env.NEXT_PUBLIC_URL}${feature.icon}`} height={40} width={40} alt={feature.name} />
                                            </td>
                                            <td>{feature.name}</td>
                                            <td> {feature.feature_id.name}</td>
                                            <td><button className={`small-btn ${feature.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(feature.status == 1 ? 2 : 1, feature._id)}>{feature.status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(feature.createdAt)}</td>
                                            <td>{dateFormat(feature.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewSpecificationDetails(feature._id)}>Edit</button>
                                                    {/* <button className="serive">Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <Paginationn page={page} const rowCount={data !== undefined ? data.features.length : ''} />
                </div>
            </Layout>
        </>
    )
}

export default Index;
