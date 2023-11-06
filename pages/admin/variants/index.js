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
    const { context, setContext } = useContext(AppContext);
    const router = useRouter();
    const { page } = router.query ? router.query : 1;

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-all-variants?page=${page}`, fetcher);

    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/block-unblock-variant?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                alert(`${response.data.model_variant.name} updated successfully!`);
            }
        }).catch((err) => {
            console.log(err.response)
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewModelVariantdetails = (id) => {
        router.push('/admin/variants/' + id);
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
            <AdminHead pageTitle={`Model Variant`} />
            <Layout>
                <Breadcrumb title="Variant" addBtn="Add Variant" url="/admin/variants/add-variant" />
                <div className="main-data">

                    <div className="filters">

                        <div className="wrapper">

                            <div className="search common-div">

                                <input type="text" placeholder="Search here" />
                                <button></button>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Variant</option>
                                    <option>Variant</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Type</option>
                                    <option>Variant</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Status</option>
                                    <option>Variant</option>

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
                                <th>Model Name</th>
                                <th>Brand Name</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.model_variant.map((variant, i) => {
                                    return (
                                        <tr key={variant._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td><img src={`${process.env.NEXT_PUBLIC_URL}${variant.image}`} height={40} width={40} alt={variant.name} /></td>

                                            <td>{variant.name}</td>
                                            <td> <a href="#"> {variant.slug}</a></td>
                                            <td>{variant.model_id.model_name}</td>
                                            <td>{variant.brand_id.brand_name}</td>
                                            <td><button className={`small-btn ${variant.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(variant.status == 1 ? 2 : 1, variant._id)}   >{variant.status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(variant.createdAt)}</td>
                                            <td>{dateFormat(variant.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewModelVariantdetails(variant._id)}>Edit</button>
                                                    {/* <button className="serive">Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <Paginationn page={page} const rowCount={data !== undefined ? data.model_variant.length : ''} />
                </div>
            </Layout>
        </>
    )
}

export default Index;
