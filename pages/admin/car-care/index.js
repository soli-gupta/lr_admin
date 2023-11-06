import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertTimeStamp, dateFormat } from '@/components/Helper'
import Link from 'next/link'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import Paginationn from '@/components/common/Pagination'

const fetcher = (url) => axios.get(url, { headers: { token: `${localStorage.getItem("lr-admin-token")}` } }).then(res => res.data)

export default function Index() {

    let router = useRouter()
    const { page } = router.query

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/admin-car-care-package-list?page=${page}`, fetcher);


    const [service, setService] = useState([])

    const serviceList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/admin-service-list`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setService(res.data.data)
            }
        }).catch(function (error) {
            if (error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }

    const updateStatus = async (status, id) => {

        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/admin-active-deactive-car-care-package?id=${id}&status=${status}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setService(res.data.data)
                alert(res.data.message);
            }
        }).catch(function (error) {
            if (error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }
    // console.log(service)
    useEffect(() => {
        // serviceList()
    }, [])

    return (
        <>
            <Head>
                <title>LR | Car Care</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="/img/lr-favicon.ico"
                    rel="icon"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    href="/img/lr-favicon-dark.ico"
                    rel="icon"
                    media="(prefers-color-scheme: dark)"
                />
            </Head>
            <Layout>
                <Breadcrumb title="Car Care " addBtn="Add Car Care Package" url="/admin/car-care/add-car-care" />
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
                                <th>Service Category</th>
                                <th>Service</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data && data.data?.map((services, i) => {
                                const count = 0
                                return (
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {services.car_care_category && services.car_care_category.car_care_category_name}
                                        </td>
                                        <td>
                                            {services.car_care_sub_category && services.car_care_sub_category.car_care_sub_category_name}
                                        </td>

                                        <td>
                                            {services.brand_name}
                                        </td>
                                        <td>
                                            {services.model_name}
                                        </td>
                                        <td>
                                            {services.car_care_color}
                                        </td>

                                        <td>
                                            {services.car_care_price}
                                        </td>
                                        <td>
                                            <button className={`active small-btn ${services.status === 1 ? 'active' : 'inactive'} `}>{services.status === 1 ? 'active' : 'in-active'} </button>
                                            {/* <button className={`active small-btn ${services.status === 1 ? 'active' : 'inactive'} `} onClick={() => updateStatus(services.status === 1 ? 2 : 1, services._id)}>{services.status === 1 ? 'active' : 'in-active'} </button> */}
                                        </td>
                                        <td>
                                            {convertTimeStamp(services.createdAt)}
                                        </td>
                                        <td>
                                            {convertTimeStamp(services.updatedAt)}
                                        </td>
                                        <td>
                                            <div className="table-buttons">
                                                <Link href={`/admin/car-care/add-car-care?id=${services._id}`}>  <button className='duplicate'>Edit</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                                // :
                                // <tr>
                                //     <td>Data not avaiable</td>
                                // </tr>
                            }
                        </tbody>
                    </table>
                    <div>
                        <Paginationn page={page} const rowCount={data !== undefined ? data.countService : ''} />

                    </div>
                </div>
            </Layout>
        </>
    )
} 