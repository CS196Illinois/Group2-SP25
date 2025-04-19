import Navbar from "../task/navbar";

export default function Layout( {children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <section className="interFont antialiased">
            {children}

            <Navbar selected={1}/>
        </section>
    )
}