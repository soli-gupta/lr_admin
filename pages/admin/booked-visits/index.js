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
import Paginationn from '@/components/common/Pagination';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function Index() {

    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { page } = router.query

    const [getCars, setGetCars] = useState();
    const { context, setContext } = useContext(AppContext);


    const { data, error } = useSWR(`${Url}admin/booked-visits?page=${page}`, fetcher);

    const updateStatus = async (status, id) => {
        axios.get(`${Url}admin/update-booked-visit-status?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            console.log(response.data)
            if (response && response.data.status === 1) {
                alert(response.data.message);
            }
        }).catch((err) => {
            if (err.response && err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
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
            <AdminHead pageTitle={`Booked Visits`} />
            <Layout>
                <Breadcrumb title="Booked Visits" />
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact</th>
                                <th>Booking Type</th>
                                <th>Visiting Date</th>
                                <th>Visiting Time</th>
                                <th>Visit Center</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.booked_visits.map((visit, i) => {
                                    return (
                                        <tr key={visit._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>

                                            <td>{visit.visitor_first_name}</td>
                                            <td>{visit.visitor_last_name}</td>
                                            <td>{visit.visitor_contact}</td>
                                            <td>{visit.type}</td>
                                            <td>{visit.date}</td>
                                            <td>{visit.book_time}</td>
                                            <td>{visit.experience_center.center_name}</td>
                                            <td><button className={`small-btn ${visit.status === 1 ? 'active' : 'in-stock'}`} onClick={() => updateStatus(visit.status == 1 ? 2 : 1, visit._id)}>{visit.status == 1 ? 'Active' : 'Completed'}</button></td>
                                            <td>{dateFormat(visit.createdAt)}</td>
                                            <td>{dateFormat(visit.updatedAt)}</td>

                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
                <Paginationn rowCount={data !== undefined && data.booked_visits !== undefined ? data.booked_visits.length : ''} />
            </Layout>
        </>
    )
}

export default Index;
