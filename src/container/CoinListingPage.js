import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CoinList from "../components/CoinList";

import { getCoinDetails, getTradeVolume } from "../store/actions";

const CoinListingPage = () => {
    const [searchText, handleSearch] = useState("");
    const coinDetails = useSelector(state => state.coinDetails);
    const tradeVolume = useSelector(state => state.tradeVolume);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoinDetails());
        dispatch(getTradeVolume());
    }, []);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <header className="bg-white">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-gray-900">Markets</h1>
                        </div>
                    </header>

                </div>
                <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="text" name="search" placeholder="Search" autoComplete="off"
                    onChange={(e)=>handleSearch(e.target.value)}
                />
            </div>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {tradeVolume && Object.keys(tradeVolume).length > 0 ? <CoinList tradeVolume={tradeVolume} coinDetails={coinDetails} searchText={searchText} /> : null}
                </div>
            </main>
        </div>
    );
}

export default CoinListingPage;