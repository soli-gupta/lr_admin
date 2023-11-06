import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/components/AppContext';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { convertTimeStamp, dateFormat } from '@/components/Helper';
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
    // const { context, setContext } = useContext(AppContext);
    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);

    const router = useRouter();
    // console.log(localStorage.getItem('lr-admin-token'))
    const { page } = router.query ? router.query : 1;


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/get-all-leads?page=${page}&lead_type=Buy`, fetcher);

    // console.log(data.brands);


    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/update-leads-status?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response && response.data.status === 1) {
                alert(`${response.data.message}`);
            }
        }).catch((err) => {
            console.log(err);
            if (err && err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewBrandDetails = (id) => {
        router.push('/admin/brands/' + id);
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);



    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;
    if (!data.leads) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <AdminHead pageTitle={`Buy Leads`} />
            <Layout>
                <Breadcrumb title="Buy Leads" />
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
                                {/* <th style={{ width: '150px' }}>Image</th> */}
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Variant</th>
                                <th>KMs Driven</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                {/* <th style={{ width: '200px' }}>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.leads && data.leads.map((lead, i) => {
                                    console.group(lead)
                                    return (
                                        <tr key={lead._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td>{lead.first_name}</td>
                                            <td>{lead.last_name}</td>
                                            <td>{lead.contact}</td>
                                            <td>{lead.brand_id.brand_name}</td>
                                            <td>{lead.model_id.model_name}</td>
                                            <td>{lead.variant_id.variant_name}</td>
                                            <td>{lead.kms_driven}</td>
                                            <td><button className={`small-btn ${lead.status === 1 ? 'active' : 'in-stock'}`} onClick={() => updateStatus(lead.status == 1 ? 2 : 1, lead._id)}   >{lead.status == 1 ? 'Open' : 'Close'}</button></td>
                                            <td>{convertTimeStamp(lead.createdAt)}</td>
                                            <td>{convertTimeStamp(lead.updatedAt)}</td>

                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <Paginationn page={page} const rowCount={data !== undefined ? data.brandCount : ''} />
                </div>
            </Layout>
        </>
    )
}

export default Index;

// export async function getServerSideProps() {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/manage-brands`);
//     console.log(response.data.brands);
//     return {
//         props: {
//             brands: '',
//         }
//     }
// }