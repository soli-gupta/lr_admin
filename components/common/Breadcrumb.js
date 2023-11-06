import Link from 'next/link'
import React from 'react'

export default function Breadcrumb(props) {
    return (
        <>
            <div className="bread-action">
                <div className="wrapper">
                    <div className="left-part">
                        <h2>{props.title ? props.title : ''}</h2>
                    </div>

                    {props.addBtn && (
                        <div className="right-part">
                            <Link href={props.url ? props.url : '#'}>{props.addBtn}</Link>
                            {/* <a className='export' href="#">{props.addBtn ? props.addBtn : ''}</a> */}
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
