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
    const { page } = router.query;
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-cms-pages?page=${page}`, fetcher);

    // console.log(data.cms_page);


    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/block-unblock-cms-page?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                alert(`${response.data.cms_page.name} updated successfully!`);
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }


    const viewCmsPageDetails = (id) => {
        router.push('/admin/cms-page/' + id);
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            localStorage.removeItem('lr-admin-token');
            router.push('/login');
        }
    }, []);

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <AdminHead pageTitle={`Cms Page`} />
            <Layout>
                <Breadcrumb title="Cms Page" addBtn="Add Cms Page" url="/admin/cms-page/add-cms-page" />
                <div className="main-data">

                    <div className="filters">

                        <div className="wrapper">

                            <div className="search common-div">

                                <input type="text" placeholder="Search here" />
                                <button></button>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>CMS Page</option>
                                    <option>CMS Page</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Type</option>
                                    <option>CMS Page</option>

                                </select>

                            </div>

                            <div className="custom-select common-div">

                                <select>

                                    <option>Status</option>
                                    <option>CMS Page</option>

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

                            {
                                data.cms_page && data.cms_page.map((page, i) => {
                                    return (
                                        <tr key={page._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>

                                            <td>
                                                <img src={`${process.env.NEXT_PUBLIC_URL}${page.page_logo}`} height={68} width={86} alt={page.banner_image_alt} />
                                            </td>

                                            <td>{page.name}</td>
                                            <td> <a href="#"> {page.slug}</a></td>
                                            <td><button className={`small-btn ${page.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(page.status == 1 ? 2 : 1, page._id)}   >{page.status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(page.createdAt)}</td>
                                            <td>{dateFormat(page.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewCmsPageDetails(page._id)}>Edit</button>
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
                <Paginationn page={page} rowCount={data !== undefined ? data.cms_page.length : ''} />
            </Layout>
        </>
    )
}

export default Index;
