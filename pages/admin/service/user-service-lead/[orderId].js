import Layout from "@/components/common/Layout";
import AdminHead from "@/components/common/adminHead";
import axios from "axios";
import { useRouter } from "next/router"
import useSWR from 'swr';


const fetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-admin-token')
    }
}).then(res => res.data);

function Index() {
    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { orderId } = router.query;

    const { data, error } = useSWR(`${Url}admin/user-edit-service-detail/${orderId}`, fetcher);


    const updateUserServiceByAdmin = async (e) => {
        e.preventDefault();

        const formData = new FormData(document.getElementById('serviceAdminForm'));
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        await axios.post(`${Url}admin/user-update-service-detail`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('lr-admin-token')
            }
        }).then((res) => {
            if (res && res.data && res.data.status === 1) {
                alert(res.data.message);
                router.reload()
            }
        }).catch((e) => {
            if (e && e.message) {
                alert(e.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
    }

    if (error) return <><AdminHead /><Layout>Something went wrong</Layout></>;
    if (!data) return <><AdminHead /><Layout>Loading</Layout></>;

    return (
        <>
            <AdminHead pageTitle={`Service Order Details`} />
            <Layout>

                <div className="wrapper">

                    <div className="detail-list" >
                        <h4> Service Order Details</h4>

                        <p>Order id: <span>{data.order.order_id}</span></p>

                        <div className="detail-main">

                            <div className="detail-row box">
                                <h5>Service Data</h5>
                                <table>
                                    <tr>
                                        <th>Year</th>
                                        <td>
                                            <span>{data.order.year ? data.order.year : '-'}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Brand Name</th>
                                        <td>
                                            <span>{data.order.brand_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Model Name</th>
                                        <td>
                                            <span>{data.order.model_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Variant Name</th>
                                        <td>
                                            <span>{data.order.variant_name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Fuel Type</th>
                                        <td>
                                            <span>{data.order.fuel_type}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Center Name</th>
                                        <td>
                                            <span>{data.order.center_name}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Center Address</th>
                                        <td>
                                            <span>{data.order.center_address}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Slot Date</th>
                                        <td>
                                            <span>{new Date(data.order.slot_day).toDateString()}</span>
                                        </td>
                                    </tr>

                                    {/* <tr>
                                        <th>Slot Time</th>
                                        <td>
                                            <span>{data.order.slot_time}</span>
                                        </td>
                                    </tr> */}

                                    {data.order.pickup_car === 'yes' ?
                                        <>
                                            <tr>
                                                <th>Pickup Car Address Type</th>
                                                <td>
                                                    <span>{data.order.pickup_car_address_type ? data.order.pickup_car_address_type : '-'}</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Pickup car Address</th>
                                                <td>
                                                    <span>{data.order.pickup_car_address ? data.order.pickup_car_address : '-'}</span>
                                                </td>
                                            </tr>
                                        </>
                                        : ''}

                                    {data.order.pickup_car === 'no' ?
                                        <>
                                            <tr>
                                                <th>Dropping By</th>
                                                <td>
                                                    <span>{data.order.pickup_person_name ? data.order.pickup_person_name : '-'}</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Contact</th>
                                                <td>
                                                    <span>{data.order.pickup_person_mobile ? data.order.pickup_person_mobile : '-'}</span>
                                                </td>
                                            </tr>
                                        </>
                                        : ''}
                                </table>
                            </div>
                            <div className="detail-row box">
                                <h5>User Details</h5>

                                <table>
                                    <tr>
                                        <th>User Name</th>
                                        <td>
                                            <span>{data.order.first_name} {data.order.last_name}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>User Mobile no.</th>
                                        <td>
                                            <span>{data.order.mobile}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>User Email</th>
                                        <td>
                                            <span>{data.order.user_email_id ? data.order.user_email_id : '-'}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>User Address Type</th>
                                        <td>
                                            <span>{data.order.address_type}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>User Address </th>
                                        <td>
                                            <span>{data.order.full_address}</span>
                                        </td>
                                    </tr>
                                </table>

                            </div>

                            <div className="detail-row box">

                                <h5>Payment Details</h5>

                                <table>

                                    {/* <tr>
                                        <th>Opted Insurance</th>
                                        <td>
                                            <span> {data.order.user_optd_insurance === 1 ? "Yes" : "No"}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Car Amount</th>
                                        <td>
                                            <span> ₹ {data.order.order_car_amount}</span>
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
                                    </tr>

                                    <tr>
                                        <th>Payment Type</th>
                                        <td>
                                            <span>{data.order.payment_type}</span>
                                        </td>
                                    </tr> */}

                                    <tr>
                                        <th>Order Status</th>
                                        <td>
                                            <span>
                                                {data.order.status === 1 ? "Upcoming" : data.order.status === 2 ? "Completed" : data.order.status === 3 ? "Cancelled" : data.order.status === 4 ? "On-going" : data.order.status === 5 ? "Pending" : ''}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                                <h5 className="gap-top">Update Status</h5>

                                <form method="POST" onSubmit={updateUserServiceByAdmin} id="serviceAdminForm">
                                    <table>
                                        <tr>
                                            <th>Status</th>
                                            <td className="form-row">
                                                <input type="hidden" name="order_id" value={orderId} />
                                                <select name="status" id="order-status" className="floating-select" >
                                                    <option value="1" selected={data.order.status === 1 ? true : false} >UpComing</option>
                                                    <option value="2" selected={data.order.status === 2 ? true : false} >Completed</option>
                                                    <option value="3" selected={data.order.status === 3 ? true : false} >Cancelled</option>
                                                    {/* <option value="4" selected={data.order.status === 4 ? true : false} >On-going</option> */}
                                                    <option value="5" selected={data.order.status == 5 ? true : false}>Pending</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Cancel Description</th>
                                            <td>
                                                <textarea name="cancel_reason_dscription" id="" rows="10">{data.order.cancel_reason_dscription}</textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td className="common-buttons">
                                                <button className="green arrow-style">Update</button>
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </Layout>
        </>
    )
}


export default Index