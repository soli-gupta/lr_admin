import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import React, { useEffect } from 'react'

import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import { convertTimeStamp, dateFormat, numberFormatter } from '@/components/Helper';
import Pagination from '@/components/common/Pagination';
import Link from 'next/link';
import AdminHead from '@/components/common/adminHead';

const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')

    }
}).then(res => res.data);

export default function Index() {
    const router = useRouter();
    // const { pathname } = useRouter();
    // const currentUrl = router.query.pathname;
    const { page } = router.query;

    // const lisPage = page ? page : 1;
    // console.log(router.query);
    // console.log(lisPage);
    // console.log(currentUrl);

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}admin/manage-products?page=${page}`, fetcher);

    let countRow = 0;


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            localStorage.removeItem('lr-admin-token');
            router.push('/login');
        }
    }, []);

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    // console.log();
    const viewProductDetails = (id) => {
        router.push('/admin/cars/' + id);
    }

    const viewAllSpecifications = (id) => {
        router.push('/admin/cars/' + id + '/feature-specifications');
    }

    const carTradeForm = (id) => {
        router.push('/admin/cars/' + id + '/car-trade');
    }




    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin//block-unblock-products?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            if (response.data.status === 1) {
                alert(`${response.data.message}`);
            }
        }).catch((err) => {
            if (err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }




    return (
        <>
            <AdminHead pageTitle={`Cars`} />
            <Layout>
                <Breadcrumb title="Cars" addBtn="Add Cars" url="/admin/cars/add-car" />
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
                                <th style={{ width: '120px' }}>SKU <br />(Unique Code)</th>
                                <th style={{ width: "180px" }}>Lookup Id</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Status</th>
                                <th>Stock</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.products.map((product, i) => {

                                    return (
                                        <tr key={product._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>

                                            <td><img src={`${product.image}`} height={66} width={100} alt={product.name} /></td>
                                            <td>{product.name}</td>
                                            {/* <td>Used</td> */}
                                            <td> <Link href={`/buy/product-detail/${product.slug}`} target="_blank"> {product.slug}</Link></td>
                                            <td>{product.sku_code !== '' && product.sku_code !== undefined ? `LR - 0000${product.sku_code}` : ''} </td>
                                            <td>{product._id}</td>
                                            <td>₹ {numberFormatter(product.price)}</td>
                                            <td>{product.color}</td>
                                            {/* <td><button className={`small-btn ${product.status === 1 ? 'active' : 'inactive'}`}>Active</button></td> */}
                                            <td><button className={`small-btn ${product.status === 1 ? 'active' : 'inactive'}`} onClick={() => updateStatus(product.status == 1 ? 2 : 1, product._id)}   >{product.status === 1 ? 'Active' : 'In-active'}</button></td>
                                            <td>
                                                <button className={`small-btn ${product.sell_status === 'live' ? '' : product.sell_status === 'booked' ? 'in-stock' : product.sell_status === 'sold' ? 'purple' : ''}`}>{`${product.sell_status === 'live' ? 'Live' : product.sell_status === 'booked' ? 'Booked' : product.sell_status === 'sold' ? 'Sold' : ''}`}</button>
                                            </td>
                                            <td>{convertTimeStamp(product.createdAt)}</td>
                                            <td>{convertTimeStamp(product.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    {/* <button>Download Agreement</button>
                                                    <button className="serive">Service</button>
                                                    <button className="agreement">Agreement Details</button> */}
                                                    <button className="duplicate" onClick={(e) => viewProductDetails(product._id)}>Edit</button>
                                                    <button className="agreement" onClick={(e) => viewAllSpecifications(product._id)}>Feature & Specifications</button>
                                                    <button className="duplicate" onClick={(e) => carTradeForm(product._id)}>Car Trade</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    // countRow = i;
                                })
                            }

                            {/* <tr>
                                <td>
                                    <div className="form-group">

                                        <input type="checkbox" id="id2" />
                                        <label htmlFor="id2">105</label>
                                    </div>


                                </td>
                                <td><img src="../img/img.png" /></td>

                                <td>Mercedes Benz C220d Progressive - 01</td>
                                <td>Used</td>
                                <td> <a href="#"> Mercedes Benz C220d Progressive - 01 </a></td>
                                <td>Mercedes Benz C className </td>
                                <td><button className="active small-btn inactive">Active</button></td>
                                <td><button className="in-stock small-btn">In-Stock</button></td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>
                                    <div className="table-buttons">
                                        <button>Download Agreement</button>
                                        <button className="serive">Service</button>
                                        <button className="agreement">Agreement Details</button>
                                        <button className="duplicate">Duplicate</button>
                                    </div>
                                </td>

                            </tr> */}

                        </tbody>

                    </table>
                    <div>
                        <Pagination page={page} const rowCount={data !== undefined ? data.productCount : ''} />
                        {/* {console.log(countRow)} */}
                    </div>
                </div>

            </Layout>
        </>
    )
}
