import Link from 'next/link'
import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../AppContext';
import { useRouter } from 'next/router';
import $ from 'jquery'
import axios from 'axios';


export default function Header() {
    const { context } = useContext(AppContext)
    const [showMe, setShowMe] = useState(false);
    const [profileToggle, setProfileTogglee] = useState(false)
    const router = useRouter()

    function toggle() {
        setShowMe(!showMe);
    }

    function profiletoggle() {
        setProfileTogglee(!profileToggle);
    }

    const userProfile = async (e) => {
        e.preventDefault();
        setTinyloader(true);
        await axios.get(`${process.env.NEXT_PUBLIC_URL}admin/profile`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {
            setTinyloader(false)
            if (res.data.status == 1) {
                setUser(res.data.admin)
                setSuccess(res.data.message)
                router.push('/admin/profile')
            }
        }).catch(function (error) {
            console.log(error)

        });
    }

    // const activeHeaderbar = (e) => {

    //     var elems = document.querySelectorAll("nav li a");
    //     [].forEach.call(elems, function (el) {
    //         el.classList.remove("active");
    //     });
    //     e.target.className = "active";

    // }
    // console.log(context)
    useEffect(() => {
        $(".search img").on("click", function () {

            $(".search-from").addClass("open-search");
            $("body").addClass("hide-scroll");

        })

        $(".search-close").on("click", function () {

            $(".search-from").removeClass("open-search");
            $("body").removeClass("hide-scroll");

        });
        $("nav li a").on("click", function () {
            $(this).parents("li").addClass("active");
            $(this).parents("li").siblings().removeClass("active");
        });

    }, [])

    return (
        <>
            <header>

                <div className="wrapper">

                    <div className="logo"><Link href="/admin"><img src="/admin_img/logo.svg" /></Link></div>

                    <nav>
                        <ul>
                            <li className="active"><Link href="/admin/">Dashboard</Link></li>
                            <li className="have-menu">
                                <Link href="/admin/cars">Cars</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/cars">Cars</Link></li>
                                        <li><Link href="/admin/brands">Brands</Link></li>
                                        <li><Link href="/admin/brand-model">Models</Link></li>
                                        <li><Link href="/admin/variants">Variants</Link></li>
                                        <li><Link href="/admin/specification-category">Features & Specification Category</Link></li>
                                        <li><Link href="/admin/feature-specification">Features & Specification</Link></li>
                                        {/* <li><Link href="/admin/experience-center">Experience Centers</Link></li> */}
                                    </ul>
                                </div>
                            </li>



                            <li className="have-menu">
                                <Link href="/admin/buy/bookings">Buy</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/buy/bookings">Bookings</Link></li>
                                        <li><Link href="/admin/buy/test-drive">Test Drive</Link></li>
                                        <li><Link href="/admin/buy/leads">Leads</Link></li>
                                        <li><Link href="/admin/buy/car-trade">Car Trade Buy Leads</Link></li>
                                        {/*      <li><Link href="/admin/variants">Variants</Link></li>
                                        <li><Link href="/admin/specification-category">Features & Specification Category</Link></li>
                                        <li><Link href="/admin/feature-specification">Features & Specification</Link></li>
                                        <li><Link href="/admin/experience-center">Experience Centers</Link></li> */}
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="">Service</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/service/custom-service-part">Custom Service Parts</Link></li>
                                        <li><Link href="/admin/service/service-category">Service Category</Link></li>
                                        <li><Link href="/admin/service/service-sub-category">Service Sub Category</Link></li>
                                        <li><Link href="/admin/service/service-discount">Service Discount</Link></li>
                                        <li><Link href="/admin/service">Service</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="">Car Care</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/car-care/car-care-category">Car Care Category</Link></li>
                                        <li><Link href="/admin/car-care/car-care-sub-category">Car Care Sub Category</Link></li>
                                        <li><Link href="/admin/car-care/car-care-discount">Car Care Discount</Link></li>
                                        <li><Link href="/admin/car-care">Car Care</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/loans">Loan</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/loans">Leads</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/service-package">Service Package</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/service-package">Service Package</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/extended-warranty">Extended Warranty</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/extended-warranty">Extended Warranty</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/sell-data">Sell Data</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/sell-data">Sell Data</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/car-care/user-car-care-leads">Car Care Leads</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/car-care/user-car-care-leads">Car Care</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="have-menu">
                                <Link href="/admin/service/user-service-lead">Service Data</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/service/user-service-lead">Service Data</Link></li>
                                    </ul>
                                </div>
                            </li>


                            <li className="have-menu">
                                <Link href="/admin/contact">Data</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/contact">Contact/Query Data</Link></li>
                                        <li><Link href={`/admin/insurance-and-loans`}>Insurance</Link></li>
                                        <li><Link href="/admin/booked-visits">Booked Visits</Link></li>
                                        {/* <li><Link href="/admin/extended-warranty">Request Call Back Data</Link></li> */}
                                        {/* <li><Link href="/admin/newsletter">Newsletter Data</Link></li>
                                        <li><Link href="/admin/car-trade">Car Trade Data</Link></li>
                                        <li><Link href="/admin/car-trade">Car Trade Data</Link></li> */}

                                        {/* <li><Link href="/admin/searched-keyword">Search Keyward Data</Link></li> */}
                                    </ul>
                                </div>
                            </li>
                            <li className="have-menu"><Link href="#">Blog</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/blog-post">Posts</Link></li>
                                        <li><Link href="/admin/blog-category">Category</Link></li>
                                        <li><Link href="/admin/tags">Tags</Link></li>
                                    </ul>
                                </div>
                            </li>
                            {/* <li className="have-menu"><Link href="#">Careers</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/career-jobs">Jobs</Link></li>
                                        <li><Link href="/admin/career-application">Application</Link></li>
                                    </ul>
                                </div>
                            </li> */}
                            <li className="have-menu">
                                <Link href="/admin/cms-page">General</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/cms-page">CMS Page</Link></li>
                                        {/* <li><Link href="#">CMS Block</Link></li> 
                                        <li><Link href="#">CMS Content/Image</Link></li>*/}
                                        <li><Link href="/admin/news-media">News</Link></li>
                                        <li><Link href="/admin/testimonial">Testimonials</Link></li>
                                        <li><Link href="/admin/faqs">FAQs</Link></li>
                                        {/* <li><Link href="#">Gallery</Link></li>
                                        <li><Link href="#">Awards</Link></li>
                                        <li><Link href="#">Testimonials</Link></li>
                                        <li><Link href="#">News</Link></li>
                                        <li><Link href="#">Management Team</Link></li>
                                        <li><Link href="#">Admin Users</Link></li>
                                        <li><Link href="#">Settings</Link></li> */}
                                    </ul>
                                </div>
                            </li>
                            {/* <li><Link href="#">Stores</Link></li>
                            <li><Link href="#">Services</Link></li> 
                            <li className="have-menu"><Link href="#">Services Packages</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="#">Manage Services</Link></li>
                                        <li><Link href="#">Pending Orders</Link></li>
                                        <li><Link href="#">Orders</Link></li>
                                        <li><Link href="#">Plans</Link></li>
                                    </ul>
                                </div>
                            </li>*/}
                            <li className="have-menu"><Link href="#">Others</Link>
                                <div className="submenu">
                                    <ul>
                                        <li><Link href="/admin/fuel-type">Fuel Type</Link></li>
                                        <li><Link href="/admin/body-type">Body Type</Link></li>
                                        <li><Link href="/admin/color">Colors</Link></li>
                                        <li><Link href="/admin/service-center">Service Center</Link></li>
                                        <li><Link href="/admin/banks">Banks</Link></li>
                                        <li><Link href="/admin/insurance">Insurance</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    <div className="right">

                        <div className="search"><img src="/admin_img/search.svg" alt="" />

                            <form className="search-from">

                                <input placeholder="Search here" type="text" />
                                <div className="search-close"></div>
                            </form>
                        </div>
                        {/* <div className="cartbag"><img src="/admin_img/notification.svg" alt="" onClick={toggle} />

                            <div className={`notification-box ${showMe ? 'open-noti' : ' '}`} >

                                <div className="scroll">

                                    <div className="notification">
                                        <h4>Today</h4>
                                        <ul>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                        </ul>
                                    </div>

                                    <div className="notification">
                                        <h4>This week</h4>
                                        <ul>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                            <li>Newly car added by Shivani Kaur <span>22 hours ago</span></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div> */}
                        <div className="user-profile "> <Link href="/admin/profile"><img src="/admin_img/user-img.png" /> </Link>  </div>
                    </div>

                </div>

            </header>
        </>
    )
}
