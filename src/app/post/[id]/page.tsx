import { PostView } from "@/components/PostView";

export default async function Post(props: { params: { id: string } }) {
    const id = (await props.params).id;

    console.log(id)
    return (
        <div className="pb-14">
            <PostView id={id}/>

        </div>
    )
}