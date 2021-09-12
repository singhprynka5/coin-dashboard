import { useDispatch, useSelector } from "react-redux";

import { toggleFav, sortCoins } from "../store/actions";
import { useHistory } from "react-router-dom";

const CoinList = (props) => {
  const favourites = useSelector(state => state.favourites);
  const tradeVolume = props.tradeVolume;
  const coinDetails = props.coinDetails;
  const history = useHistory();
  const dispatch = useDispatch();

  const redirect = (coin) => {
    history.push(`/trade/${coin.toLowerCase()}`);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Coins
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(sortCoins("SORT_PRICE"))}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price ^
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(sortCoins("SORT_VOLUME"))}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    volume ^
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    percentage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Favourite
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(() => {
                  let filters = Object.keys(tradeVolume).filter((item) => {
                    if (item.toLowerCase().indexOf(props.searchText.toLowerCase()) !== -1) {
                        return item;
                    }
                });
                return filters.map((coin, i) => {
                  let percentage = (tradeVolume[coin].last_traded_price - tradeVolume[coin].yes_price) * 100 / tradeVolume[coin].yes_price;
                  return (
                    <tr key={`${coin}${i}`} style={{ cursor: "pointer" }}>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => redirect(coin)}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full"
                              src={coinDetails && coinDetails[coin.toLowerCase()] && coinDetails[coin.toLowerCase()].coinIcon} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{coin}</div>
                            <div className="text-sm text-gray-500">
                              {coinDetails && coinDetails[coin.toLowerCase()] && coinDetails[coin.toLowerCase()].coinName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => redirect(coin)}>
                        <div className="text-sm text-gray-900">{tradeVolume[coin].last_traded_price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => redirect(coin)}>
                        <span className="text-sm text-gray-900">
                          {tradeVolume[coin] && tradeVolume[coin].volume && tradeVolume[coin].volume.volume}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => redirect(coin)}>{isFinite(percentage) ? percentage.toFixed(2) : "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => dispatch(toggleFav(coin, favourites[coin]))}>
                        <svg className={`mx-1 w-4 h-4 fill-current text-${favourites[coin] ? "yellow-500" : "gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      </td>
                    </tr>
                  )
                })
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinList;
