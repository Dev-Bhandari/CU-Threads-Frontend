import { getAllThreads } from "../utils/api/thread.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Spinner } from "flowbite-react";
import ThreadCard from "../components/ThreadCard";

const AllThreadsPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [threads, setThreads] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoading(true);
            }, spinnerDelay);
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
        } finally {
            setLoaded(true);
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {loading ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : (
                <InfiniteScroll
                    className=""
                    dataLength={threads.length}
                    next={fetchThreads}
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        threads.length != 0 ? (
                            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                <p>Refresh to see new posts</p>
                            </Card>
                        ) : (
                            loaded && (
                                <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                    <p>
                                        No threads yet. Why not break the ice?
                                    </p>
                                </Card>
                            )
                        )
                    }
                    scrollThreshold={0.7}
                >
                    {threads.map((thread) => (
                        <ThreadCard
                            key={thread._id}
                            thread={thread}
                            isAllThreadsPage={true}
                        />
                    ))}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default AllThreadsPage;
