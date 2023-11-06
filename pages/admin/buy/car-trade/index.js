import AdminHead from "@/components/common/adminHead";
import Breadcrumb from "@/components/common/Breadcrumb"
import Layout from "@/components/common/Layout"
import Paginationn from "@/components/common/Pagination";
import { convertTimeStamp, dateFormat } from "@/components/Helper";
import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from 'swr';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data)

function CarTradeBookingList() {


    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;
    const page = router.query.page ? router.query.page : 1;

    const { data, error } = useSWR(`${Url}admin/get-car-tarde-buy-leads?page=${page}&leadType=Car Trade Buy`, fetcher);

    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/update-car-trade-status?id=${id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((response) => {
            // console.log(response);
            if (response && response.data.status === 1) {
                alert(`${response.data.message} `);
            }
        }).catch((err) => {
            if (err && err.response && err.response.data.status === 0) {
                alert(err.response.data.message);
            }
        });
    }

    const viewOrderDetails = (_id) => {
        router.push(`/admin/buy/car-trade/${_id}`);
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
            <AdminHead pageTitle={`Car Trade Buy Lead`} />
            <Layout>
                <Breadcrumb title="Car Trade Buy Lead" />
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
                                {/* <th>Order Id</th> */}
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact</th>
                                <th>Product Name</th>
                                <th>Fuel Type</th>
                                <th>Car Location</th>
                                {/* <th>Place</th> */}
                                {/* <th>Car Location</th> */}
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data !== undefined && data.leads.map((order, i) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            {/* <td>{order.order_id}</td> */}
                                            {/* <td>
                                                <img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} height={40} width={40} alt={brand.name} />
                                            </td> */}

                                            <td>{order.car_trade_user_first_name}</td>
                                            <td>{order.car_trade_user_last_name}</td>
                                            <td>{order.car_trade_user_contact}</td>
                                            <td>
                                                <Link href={`/admin/cars/${order.product_id}`}>
                                                    {order.car_trade_car_name}
                                                </Link>
                                            </td>
                                            <td>{order.car_trade_fuel_type}</td>
                                            <td>{order.car_trade_car_location}</td>
                                            <td>
                                                <button className={`small-btn ${order.car_trade_status === 1 ? 'active' : order.car_trade_status === 2 ? 'in-stock' : ''}`} onClick={() => updateStatus(order.car_trade_status == 1 ? 2 : 1, order._id)}   >
                                                    {order.car_trade_status == 1 ? 'Open' : order.car_trade_status === 2 ? 'Close' : ''}
                                                </button>
                                            </td>

                                            <td>{convertTimeStamp(order.createdAt)}</td>
                                            <td>{convertTimeStamp(order.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewOrderDetails(order._id)}>View Order</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <Paginationn page={page} rowCount={data !== undefined ? data.brandCount : ''} />
                </div>
            </Layout>
        </>
    )
}

export default CarTradeBookingList;