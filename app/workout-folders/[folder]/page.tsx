interface PageProps {
    params: {
        folder: string
    }
}

export default function Page({ params }: PageProps) {
    /*
    *   decodeURI turns Push%20Day to Push Day
    */
    const folder = decodeURIComponent(params.folder)
    return (
        <p>From {folder}</p>
    )
}