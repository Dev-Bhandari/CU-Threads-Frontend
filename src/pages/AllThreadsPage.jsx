import { useAuth } from "../utils/authContext";
import { getAllThreads } from "../utils/api/thread.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "flowbite-react";
import ThreadCard from "../components/ThreadCard";

const AllThreadsPage = () => {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        try {
            console.log("Calling more Threads");
            const res = await getAllThreads({ lastId: lastFieldId });
            const newThreads = res.data || [];
            console.log(newThreads);
            if (newThreads.length > 0) {
                setThreads((prevThreads) => [...prevThreads, ...newThreads]);
                setLastFieldId(res.data.lastSortedFieldId);
            }
        } catch (error) {
            console.log("Error fetching Threads:", error);
        }
    };

    return (
        <div className="flex flex-col items-center mr-56 ">
            <InfiniteScroll
                dataLength={threads.length}
                next={fetchThreads}
                hasMore={false}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <Card className="text-center">
                        <p>Refresh to see new Threads</p>
                    </Card>
                }
                scrollThreshold={0.9}
            >
                {threads.map((thread) => (
                    <ThreadCard
                        key={thread._id}
                        threadData={thread}
                        isAllThreadsPage={true}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default AllThreadsPage;
