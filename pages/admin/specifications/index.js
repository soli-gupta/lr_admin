import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/components/AppContext';
import axios from 'axios';
import useSWR from 'swr';
import { dateFormat } from '@/components/Helper';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AdminHead from '@/components/common/adminHead';


const fetcher = (url) => axios.get(url, {
    headers: {
        // 'Content-Type': 'application/json',
        // maxBodyLength: Infinity,
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function Index() {
    // const { context, setContext } = useContext(AppContext);
    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);

    const router = useRouter();
    // console.log(localStorage.getItem('lr-admin-token'))

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/specification-category-list`, fetcher);

    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/update-specification-category-status?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                alert(`${response.data.data.name} updated successfully!`);
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewSpecificationDetails = (id) => {
        router.push('/admin/specifications/' + id);
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
            <AdminHead pageTitle={`Features & Specifications`} />
            <Layout>
                <Breadcrumb title="Feature & Specifications" addBtn="Add Specification" url="/admin/specifications/add-specification" />
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
                                {/* <th style={{ width: '150px' }}>Image</th> */}
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.data.map((feature, i) => {
                                    return (
                                        <tr key={feature._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>

                                            <td>{feature.name}</td>
                                            <td> <a href="#"> {feature.slug}</a></td>
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
                </div>
            </Layout>
        </>
    )
}

export default Index;
