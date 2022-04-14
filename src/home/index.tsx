import {useDataQuery} from "@dhis2/app-runtime";
import {CenteredContent, CircularLoader} from '@dhis2/ui'

const query = {
    me: {
        resource: "me"
    }
}


export default function Home() {

    const {data, loading, error} = useDataQuery(query);


    if (loading) {
        return <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}><CenteredContent><CircularLoader/></CenteredContent>.</div>;
    }

    if (error) {
        return <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}><CenteredContent><h3>Error: {error.message}</h3></CenteredContent></div>
    }


    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>

            {// @ts-ignore
                <h1>Hello {data?.me?.displayName}</h1>
            }
        </div>
    )
}
