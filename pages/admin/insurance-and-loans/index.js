import React, { useEffect } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Head from 'next/head'
import Layout from '@/components/common/Layout'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import axios from 'axios';
import { dateFormat } from '@/components/Helper';
import Paginationn from '@/components/common/Pagination';
import AdminHead from '@/components/common/adminHead';

const fetcher = (url, token) => axios.get(url, { headers: { token: `${localStorage.getItem("lr-admin-token")}` } }).then(res => res.data)

function Index() {

    const router = useRouter();
    const { page } = router.query;
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/get-all-insurance-loans-data`, fetcher);

    // if (error) return 'Opps something went wrong'
    // if (!data) return 'Please wait ...'

    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/update-insurance-loans-lead-status?id=${id}&status=${status}`, {
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


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;


    return (
        <>
            <AdminHead pageTitle={'Insurance'} />
            <Layout>
                <Breadcrumb title="Insurance" />
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th style={{ width: '220px' }}>Email</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                {/* <th style={{ width: '200px' }}>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.insLoan && data.insLoan.map((insL, i) => {
                                console.log(insL)
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{insL.first_name}</td>
                                            <td>{insL.last_name}</td>
                                            <td> {insL.mobile}</td>
                                            <td>{insL.email}</td>
                                            <td>{insL.query_type}</td>
                                            <td>
                                                <button className={`active small-btn ${insL.status === 1 ? 'active' : 'in-stock'} `} onClick={() => updateStatus(insL.status === 1 ? 2 : 1, insL._id)}>{insL.status === 1 ? 'Completed' : 'Pending'} </button>
                                            </td>
                                            <td>{dateFormat(insL.createdAt)}</td>
                                            <td>{dateFormat(insL.updatedAt)}</td>
                                            {/* <td>
                                                <div className="table-buttons">
                                                    <button className="serive" onClick={() => {
                                                        const confirmBox = window.confirm(
                                                            `Do you really want to delete ${insL.name}?`
                                                        )
                                                        if (confirmBox === true) {
                                                            deleteContact(insL._id)
                                                        }
                                                    }}>Delete</button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    </>
                                )
                            })}
                            {error &&

                                <tr>
                                    <td colSpan={9} style={{ textAlign: 'center' }}>
                                        Data not available
                                    </td>
                                </tr>

                            }
                        </tbody>
                    </table>
                </div>
                <Paginationn page={page} rowCount={data !== undefined ? data.insLoan.length : ''} />
            </Layout>
        </>
    )
}


export default Index