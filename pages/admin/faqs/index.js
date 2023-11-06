import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/components/AppContext';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { dateFormat } from '@/components/Helper';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Paginationn from '@/components/common/Pagination';
import AdminHead from '@/components/common/adminHead';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

function Index() {

    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);

    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;

    const { page } = router.query ? router.query : 1;
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/fetch-all-faq?page=${page}`, fetcher);


    const updateStatus = async (status, id) => {

        axios.get(`${Url}admin/block-unblock-faq?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response && response.data && response.data.status === 1) {
                alert(response.data.message);
            }
        }).catch((err) => {
            if (err && err.response && err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewFAQDetails = (id) => {
        router.push('/admin/faqs/' + id);
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
            <AdminHead pageTitle={`FAQs`} />
            <Layout>
                <Breadcrumb title="FAQs" addBtn="Add FAQ" url="/admin/faqs/add-faq" />
                <div className="main-data">

                    <div className="filters">

                        <div className="wrapper">

                            <div className="search common-div">

                                <input type="text" placeholder="Search here" />
                                <button></button>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Brands</option>
                                    <option>Brands</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Type</option>
                                    <option>Brands</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Status</option>
                                    <option>Brands</option>

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
                                <th>FAQ Type</th>
                                <th>FAQ Question</th>
                                <th>FAQ Description</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.faq.map((faq, i) => {
                                    return (
                                        <tr key={faq._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td>{faq.faq_type}</td>
                                            <td>  {faq.faq_question}</td>
                                            <td>  {faq.faq_description}</td>
                                            <td><button className={`small-btn ${faq.faq_status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(faq.faq_status == 1 ? 2 : 1, faq._id)}   >{faq.faq_status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(faq.createdAt)}</td>
                                            <td>{dateFormat(faq.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewFAQDetails(faq._id)}>Edit</button>
                                                    {/* <button className="serive">Delete</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <Paginationn page={page} const rowCount={data !== undefined ? data.faq.length : ''} />
                </div>
            </Layout>
        </>
    )
}

export default Index;
