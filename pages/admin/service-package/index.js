import AdminHead from "@/components/common/adminHead";
import Breadcrumb from "@/components/common/Breadcrumb"
import Layout from "@/components/common/Layout"
import Paginationn from "@/components/common/Pagination";
import { convertTimeStamp, dateFormat } from "@/components/Helper";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from 'swr';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data)

function BookingList() {


    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;
    const page = router.query.page ? router.query.page : 1;

    const { data, error } = useSWR(`${Url}admin/get-all-orders?page=${page}&orderType=service-package`, fetcher);


    const updateStatus = async (status, id) => {

        axios.get(`${process.env.NEXT_PUBLIC_URL}admin/update-test-drive-status?id=${id}&status=${status}`, {
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
        router.push(`/admin/service-package/${_id}`);


    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    // console.log(data.orders);


    return (
        <>
            <AdminHead pageTitle={`Service Package`} />
            <Layout>
                <Breadcrumb title="Service Package" />
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
                                <th>Order Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact</th>
                                <th>Product Name</th>
                                <th>Fuel Type</th>
                                {/* <th>Car Location</th> */}
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
                                data !== undefined && data.orders.map((order, i) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                <div className="form-group">

                                                    <input type="checkbox" id="id1" />
                                                    <label htmlFor="id1">{i + 1}</label>
                                                </div>
                                            </td>
                                            <td>{order.order_id}</td>
                                            {/* <td>
                                                <img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} height={40} width={40} alt={brand.name} />
                                            </td> */}

                                            <td>{order.user_first_name}</td>
                                            <td>{order.user_last_name}</td>
                                            <td>{order.user_contact}</td>
                                            <td>{`${order.order_brand_name} ${order.order_model_name} ${order.order_variant_name}`}</td>
                                            <td>{order.order_car_fuel_type}</td>
                                            {/* <td>{order.order_car_location}</td> */}
                                            <td>
                                                <button className={`small-btn ${order.order_status === 1 ? 'active' : order.order_status === 2 ? '' : order.order_status === 3 ? "red" : order.order_status === 4 ? 'pending' : ''}`}>
                                                    {order.order_status == 1 ? 'Active' : order.order_status === 2 ? 'Completed' : order.order_status === 3 ? "Expired" : order.order_status === 4 ? 'Pending' : ''}
                                                </button>
                                            </td>

                                            <td>{convertTimeStamp(order.createdAt)}</td>
                                            <td>{convertTimeStamp(order.updatedAt)}</td>
                                            <td>
                                                <div className="table-buttons">
                                                    <button className='duplicate' onClick={(e) => viewOrderDetails(order._id)}>View Order</button>
                                                    {/* <button className="serive">Delete</button> */}
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

export default BookingList