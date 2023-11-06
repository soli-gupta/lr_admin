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
    const { page } = router.query ? router.query : 1;
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-brands?page=${page}`, fetcher);

    // console.log(page);
    // console.log(data.brands);


    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/block-unblock-brand?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response && response.data.status === 1) {
                alert(`${response.data.brand.name} updated successfully!`);
            }
        }).catch((err) => {
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

    return (
        <>
            <AdminHead pageTitle={`Brands`} />
            <Layout>
                <Breadcrumb title="Brands" addBtn="Add Brands" url="/admin/brands/add-brand" />
                <Breadcrumb title="" addBtn="Upload Excel" url="/admin/brands/upload-excel" />
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

                            {
                                data !== undefined && data.brands.map((brand, i) => {
                                    return (
                                        <tr key={brand._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} width={80} alt={brand.name} />
                                            </td>

                                            <td>{brand.name}</td>
                                            <td> <a href="#"> {brand.slug}</a></td>
                                            <td><button className={`small-btn ${brand.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(brand.status == 1 ? 2 : 1, brand._id)}   >{brand.status == 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>{dateFormat(brand.createdAt)}</td>
                                            <td>{dateFormat(brand.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewBrandDetails(brand._id)}>Edit</button>
                                                    {/* <button className="serive">Delete</button> */}
                                                </div>
                                            </td>
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