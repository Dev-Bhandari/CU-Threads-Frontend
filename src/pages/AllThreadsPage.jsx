import { getAllThreads } from "../utils/api/thread.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Spinner } from "flowbite-react";
import ThreadCard from "../components/ThreadCard";
import { useModalContext } from "../utils/modalContext";

const AllThreadsPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [threads, setThreads] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);
    const {
        jwtExpired,
        setJwtExpired,
        setAlertResponse,
        openExtendSessionModal,
        toggleExtendSessionModal,
    } = useModalContext();

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
                setHasNext(res.data.hasNextPage);
                setLastFieldId(res.data.lastSortedFieldId);
            }
        } catch (error) {
            console.log("Error fetching Threads:", error);
            if (error.response.data.message == "jwt expired") {
                setJwtExpired(true);
                toggleExtendSessionModal();
            }
        } finally {
            setLoaded(true);
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
    };

    const sessionExpired = () => {
        return (
            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                <div className="flex justify-center items-center">
                    <p className="p-2 ">Your session is expired!</p>
                    <button
                        className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                        onClick={toggleExtendSessionModal}
                    >
                        Extend Session
                    </button>
                </div>
            </Card>
        );
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
                    hasMore={hasNext}
                    loader={
                        <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                            <p>Loading more posts...</p>
                        </Card>
                    }
                    endMessage={
                        threads.length != 0 ? (
                            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                <p>Refresh to see new threads</p>
                            </Card>
                        ) : (
                            loaded &&
                            (jwtExpired ? (
                                sessionExpired()
                            ) : (
                                <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                    <p>
                                        No threads yet. Why not break the ice?
                                    </p>
                                </Card>
                            ))
                        )
                    }
                    scrollThreshold={0.8}
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
