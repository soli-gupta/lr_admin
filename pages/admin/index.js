import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/common/Header'
import Card from '@/components/Card'
import { useEffect } from 'react'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'

import useSWR from 'swr';
import axios from 'axios'
import { numberFormatter } from '@/components/Helper'
import AdminHead from '@/components/common/adminHead'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (url) => axios.get(url, {
  headers: {
    token: localStorage.getItem('lr-admin-token')
  }
}).then(res => res.data);

export default function Home() {


  const Url = process.env.NEXT_PUBLIC_URL;
  const router = useRouter()



  useEffect(() => {
    const token = localStorage.getItem('lr-admin-token')
    document.body.classList.remove('login');
    if (token) {
      router.push("/admin")
    } else {
      router.push("/login")
    }

  }, [])

  const getAllCount = useSWR(`${Url}admin/get-all-count-dashboard`, fetcher);

  console.log(getAllCount.data)


  return (
    <>
      <AdminHead pageTitle={`Dashboard`} />
      <Layout>
        <div className="bread-action">
          <div className="wrapper">

            <div className="left-part">
              <h2>Dashboard</h2>
            </div>
            <div className="right-part"><Link href="/admin/cars/add-car">Add Car</Link></div>
          </div>
        </div>

        <div className="main-data">

          <div className="wrapper">

            <div className="two-box">

              <div className="box">
                <Link href="/admin/cars"></Link>
                <div className="icon"> <img src="./admin_img/all-cars.svg" /> </div>
                <div className="text">All Cars <h4>{numberFormatter(getAllCount !== undefined && getAllCount.data !== undefined ? getAllCount.data.allProductCount : '')}</h4>
                </div>

              </div>
              <div className="box">
                <Link href="/admin/brands"></Link>
                <div className="icon sold"> <img src="./admin_img/sold.svg" /> </div>
                <div className="text">All Brands <h4>{numberFormatter(getAllCount !== undefined && getAllCount.data !== undefined ? getAllCount.data.countAllBrands : '')}</h4>
                </div>

              </div>


            </div>

            <div className="four-box">

              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>01</span> 05</h4>

                </div>

                <div className="icon service"> <img src="./admin_img/service-pakage.svg" /> </div>
                <div className="text">Total Service Packages</div>

              </div>
              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>02</span> 01</h4>

                </div>

                <div className="icon extend"> <img src="./admin_img/Extended-Warranty.svg" /> </div>
                <div className="text">Total Extended Warranty</div>

              </div>
              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>03</span> 166</h4>

                </div>

                <div className="icon sold"> <img src="./admin_img/Total-Query.svg" /> </div>
                <div className="text">Total Query</div>

              </div>

              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>04</span> 34</h4>

                </div>

                <div className="icon news"> <img src="./admin_img/Newsletter.svg" /> </div>
                <div className="text">Total Newsletter Data</div>

              </div>

              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>05</span> 24</h4>

                </div>

                <div className="icon blog"> <img src="./admin_img/blog-post.svg" /> </div>
                <div className="text">Total Blog Post</div>

              </div>

              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>06</span> 01</h4>

                </div>

                <div className="icon jobs"> <img src="./admin_img/jobs.svg" /> </div>
                <div className="text">Total Jobs</div>

              </div>

              <div className="box">
                <Link href="#"></Link>

                <div className="numbers">

                  <h4><span>07</span> 07</h4>

                </div>

                <div className="icon stories"> <img src="./admin_img/stories.svg" /> </div>
                <div className="text">Total Stories</div>

              </div>

              <div className="box">
                <Link href="#"></Link>
                <div className="numbers">
                  <h4><span>08</span> 68</h4>
                </div>

                <div className="icon service"> <img src="./admin_img/service-pakage.svg" /> </div>
                <div className="text">Total Services</div>

              </div>
            </div>
          </div>
        </div>

        <div className="push"></div>
      </Layout>
    </>
  )
}
