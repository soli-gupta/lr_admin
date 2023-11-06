import React from 'react'
import Head from 'next/head'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/components/common/Layout'
import AdminHead from '@/components/common/adminHead'

export default function index() {
    return (
        <>
            <Layout>
                <AdminHead pageTitle={`Career application`} />
                <Breadcrumb title="Career application" addBtn="Export" />
                <div className="main-data">

                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '100px', textAlign: 'center' }}>ID</th>

                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update At</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="id1" />
                                        <label htmlFor="id1">2</label>
                                    </div>
                                </td>

                                <td>Test</td>
                                <td> 9988776677</td>
                                <td>test@gmail.com</td>
                                <td>GET IN TOUCH</td>
                                <td><button className="active small-btn inactive">In-active</button></td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>
                                    <div className="table-buttons">
                                        <button className='duplicate'>Edit</button>
                                        <button className="serive">Delete</button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="id1" />
                                        <label htmlFor="id1">1</label>
                                    </div>
                                </td>

                                <td>Grapes</td>
                                <td> 8123454543</td>
                                <td>grapes@gmail.com</td>
                                <td>Request A Call Back</td>
                                <td><button className="active small-btn">Active</button></td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>Jun 3, 2022, 02:31 PM</td>
                                <td>
                                    <div className="table-buttons">
                                        <button className='duplicate'>Edit</button>
                                        <button className="serive">Delete</button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    )
}
