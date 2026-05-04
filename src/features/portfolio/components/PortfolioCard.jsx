/* 
    PortfolioCard.jsx

    This component represents a single card in the user's portfolio, displaying details about a 
    specific cryptocurrency holding. It includes the coin's image, name, current balance, price, 
    percentage change, and a sparkline chart.

    The component accepts the following props:
        - imageSrc: URL of the coin's image
        - name: Name of the cryptocurrency
        - balance: Current balance of the coin in the portfolio
        - price: Current price of the coin
        - percentChange: Percentage change in the coin's value in the portfolio
        - handleEdit: Function to handle editing the coin's details
        - handleDelete: Function to handle deleting the coin from the portfolio
        - sparklineData: Data for rendering the sparkline chart of the coin's price history

    Example usage:
        <PortfolioCard
            imageSrc="https://example.com/bitcoin.png"
            name="Bitcoin"
            balance={400000}
            price={95000}
            percentChange={5.2}
            handleEdit={() => console.log("Edit coin details")
            handleDelete={() => console.log("Delete coin from portfolio")}
            sparklineData={[
                {
                    name: "bitcoin",
                    data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                }
            ]}
        />
*/

import { FaPen, FaTrash } from "react-icons/fa6";
import Button from "../../../shared/components/Button";
import PercentChangeIndicator from "../../../shared/components/PercentChangeIndicator";
import ThemedCoinChart from "../../../shared/components/ThemedCoinChart";

export default function PortfolioCard({
  imageSrc,
  name,
  balance,
  price,
  percentChange,
  handleEdit,
  handleDelete,
  sparklineData,
}) {
  return (
    <div
      className="
                bg-gray-100 dark:bg-gray-700 
                p-6
                rounded-lg
            "
    >
      {/* coin image and name */}
      <div
        className="
                    flex
                    gap-2
                "
      >
        {/* coin image */}
        <img
          src={imageSrc}
          alt={name}
          className="
                        w-6
                        h-6
                        object-cover
                    "
        />

        {/* coin name */}
        <span
          className="
                        capitalize
                        dark:text-white
                    "
        >
          {name}
        </span>
      </div>

      {/* coin portfolio balance, % balance change, current price */}
      {/* and portfolio controls */}
      <div
        className="
                    flex
                    mt-2
                    gap-2
                "
      >
        <div
          className="
                        flex
                        flex-col
                        gap-1
                        min-w-0
                    "
        >
          {/* coin portfolio balance */}
          <span
            className="
                            text-4xl
                            font-medium
                            text-gray-800
                            dark:text-white
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                        "
            title={balance}
          >
            ${balance}
          </span>

          <div
            className="
                            flex
                            gap-2
                            items-center
                            text-lg
                        "
          >
            {/* coin current price */}
            <span
              className="
                                dark:text-white
                                max-w-4/5
                                overflow-hidden
                                text-ellipsis
                                whitespace-nowrap
                            "
              title={price}
            >
              ~ ${price}
            </span>

            {/* coin % balance change in portfolio */}
            <PercentChangeIndicator
              percentChange={percentChange}
              className="
                                text-lg
                            "
            />
          </div>
        </div>

        <div
          className="
                        ml-auto
                        flex
                        items-center
                        gap-2
                    "
        >
          {/* delete button */}
          <Button
            className="
                            w-min
                            p-3
                            rounded-full
                            text-xl
                        "
            onClick={handleDelete}
          >
            <FaTrash />
          </Button>

          {/* edit button */}
          <Button
            className="
                            w-min
                            p-3
                            rounded-full
                            text-xl
                        "
            onClick={handleEdit}
          >
            <FaPen />
          </Button>
        </div>
      </div>

      {/* coin sparkline chart */}
      <div
        className="
                    h-40
                    w-[104%]
                    relative
                    -left-4
                "
      >
        <ThemedCoinChart data={sparklineData} />
      </div>
    </div>
  );
}
