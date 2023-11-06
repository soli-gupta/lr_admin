import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { dateFormat } from '@/components/Helper'
import Link from 'next/link'
import useSWR from 'swr';
import { useRouter } from 'next/router'

export default function Index() {

    const [customServicePart, setcustomServicePart] = useState([])

    const customServicePartList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/custom-service-part-list`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                setcustomServicePart(res.data.data)
            }
        }).catch(function (error) {
            if (error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }

    const updateStatus = async (status, id) => {

        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/active-deactive-service-category?id=${id}&status=${status}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            if (res.data.status == 1) {
                console.log(res.data.data)
                setcustomServicePart(res.data.data)
                alert(res.data.message);
            }
        }).catch(function (error) {
            if (error.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }
    console.log(customServicePart)
    useEffect(() => {
        customServicePartList()
    }, [])

    return (
        <>
            <Head>
                <title>LR | Custom Service Part  </title>
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
                <Breadcrumb title="Custom Service Part" addBtn="Add Custom Service Part" url="/admin/service/custom-service-part/add-custom-service-part" />
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
                                <th style={{ width: '150px' }}>Image</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {customServicePart != '' && customServicePart.length > 0 && customServicePart?.map((service, i) => {
                                const count = 0
                                return (
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <img src={`${process.env.NEXT_PUBLIC_URL}${service.image}`} width={70} />
                                        </td>
                                        <td>
                                            {service.name}
                                        </td>
                                        <td>
                                            {service.slug}
                                        </td>
                                        <td>
                                            <button className={`active small-btn ${service.status === 1 ? 'active' : 'inactive'} `}>{service.status === 1 ? 'active' : 'in-active'} </button>
                                            {/* <button className={`active small-btn ${service.status === 1 ? 'active' : 'inactive'} `} onClick={() => updateStatus(service.status === 1 ? 2 : 1, service._id)}>{service.status === 1 ? 'active' : 'in-active'} </button> */}
                                        </td>
                                        <td>
                                            {dateFormat(service.createdAt)}
                                        </td>
                                        <td>
                                            {dateFormat(service.updatedAt)}
                                        </td>
                                        <td>
                                            <div className="table-buttons">
                                                <Link href={`/admin/service/custom-service-part/add-custom-service-part?id=${service._id}`}>  <button className='duplicate'>Edit</button>
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
                </div>
            </Layout>
        </>
    )
} 