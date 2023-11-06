import Layout from "@/components/common/Layout";
import AdminHead from "@/components/common/adminHead";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect } from "react";
import useSWR from 'swr';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function OrderDetails() {
    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { orderId } = router.query;

    const { data, error } = useSWR(`${Url}admin/view-car-tarde-lead/${orderId}`, fetcher);


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;
    console.log(data.lead);
    return (
        <>
            <AdminHead pageTitle={`Car Trade Buy Leads`} />
            <Layout>

                <div className="wrapper">

                    <div className="detail-list" >

                        <h4>Order Details</h4>

                        {/* <p>Order id: <span>{data.lead.order_id}</span></p> */}

                        <div className="detail-main">

                            <div className="detail-row box">
                                <h5>Order Data</h5>
                                <table>
                                    <tr>
                                        <th>Car Name</th>
                                        <td>
                                            <span>{data.lead.car_trade_car_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Brand Name</th>
                                        <td>
                                            <span>{data.lead.car_trade_brand}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Model Name</th>
                                        <td>
                                            <span>{data.lead.car_trade_model}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Variant Name</th>
                                        <td>
                                            <span>{data.lead.car_trade_variant}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Body Type</th>
                                        <td>
                                            <span>{data.lead.car_trade_body_type}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Fuel Type</th>
                                        <td>
                                            <span>{data.lead.car_trade_fuel_type}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Registration Year</th>
                                        <td>
                                            <span>{data.lead.car_trade_registration_year}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Registration State</th>
                                        <td>
                                            <span>{data.lead.car_trade_registration_state}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>KMS</th>
                                        <td>
                                            <span>{data.lead.car_trade_kms_driven}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Ownership</th>
                                        <td>
                                            <span>{data.lead.car_trade_car_ownership}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Color</th>
                                        <td>
                                            <span>{data.lead.car_trade_car_color}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Price</th>
                                        <td>
                                            <span>{data.lead.car_trade_car_amount}</span>
                                        </td>
                                    </tr>


                                    <tr>
                                        <th>Insurance</th>
                                        <td>
                                            <span>{data.lead.car_trade_insurance_type}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Insurance Valid</th>
                                        <td>
                                            <span>{data.lead.car_trade_insurance_valid}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Car Location</th>
                                        <td>
                                            <span>{data.lead.car_trade_car_location}</span>
                                        </td>
                                    </tr>
                                    {/* <tr>
                    <th>Fuel Type</th>
                    <td>
                        <span>{data.lead.order_car_fuel_type}</span>
                    </td>
                </tr> */}

                                    {/* <tr>

                    <th>Car Name</th>
                    <td><span> {data.lead.order_car_name} </span><Link className="btn btn-success btn-sm m-left" href={``}>Confirm Deal</Link> </td>

                </tr> */}

                                </table>





                            </div>

                            <div className="detail-row box">

                                <h5>User Details</h5>

                                <table>

                                    <tr>
                                        <th>User Name</th>
                                        <td>
                                            <span>{data.lead.car_trade_user_first_name} {data.lead.car_trade_user_last_name}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Contact</th>
                                        <td>
                                            <span>{data.lead.car_trade_user_contact}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Email</th>
                                        <td>
                                            <span>{data.lead.car_trade_user_email}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Car Listing City</th>
                                        <td>
                                            <span>{data.lead.car_listing_city}</span>
                                        </td>
                                    </tr>
                                </table>





                            </div>


                            {/* <div className="detail-row box">

            <h5>Update Status</h5>

            <table>

                <tr>
                    <th>Status</th>
                    <td>
                        <select name="order_status" id="order-status" className="floating-select" >
                            <option value=""></option>
                            <option value="1" selected={data.lead.order_status === 1 ? true : false} >Booked</option>
                            <option value="2" selected={data.lead.order_status === 2 ? true : false}>Completed</option>
                            <option value="3" selected={data.lead.order_status == 3 ? true : false}>Cancelled</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th>Cancel Description</th>
                    <td>
                        <textarea name="" id="" cols="30" rows="10">{data.lead.order_cancel_description}</textarea>
                    </td>
                </tr>

            </table> 
        </div>*/}

                            {/* {data.lead.order_cancel_reason !== '' && data.lead.order_cancel_reason !== undefined ? <>


            <div className="detail-row box">

                <h5>Order Cancelled</h5>

                <table>

                    <tr>
                        <th>Cancel Reason</th>
                        <td>
                            <span>{data.lead.order_cancel_reason}</span>
                        </td>
                    </tr>
                    {data.lead.order_cancel_description !== '' && data.lead.order_cancel_description !== undefined ? <>
                        <tr>
                            <th>Description</th>
                            <td>
                                <span>{data.lead.order_cancel_description}</span>
                            </td>
                        </tr>

                    </> : ''}



                </table>





            </div>
        </> : ''} */}



                        </div>

                    </div>



                </div >

            </Layout>

        </>
    )
}


export default OrderDetails