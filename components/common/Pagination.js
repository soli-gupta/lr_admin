import Link from "next/link";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css'

function Paginationn({ rowCount }) {

    const { pathname } = useRouter();
    const router = useRouter();
    const { page } = router.query;

    const lisPage = parseInt(page) ? parseInt(page) : 1;

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${lisPage <= 1 ? 'dead-link' : ''}`}><button onClick={() => router.push(`${pathname}/?page=${lisPage - 1}`)} disabled={lisPage <= 1} className="page-link">Previous</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => router.push(`${pathname}/?page=1`)} disabled={lisPage === 1 ? true : false}>{lisPage}</button></li>
                    <li className={`page-item ${rowCount < 10 ? 'dead-link' : ''}`}><button onClick={() => router.push(`${pathname}/?page=${lisPage + 1}`)} disabled={rowCount < 10 ? true : false} className="page-link" href="#">Next</button></li>
                </ul>
            </nav>
        </>
    )
}


export default Paginationn