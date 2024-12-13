import Link from "next/link";
import Layout from "../../components/Layout";

export default function Info() {
    return (
        <Layout>
            <h1>Information</h1>
            <ul>
                <li><Link href="/info/faqs">FAQ</Link></li>
                <li><Link href="/info/support">Support</Link></li>
            </ul>
        </Layout>
    );
}