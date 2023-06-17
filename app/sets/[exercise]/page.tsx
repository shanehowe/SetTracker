interface PageProps {
    params: {
        exercise: string
    }
}

export default async function Page({ params }: PageProps) {
    return <p>Hello</p>
}