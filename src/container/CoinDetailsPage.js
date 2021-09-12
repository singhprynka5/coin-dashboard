import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCoinDetails, getTradeVolume} from "../store/actions";

const CoinDetailsPage = () => {
    const coinDetails = useSelector(state => state.coinDetails);
    const tradeVolume = useSelector(state => state.tradeVolume);
    const history = useHistory();

    const dispatch = useDispatch();
    let pathname = history.location.pathname;
    pathname = pathname.split("/trade/")
    pathname = pathname[1]

    useEffect(() => {
        dispatch(getCoinDetails());
        dispatch(getTradeVolume());
    }, []);

    let details = coinDetails[pathname];
    let trade = tradeVolume[pathname.toUpperCase()];

    return (
        trade && Object.keys(trade).length > 0 ? <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full"
                        src={details && details.coinIcon} alt="" />
                </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Coin name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details && details.coinName ? details.coinName : pathname.toUpperCase()}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Last Traded Price</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trade.last_traded_price}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Volume</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trade.volume.volume}</dd>
                    </div>
                </dl>
            </div>
        </div> : "No data For this coin"
    );
}

export default CoinDetailsPage;