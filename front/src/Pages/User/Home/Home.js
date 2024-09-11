import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../../../Components.js/Header/Header';
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GoTop } from '../../../Components.js/Functions';
import List from '../../../Components.js/Gendres/List';
import { useSelector, useDispatch } from 'react-redux';
import { getShows } from '../../../Components.js/Redux/Slices/ShowsSlice';
import WorkSkeleton from '../../../Components.js/Work/WorkSkeleton';
import GendresVerSkeleton from '../../../Components.js/Gendres/GendresVerSkeleton';

function Home() {
    GoTop("Movify | More than you'd ever imagine");

    const dispatch = useDispatch();
    const [page, setPage] = useState(0); // Track the current page
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [endReached, setEndReached] = useState(false); // Track if all pages are loaded
    const [allWorks, setAllWorks] = useState([]); // Store all fetched works
    const loadMoreRef = useRef(null); // Ref to detect when to load more
    const items = [1, 2, 3]; // Skeleton loader keys

    // Fetch shows when the page changes
    useEffect(() => {
        if (endReached || isLoading) return; // Stop if all pages are loaded or currently loading

        setIsLoading(true);
        dispatch(getShows(page))
            .unwrap()
            .then((data) => {
                if (data.length === 0) {
                    setEndReached(true); // Stop loading if no more data
                } else {
                    setAllWorks((prevWorks) => [...prevWorks, ...data]); // Append the new data to the existing works
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, [page, endReached, dispatch]);

    // Intersection Observer to detect when the user is near the bottom
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && !endReached) {
                setPage((prevPage) => prevPage + 1); // Load next page
            }
        }, {
            rootMargin: '200px', // Trigger 200px before hitting the bottom
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [isLoading, endReached]);

    const loading = useSelector((state) => state.shows.loading); // Loading state from Redux
    const show = useSelector((state) => state.shows.show); // Random show for header
    const loadingshow = useSelector((state) => state.shows.loadingshow); // Loading state for header

    return (
        <div className="text-mywhite bg-primary min-h-screen">
            <Navbar />
            <div className="pb-32">
                <Header item={show} type={show?.video ? 'movie' : 'serie'} loading={loadingshow} />
                <div className="min-h-screen">
                    <Networks />
                    <List />
                    <GendresVer data={allWorks} /> {/* Render all fetched works */}
                </div>

                {isLoading && <GendresVerSkeleton />}

                {/* Trigger loading more when near bottom */}
                {!endReached && <div ref={loadMoreRef} style={{ height: '20px' }}></div>}
            </div>
            <Footer />
        </div>
    );
}

export default Home;
