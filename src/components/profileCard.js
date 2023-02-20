export function ProfileCard(props) {
    console.log(props)
    return(
        <div className="absolute top-16 right-4 w-80 h-64 z-50 rounded-xl bg-white">
            <h1 className="text-2xl font-bold mt-4">{props.user.name}</h1>
            <p className="text-gray-500">{props.user.email}</p>
            <div className="flex flex-row mt-4">
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
            </div>
        </div>

    )
}