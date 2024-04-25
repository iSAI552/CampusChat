/* eslint-disable react/prop-types */
const Card = ({ formatedData }) => (
    <div className="mt-6">
        {formatedData.map((post) => (
            <div
                key={post.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md mb-4"
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    {post.username && <p className="mt-2 text-sm text-gray-500">
                        Posted by: {post.username}
                    </p>}
                </div>

                <p className="text-gray-700">{post.content}</p>
                <div className="mt-4 text-xs text-gray-400 flex justify-between">
                    <p>Created At: {post.createdAt.substring(0, 10)}</p>
                    <p>Updated At: {post.updatedAt.substring(0, 10)}</p>
                </div>
            </div>
        ))}
    </div>
);

export default Card;
