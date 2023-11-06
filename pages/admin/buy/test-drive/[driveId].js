import Layout from "@/components/common/Layout";
import AdminHead from "@/components/common/adminHead";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect } from "react";
import useSWR from 'swr';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function DriveDetails() {


    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { driveId } = router.query;


    const { data, error } = useSWR(`${Url}admin/get-test-drive-details/${driveId}`, fetcher);

    const manageOrderCompleted = async (_id, status) => {

        await axios.get(`${Url}admin/order-completed-by-admin?order_id=${_id}&status=${status}`, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            if (res && res.data && res.data.status === 1) {
                alert(res.data.message);
            }
        }).catch((e) => {
            if (e && e.response && e.response.data && e.response.data.status === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        })
    }

    const updateOrderStateAdmin = async (e) => {
        e.preventDefault();

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        const formData = {
            "order_id": e.target.order_id.value,
            "order_description": e.target.order_description.value,
            "order_status": e.target.order_status.value
        }

        await axios.post(`${Url}admin/update-test-drive-status`, formData, {
            headers: {
                token: localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            if (res && res.data && res.data.status === 1) {
                alert(res.data.message);
            }
        }).catch((e) => {
            if (e && e.message) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        })
    }


    useEffect(() => {
        if (!localStorage.getItem('lr-admin-token')) {
            router.push('/login');
        }
    }, []);


    if (error) return 'Something went wrong';
    if (!data) return 'Loading';
    // console.log(data.test_drive);
    return (
        <>
            <AdminHead pageTitle={data.test_drive.car_name} />

            <Layout>



                <div className="wrapper">

                    <div className="detail-list" >

                        <h4>Order Details</h4>

                        <p>Order id: <span>{data.test_drive.test_drive_order_id}</span></p>

                        <div className="detail-main">

                            <div className="detail-row box">
                                <h5>Order Data</h5>
                                <table>
                                    <tr>
                                        <th>Car Name</th>
                                        <td>
                                            <span>{data.test_drive.car_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Brand Name</th>
                                        <td>
                                            <span>{data.test_drive.car_brand_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Model Name</th>
                                        <td>
                                            <span>{data.test_drive.car_model_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Variant Name</th>
                                        <td>
                                            <span>{data.test_drive.car_variant_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Body Type</th>
                                        <td>
                                            <span>{data.test_drive.car_body_type}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Fuel Type</th>
                                        <td>
                                            <span>{data.test_drive.car_fuel_type}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Registration Year</th>
                                        <td>
                                            <span>{data.test_drive.car_registration_year}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Registration State</th>
                                        <td>
                                            <span>{data.test_drive.car_resgistration_state}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>KMS</th>
                                        <td>
                                            <span>{data.test_drive.car_kms}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Ownership</th>
                                        <td>
                                            <span>{data.test_drive.car_ownership}</span>
                                        </td>
                                    </tr>

                                    {/* <tr>
                    <th>Color</th>
                    <td>
                        <span>{data.test_drive.car_color}</span>
                    </td>
                </tr> */}

                                    {/* <tr>
                    <th>Price</th>
                    <td>
                        <span>{data.order.order_car_amount}</span>
                    </td>
                </tr> */}


                                    <tr>
                                        <th>Insurance</th>
                                        <td>
                                            <span>{data.test_drive.car_insurance_type}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Insurance Valid</th>
                                        <td>
                                            <span>{data.test_drive.car_insurance_valid}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Car Location</th>
                                        <td>
                                            <span>{data.test_drive.car_location}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Manufacturing Year</th>
                                        <td>
                                            <span>{data.test_drive.car_manufacturing_year}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Fuel Type</th>
                                        <td>
                                            <span>{data.test_drive.car_fuel_type}</span>
                                        </td>
                                    </tr>

                                    {/* <tr>

                    <th>Car Name</th>
                    <td><span> {data.order.order_car_name} </span><Link className="btn btn-success btn-sm m-left" href={``}>Confirm Deal</Link> </td>

                </tr> */}

                                </table>





                            </div>

                            <div className="detail-row box">

                                <h5>User Details</h5>

                                <table>

                                    <tr>
                                        <th>User Name</th>
                                        <td>
                                            <span>{data.test_drive.user_first_name} {data.test_drive.user_last_name}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Contact</th>
                                        <td>
                                            <span>{data.test_drive.user_contact}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Email</th>
                                        <td>
                                            <span>{data.test_drive.user_email_id}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Address Type</th>
                                        <td>
                                            <span>{data.test_drive.user_address_type}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Address </th>
                                        <td>
                                            <span>{data.test_drive.user_full_address}</span>
                                        </td>
                                    </tr>


                                </table>





                            </div>

                            <div className="detail-row box">

                                <h5>Test Drive Date & Time</h5>

                                <table>

                                    {/* <tr>
                    <th>Car Amount</th>
                    <td>
                        <span> ₹ {data.test_drive.order_car_amount}</span>
                    </td>
                </tr>

                <tr>
                    <th>Booking Amount</th>
                    <td>
                        <span> ₹ {data.order.user_booking_amount}</span>
                    </td>
                </tr>

                <tr>
                    <th>Balance Amount</th>
                    <td>
                        <span> ₹ {data.order.order_balance_amount}</span>
                    </td>
                </tr> */}

                                    <tr>
                                        <th>Date</th>
                                        <td>
                                            <span>
                                                {new Date(data.test_drive.test_drive_date).toLocaleDateString('en-IN', { weekday: 'long' })}, {new Date(data.test_drive.test_drive_date).getDate()} {new Date(data.test_drive.test_drive_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(data.test_drive.test_drive_date).getFullYear()}
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Time</th>
                                        <td>
                                            {data.test_drive.test_drive_time}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Order Status</th>
                                        <td>
                                            <span>
                                                {data.test_drive.test_status === 1 ? "Booked" : data.test_drive.test_status === 2 ? "Completed" : data.test_drive.test_status === 3 ? "Cancelled" : ''}
                                                {/* <br /> */}
                                                {/* <button className={`small-btn ${data.order.order_status === 2 ? "" : data.order.order_status === 3 ? "purple" : ''
                                }`}> */}
                                                {/* {
                                    data.order.order_status === 1 ? "Booked" : data.order.order_status === 2 ? "Completed" : data.order.order_status === 3 ? "Cancelled" : ''
                                } */}

                                                {/* {
                                data.order.order_status === 1 ? <>
                                    <button className={`small-btn active`} onClick={(e) => manageOrderCompleted(data.order._id, 2)} >Completed</button>
                                    <button className={`small-btn purple`} onClick={(e) => manageOrderCompleted(data.order._id, 3)}>Cancelled</button>
                                </> : ''
                            } */}
                                            </span>
                                        </td>
                                    </tr>


                                </table>


                                <h5 className="gap-top">Update Status</h5>

                                <form method="POST" onSubmit={updateOrderStateAdmin} id="admin-test-drive-form">
                                    <table>

                                        <tr>
                                            <th>Status</th>
                                            <td className="form-row">
                                                <select name="order_status" id="order-status" className="floating-select" >

                                                    <option value="1" selected={data.test_drive.test_status === 1 ? true : false} >Booked</option>
                                                    <option value="2" selected={data.test_drive.test_status === 2 ? true : false}>Completed</option>
                                                    <option value="3" selected={data.test_drive.test_status == 3 ? true : false}>Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Cancel Description</th>
                                            <td>
                                                <textarea name="order_description" id="" rows="10">{data.test_drive.car_cancel_description}</textarea>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th></th>
                                            <td className="common-buttons">
                                                <button className="green arrow-style">Update</button>
                                            </td>
                                        </tr>

                                    </table>
                                    <input type="hidden" name="order_id" value={driveId} />
                                </form>

                            </div>

                        </div>

                    </div>



                </div>
            </Layout>

        </>
    )
}


export default DriveDetails
